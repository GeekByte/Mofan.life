---
title: Go中string函数与strconv.Itoa函数的区别
categories:
  - 编程语言
  - Go
tags:
  - Go
date: 2021-03-24 23:36:10
---

## Itoa函数

strconv.Itoa()函数的参数是一个整型数字，它可以将数字转换成对应的字符串类型的数字。

```go
package main
 
import (
	"fmt"
	"strconv"
)
 
func main() {
	string_number := 97
	result := strconv.Itoa(string_number)
 
	fmt.Println(result)
	fmt.Printf("%T\n", result)
}
```

运行结果：

```text
97
string
```

## string函数

string函数的参数若是一个整型数字，它将该整型数字转换成ASCII码值等于该整形数字的字符。string()函数是Go语言的内置函数，不需要导入任何包。

```go
package main
 
import (
	"fmt"
)
 
func main() {
	string_number := 97
	result := string(string_number)
	fmt.Println(result)
	fmt.Printf("%T\n", result)
}
```

运行结果：

```text
a
string
```

因为ASCII码值为97对应的字符是a，所以string(97)的结果是a
