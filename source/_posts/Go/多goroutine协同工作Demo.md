---
title: 多goroutine协同工作Demo
categories:
  - 编程语言
  - Go
tags:
  - Go
date: 2021-11-19 11:49:53
---

在一个长无序slice里查找目标值。
思路：
将长slice分块，用多个goroutine去找，如果有一个找到就结束goroutine并返回相对下标值

```go
package main

import (
	"fmt"
	"time"
)

// 用于确定目标值位置的信息
type Index struct {
	Base int
	Now  int
}

func main() {
	index := make(chan Index)
	// 待查找slice
	slice := []int{1, 19, 32, 44, 12, 4, 6, 2, 7, 24, 932, 88, 66, 123}

	// 分割，这里不会发生内存拷贝
	limit, num, base := 4, len(slice)/4, 0
	for base < num {
		go findTarget(slice[base*limit:base*limit+limit], 932, base, index)
		base++
	}
	if len(slice)%limit != 0 {
		go findTarget(slice[base*limit:], 932, base, index)
	}

	// 超时检测
	select {
	case t := <-index:
		fmt.Printf("下标为: %d \n", t.Base*limit+t.Now)
	case <-time.After(3 * time.Second):
		fmt.Println("timeout")
	}
}

func findTarget(arr []int, target int, base int, index chan Index) {
	select {
	case t := <-index:
		index <- t
		return
	default:
		for i := range arr {
			fmt.Println(arr[i])
			if arr[i] == target {
				index <- Index{
					Base: base,
					Now:  i,
				}
				return
			}
			time.Sleep(time.Second)
		}
	}

	return
}
```
