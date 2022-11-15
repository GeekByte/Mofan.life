---
title: Go删除Map对内存的影响
categories:
  - 编程语言
  - Go
tags:
  - Go
date: 2022-11-14 19:02:03
---

Go Map 是采用哈希链表实现，当哈希值冲突时，会把冲突的内容放到链表里面。

Go 提供了 delete() 方法删除 key，这种方式的删除不会释放内存，仅仅将 key 的关联值标记为 EmptyOne, [Go1.19](https://github.com/golang/go/blob/master/src/runtime/map.go#L731L803)。
如何真正的释放 Map 的内存，将 Map 设置为 nil，然后等待 GC 就行了。

下面代码展示了不同方式删除 Map 时内存的变化：

```go
package main

import (
	"log"
	"runtime"
)

const cnt = 8192

var m = make(map[int]int)

func main() {
	memStatus()

	initMap()
	runtime.GC()
	memStatus()

	delMap()
	runtime.GC()
	memStatus()

	m = nil
	runtime.GC()
	memStatus()
}

func initMap() {
	for i := 0; i < cnt; i++ {
		m[i] = i
	}
}

func delMap() {
	for i := 0; i < cnt; i++ {
		delete(m, i)
	}
}

func memStatus() {
	var m runtime.MemStats
	runtime.ReadMemStats(&m)
	// Alloc is bytes of allocated heap objects.

	// TotalAlloc is cumulative bytes allocated for heap objects.
	// Sys is the total bytes of memory obtained from the OS.
	// NumGC is the number of completed GC cycles.
	log.Printf("Alloc: %v, TotalAlloc: %v, Sys: %v, NumGC: %v", m.Alloc/1024, m.TotalAlloc/1024, m.Sys/1024, m.NumGC)
}
```
输出：
```txt
2022/11/14 17:14:06 Alloc: 106, TotalAlloc: 106, Sys: 8371, NumGC: 0
2022/11/14 17:14:06 Alloc: 423, TotalAlloc: 763, Sys: 8947, NumGC: 1
2022/11/14 17:14:06 Alloc: 423, TotalAlloc: 765, Sys: 9267, NumGC: 2
2022/11/14 17:14:06 Alloc: 111, TotalAlloc: 766, Sys: 9267, NumGC: 3
```

## 为什么这样设计

为了保证删除元素后遍历不发生异常。

```go
query := map[string]string{}

query["test0"] = "0"
query["test1"] = "1"
query["test2"] = "2"

i := 0
for k, v := range query {
	delete(query, "test2")
	fmt.Println(query, k, v)
	i++
}
```

## 是不是内存泄漏

在内存使用上确实出现了长时间占用内存的情况，但这部分内存，在下次出现同样哈希值的时候，会覆盖 empty 值。
