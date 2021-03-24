---
title: Go命名规范
categories:
  - Go
tags:
  - Go
date: 2021-03-24 23:25:05
---

## 文件命名规范

### 平台区分

```text
文件名_平台

平台可选为：windows, unix, posix, plan9, darwin, bsd, linux, freebsd, nacl, netbsd, openbsd, solaris, dragonfly, bsd, notbsd, android, stubs

例： file_windows.go, file_unix.go
```

### 测试单元

```text
文件名_test.go(包含 _test.go)或者 文件名_平台_test.go。

例：_test.go, path_test.go,  path_windows_test.go
```

### 版本区分(猜测)

```text
文件名_版本号等。

例：trap_windows_1.4.go
```

### CPU类型区分, 汇编用的多

```text
文件名_(平台:可选)_CPU类型.

CPU类型可选：amd64, none, 386, arm, arm64, mips64, s390, mips64x, ppc64x, nonppc64x, s390x, x86, amd64p32

例：vdso_linux_amd64.go
```

## 变量、方法命名规范

1、golang的命名需要使用驼峰命名法

2、golang中根据首字母的大小写来确定可以访问的权限。无论是方法名、常量、变量名还是结构体的名称，如果首字母大写，则可以被其他的包访问；如果首字母小写，则只能在本包中使用。可以简单的理解成，首字母大写是公有的，首字母小写是私有的

3、结构体中属性名如果小写则在数据解析（如json解析,或将结构体作为请求或访问参数）时无法解析，大写的时候而且没有标签时原样转换。

## 注意点

### 注意点一

go build 的时候会选择性地编译以系统名结尾的文件（选择和编译环境设置的系统一致的系统名结尾的文件）。例如Linux(Unix)系统下编译只会选择`array_linux.go`文件，其它系统命名后缀文件全部忽略。

###  注意点二

在xxx.go文件的文件头上添加 `// + build !windows (tags)`，可以选择在windows系统下面不编译该文件。例如：

```go
// +build !windows

package main
```