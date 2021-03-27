---
title: Go的os包常用操作
categories:
  - Go
tags:
  - Go
date: 2021-03-26 22:46:24
---

**创建目录**

* os.Mkdir("abc", os.ModePerm) //创建单个目录
* os.MkdirAll("a/b/c", os.ModePerm) //创建多级目录

**注意：**os.Mkdir创建重复的目录会产生error，os.MkdirAll则不会

**获取当前路径**

```go
os.Getwd()
```

**创建文件**

```go
f, _ := os.Create("./abc.txt") //创建文件
defer f.Close()
```

**打开文件**

```go
f, _ := os.OpenFile("./abc.txt", os.O_RDWR|os.O_CREATE|os.O_TRUNC, 666)
```

**删除文件**

```go
os.Remove("a/b/c")
os.Remove("a/b/c/d.txt")
```

**删除目录**

```go
os.RemoveAll("abc")
```

**重命名文件**

```go
os.Rename("a.txt", "b.txt")
```



待整理：

[golang中os包用法 - Go语言中文网 - Golang中文社区](https://studygolang.com/articles/5024)