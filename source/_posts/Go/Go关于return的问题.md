---
title: Go关于return的问题
categories:
  - Lang
  - Go 
tags:
  - Go
date: 2021-06-30 18:17:40
---

当存在命名参数时，需要写return，如add所示.

```go
package main

import "fmt"

func main() {

	fmt.Println(add(3,1))

	sub(3,1)
}


func add(a, b int) (c int) {
	c = a + b
	return
}

func sub(a, b int) {
	c := a - b
	fmt.Println(c)
}

```
