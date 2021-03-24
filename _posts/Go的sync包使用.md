---
title: Go的sync包使用
categories:
  - Go
tags:
  - Go
date: 2021-03-24 21:15:04
---

> 来自：[Golang Sync包_藏经阁 | 玄苦-CSDN博客](https://blog.csdn.net/chenguolinblog/article/details/90691127)
>
> 本来是想参考着写的，但奈何人家写的太精美，只能直接照搬了，看来我还有很长的路要走，加油吧！

## sync.Mutex

`sync.Mutex`称为`互斥锁`，常用在并发编程里面。互斥锁需要保证的是同一个时间段内不能有多个并发协程同时访问某一个资源(临界区)。
`sync.Mutex`有2个函数`Lock`和`UnLock`分别表示获得锁和释放锁。

```go
func (m *Mutex) Lock()
func (m *Mutex) UnLock()
```

sync.Mutex初始值为UnLock状态，并且sync.Mutex常做为其它结构体的匿名变量使用。

举个例子: 我们经常使用网上支付购物东西，就会出现同一个银行账户在某一个时间既有支出也有收入，那银行就得保证我们余额准确，保证数据无误。
我们可以简单的实现银行的支出和收入来说明Mutex的使用

```go
type Bank struct {
	sync.Mutex
	balance map[string]float64
}

// In 收入
func (b *Bank) In(account string, value float64) {
        // 加锁 保证同一时间只有一个协程能访问这段代码
	b.Lock()
	defer b.Unlock()

	v, ok := b.balance[account]
	if !ok {
		b.balance[account] = 0.0
	}

	b.balance[account] += v
}

// Out 支出
func (b *Bank) Out(account string, value float64) error {
        // 加锁 保证同一时间只有一个协程能访问这段代码
	b.Lock()
	defer b.Unlock()

	v, ok := b.balance[account]
	if !ok || v < value {
		return errors.New("account not enough balance")
	}

	b.balance[account] -= value
	return nil
}
```

## sync.RWMutex

`sync.RWMutex`称为读写锁是`sync.Mutex`的一种变种，`sync.RWMutex`来自于计算机操作系统非常有名的读者写者问题。
`sync.RWMutex`目的是为了能够支持多个并发协程同时读取某一个资源，但只有一个并发协程能够更新资源。也就是说读和写是互斥的，写和写也是互斥的，读和读是不互斥的。总结起来如下

1. 当有一个协程在读的时候，所有写的协程必须等到所有读的协程结束才可以获得锁进行写操作。
2. 当有一个协程在读的时候，所有读的协程不受影响都可以进行读操作。
3. 当有一个协程在写的时候，所有读、写的协程必须等到写的协程结束才可以获得锁进行读、写操作。

```go
mutex := &sync.RWMutex{}

mutex.Lock()
// Update 共享变量
mutex.Unlock()

mutex.RLock()
// Read 共享变量
mutex.RUnlock()
```

**它适合用在读取频繁写入不频繁的场景里。**

举个例子，这是一个支持多人同时查询的代码。

```go
type Bank struct {
	sync.RWMutex
	balance map[string]float64
}

func (b *Bank) In(account string, value float64) {
	b.Lock()
	defer b.Unlock()

	v, ok := b.balance[account]
	if !ok {
		b.balance[account] = 0.0
	}

	b.balance[account] += v
}

func (b *Bank) Out(account string, value float64) error {
	b.Lock()
	defer b.Unlock()

	v, ok := b.balance[account]
	if !ok || v < value {
		return errors.New("account not enough balance")
	}

	b.balance[account] -= value
	return nil
}

func (b *Bank) Query(account string) float64 {
	b.RLock()
	defer b.RUnlock()

	v, ok := b.balance[account]
	if !ok {
		return 0.0
	}

	return v
}
```

## sync.WaitGroup

`sync.WaitGroup`指的是等待组，在Golang并发编程里面非常常见，等待一组工作完成后，再进行下一组工作。

`sync.WaitGroup`有3个函数

```go
func (wg *WaitGroup) Add(delta int)  Add添加n个并发协程
func (wg *WaitGroup) Done()  Done完成一个并发协程
func (wg *WaitGroup) Wait()  Wait等待其它并发协程结束
```

`sync.WaitGroup`拥有一个内部计数器。当计数器等于`0`时，则`Wait()`方法会立即返回。否则它将阻塞执行`Wait()`方法的`goroutine`直到计数器等于`0`时为止。要增加计数器，我们必须使用`Add(int)`方法。要减少它，我们可以使用`Done()`（将计数器减`1`），也可以传递负数给`Add`方法把计数器减少指定大小，`Done()`方法底层就是通过`Add(-1)`实现的。

在以下示例中，我们将启动八个`goroutine`，并等待他们完成：

```go
wg := &sync.WaitGroup{}

for i := 0; i < 8; i++ {
  wg.Add(1)
  go func() {
    // Do something
    wg.Done()
  }()
}

wg.Wait()
// 继续往下执行...
```

每次创建`goroutine`时，我们都会使用`wg.Add(1)`来增加`wg`的内部计数器。我们也可以在`for`循环之前调用`wg.Add(8)`。

与此同时，每个`goroutine`完成时，都会使用`wg.Done()`减少`wg`的内部计数器。

`main goroutine`会在八个`goroutine`都执行`wg.Done()`将计数器变为`0`后才能继续执行。

`sync.WaitGroup`在Golang编程里面最常用于协程池，下面这个例子会同时启动1000个并发协程。

```go
func main() {
     wg := &sync.WaitGroup{}
     for i := 0; i < 1000; i++ {
         wg.Add(1)
         go func() {
	     defer func() {
		wg.Done()
	     }()
	     time.Sleep(1 * time.Second)
	     fmt.Println("hello world ~")
	 }()
     }
     // 等待所有协程结束
     wg.Wait()
     fmt.Println("WaitGroup all process done ~")
}
```

sync.WaitGroup没有办法指定最大并发协程数，在一些场景下会有问题。例如操作数据库场景下，我们不希望某一些时刻出现大量连接数据库导致数据库不可访问。所以，为了能够控制最大的并发数，推荐使用github.com/remeh/sizedwaitgroup，用法和sync.WaitGroup非常类似。

下面这个例子最多只有10个并发协程，如果已经达到10个并发协程，只有某一个协程执行了Done才能启动一个新的协程。

```go
import  "github.com/remeh/sizedwaitgroup"

func main() {
     # 最大10个并发
     wg := sizedwaitgroup.New(10)
     for i = 0; i < 1000; i++ {
         wg.Add()
         go func() {
	     defer func() {
		wg.Done()
	     }()
	     time.Sleep(1 * time.Second)
	     fmt.Println("hello world ~")
	 }()
     }
     // 等待所有协程结束
     wg.Wait()
     fmt.Println("WaitGroup all process done ~")
}
```

## sync.Once

sync.Once指的是只执行一次的对象实现，常用来控制某些函数只能被调用一次。sync.Once的使用场景例如单例模式、系统初始化。
例如并发情况下多次调用channel的close会导致panic，解决这个问题我们可以使用sync.Once来保证close只会被执行一次。

sync.Once的结构如下所示，只有一个函数。使用变量done来记录函数的执行状态，使用sync.Mutex和sync.atomic来保证线程安全的读取done。

```go
type Once struct {
	m    Mutex     #互斥锁
	done uint32    #执行状态
}

func (o *Once) Do(f func())
```

举个例子，1000个并发协程情况下只有一个协程会执行到fmt.Printf，多次执行的情况下输出的内容还不一样，因为这取决于哪个协程先调用到该匿名函数。

```go
func main() {
     once := &sync.Once{}

     for i := 0; i < 1000; i++ {
	 go func(idx int) {
	    once.Do(func() {
		time.Sleep(1 * time.Second)
		fmt.Printf("hello world index: %d", idx)
	    })
	 }(i)
     }

     time.Sleep(5 * time.Second)
}
```

## sync.Map

`Go`语言的`sync.Map`是一个并发版本的`map`，它提供了相关方法来操作里面的元素：

- 使用`Store(interface {}，interface {})`添加元素。
- 使用`Load(interface {}) interface {}`获取元素。
- 使用`Delete(interface {})`删除元素。
- 使用`LoadOrStore(interface {}，interface {}) (interface {}，bool)`检索或添加之前不存在的元素。如果键之前在`map`中存在，则返回的布尔值为`true`。
- 使用`Range`遍历元素。`Range`方法接收一个类型为`func(key，value interface {})bool`的函数参数。如果函数返回了`false`，则停止迭代。

```go
m := &sync.Map{}

// 添加元素
m.Store(1, "one")
m.Store(2, "two")

// 获取元素1
value, contains := m.Load(1)
if contains {
  fmt.Printf("%s\n", value.(string))
}

// 返回已存value，否则把指定的键值存储到map中
value, loaded := m.LoadOrStore(3, "three")
if !loaded {
  fmt.Printf("%s\n", value.(string))
}

m.Delete(3)

// 迭代所有元素
m.Range(func(key, value interface{}) bool {
  fmt.Printf("%d: %s\n", key.(int), value.(string))
  return true
})
```

输出：

```text
one
three
1: one
2: two
```

我们应该在什么时候使用`sync.Map`而不是在普通的`map`上使用`sync.Mutex`？

- 当我们对`map`有频繁的读取和不频繁的写入时。
- 当多个`goroutine`读取，写入和覆盖不相交的键时。具体是什么意思呢？例如，如果我们有一个分片实现，其中包含一组4个`goroutine`，每个`goroutine`负责25％的键（每个负责的键不冲突）。在这种情况下，`sync.Map`是首选。

## sync.Pool

sync.Pool指的是临时对象池，Golang和Java具有GC机制，因此很多开发者基本上都不会考虑内存回收问题，不像C++很多时候开发需要自己回收对象。
Gc是一把双刃剑，带来了编程的方便但同时也增加了运行时开销，使用不当可能会严重影响程序的性能，因此性能要求高的场景不能任意产生太多的垃圾。
sync.Pool正是用来解决这类问题的，Pool可以作为临时对象池来使用，不再自己单独创建对象，而是从临时对象池中获取出一个对象。

sync.Pool有2个函数Get和Put，Get负责从临时对象池中取出一个对象，Put用于结束的时候把对象放回临时对象池中。

```go
func (p *Pool) Get() interface{}
func (p *Pool) Put(x interface{})
```

看一个官方的例子：

```go
var bufPool = sync.Pool{
    New: func() interface{} {
        return new(bytes.Buffer)
    },
}

func timeNow() time.Time {
    return time.Unix(1136214245, 0)
}

func Log(w io.Writer, key, val string) {
    // 获取临时对象，没有的话会自动创建
    b := bufPool.Get().(*bytes.Buffer)
    b.Reset()
    b.WriteString(timeNow().UTC().Format(time.RFC3339))
    b.WriteByte(' ')
    b.WriteString(key)
    b.WriteByte('=')
    b.WriteString(val)
    w.Write(b.Bytes())
    // 将临时对象放回到 Pool 中
    bufPool.Put(b)
}

func main() {
    Log(os.Stdout, "path", "/search?q=flowers")
}
```

从上面的例子我们可以看到创建一个Pool对象并不能指定大小，所以`sync.Pool`的缓存对象数量是没有限制的(只受限于内存)，那sync.Pool是如何控制缓存临时对象数的呢？
`sync.Pool`在init的时候注册了一个`poolCleanup`函数，它会清除所有的pool里面的所有缓存的对象，该函数注册进去之后会在每次Gc之前都会调用，因此sync.Pool缓存的期限只是两次Gc之间这段时间。正因Gc的时候会清掉缓存对象，所以不用担心pool会无限增大的问题。

正因为如此sync.Pool适合用于缓存临时对象，而不适合用来做持久保存的对象池(连接池等)。

## sync.Cond

`sync.Cond`指的是同步条件变量，一般需要与互斥锁组合使用，本质上是一些正在等待某个条件的协程的同步机制。

```go
// NewCond returns a new Cond with Locker l.
func NewCond(l Locker) *Cond {
    return &Cond{L: l}
}

// A Locker represents an object that can be locked and unlocked.
type Locker interface {
    Lock()
    Unlock()
}
```

`sync.Cond`有3个函数`Wait`,`Signal`,`Broadcast`

```go
// Wait 等待通知
func (c *Cond) Wait()
// Signal 单播通知
func (c *Cond) Signal()
// Broadcast 广播通知
func (c *Cond) Broadcast()
```

举个例子，`sync.Cond`用于并发协程条件变量。

```go
var sharedRsc = make(map[string]interface{})
func main() {
    var wg sync.WaitGroup
    wg.Add(2)
    m := sync.Mutex{}
    c := sync.NewCond(&m)
    
    go func() {
        // this go routine wait for changes to the sharedRsc
        c.L.Lock()
        for len(sharedRsc) == 0 {
            c.Wait()
        }
        fmt.Println(sharedRsc["rsc1"])
        c.L.Unlock()
        wg.Done()
    }()

    go func() {
        // this go routine wait for changes to the sharedRsc
        c.L.Lock()
        for len(sharedRsc) == 0 {
            c.Wait()
        }
        fmt.Println(sharedRsc["rsc2"])
        c.L.Unlock()
        wg.Done()
    }()

    // this one writes changes to sharedRsc
    c.L.Lock()
    sharedRsc["rsc1"] = "foo"
    sharedRsc["rsc2"] = "bar"
    c.Broadcast()
    c.L.Unlock()
    wg.Wait()
}
```



