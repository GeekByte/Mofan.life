---
title: Go 哈希表
categories:
  - Lang
  - Go
tags:
  - Go
date: 2021-03-12 23:08:45
---

## 设计原理

哈希表是计算机科学中的最重要数据结构之一，这不仅因为它 𝑂(1) 的读写性能非常优秀，还因为它提供了键值之间的映射。

想要实现一个性能优异的哈希表，需要注意两个关键点 —— 哈希函数和冲突解决方法。



## 总结

Go 语言使用拉链法来解决哈希碰撞的问题实现了哈希表，它的访问、写入和删除等操作都在编译期间转换成了运行时的函数或者方法。哈希在每一个桶中存储键对应哈希的前 8 位，当对哈希进行操作时，这些 `tophash` 就成为可以帮助哈希快速遍历桶中元素的缓存。

哈希表的每个桶都只能存储 8 个键值对，一旦当前哈希的某个桶超出 8 个，新的键值对就会存储到哈希的溢出桶中。随着键值对数量的增加，溢出桶的数量和哈希的装载因子也会逐渐升高，超过一定范围就会触发扩容，扩容会将桶的数量翻倍，元素再分配的过程也是在调用写操作时增量进行的，不会造成性能的瞬时巨大抖动。





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

