---
title: Go为何没有goroutineid
categories:
  - Go
tags:
  - Go
date: 2021-03-18 21:30:20
---

> 文章来自：[go没有go协程号（goroutineid） - Go语言中文网 - Golang中文社区](https://studygolang.com/topics/11363?fr=sidebar)

今天想给日志添加一个前缀，以区分不同goroutine的日志，方便以后做日志跟踪。最直接的想法是在日志函数里面增加打印goroutineid，跟以前用c语言在日志打印线程id/进程id一样。

但是网上查了一下，go开发中不建议使用goroutineid，也没有提供获取协程id的函数（旧版本有，但现在已删除）

原因是担心人们使用goroutineid构建协程私有存储，这样很容易导致协程资源一直被占用，无法正常被gc回收。

（协程结束了，但是协程引用的变量还存放在用户自己构造的协程级私有存储，这时gc无法回收协程）

如果想在日志里面输出traceid，官方建议使用context包。但是这样做要求每个函数都增加context参数，在程序运行过程中层层传递，才可以实现。这样即不现实，也不优雅。

为了解决goroutineid，网上各出奇招，有的使用runtime包未公开的方法获取：

```go
func Goid() int {
    defer func()  {
        if err := recover(); err != nil {
            fmt.Println("panic recover:panic info:%v", err)        }
    }()

    var buf [64]byte
    n := runtime.Stack(buf[:], false)
    idField := strings.Fields(strings.TrimPrefix(string(buf[:n]), "goroutine "))[0]
    id, err := strconv.Atoi(idField)
    if err != nil {
        panic(fmt.Sprintf("cannot get goroutine id: %v", err))
    }
    return id
}
```

这个方法我觉得靠谱，显然runtime包是肯定有获取协程id的方法的，因为处理panic时默认会输出问题协程号。但是这样做效率会不会有问题，暂时还不清楚。

另外有人使用汇编，cgo的方法获取协程号的，例如github的包：github.com/petermattis/goid

这种效率应该高一些，网上有人测试说差了1000倍，不过这种方法兼容性不好，几乎每个版本都要使用不同的方法。