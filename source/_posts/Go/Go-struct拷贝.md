---
title: Go struct拷贝
categories:
  - Lang
  - Go
tags:
  - Go
date: 2021-07-28 22:44:09
---

在用 Go 做 orm 相关操作的时候，经常会有 struct 之间的拷贝。比如下面两个struct之间要拷贝共同成员 B, C (类型一样)。这个在struct不是很大的时候从来都不是问题，直接成员拷贝即可。但是当struct的大小达到三四十个成员的时候，就要另辟蹊径了。

```go
type A struct {
    A   int
    B   int
    C   string
    E   string
}

type B struct {
    B   int
    C   string
    D   int
    E   string
}
```

## 方法一：json

```go
func main() {
    a := &A{1, 1, "a", "b"}
    aj, _ := json.Marshal(a)
    b := new(B)
    _ = json.Unmarshal(aj, b)

    fmt.Printf("%+v", b)
}
```

## 方法二：反射

```go
func CopyStruct(src, dst interface{}) {
    sval := reflect.ValueOf(src).Elem()
    dval := reflect.ValueOf(dst).Elem()

    for i := 0; i < sval.NumField(); i++ {
        value := sval.Field(i)
        name := sval.Type().Field(i).Name

        dvalue := dval.FieldByName(name)
        if dvalue.IsValid() == false {
            continue
	}
        dvalue.Set(value) //这里默认共同成员的类型一样，否则这个地方可能导致 panic，需要简单修改一下。
    }
}
```

