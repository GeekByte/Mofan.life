---
title: 题1:Go代码里被defer的函数一定会执行吗?
categories:
  - 编程语言
  - Go
tags:
  - Go
date: 2020-03-13 08:30:46
---

### 前言

大家都知道Go编程中，假设在函数F里，执行了defer A()，那在函数F正常return之前或者因为panic要结束运行之前，被defer关键字修饰的函数调用A()都会被执行到。

**test1() 会在 main 结束之前运行**

```go
package main

import (
	"fmt"
)

func test1() {
	fmt.Println("test")
}

func main() {
	fmt.Println("main start")
	defer test1()
	fmt.Println("main end")
}
```

运行结果:

```txt
main start
main end
test
```

**test1() 会在 panic 之前执行**

```go
package main

import (
	"fmt"
)

func test1() {
	fmt.Println("test")
}

func test2() {
	panic(1)
}

func main() {
	fmt.Println("main start")
	defer test1()
	test2()
	fmt.Println("main end")
}
```
运行结果:
```txt
main start
test
panic: 1

goroutine 1 [running]:
main.test2(...)
        /path/defer2.go:12
main.main()
        /path/defer2.go:18 +0xa8
exit status 2
```

### 问题

如果在函数F里，defer A() 这个语句执行了，是否意味着 A() 这个函数调用一定会执行？答案是不一定，如果在函数里调用了 os.Exit，程序会立刻停止，被 defer 的函数调用不会执行。

> 关于os.Exit 的说明：
> Exit causes the current program to exit with the given status code. Conventionally, code zero indicates success, non-zero an error. The program terminates immediately; deferred functions are not run. For portability, the status code should be in the range[0,125].

示例:
```go
package main

import (
	"fmt"
	"os"
)

func test1() {
	fmt.Println("test")
}

func main() {
	fmt.Println("main start")
	defer test1()
	fmt.Println("main end")
	os.Exit(0)
}
```
运行结果：
```txt
main start
main end
```

### defer 四原则回顾

#### defer 后面跟的必须是函数或者方法调用，defer 后面的表达式不能加括号。

```go
defer (fmt.Println(1)) // 编译报错，因为defer后面跟的表达式不能加括号
```

#### 被defer的函数的参数在执行到 defer 语句的时候就被确定下来了。

```go 
func a() {
   i := 0
   defer fmt.Println(i) // 最终打印0
   i++
   return
}
```

上例中，被defer的函数 fmt.Println 的参数i在执行到 defer 这一行的时候，i 的值是 0，fmt.Println 的参数就被确定下来是 0 了，因此最终打印的结果是 0，而不是 1。

#### 被 defer 的函数执行顺序满足LIFO原则，后defer的先执行。

```go 
func b() {
   for i := 0; i < 4; i++ {
   defer fmt.Print(i)
      }
}
```
上例中，输出的结果是 3210，后 defer 的先执行。

#### 被 defer 的函数可以对 defer 语句所在的函数的命名返回值做读取和修改操作。

```go
func f() (result int) {
   defer func() {
   // result is accessed after it was set to 6 by the return statement
   result *= 7
   }()
   return 6
}
```

上例中，被 defer 的匿名函数对 defer 语句所在的 函数f 的命名返回值 result 做了修改操作。调用函数 f，返回的结果是42。执行顺序是函数f先把要返回的值 6 赋值给 result，然后执行被 defer 的函数 func，result 被修改为 42，然后 函数f 返回 result，也就是返回了 42。官方说明如下：

> Each time a "defer" statement executes, the function value and parameters to the call are evaluated as usual and saved anew but the actual function is not  invoked. Instead, deferred functions are invoked immediately before the  surrounding function returns, in the reverse order they were deferred. That is, if the surrounding function returns through an explicit return statement,  deferred functions are executed after any result parameters are set by that  return statement but before the function returns to its caller. If a deferred function value evaluates to nil, execution panics when the function is  invoked, not when the "defer" statement is executed.
