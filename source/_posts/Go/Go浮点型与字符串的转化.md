---
title: Go浮点型与字符串的转化
categories:
  - Lang
  - Go
tags:
  - Go
date: 2021-06-30 09:52:23
---

### FormatFloat 将浮点数转为字符串值

**func FormatFloat(f float64, fmt byte, prec, bitSize int) string**

* f：要转换的浮点数
* fmt：格式标记（b、e、E、f、g、G）
* prec：精度（数字部分的长度，不包括指数部分）
* bitSize：指定浮点类型（32:float32、64:float64）

> 格式标记：
> 'b' (-ddddp±ddd，二进制指数)
> 'e' (-d.dddde±dd，十进制指数)
> 'E' (-d.ddddE±dd，十进制指数)
> 'f'  (-ddd.dddd，没有指数)
> 'g' (‘e’:大指数，‘f’:其它情况)
> 'G' (‘E’:大指数，‘f’:其它情况)

* 如果格式标记为 'e', 'E' 或 'f', 则 prec 表示小数点后的数字位数
* 如果格式标记为 'g', 'G', 则 prec 表示总的数字位数（整数部分+小数部分）

```go
package main

import (
	"fmt"
	"strconv"
)

func main() {
	f := 100.12345678901234567890123456789
	fmt.Println(strconv.FormatFloat(f, 'b', 5, 32))
	// 13123382p-17
	fmt.Println(strconv.FormatFloat(f, 'e', 5, 32))
	// 1.00123e+02
	fmt.Println(strconv.FormatFloat(f, 'E', 5, 32))
	// 1.00123E+02
	fmt.Println(strconv.FormatFloat(f, 'f', 5, 32))
	// 100.12346
	fmt.Println(strconv.FormatFloat(f, 'g', 5, 32))
	// 100.12
	fmt.Println(strconv.FormatFloat(f, 'G', 5, 32))
	// 100.12
	fmt.Println(strconv.FormatFloat(f, 'b', 30, 32))
	// 13123382p-17
	fmt.Println(strconv.FormatFloat(f, 'e', 30, 32))
	// 1.001234588623046875000000000000e+02
	fmt.Println(strconv.FormatFloat(f, 'E', 30, 32))
	// 1.001234588623046875000000000000E+02
	fmt.Println(strconv.FormatFloat(f, 'f', 30, 32))
	// 100.123458862304687500000000000000
	fmt.Println(strconv.FormatFloat(f, 'g', 30, 32))
	// 100.1234588623046875
	fmt.Println(strconv.FormatFloat(f, 'G', 30, 32))
	// 100.1234588623046875
}
```

### ParseFloat 将字符串转换为浮点数

**func ParseFloat(s string, bitSize int) (f float64, err error)**

* s：要转换的字符串
* bitSize：指定浮点类型（32:float32、64:float64）

>  如果 s 是合法的格式，而且接近一个浮点值，则返回浮点数的四舍五入值（依据 IEEE754 的四舍五入标准）
> 如果 s 不是合法的格式，则返回“语法错误”
> 如果转换结果超出 bitSize 范围，则返回“超出范围”

```go
func main() {
	s := "0.12345678901234567890"
	f, err := strconv.ParseFloat(s, 32)
	fmt.Println(f, err)          // 0.12345679104328156
	fmt.Println(float32(f), err) // 0.12345679
	f, err = strconv.ParseFloat(s, 64)
	fmt.Println(f, err) // 0.12345678901234568
}
```

