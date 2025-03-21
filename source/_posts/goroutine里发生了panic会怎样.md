---
title: goroutine发生panic会怎样
categories:
  - 编程语言
  - Go
tags:
  - Go
date: 2021-11-18 19:11:39
---

发生panic后，从当前层依次向上执行defer函数，如果在这个过程中被recover捕获该panic，那么程序不会崩溃，否则，待所有defer执行完后，程序崩溃。

> 以下来自知乎:
> 如果某goroutine在某函数/方法F的调用时出现panic，一个被称为"panicking"的过程将被激活。该过程先会调用函数F的defer函数(如果有的话)，然后依次向上，调用函数F的调用者的defer函数，直至该goroutine的顶层函数，即启动该goroutine时(go T())的那个函数T。如果函数T有defer函数，那么defer会被调用。在整个paniking过程的defer调用链中，如果没有使用recover捕获该panic，那么panicking过程的最后一个环节将会发生：整个程序异常退出(无论发生panic的goroutine是否为main Goroutine)并输出panic相关信息。

验证代码:
对比recover代码注视和取消注视便可理解
```go
package main

import "fmt"

func main() {
	fmt.Println("main")
	defer func() {
		fmt.Println("main_end")
	}()

	hello()
}

func hello() {
	fmt.Println("hello_1")
	defer func() {
		// 如果没有捕获错误的地方程序会崩溃
		//if err := recover(); err != nil {
		//	fmt.Println("hello_1, rerecrecover")
		//}
		fmt.Println("world_1")
	}()

	hello2()
}

func hello2() {
	fmt.Println("hello_2")
	defer func() {
		fmt.Println("world_2")
	}()

	a, b := 666, 0
	c := a / b
	fmt.Println(c)
}
  ```
