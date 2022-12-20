# Mutex：解决资源并发问题

常见的并发问题：

* 多个 goroutine 并发更新同一个资源，像计数器；
* 同时更新用户的账户信息；秒杀系统；
* 往同一个 buffer 中并发写入数据等等。

如果没有互斥控制，就会出现一些异常情况，比如计数器的计数不准确、用户的账户可能出现透支、秒杀系统出现超卖、buffer 中的数据混乱，等等，后果都很严重。这些问题怎么解决呢？对，用互斥锁，那在 Go 语言里，就是 Mutex。



临界区的概念：

在并发编程中，如果程序中的一部分会被并发访问或修改，那么，为了避免并发访问导致的意想不到的结果，这部分程序需要被保护起来，这部分被保护起来的程序，就叫做**临界区**。

可以说，**临界区就是一个被共享的资源，或者说是一个整体的一组共享资源**，比如对数据库的访问、对某一个共享数据结构的操作、对一个 I/O 设备的使用、对一个连接池中的连接的调用，等等。

如果很多线程同步访问临界区，就会造成访问或操作错误，这当然不是我们希望看到的结果。所以，我们可以使用互斥锁，限定临界区只能同时由一个线程持有。

当临界区由一个线程持有的时候，其它线程如果想进入这个临界区，就会返回失败，或者是等待。直到持有的线程退出临界区，这些等待线程中的某一个才有机会接着持有这个临界区。

