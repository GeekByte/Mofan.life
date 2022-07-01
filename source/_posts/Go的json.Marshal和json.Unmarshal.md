---
title: Go的json.Marshal和json.Unmarshal
categories:
  - 编程语言
  - Go
tags:
  - Go
date: 2021-03-25 20:59:38
---

> 官方介绍： [JSON and Go - The Go Blog](https://blog.golang.org/json)

### json.Marshal

我们可以使用 `json.Marshal` 将 `JSON` 编码成字节数据。

函数定义：

```go
func Marshal(v interface{}) ([]byte, error)
```

示例代码：

```go
package main

import (
    "encoding/json"
    "fmt"
)

func main() {
    
    type Message struct {
        Name string
        Body string
        Time int64
    }
    
    m := Message{"Alice", "中国", 1294706395881547000}
    b, err := json.Marshal(m)
    
    if err == nil {
        fmt.Println(b)
    }
}
```

输出：

```text
[123 34 78 97 109 101 34 58 34 65 108 105 99 101 34 44 34 66 111 100 121 34 58 34 228 184 173 229 155 189 34 44 34 84 105 109 101 34 58 49 50 57 52 55 48 54 51 57 53 56 56 49 53 52 55 48 48 48 125]
```

注意：

* `json.Marshal`只能编码 `JSON` 结构数据
* 它只支持 `string` 类型的 `key`，如果字段是 `map` 类型，那么必须是`map[string]T` 类型
* 不支持`channel`、`complex`、`function` 类型数据的编码
* 不支持本数据结构嵌套的结构体编码
* 指针类型经过编码后值是它代表的内存位置存储的值，如果指针为`nil`，则编码后的值为 `null`
* 它只编码可导出的字段（首字母大写的字段）

### json.Unmarshal

将字节数据解析成`JSON` 数据

函数定义：

```text
func Unmarshal(data []byte, v interface{}) error
```

