---
title: Go中如何使用环境变量
categories:
  - 编程语言
  - Go
tags:
  - Go
date: 2021-10-31 08:53:01
---

> 环境变量（environment variables）一般是指在操作系统中用来指定操作系统运行环境的一些参数，如：临时文件夹位置和系统文件夹位置等。

在 Go 语言中，和环境变量相关的 API 主要在 os 包中。

```go
// Environ 以 key=value 的形式返回所有环境变量。
func Environ() []string
// ExpandEnv 根据当前环境变量的值替换字符串中的 ${var} 或 $var。
// 对未定义变量的引用将被空字符串替换。
func ExpandEnv(s string) string
// Getenv 检索 key 这个键对应的环境变量的值。
// 如果该环境变量不存在，返回空字符串。
// 要区分空值和未设置值，请使用 LookupEnv。
func Getenv(key string) string
// LookupEnv 检索 key 这个键对应的环境变量的值。
// 如果该环境变量不存在，则返回对应的值(可能为空)，并且布尔值为 true。
// 否则，返回值将为空，布尔值将为 false。
func LookupEnv(key string) (string, bool)
// Setenv 设置 key 这个键对应的环境变量的值。
// 如果出错会返回错误。
func Setenv(key, value string) error
// Unsetenv 取消设置单个环境变量。
func Unsetenv(key string) error
// Clearenv 将删除所有环境变量。
func Clearenv()
```

此外，os/exec 中有一个 LookPath 函数，和 PATH 环境变量有关：

```go
// 在 PATH 环境变量对应的目录中搜索名为 file 的可执行文件。
// 如果文件包含 /，则不会搜索 PATH，而是正常路径查找。
// 返回的结果可能是绝对路径或相对于当前目录的相对路径。
func LookPath(file string) (string, error)
```



现在，通过一个例子来看看这些API如何使用:

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	name := os.Getenv("NAME")
	fmt.Println(name)
}

```

运行上面代码:

```shell
$ NAME="mofan" go run main.go
```

如果没有指定 `NAME` 则会输出一个空字符串，如果希望有默认值，可以借助 `LookupEnv` 实现:

```go
package main

import (
	"os"
	"fmt"
)

func main() {
	//name := os.Getenv("NAME")
	name := GetenvDefault("NAME", "Mofankk")
	fmt.Println(name)
}

func GetenvDefault(key, defVal string) string {
	val, ok := os.LookupEnv(key)
	if ok {
		return val
	}
	return defVal
}
```



由于进程会从父进程继承环境变量。这里最重要的就是 PATH 环境变量。有时候，我们通过 os/exec 包执行外部程序时，可能会提示找不到命令，这时需要确认 PATH 是否正确。可能 Shell 下 PATH 包含了命令所在目录，但进程可能没包含，我们可以在程序中输出所有环境变量：

```go
envs := os.Environ()
for _, env := range envs {
  fmt.Println(env)
}
```

一行是一个完整的环境变量，比如 `LANG=zh_CN.UTF-8`。

再看下 ExpandEnv() 函数。有以下代码：

```go
host := os.ExpandEnv("127.0.0.1:$PORT")
fmt.Println(host)
```

`IP:PORT` 的形式是常见的，通常，我们会做字符串拼接：`host + ":" + port`，有了 os.ExpandEnv，不需要进行拼接了，它会将 `$PORT` 替换为 `os.Getenv("PORT")` 的值。