![](https://www.cmdbyte.com/2022/202202101450295.webp)



同步原语（Synchronization primitives）适用场景：

* 共享资源。并发地读写共享资源，会出现数据竞争（data race）的问题，所以需要 Mutex、RWMutex 这样的并发原语来保护。
* 任务编排。需要 goroutine 按照一定的规律执行，而 goroutine 之间有相互等待或者依赖的顺序关系，我们常常使用 WaitGroup 或者 Channel 来实现。
* 消息传递。信息交流以及不同的 goroutine 之间的线程安全的数据交流，常常使用 Channel 来实现。



Mutex有两种模式：正常模式和饥饿模式

正常模式下，waiter 都是进入先入先出队列，被唤醒的 waiter 并不会直接持有锁，而是要和新来的 goroutine 进行竞争。新来的 goroutine 有先天的优势，它们正在 CPU 中运行，可能它们的数量还不少，所以，在高并发情况下，被唤醒的 waiter 可能比较悲剧地获取不到锁，这时，它会被插入到队列的前面。如果 waiter 获取不到锁的时间超过阈值 1 毫秒，那么，这个 Mutex 就进入到了饥饿模式。在饥饿模式下，Mutex 的拥有者将直接把锁交给队列最前面的 waiter。新来的 goroutine 不会尝试获取锁，即使看起来锁没有被持有，它也不会去抢，也不会 spin，它会乖乖地加入到等待队列的尾部。如果拥有 Mutex 的 waiter 发现下面两种情况的其中之一，它就会把这个 Mutex 转换成正常模式:此 waiter 已经是队列中的最后一个 waiter 了，没有其它的等待锁的 goroutine 了；此 waiter 的等待时间小于 1 毫秒。正常模式拥有更好的性能，因为即使有等待抢锁的 waiter，goroutine 也可以连续多次获取到锁。饥饿模式是对公平性和性能的一种平衡，它避免了某些 goroutine 长时间的等待锁。在饥饿模式下，优先对待的是那些一直在等待的 waiter。



**问题：**

目前 Mutex 的 state 字段有几个意义，这几个意义分别是由哪些字段表示的？等待一个 Mutex 的 goroutine 数最大是多少？是否能满足现实的需求？

答：

1. 目前 Mutex 的 state 字段有几个意义，这几个意义分别是由哪些字段表示的？
    和第四个阶段的讲解基本一致：前三个bit分别为mutexLocked、mutexWoken、mutexStarving，剩余bit表示mutexWaiter

2. 等待一个 Mutex 的 goroutine 数最大是多少？是否能满足现实的需求？
    单从程序来看，可以支持 1<<(32-3) -1 ，约 0.5 Billion个
      其中32为state的类型int32，3位waiter字段的shift
    考虑到实际goroutine初始化的空间为2K，0.5Billin*2K达到了1TB，单从内存空间来说已经要求极高了，当前的设计肯定可以满足了。



### Mutex 使用四种易错场景盘点

Mutex 常见的错误场景有 4 类，分别是 Lock/Unlock 不是成对出现、Copy 已使用的 Mutex、重入和死锁。下面我们一一来看。

#### Lock/Unlock 不是成对出现

##### 缺少 Unlock

* 代码中有太多的 if-else 分支，可能在某个分支中漏写了 Unlock；
* 在重构的时候把 Unlock 给删除了；
* Unlock 误写成了 Lock。

##### 缺少 Lock

没有 Lock 直接 Unlock 会 panic。

#### Copy 已使用的 Mutex

Package sync 的同步原语在使用后是不能复制的，而 Mutex 是最常用的一个同步原语，那么它为什么不能被复制？

因为 Mutex 是一个有状态的对象，它的 state 字段记录这个锁的状态，如果复制之前是加锁状态，那么复制之后就有锁了。但是你可能认为他是一个零值的 Mutex，于是又进行了一番 Lock 与 Unlock。关键是在并发环境下，你根本不知道要复制的 Mutex 状态是什么，因为要复制的 Mutex 是由其它 goroutine 并发访问的，状态可能总是在变化。

犯错误的例子：

```go

type Counter struct {
    sync.Mutex
    Count int
}


func main() {
    var c Counter
    c.Lock()
    defer c.Unlock()
    c.Count++
    foo(c) // 复制锁
}

// 这里Counter的参数是通过复制的方式传入的
// 复制之前已经使用了这个锁，这就导致，复制的 Counter 是一个带状态 Counter。
func foo(c Counter) {
    c.Lock()
    defer c.Unlock()
    fmt.Println("in foo")
}
```

对于这种情况，Go 在运行的时候有死锁检查机制( [checkdead()方法](https://go.dev/src/runtime/proc.go?h=checkdead#L4345))，它能够发现死锁的 goroutine，并打印死锁情况并输出错误信息。当然，在运行之前也可以发现复制 Mutex 导致的死锁问题，即使用 **vet 工具**，eg：`go vet main.go` 。可以将该命令放到 Makefile 中，以便在持续集成的时候发现问题。

> vet 工具是怎么发现 Mutex 复制使用问题的呢？
>
> 检查是通过copylock分析器静态分析实现的。这个分析器会分析函数调用、range 遍历、复制、声明、函数返回值等位置，有没有锁的值 copy 的情景，以此来判断有没有问题。可以说，只要是实现了 Locker 接口，就会被分析。我们看到，下面的代码就是确定什么类型会被分析，其实就是实现了 Lock/Unlock 两个方法的 Locker 接口：
>
> ```go
> var lockerType *types.Interface
>   
>   // Construct a sync.Locker interface type.
>   func init() {
>     nullary := types.NewSignature(nil, nil, nil, false) // func()
>     methods := []*types.Func{
>       types.NewFunc(token.NoPos, nil, "Lock", nullary),
>       types.NewFunc(token.NoPos, nil, "Unlock", nullary),
>     }
>     lockerType = types.NewInterface(methods, nil).Complete()
>   }
> ```

#### 重入

> 重入锁：
>
> 当一个线程获取锁时，如果没有其它线程拥有这个锁，那么，这个线程就成功获取到这个锁。之后，如果其它线程再请求这个锁，就会处于阻塞等待的状态。但是，如果拥有这把锁的线程再请求这把锁的话，不会阻塞，而是成功返回，所以叫可重入锁（有时候也叫做递归锁）。只要你拥有这把锁，你可以可着劲儿地调用，比如通过递归实现一些算法，调用者不会阻塞或者死锁。

**Mutex 是不可重入的锁**，因为 Mutex 的实现中没有记录哪个 goroutine 拥有这把锁。理论上，任何 goroutine 都可以随意地 Unlock 这把锁，所以没办法计算重入条件。

误用 Mutex 重入的例子：

```go

func foo(l sync.Locker) {
    fmt.Println("in foo")
    l.Lock()
    bar(l)
    l.Unlock()
}

func bar(l sync.Locker) {
    l.Lock()
    fmt.Println("in bar")
    l.Unlock()
}

func main() {
    l := &sync.Mutex{}
    foo(l)
}
```

##### 实现可重入锁

本质上 Mutex 还是只 Lock/Unlock 了一次。

###### 方案一：通过 hacker 的方式获取到 goroutine id，记录下获取锁的 goroutine id，它可以实现 Locker 接口。

> 使用 hacker 方式获取 goroutine id
>
> 首先，我们获取运行时的 g 指针，反解出对应的 g 的结构。每个运行的 goroutine 结构的 g 指针保存在当前 goroutine 的一个叫做 TLS 对象中。第一步：我们先获取到 TLS 对象；第二步：再从 TLS 中获取 goroutine 结构的 g 指针；第三步：再从 g 指针中取出 goroutine id。

简单期间，这里使用了： `github.com/petermattis/goid` 库，用来获取 goroutine id

```go
// RecursiveMutex 包装一个Mutex,实现可重入
type RecursiveMutex struct {
    sync.Mutex
    owner     int64 // 当前持有锁的goroutine id
    recursion int32 // 这个goroutine 重入的次数
}

func (m *RecursiveMutex) Lock() {
    gid := goid.Get()
    // 如果当前持有锁的goroutine就是这次调用的goroutine,说明是重入
    if atomic.LoadInt64(&m.owner) == gid {
        m.recursion++
        return
    }
    m.Mutex.Lock()
    // 获得锁的goroutine第一次调用，记录下它的goroutine id,调用次数加1
    atomic.StoreInt64(&m.owner, gid)
    m.recursion = 1
}

func (m *RecursiveMutex) Unlock() {
    gid := goid.Get()
    // 非持有锁的goroutine尝试释放锁，错误的使用
    if atomic.LoadInt64(&m.owner) != gid {
        panic(fmt.Sprintf("wrong the owner(%d): %d!", m.owner, gid))
    }
    // 调用次数减1
    m.recursion--
    if m.recursion != 0 { // 如果这个goroutine还没有完全释放，则直接返回
        return
    }
    // 此goroutine最后一次调用，需要释放锁
    atomic.StoreInt64(&m.owner, -1)
    m.Mutex.Unlock()
}
```

###### 方案二：调用 Lock/Unlock 方法时，由 goroutine 提供一个 token，用来标识它自己，而不是我们通过 hacker 的方式获取到 goroutine id，但是，这样一来，就不满足 Locker 接口了。

```go
// Token方式的递归锁
type TokenRecursiveMutex struct {
    sync.Mutex
    token     int64
    recursion int32
}

// 请求锁，需要传入token
func (m *TokenRecursiveMutex) Lock(token int64) {
    if atomic.LoadInt64(&m.token) == token { //如果传入的token和持有锁的token一致，说明是递归调用
        m.recursion++
        return
    }
    m.Mutex.Lock() // 传入的token不一致，说明不是递归调用
    // 抢到锁之后记录这个token
    atomic.StoreInt64(&m.token, token)
    m.recursion = 1
}

// 释放锁
func (m *TokenRecursiveMutex) Unlock(token int64) {
    if atomic.LoadInt64(&m.token) != token { // 释放其它token持有的锁
        panic(fmt.Sprintf("wrong the owner(%d): %d!", m.token, token))
    }
    m.recursion-- // 当前持有这个锁的token释放锁
    if m.recursion != 0 { // 还没有回退到最初的递归调用
        return
    }
    atomic.StoreInt64(&m.token, 0) // 没有递归调用了，释放锁
    m.Mutex.Unlock()
}
```

##### 死锁

什么是死锁？

答：两个或两个以上的进程（或线程，goroutine）在执行过程中，因争夺共享资源而处于一种互相等待的状态，如果没有外部干涉，它们都将无法推进下去，此时，我们称系统处于死锁状态或系统产生了死锁。

死锁产生的条件：

1. 互斥： 至少一个资源是被排他性独享的，其他线程必须处于等待状态，直到资源被释放。
2. 持有和等待：goroutine 持有一个资源，并且还在请求其它 goroutine 持有的资源，也就是咱们常说的“吃着碗里，看着锅里”的意思。
3. 不可剥夺：资源只能由持有它的 goroutine 来释放。
4. 环路等待：一般来说，存在一组等待进程，P={P1，P2，…，PN}，P1 等待 P2 持有的资源，P2 等待 P3 持有的资源，依此类推，最后是 PN 等待 P1 持有的资源，这就形成了一个环路等待的死结。



#### 流行的Go项目关于 Mutex 的 issue





第三方探测死锁的工具：[go-deadlock](https://github.com/sasha-s/go-deadlock)，[go-tools](https://github.com/dominikh/go-tools)。

并发程序最难跟踪调试的就是很难重现，因为并发问题不是按照我们指定的顺序执行的，由于计算机调度的问题和事件触发的时机不同，死锁的 Bug 可能会在极端的情况下出现。通过搜索日志、查看日志，我们能够知道程序有异常了，比如某个流程一直没有结束。这个时候，可以通过 Go pprof 工具分析，它提供了一个 block profiler 监控阻塞的 goroutine。除此之外，我们还可以查看全部的 goroutine 的堆栈信息，通过它，你可以查看阻塞的 groutine 究竟阻塞在哪一行哪一个对象上了。
