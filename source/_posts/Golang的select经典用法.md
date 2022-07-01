---
title: Golang的select经典用法
categories:
  - 编程语言
  - Go
tags:
  - Go
date: 2021-03-27 17:13:37
---

`Go` 的 `select` 的功能和 `select`,`poll`,` epoll` 相似， 就是监听 `I/O` 操作，当 `I/O` 操作发生时，触发相应的动作。

示例：

```go
ch1 := make(chan int, 1)
	ch2 := make(chan int, 1)

	select {
	case <-ch1:
		fmt.Println("ch1 pop one element")
	case <-ch2:
		fmt.Println("ch2 pop one element")
	}
```

通过上面的示例发现，`select`的代码结构和`switch`很相似，但是，`select` 的 `case` 只匹配 `I/O` 操作，上面的示例，`select` 会一直等待，直到从`ch1` 或者 `ch2` 中读到数据，`select` 就结束了。

通过`select` 这个机制，可以实现一些有趣的功能。

**超时检测**

```go
	//检测ch是否timeout
	timeout := make(chan bool, 1)
	go func() {
		time.Sleep(2 * time.Second)
		timeout <- true
	}()

	//ch可能在等待某个信号
	ch := make(chan int, 1)
	go func() {
		time.Sleep(3 * time.Second)
		ch <- 1
	}()

	select {
	case <-ch:
		fmt.Println(<-ch)
	case <-timeout:
		fmt.Println("读取ch超时")
	}
```

**避免缓存满了造成服务阻塞**

配合 `default` 语句，可以判断带缓存的 `channel` 是否满了

```go
ch := make(chan int, 1)
	ch <- 1

	select {
	case ch <- 1:
		fmt.Println(<-ch)
	default:
		fmt.Println("channel已满")
	}
```

上面代码 `ch` 只有存储一个 `int` 型数据的空间，在`ch <- 1` 时就满了，当 `ch` 要插入 2 的时候，发现 `ch` 已经满了（case ch <- 1 阻塞住），则 `select` 执行 `default` 语句。 这样就可以实现对 `channel` 是否已满的检测， 而不是一直等待。
