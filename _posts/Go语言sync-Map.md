---
title: Go语言sync.Map
categories:
  - 编程语言
  - Go
tags:
  - Go
date: 2021-03-25 20:07:40
---

Go语言中的`map`在并发情况下，只读是线程安全的，同时读写是线程不安全的。

下面来看下并发情况下读写`map`会出现的问题。代码如下：

```go
package main

func main() {
    
    m := make(map[int]int)
    
    // 开启一个goroutine持续对 map 赋值
    go func() {
        for {
            m[0] = 1
        }
    }()
    
    // 开启一个goroutine持续读 map 的值
    go func() {
        _ = m[0]
    }()
    
    // 让程序在后台执行
    for {
        
    }
}
```

运行上面的代码会报错，输出如下：

```text
fatal error: concurrent map read and map write
```

错误信息显示，并发的 `map` 读和 `map` 写，也就是说使用了两个并发函数不断地对 `map` 进行读和写而发生了竞态问题，`map` 内部会对这种并发操作进行检查并提前发现。

需要并发读写时，一般的做法是加锁，但这样性能并不高，Go语言在 `1.9` 版本中提供了一种效率较高且并发安全的 `sync.Map`，`sync.Map` 和 `map` 不同，它不是以语言原生形态提供，而是 `sync` 包下的特殊结构。

`sync.Map` 有以下特性：

- 无须初始化，直接声明即可用
- `sync.Map` 不能使用 `map` 的方式进行取值和赋值等操作，而是使用 `sync.Map` 的方法进行调用，`Store` 表示存储，`Load` 表示获取，`Delete` 表示删除。
- 使用 `Range` 配合一个回调函数进行遍历操作，通过回调函数返回内部遍历出来的值，`Range` 参数中回调函数的返回值在需要继续迭代遍历时，返回 `true`，终止迭代遍历时，返回 `false`。

下面是一段并发安全的 `sync.Map` 的代码演示：

```go
package main

import (
      "fmt"
      "sync"
)

func main() {

    var sm sync.Map

    // 将键值对保存到 sync.Map
    sm.Store("greece", 97)
    sm.Store("london", 100)
    sm.Store("egypt", 200)

    // 从 sync.Map 中根据键取值
    fmt.Println(sm.Load("london"))

    // 根据键删除对应的键值对
    sm.Delete("london")

    // 遍历所有 sync.Map 中的键值对
    sm.Range(func(k, v interface{}) bool {

        fmt.Println("iterate:", k, v)
        return true
    })
}
```

代码输出：

```text
100 true
iterate: greece 97
iterate: egypt 200
```

若将上面代码的`return true` 改为 `return false` ，则输出为：

```text
100 true
iterate: greece 97
// 也就是最后的 sm.Range 不会输出.
```

`sync.Map` 没有提供获取 `map` 数量的方法，替代方法是在获取 `sync.Map` 时遍历自行计算数量，`sync.Map` 为了保证并发安全有一些性能损失，因此在非并发情况下，使用 `map` 相比使用 `sync.Map` 会有更好的性能。

下面代码与本文开始的代码相比，它可以持续运行，不会因为并发读写同一资源而终止。

```go
package main

import (
	"sync"
)

func main() {
    
    var sm sync.Map
    
    sm.Store("a", 1)
    
    go func() {
        for {
            _, _ = sm.Load("a")
        }
    }()
    go func() {
        for {
            _, _ = sm.Load("a")
        }
    }()
    
    for {
        
    }
}
```

上面的程序会持续运行，不会因为资源竞态问题而终止。