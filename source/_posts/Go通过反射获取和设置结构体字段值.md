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
type M struct {
        N int
}
m := M{ 1 }

// get
x := reflect.ValueOf(m)
val := x.FieldByName("N").Int()
fmt.Printf("N=%d\n", val) // N=1

// set
y := reflect.ValueOf(&m).Elem()
ok := y.FieldByName("N").SetInt(7)
if ok {
    fmt.Println("设置成功")
}
fmt.Printf("N=%d\n", n.N) // N=7
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
