---
title: Go二维切片初始化
categories:
  - Lang
  - Go
tags:
  - Go
date: 2021-03-11 22:58:55
---

```go
package main

import "fmt"

func main() {
	// 方法0
	row, column := 3, 4
	var answer [][]int
	for i := 0; i < row; i++ {
		inline := make([]int, column)
		answer = append(answer, inline)
	}
	fmt.Println(answer)

	// 方法1
	answer1 := make([][]int, row)
	for i := range answer1 {
		answer1[i] = make([]int, column)
	}
	fmt.Println(answer1)
}
// [[0 0 0 0] [0 0 0 0] [0 0 0 0]]
// [[0 0 0 0] [0 0 0 0] [0 0 0 0]]
```

Golang创建二维切片相比C++,JAVA等语言来说，要稍微麻烦一点，特此记录一下。
