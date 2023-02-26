---
title: 'Go:避免在循环中直接使用defer'
categories:
  - Lang
  - Go
tags:
  - Go
date: 2021-04-13 23:04:22
---

看下面的例子：

```go
for {
    time.Sleep(time.Second)
    // ......
    conn, err := grpc.Dial(address, grpc.WithInsecure())
    if err != nil {
        log.Fatalf("did not connect: %v", err)
    }
    defer conn.Close()
        //...
}
```

由于这是一个死循环，defer代码不会被执行到，所以申请的内存得不到释放，然后会导致程序占满整个内存，死机。 注意这里需要强调的是**直接使用**，如果是封装到匿名函数中，结果就不一样了

```go
for {
    time.Sleep(time.Second)
    // ......
    go func (){
        conn, err := grpc.Dial(address, grpc.WithInsecure())
        if err != nil {
            log.Fatalf("did not connect: %v", err)
        }
        defer conn.Close()
    }
        //...
}
```

这里的defer会在匿名函数结束的时候得到执行，所以这样写就不会出现之前的资源没有释放的情况。

