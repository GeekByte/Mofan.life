---
title: Go通过反射获取和设置结构体字段值
categories:
  - 编程语言
  - Go
tags:
  - Go
date: 2021-06-30 09:39:12
---

```go
type MyStruct struct {
        N int
}
n := MyStruct{ 1 }
// get
immutable := reflect.ValueOf(n)
val := immutable.FieldByName("N").Int()
fmt.Printf("N=%d\n", val) // prints 1

// set
mutable := reflect.ValueOf(&n).Elem()
mutable.FieldByName("N").SetInt(7)
fmt.Printf("N=%d\n", n.N) // prints 7
```

如果是interface{}转map[string]interface{} 可以直接转

```go
User.(map[string]interface{})["username"]
```

其实值类型的转换如下

```go
var a interface{}
   var b string
   a = "asdasdasdasd"
   b = a.(string)
   fmt.Println(a, b)
```
