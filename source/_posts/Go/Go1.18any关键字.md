---
title: 'Go 1.18 any 关键字'
categories:
  - Lang
  - Go
tags:
  - Go
date: 2022-07-02 16:19:27
---

Go1.18 的更新中，出现了一个 `any` 关键字，其实它是 `interface{}` 的别名。为此，有人猜测这是要取代 `interface{}`，还有了一个 [Issue all: rewrite interface{} to any](https://github.com/golang/go/issues/49884)。

在使用上，可以参考下面代码。

```go
package main

import "fmt"

func main() {
	var (
		a int     = 1
		b string  = "hello"
		c float64 = 1.11
	)

	f(c)
	f(a)
	f(b)
}

func f(t any) {
	switch t.(type) {
	case int:
		fmt.Println("int")
	case string:
		fmt.Println("string")
	case float64:
		fmt.Println("flat64")
	default:
		fmt.Println("none")
	}
}
```

运行上述代码。

```tex
$ go run any.go 
flat64
int
string
```

在项目中，如果已经将 Go 升级到 1.18，可以使用 `gofmt -w -r 'interface{} -> any' src` 将项目中的 `interface{}` 改成 `any`。
