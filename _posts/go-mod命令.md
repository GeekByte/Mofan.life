---
title: go mod命令
categories:
  - Go
tags:
  - Go
date: 2021-03-13 16:51:03
---

Go1.11之前对于Go的版本管理主要用过 glide，下面介绍 Go 1.11 之后官方支持的版本管理工具 mod。

关于 mod 官方给出了三个命令 `go help mod`、`go help modules`、`go help module-get` 帮助了解使用。

## 设置 GO111MODULE

可以用环境变量 `GO111MODULE` 开启或关闭模块支持，它有三个可选值：off、on、auto，默认值是 auto。

- `GO111MODULE=off` 无模块支持，go 会从 GOPATH 和 vendor 文件夹寻找包。
- `GO111MODULE=on` 模块支持，go 会忽略 GOPATH 和 vendor 文件夹，只根据 go.mod 下载依赖。
- `GO111MODULE=auto` 在 $GOPATH/src 外面且根目录有 go.mod 文件时，开启模块支持。

在使用模块的时候，GOPATH 是无意义的，不过它还是会把下载的依赖储存在 `GOPATH/pkg/mod` 中，也会把`go install`的结果放在`GOPATH/pkg/mod`中，也会把`go install`的结果放在`GOPATH/bin` 中。

## Go mod 命令

```text
download    download modules to local cache (下载依赖的module到本地cache))
edit        edit go.mod from tools or scripts (编辑go.mod文件)
graph       print module requirement graph (打印模块依赖图))
init        initialize new module in current directory (再当前文件夹下初始化一个新的module, 创建go.mod文件))
tidy        add missing and remove unused modules (增加丢失的module，去掉未用的module)
vendor      make vendored copy of dependencies (将依赖复制到vendor下)
verify      verify dependencies have expected content (校验依赖)
why         explain why packages or modules are needed (解释为什么需要依赖)
```

