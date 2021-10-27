---
title: dlv使用问题
categories:
  - 编程语言
  - Go
tags:
  - Go
date: 2021-07-08 15:16:12
---

## 问题一

> 使用`dlv attach pid`时提示:`could not attach to pid 6976: decoding dwarf section info at offset 0x0: too short`

我的问题上直接`go run x.go`了，要先`go build x.go`，然后运行`x`。

如果`go build`后，仍有问题，可检查`go build`的参数是否有`-s` `-w`，这两个参数分别表示`去掉符号表` `去掉调试信息,不能gdb调试`。

如果仍没有解决，可以尝试升级下`dlv`版本。
