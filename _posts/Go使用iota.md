---
title: Go使用iota
categories:
  - Go
tags:
  - Go
date: 2021-03-13 09:27:27
---

## 简介

**iota是golang语言的常量计数器,只能在常量的表达式中使用。**

iota在const关键字出现时将被重置为0(const内部的第一行之前)，const中每新增一行常量声明将使iota计数一次(iota可理解为const语句块中的行索引)。

使用iota能简化定义，在定义枚举时很有用。

## 例子

### iota只能在常量表达式中使用

```go
fmt.Println(iota)
//编译错误：undefined: iota
```

### 每次const出现时，都会让iota初始化为0（自增长）

```go
const a = iota //a = 0
const (
	b = iota   // b = 1
    c 		   //c = 1
)
```

### 自定义类型

自增长常量经常包含一个自定义枚举类型，允许你依靠编译器完成自增设置。

下面是time包的例子，它定义了个Weekday命名类型，然后为一周的每一天定义了一个常量，周日从零开始。这在其他编程语言中一般称为枚举类型。

```go
type Weekday int

const (
    Sunday Weekday = iota
    Monday
    Tuesday
    Wednesday
    Thursday
    Friday
    Saturday
)
```

### 可跳过的值

在使用iota定义一组常量的时候，如果有些中间值不需要，可以使用`_`跳过。

```go
type MyInt int

const (
	a MyInt = iota //a = 0
    b		       //b = 1
    _
    _
    c		       //c = 4
)
```

### 位掩码表示

**`iota` 可以做更多事情，而不仅仅是 increment。更精确地说，`iota` 总是用于 increment，但是它可以用于表达式，在常量中的存储结果值。**

下面是来自net包的例子，用于给一个无符号整数的最低5bit的每个bit指定一个名字：

```go
type Flags uint

const (
    FlagUp Flags = 1 << iota // is up
    FlagBroadcast            // supports broadcast access capability
    FlagLoopback             // is a loopback interface
    FlagPointToPoint         // belongs to a point-to-point link
    FlagMulticast            // supports multicast access capability
)
```

随着iota的递增，每个常量对应表达式1 << iota，是连续的2的幂，分别对应一个bit位置。使用这些常量可以用于测试、设置或清除对应的bit位的值：

```go
package main

import (
    "fmt"
)

type Flags uint

const (
    FlagUp           Flags = 1 << iota // is up
    FlagBroadcast                      // supports broadcast access capability
    FlagLoopback                       // is a loopback interface
    FlagPointToPoint                   // belongs to a point-to-point link
    FlagMulticast                      // supports multicast access capability
)

func IsUp(v Flags) bool     { return v&FlagUp == FlagUp } 
func TurnDown(v *Flags)     { *v &^= FlagUp } 
func SetBroadcast(v *Flags) { *v |= FlagBroadcast }
func IsCast(v Flags) bool   { return v&(FlagBroadcast|FlagMulticast) != 0 }

func main() {
    var v Flags = FlagMulticast | FlagUp // v 10001
    fmt.Printf("%b %t\n", v, IsUp(v)) // "10001 true"
    TurnDown(&v)
    fmt.Printf("%b %t\n", v, IsUp(v)) // "10000 false"
    SetBroadcast(&v)
    fmt.Printf("%b %t\n", v, IsUp(v))   // "10010 false"
    fmt.Printf("%b %t\n", v, IsCast(v)) // "10010 true"
}
```

运行结果:

```text
10001 true

10000 false

10010 false

10010 true
```

### 定义数量级

下面的每个常量都是1024的幂

```go
const (
    _ = 1 << (10 * iota)
    KiB // 1024
    MiB // 1048576
    GiB // 1073741824
    TiB // 1099511627776             (exceeds 1 << 32)
    PiB // 1125899906842624
    EiB // 1152921504606846976
    ZiB // 1180591620717411303424    (exceeds 1 << 64)
    YiB // 1208925819614629174706176
)
```

不过iota常量生成规则也有其局限性。例如，它并不能用于产生1000的幂（KB、MB等），因为Go语言并没有计算幂的运算符。

### 定义在一行的情况

如果多个iota在一行，那么它将在下一行增长，而不是立即取得它的引用。

```go
const (
    Apple, Banana = iota + 1, iota + 2 //Apple = 1, Banana = 2
    Cherimoya, Durian 				   //Cherimoya = 2, Durian = 3
    Elderberry, Fig					   //Elderberry = 3, Fig = 4
)
```

### 中间插队

```go
const (
	i = iota  // i = 0
    j = 3.14  // j = 3.14
    k         // k = 3.14
    l = iota  // l = 3
    _
    m         // m = 5
)
```

