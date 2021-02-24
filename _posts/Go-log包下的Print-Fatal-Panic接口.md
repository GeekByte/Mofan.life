---
title: 'Go-log包下的Print-Fatal-Panic接口'
categories:
  - Go
tags:
  - Go
date: 2021-02-24 10:11:19
---

Golang 的 `log` 模块主要提供了三类接口，分别是 `Print`，`Panic`，`Fatal`，并对每一类接口提供了三种调用方式，分别是 "Xxxx"，"Xxxxln"，"Xxxxf"，基本和 fmt 中的相关函数类似。

### log.Print

```go
package main

import "log"

func main() {
	arr := []int{0, 1}
	log.Print("Print arrary:", arr, "\n") //默认输出后不换行，要换行加转义字符"\n"
	log.Println("Println arrary:", arr)  //输出后自动换行
	log.Printf("Print arrary with item [%d,%d]", arr[0], arr[1]) //可以指定输出格式
}
```

运行结果：

```text
2021/02/24 10:23:15 Print arrary:[0 1]
2021/02/24 10:23:15 Println arrary: [0 1]
2021/02/24 10:23:15 Print arrary with item [0,1]
```

### log.Fatal

该接口会将日志内容打印至标准输出，然后调用系统的 `os.Exit(1)` 接口，退出程序并返回状态 1 。

有一点需要注意，**由于是直接调用系统接口退出，所以 defer 函数不会被调用。**

```go
package main

import (
	"fmt"
	"log"
)

func test_deferpanic() {
	defer func() {
		fmt.Println("-----first-----")
	}()
	log.Fatalln("Test for defer Fatal")
}

func main() {
	test_deferpanic()
}
```

运行结果：

```text
2021/02/24 10:33:58 Test for defer Fatal
```

从运行结果可以看到，`defer`函数并没有被调用。

### log.Panic

该接口会将日志刷到标准错误后调用`panic` 函数。

**不同于 `Fatal`，在 `Panic`之前的 `defer`函数会执行，之后的则不执行。**

```go
package main

import (
	"fmt"
	"log"
)

func test_deferpanic() {
	defer func() {
		fmt.Println("-----first-----")
	}()
	log.Panicln("Test for defer Fatal")
	defer func() {
		fmt.Println("-----Second-----")
	}()
}

func main() {
	test_deferpanic()
}
```

运行结果：

```text
2021/02/24 10:50:26 Test for defer Fatal
-----first-----
panic: Test for defer Fatal
```

可以看到在触发 `Panic` 后，第一个 `defer`函数执行，第二个没有执行。说明在在Panic之后声明的defer是不会执行的。

### 自定义Logger类型

除了上面 `log` 模块下的三类接口，你也可以自定义 `Logger` 对象。 `log.Logger` 提供了 `New` 方法来创建自定义对象。

```go
func New(out io.Writer, prefix string, flag int) *Logger
```

该函数一共有 3 个参数：

* out 用于指定输出位置，是一个 `io.Writer` 对象，该对象可以是一个文件也可以是实现了该接口的对象。通常我们可以用这个来指定日志输出到哪个文件。

* prefix 就是日志内容前面的东西，我们可以将其置为 "[Info]" 、 "[Warning]"等来帮助区分日志级别。

* flag 是一个选项，用于显示日志开头的东西，可选的值有：

	```text
	Ldate         = 1 << iota     // 形如 2009/01/23 的日期
	Ltime                         // 形如 01:23:23 的时间
	Lmicroseconds                 // 形如 01:23:23.123123 的时间
	Llongfile                     // 绝对路径文件名和行号 /a/b/c/d.go:23
	Lshortfile                    // 文件名和行号 d.go:23. 重写 Llongfile
	LUTC                          // 如果 Ldate 或者 Ltime 已经设置, 使用 UTC 时区
	Lmsgprefix                    // 把 "prefix" 从每一行的开头移动到每段信息的开头
	LstdFlags     = Ldate | Ltime // 标准日志输出的初始日期和时间
	```

示例代码：

```go
package main

import (
	"log"
	"os"
)

func main() {
	fileName := "info_first.log"
	logFile, err := os.Create(fileName)
	if err != nil {
		log.Fatalln("Open file error")
	}
	defer logFile.Close()
	debugLog := log.New(logFile, "[Info]", log.Lmsgprefix)
	debugLog.Println("A info message here")
	debugLog.SetPrefix("[Debug]")
	debugLog.Println("A debug message here")
}
```

会创建 `info_first.log` 文件，并将 log 信息写入，文件内容如下：

```text
[Info]A info message here
[Debug]A debug message here
```

