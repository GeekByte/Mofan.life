---
title: Golang中常用的类型转换方法
categories:
  - Go
tags:
  - Go
date: 2021-04-15 22:49:08
---

这里只对一些开发中常用的转换做一个记录，以备查询。

### string 和 int 相互转换

#### string 转 int
```go
int, err := strconv.Atoi(string)
```

#### string 转 int64
```go
int64, err := strconv.ParseInt(string, 10, 64)
```

#### int 转 string
```go
string := strconv.Itoa(int)
```

#### int64 转 string
```go
string := strconv.FormatInt(int64,10)
```

