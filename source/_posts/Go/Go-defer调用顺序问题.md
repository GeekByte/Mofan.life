---
title: Go defer调用顺序问题
categories:
  - null
tags:
  - null
date: 2022-02-21 10:26:56
---

关于Go中defer
1. defer 方法的参数在定义的时候就确定了。
 2. defer中的参数如果是调用函数得来的值，则在程序结束执行defer的时候从第一个defer开始计算，从上到下先把函数参数结果算出来，然后再按defer定义顺序逆序执行defer函数（也可以理解为最靠近关键字defer的那层函数), 其实读到这里，你也许更加明白了第 1 条。

```go
package main

import (
	"fmt"
	"time"
)

func calc(index string, a, b int, flag int) int {
	// 这个flag用来标记的，方便追踪调用顺序
	fmt.Println(time.Now().String(), "   ", flag)
	ret := a + b
	fmt.Println(index, a, b, ret)
	return ret
}

func main() {
	s1, s2 := "1", "10"
	a, b := 1, 1
	defer calc(s1, a, calc(s2, a, calc(s2, a, calc(s2, a, b, 1), 2), 3), 12)
	a = 0
	s1, s2 = "2", "20"
	defer calc(s1, a, calc(s2, a, calc(s2, a, calc(s2, a, b, 4), 5), 6), 11)
	b = 1
	s1, s2 = "3", "30"
	defer calc(s1, a, calc(s2, a, calc(s2, a, calc(s2, a, b, 7), 8), 9), 10)
}

/*
1. defer 方法的参数在定义的时候就确定了
2. defer中的参数如果是调用函数得来的值，则在程序结束执行defer的时候从第一个defer开始计算，从上到下先把函数参数结果算出来，然后再按defer定义顺序逆序执行defer函数（也可以理解为最靠近关键字defer的那层函数), 其实读到这里，你也许更加明白了第 1 条。


/*
执行结果:
2022-02-21 10:11:13.83618 +0800 CST m=+0.000127293     1
10 1 1 2
2022-02-21 10:11:13.836474 +0800 CST m=+0.000421376     2
10 1 2 3
2022-02-21 10:11:13.836481 +0800 CST m=+0.000428793     3
10 1 3 4
2022-02-21 10:11:13.836487 +0800 CST m=+0.000434543     4
20 0 1 1
2022-02-21 10:11:13.836493 +0800 CST m=+0.000440251     5
20 0 1 1
2022-02-21 10:11:13.836498 +0800 CST m=+0.000445584     6
20 0 1 1
2022-02-21 10:11:13.836503 +0800 CST m=+0.000450918     7
30 0 1 1
2022-02-21 10:11:13.836509 +0800 CST m=+0.000456168     8
30 0 1 1
2022-02-21 10:11:13.836514 +0800 CST m=+0.000461584     9
30 0 1 1
2022-02-21 10:11:13.836519 +0800 CST m=+0.000466793     10
3 0 1 1
2022-02-21 10:11:13.836525 +0800 CST m=+0.000472209     11
2 0 1 1
2022-02-21 10:11:13.83653 +0800 CST m=+0.000477543     12
1 1 4 5
*/

/*
// 不太理解这个调用顺序，于是引出了上面的
func calc(index string, a, b int) int {
	ret := a + b
	fmt.Println(index, a, b, ret)
	return ret
}
func main() {
	a := 1
	b := 2
	defer calc("1", a, calc("10", a, b))
	a = 0
	defer calc("2", a, calc("20", a, b))
	b = 1
}
*/

/*
执行结果:
10 1 1 2
20 0 1 1
2 0 1 1
1 1 2 3
*/

```
