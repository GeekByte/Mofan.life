---
title: 'Go1.18 范型使用'
categories:
  - 编程语言
  - Go
tags:
  - Go
date: 2022-07-02 16:09:19
---

参考文档：[Getting started with generics](https://go.dev/doc/tutorial/generics)

下面跟随官方文档，从几个 demo 中学习范型的使用，Go的版本需要 1.18 以上。

### 创建存放代码的文件夹

```tex
$ mkdir generics
$ cd generics
$ go mod init example/generics
```

### 编写非范型代码

我们写两个方法，用于分别计算 map 中 int64 类型 与 float64类型 的值的和。

```go
// SumInts adds together the values of m.
func SumInts(m map[string]int64) int64 {
    var s int64
    for _, v := range m {
        s += v
    }
    return s
}

// SumFloats adds together the values of m.
func SumFloats(m map[string]float64) float64 {
    var s float64
    for _, v := range m {
        s += v
    }
    return s
}
```

 在上面代码的上方编写 main 方法，初始化 map 并点用函数计算结果。

```go
package main

import "fmt"

func main() {
	// Initialize a map for the integer values
	ints := map[string]int64{
		"first":  34,
		"second": 12,
	}

	// Initialize a map for the float values
	floats := map[string]float64{
		"first":  35.98,
		"second": 26.99,
	}

	fmt.Printf("Non-Generic Sums: %v and %v\n",
		SumInts(ints),
		SumFloats(floats))
}
```

运行代码：

```tex
$ go run .
Non-Generic Sums: 46 and 62.97
```

### 编写范型代码，处理多种类型

支持范型的函数在定义时，需要先在 `[]` 内声明参数类型，然后像定义普通函数一样添加需要的参数。在 `[]` 内声明的参数类型，限制了函数接受的参数类型范围，如果在使用中，传入了范围之外的类型，代码将无法编译。

下面我们编写一个支持范型方法，可以处理上面参数值类型 int64 与 float64 类型的 map。

```go
// as types for map values.
func SumIntsOrFloats[K comparable, V int64 | float64](m map[K]V) V {
    var s V
    for _, v := range m {
        s += v
    }
    return s
}
```

在上面的代码中：

* 定义了 `SumIntsOrFloats` 函数，它有两个参数声明（在 `[]` 内），K 和 V，一个 map[K]V 类型的参数，一个 V类型的返回值。
* K 类型参数限制为 `comparable`，意思是为 可迭代的，它允许任何可以参与 `==` 与 `!=` 运算的类型。定义 K 为 `comparable` 的原因是 Go 要求 map 的 key 是可迭代的。
* V 类型参数限制为 `int64` 或 `float64`，只能接受这两种类型的参数。

在 main.go 中加入下面代码，调用该函数获取结果。

```go
fmt.Printf("Generic Sums: %v and %v\n",
    SumIntsOrFloats[string, int64](ints),
    SumIntsOrFloats[string, float64](floats))
```

在上面代码中，调用函数的时候，在 `[]` 中声明了请求参数的类型。

运行代码。

```tex
$ go run .
Non-Generic Sums: 46 and 62.97
Generic Sums: 46 and 62.97
```

在调用支持范型的函数时，也可以不声明参数的类型，但是在调用没有参数的范型函数时，需要加入类型声明。

调用函数不加类型声明。

```go
fmt.Printf("Generic Sums, type parameters inferred: %v and %v\n",
    SumIntsOrFloats(ints),
    SumIntsOrFloats(floats))
```

运行代码。

```tex
$ go run .
Non-Generic Sums: 46 and 62.97
Generic Sums: 46 and 62.97
Generic Sums, type parameters inferred: 46 and 62.97
```

### 提前声明限制类型

在上面的代码中，在函数里声明参数类型时，罗列了具体的类型，还有另外一种写法， 就是将需要的类型写到一个 interface 结构中。

定义限制类型到 interface 中。

```go
type Number interface {
    int64 | float64
}
```

编写求和函数。

```go
// SumNumbers sums the values of map m. It supports both integers
// and floats as map values.
func SumNumbers[K comparable, V Number](m map[K]V) V {
    var s V
    for _, v := range m {
        s += v
    }
    return s
}
```

调用该函数。

```go
fmt.Printf("Generic Sums with Constraint: %v and %v\n",
    SumNumbers(ints),
    SumNumbers(floats))
```

运行代码。

```go
$ go run .
Non-Generic Sums: 46 and 62.97
Generic Sums: 46 and 62.97
Generic Sums, type parameters inferred: 46 and 62.97
Generic Sums with Constraint: 46 and 62.97
```



### 完整代码

```go
package main

import "fmt"

type Number interface {
    int64 | float64
}

func main() {
    // Initialize a map for the integer values
    ints := map[string]int64{
        "first": 34,
        "second": 12,
    }

    // Initialize a map for the float values
    floats := map[string]float64{
        "first": 35.98,
        "second": 26.99,
    }

    fmt.Printf("Non-Generic Sums: %v and %v\n",
        SumInts(ints),
        SumFloats(floats))

    fmt.Printf("Generic Sums: %v and %v\n",
        SumIntsOrFloats[string, int64](ints),
        SumIntsOrFloats[string, float64](floats))

    fmt.Printf("Generic Sums, type parameters inferred: %v and %v\n",
        SumIntsOrFloats(ints),
        SumIntsOrFloats(floats))

    fmt.Printf("Generic Sums with Constraint: %v and %v\n",
        SumNumbers(ints),
        SumNumbers(floats))
}

// SumInts adds together the values of m.
func SumInts(m map[string]int64) int64 {
    var s int64
    for _, v := range m {
        s += v
    }
    return s
}

// SumFloats adds together the values of m.
func SumFloats(m map[string]float64) float64 {
    var s float64
    for _, v := range m {
        s += v
    }
    return s
}

// SumIntsOrFloats sums the values of map m. It supports both floats and integers
// as map values.
func SumIntsOrFloats[K comparable, V int64 | float64](m map[K]V) V {
    var s V
    for _, v := range m {
        s += v
    }
    return s
}

// SumNumbers sums the values of map m. Its supports both integers
// and floats as map values.
func SumNumbers[K comparable, V Number](m map[K]V) V {
    var s V
    for _, v := range m {
        s += v
    }
    return s
}
```

