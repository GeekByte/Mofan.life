---
title: Go Build
categories:
  - Lang
  - Go
tags:
  - Go
date: 2023-11-17 12:55:29
---



## 条件编译

### 编译规则

可以将 // +build 后面的内容当成一个表达式。当表达式返回true时，当前文件参与编译，反之不参与编译。

1. 多个片段之间的空格表示它们之间是OR的关系。如下，表示GOOS值是linux或者darwin时，本文件参与编译。

```go
// +build linux darwin
```

2. 多个片段之间的,表示它们之间是AND的关系。如下，表示GOOS值是linux且是amd64架构时，本文件参与编译。

```go
// +build linux,amd64
```

3. 以!xxx开头的片段表示当tag xxx设置时，当前文件不参与编译。如下，表示GOOS值是linux时，本文件不参与编译。

```go
// +build !linux
```

4. 单文件包含多个条件编译指令时，它们是AND的关系。如下，表示GOOS值是linux且是amd64架构时，本文件参与编译。

```go
// +build linux
// +build amd64
```

5. 一些内建的关键字。
   1. `GOOS`的值，目标操作系统，如linux,darwin。
   2. `GOARCH`的值，目标架构，如amd64。
   3. 编译器，`gc` 或者 `gccgo`。
   4. `cgo` 如果cgo支持，编译。` 
   5. `gox.x` 只在特定go版本进行编译，不支持beta or minor版本号的条件编译。
   6. `go build` 命令的其他tag。

6. 文件名实现条件编译。条件编译支持以下三种格式（`源码文件名去除类型后缀和_test后缀后`）：
   1. `*_GOOS` GOOS值与文件名中的GOOS一致时参与编译。
   2. `*_GOARCH` GOARCH值与文件名中的GOARCH一致时参与编译。
   3. `*_GOOS_GOARCH` GOARCH,GOOS值与文件名中的GOARCH,GOOS一致时参与编译。

​	如 `source_windows_amd64.go` 该文件只在`windows`系统的`amd64`架构下进行编译。

### 例子

示例的文件目录:

```txt
.
├── etcd.go
├── go.mod
├── main.go
└── redis.go
```

`etcd.go` 当tags中出现etcd字符时，不参与编译。

```go
// +build !etcd
package main
fun init() {
  println("etcd init")
}
```

`redis.go` 当tags中出现redis字符时，不参与编译。

```go
// +build !redis

package main

fun init() {
  println("redis redis")
}
```

`main.go`

```

package main

func main() {
  println("hell world!")
}
```

下面来看看效果

1. 直接编译，不执行条件编译

```sh
$ go run .
$ etcd init
$ redis init
$ hell world!
```

可以看到，etcd.go,redis.go,main.go都被编译了。

2. 不编译redis.go文件

```sh
$ go run -tags redis .   # 我们使用 `-tags` 来设置编译条件。
$ etcd init
$ hell world!
```

这时候只有etcd.go和main.go被编译了，redis.go中的init方法没有被执行。

3. 不编译etcd.go文件

```sh
$ go run -tags etcd .   # 我们使用 `-tags` 来设置编译条件。
$ redis init
$ hell world!
```

这时候只有redis.go和main.go被编译了，main.go中的init方法没有被执行。

4. 不编译etcd.go和redis.go文件

```sh
1$ go run -tags etcd,redis .   # 我们使用 `-tags` 来设置编译条件。
2$ hell world!
```

这时候只有main.go文件中的main函数被执行了，其他文件中的init方法均没有被执行。



## 用 ldflags 设置代码中变量的值

在 `-ldflags` 参数中，使用 `-X` 设置`package` 下的 `全局变量` 的值。

```sh
go build -ldflags="-X 'package_path.variable_name=new_value'"
```

#### Demo

```go
package main

import (
	"fmt"
)

var Version = "development"

func main() {
	fmt.Println("Version:\t", Version)
	fmt.Println("build.Time:\t", build.Time)
	fmt.Println("build.User:\t", build.User)
}
```

```go
package build

var Time string

var User string
```

目录结构

```
.
|--main.go
|--app
|---|----build
|----------|---build.go
```



编译

设置了 `package main` 的 `Version` , `package build` 的 `User` and `Time`

```sh
go build -v -ldflags="-X 'main.Version=v1.0.0' -X 'app/build.User=$(id -u -n)' -X 'app/build.Time=$(date)'"
```

运行

```sh
./app

Output
Version:	 v1.0.0
build.Time:	 Fri Oct  4 19:49:19 UTC 2019
build.User:	 sammy
```

