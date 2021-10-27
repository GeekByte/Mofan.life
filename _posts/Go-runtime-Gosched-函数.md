---
title: Go runtime.Gosched()函数
categories:
  - 编程语言
  - Go
tags:
  - Go
date: 2021-08-10 23:17:07
---

代码定义：

```go
// Gosched yields the processor, allowing other goroutines to run. It does not
// suspend the current goroutine, so execution resumes automatically.
func Gosched() {
	checkTimeouts()
	mcall(gosched_m)
}
```

翻译：这个函数的作用是让当前goroutine让出CPU，好让其它的goroutine获得执行的机会。但当前goroutine不会终止，将来会自动恢复。

例子：

```go
package main

import (
    "fmt"
)

func showNumber (i int) {
    fmt.Println(i)
}

func main() {

    for i := 0; i < 10; i++ {
        go showNumber(i)
    }

    fmt.Println("Mofan")
}
```

运行结果：

```tex
Mofan
```

没有打印出数字，因为goroutine没有获得机会运行。

修改代码：在main函数中加上runtime.Gosched()：

```go
package main

import (
    "fmt"
    "runtime"
)

func showNumber (i int) {
    fmt.Println(i)
}

func main() {

    for i := 0; i < 10; i++ {
        go showNumber(i)
    }

    runtime.Gosched()
    fmt.Println("Mofan")
}
```

运行结果：

```tex
0
1
2
3
4
5
6
7
8
9
Mofan
```

