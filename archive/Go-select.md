

https://mp.weixin.qq.com/s/nJRVbhRQCgWHR1eHSfBpFA

[Go 语言 select 的实现原理 | Go 语言设计与实现](https://draveness.me/golang/docs/part2-foundation/ch05-keyword/golang-select/)

## 前言

对于Go语言并发通讯，是使用的协程goroutine，而协程之间的通讯采用的是channel。但是channel不管是有缓存的，还是无缓存的都会有阻塞的情况出现，只不过无缓存的阻塞会更加频繁。而协程长时间阻塞了之后，Go语言本身又没有提供这种超时的解决机制，所以开发者需要自己考虑实现这种超时机制。这种超时机制在Go语言中则是使用select来解决的。

## select 介绍

#### **语法定义：**
select是Go语言中的一个控制语句，它有select，case, default共同构成，与switch的书写方式类似。
select只用来操作的channel的读写操作。
( **备注**：golang 的 select 本质上，就是监听 IO 操作，当 IO 操作发生时，触发相应的动作。也是常用的多路复用的一种，例如poll, epoll( **这个会在另外一个帖子中介绍**), select )

#### 特性

1. 如果只有一个 case 语句评估通过，那么就执行这个case里的语句
2. 如果有多个 case 语句评估通过，那么通过 **伪随机**的方式随机选一个
3. 如果 default 外的 case 语句都没有通过评估，那么执行 default 里的语句
4. 如果没有 default，那么 代码块会被阻塞，直到有一个 case 通过评估；否则一直阻塞



### 常规用法

Go 中的 select 语法和 switch 类似，但 select 主要用于处理异步I/O相关的一些问题。

看下面一段代码：

```go
timeout := make (chan bool, 1)
ch := make(chan int)
select {
    case <-ch:
    case <-timeout:
   　　fmt.Println("timeout!")
 　　default:
        fmt.Println("default case is running")
}
```

可以看出，ch初始化后，case1读取失败，timeout同样失败，因为channel中无数据，直接跳至default执行并返回。

注意，如果没有default，select 会一直等待等到某个 case 语句完成， 也就是等到成功从 ch 或者 timeout 中读到数据，否则一直阻塞。

基于这种机制，于是就有了两种常用的用法：

* 实现对 channel 的读取超时机制

	```go
	package main
	
	import (
	    "fmt"
	    "time"
	)
	
	func main() {
	    timeout := make(chan bool, 1)
	    go func() {
	        time.Sleep(3e9) // sleep 3 seconds
	        timeout <- true
	    }()
	    ch := make(chan int)
	    select {
	        case <-ch:
	        case <-timeout:
	            fmt.Println("timeout!")
	    }
	}
	```

	注意这里一定不能用default，否则3s超时还未到直接执行default，case2便不会执行，超时机制便不会实现。timeout会在3s超时后读取到数据。

* 判断有缓存的 channel 是否存满

	```go
	ch1 := make(chan int, 1)
	ch2 := make(chan int, 1)
	select {
	    case <-ch1:
	        fmt.Println("ch1 pop one element")
	    case <-ch2:
	        fmt.Println("ch2 pop one element")
	    default:
	        fmt.Println("default")
	}
	```

	如果case1、case2均未执行，则说明ch1&ch2已满，over.....







### 利用 select 实现超时检测机制

当我们希望使用阻塞的方式实现某个功能，但是又不希望程序过长时间处于阻塞状态，于是需要加入超时机制。

```go
package main

import (
    "fmt"
    "time"
)

func main() {
    ch := make(chan int)
    quit := make(chan bool)

    //新开一个协程
    go func() {
        for {
            select {
            case num := <-ch:  //如果有数据，下面打印。但是有可能ch一直没数据
                fmt.Println("num = ", num)
            case <-time.After(3 * time.Second): //上面的ch如果一直没数据会阻塞，那么select也会检测其他case条件，检测到后3秒超时
                fmt.Println("超时")
                quit <- true  //写入
            }
        }

    }() //别忘了()

    for i := 0; i < 5; i++ {
        ch <- i
        time.Sleep(time.Second)
    }

    <-quit //这里暂时阻塞，直到可读
    fmt.Println("程序结束")

}
```

运行结果：

```tex
//这里注意观察打印过程
num =  0
num =  1
num =  2
num =  3
num =  4
超时
程序结束
```

补充：防止读超时与写超时

```go
//防止读取超时
select { 
    case <- time.After(time.Second*2): 
        println("read channel timeout") 
    case i := <- ch: 
        println(i) 
} 

//防止写入超时
select { 
    case <- time.After(time.Second *2): 
        println("write channel timeout") 
    case ch <- "hello": 
        println("write ok") 
}
```



