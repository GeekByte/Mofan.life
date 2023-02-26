---
title: 'Go为何没有max/min(int,int)函数'
categories:
  - Lang
  - Go
tags:
  - Go
date: 2021-08-01 17:12:27
---

官方解释：[Don't abuse math.Max / math.Min | mrekucci's blog](https://mrekucci.blogspot.com/2015/07/dont-abuse-mathmax-mathmin.html)

Go提供了 float64 类型的计算最大/最小值的函数，但没有提供 int 系列类型的函数，通过官方解释总结起来就是：

1. 由于float64类型要处理 infinity 和 not-a-number 这种值，而他们的处理非常复杂，一般用户没有能力，所有go需要为用户提供系统级别的解决办法。
2. 对于int/int64类型的数据，min/max的实现非常简单直接，用户完全可以自己实现，例如：

```go
func Min(x, y int64) int64 {
    if x < y {
        return x
    }
    return y
}
```

结论就是，这种 int 类的实现太简单，就交给用户实现了。

