---
title: Go中方法接受者为值传递或引用传递的区别
categories:
  - 编程语言
  - Go
tags:
  - Go
date: 2021-03-02 21:11:29
---

在 Go 中，方法的接收者有两种类型，一种是值传递类型，一种是引用传递类型，也就是指针类型。

* 值传递：不能修改接受者参数，即对接受者内的数据只读不写。因为要进行数据的拷贝，所以内存消耗会比引用传递大。
* 引用传递：可以修改接受者参数。

具体请参考如下代码：

```go
package main

import "fmt"

type Cat struct {
	name string
}

//值传递
func (p Cat) SetName(name string) {
	p.name = name
}
func (p Cat) GetName() string {
	return p.name
}

type Dog struct {
	name string
}

//引用传递
func (d *Dog) SetName(name string) {
	d.name = name
}

func (d *Dog) GetName() string {
	return d.name
}

func main() {
	cat := new(Cat)
	cat.name = "old"
	cat.SetName("new")
	fmt.Println(cat.GetName()) //输出 old

	dog := new(Dog)
	dog.name = "old"
	dog.SetName("new")
	fmt.Println(dog.GetName()) //输出 new
}
```

