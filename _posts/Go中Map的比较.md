---
title: Go中Map的比较
categories:
  - Go
tags:
  - Go
date: 2021-03-12 23:08:45
---

## 两个Map相等的条件

* 两个map都为nil或者都不为nil，并且长度要相等
* 相同的map对象或者所有key要对应相同
* map对应的value也要深度相等

注意第10行代码：

```go
func isAnagram(s string, t string) bool {
    sDir := map[string]int{}
    tDir := map[string]int{}
    for _,ss:= range s {
        sDir[string(ss)]++
    }
    for _,tt:= range t {
        tDir[string(tt)]++
    }
    //报错：invalid operation: sDir == tDir(map can only be compared to nil)
    return sDir == tDir
}
```

Golang中要比较两个map实例需要使用`reflect`包的`DeepEqual()`方法。

```go
func isAnagram(s string, t string) bool {
    sDir := map[string]int{}
    tDir := map[string]int{}
    for _,ss:= range s {
        sDir[string(ss)]++
    }
    for _,tt:= range t {
        tDir[string(tt)]++
    }
    return reflect.DeepEqual(sDir,tDir)
}
```

