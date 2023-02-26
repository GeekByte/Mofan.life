---
title: Go关键字
categories:
  - 编程语言
  - Go
tags:
  - Go
date: 2023-02-26 13:27:39
---



> 到 Go 1.20，关键字如下:
> break     default      func    interface  select
> case      defer        go      map        struct
> chan      else         goto    package    switch
> const     fallthrough  if      range      type
> continue  for          import  return     var

fallthrough 关键字用于在 switch 代码块里，运行下一个 case。如下一个 case 是default，也会执行 default，若没有下一个 case，则无操作。

```go
package main

import "fmt"

func main() {
	switch 100 {
	case 1:
		fmt.Println(1)
	case 10:
		fmt.Println(10)
		fallthrough
	case 100:
		fmt.Println(100)
		fallthrough
	default:
		fmt.Println("default")
	}
}
```
