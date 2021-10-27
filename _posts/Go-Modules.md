---
title: Go Modules
categories:
  - 编程语言
  - Go
tags:
  - Go
  - Go Modules
date: 2021-02-25 17:13:54
---

### 什么是 Go Modules

`Go modules` 是 Go 语言中正式官宣的项目依赖解决方案。Go modules(前身vgo) 于 Go 1.11 正式发布，在 Go 1.14 便可用在生产上中，Go 官方也鼓励用户从其他依赖管理工具迁移到 Go modules。

Go Modules 的出现解决了 Go 1.11 前长久以来的依赖管理问题。并“淘汰”了现有的 `GOPATH模式`，同时统一了社区中的其它的依赖管理工具（提供迁移功能）。

#### GOPATH模式

##### GOPATH是什么

相信很多刚入行 Go 的小伙伴常常分不清 `GOPATH` 与 `GOROOT` 这两个环境变量，简单点讲就是 `GOPATH` 是你工作的目录，`GOROOT` 是你安装 Go 的目录，但是这个工作目录又不同于之前比如 Java 的项目目录，在这个目录下你的项目源码是存放在 `$GOPATH/src` 下，也就是在这个 `src` 下创建你的项目目录。

GOPATH 目录长下面这样：

```text
go
├── bin //存储所编译生成的二进制文件
├── pkg //存储预编译的目标文件，以加快程序的后续编译速度
└── src //存储所有.go文件或源代码。通过 go get 拉下来的库也在这里，和你的项目目录并列
    ├── github.com
    ├── golang.org
    ├── google.golang.org
    ├── gopkg.in
```

总结下就是，在使用 `GOPATH模式 `时，我们需要将应用代码存放在固定的`$GOPATH/src`目录下，并且如果执行`go get`来拉取外部依赖会自动下载并安装到`$GOPATH/src`目录下。

##### 为何弃用GOPATH模式

最主要的原因就是 `GOPATH模式` 下没有版本控制的概念，这会导致下面的几个问题：

* 在执行`go get`的时候，你不能指定要拉取的版本，即你无法通过该命令获得你期望的代码版本。
* 当其他人或者你运行一份 Go 代码的时候，无法保证其他人或者你所期望的第三方依赖库版本。
* 没办法处理 v1、v2、v3 等不同版本的引用问题，因为 `GOPATH模式` 下的导入路径都是一样的，都是类似于`github.com/foo/bar`这样的形式。

Go 语言官方从 Go 1.11 起开始推进 Go modules（前身vgo），Go 1.13 起不再推荐使用 GOPATH 模式，Go modules 也渐趋稳定，因此新项目也没有必要继续使用 GOPATH模式。

##### GOPATH模式下的产物（简单一了解）

> Go1 在 2012 年 03 月 28 日发布，而 Go1.11 是在 2018 年 08 月 25 日才正式发布（数据来源：GitHub Tag），在这个空档的时间内，并没有 Go modules 这一个东西，最早期可能还好说，因为刚发布，用的人不多，所以没有明显暴露，但是后期 Go 语言使用的人越来越多了，那怎么办？
>
> 这时候社区中逐渐的涌现出了大量的依赖解决方案，百花齐放，让人难以挑选，其中包括我们所熟知的 vendor 目录的模式，以及曾经一度被认为是“官宣”的 dep 的这类依赖管理工具。
>
> 但为什么 dep 没有正在成为官宣呢，其实是因为随着 Russ Cox 与 Go 团队中的其他成员不断深入地讨论，发现 dep 的一些细节似乎越来越不适合 Go，因此官方采取了另起 proposal 的方式来推进，其方案的结果一开始先是释出 vgo（Go modules 的前身，知道即可，不需要深入了解），最终演变为我们现在所见到的 Go modules，也在 Go1.11 正式进入了 Go 的工具链。

### 环境变量设置

#### 开启 Go Modules

运行 `go env` 命令查看 Go 的相关环境变量设置，找到 `GO111MODULE`，默认值是 `auto` ，共有三个可选值：

* **auto**： 只要项目包含了 go.mod 文件的才启用 Go modules
* **on**：启用 Go Modules，推荐设置为此值，这将是一个趋势
* **off**：禁用 Go Modules，不推荐设置

开启方式：

```shell
# 方式一: 使用 go env 命令，注意不支持覆盖写入，若系统环境变量中已设置，将报错
go env -w GO111MODULE=on
# 方式二: 写入系统环境变量
export GO111MODULE=on
```

#### 设置代理 GOPROXY

该环境变量用于使 Go 在后续拉取模块版本时能够脱离传统的 VCS 方式，直接通过镜像站点来快速拉取。

GOPROXY 的默认值是：`https://proxy.golang.org,direct`，但在国内是无法访问的，需要设置国内的 Go 模块代理，执行命令设置：

```shell
go env -w GOPROXY=https://goproxy.cn,direct
```

GOPROXY 的值是一个以英文逗号 `,` 分割的 Go 模块代理列表，可以设置多个模块代理。如果你不想使用代理，也可以将其设置为 `off` ，这将会禁止 Go 在后续操作中使用任何 Go 模块代理。

关于 `direct`，`direct` 是一个特殊指示符，用于指示 Go 回源到模块版本的源地址去抓取（比如 GitHub 等），场景如下：当值列表中上一个 Go 模块代理返回 `404` 或 `410` 错误时，Go 自动尝试列表中的下一个，遇见 `direct` 时回源，也就是回到源地址去抓取，而遇见 EOF 时终止并抛出类似 `invalid version: unknown revision...`的错误。

#### 数据校验 GOSUMDB

该环境变量用于在拉取模块版本时（无论是从源站拉取还是通过 Go module proxy 拉取）保证拉取到的模块版本数据未经过篡改，若发现不一致，也就是可能存在篡改，将会立即中止。

GOSUMDB 的默认值为：`sum.golang.org`，在国内也是无法访问的，但是 `GOSUMDB` 可以被 Go 模块代理所代理。所以，设置完 `GOPROXY` 后一般不需要再设置。

`GOSUMDB` 的值可以自定义，其支持如下格式：

- 格式 1： <SUMDB_NAME>+<PUBLIC_KEY> 。
- 格式 2： <SUMDB_NAME>+<PUBLIC_KEY> <SUMDB_URL> 。

也可以将其设置为 `off`，也就是禁止 Go 在后续操作中校验模块版本。

#### 依赖私有模块 GONOPROXY/GONOSUMDB/GOPRIVATE

这三个环境变量都是用在当前项目依赖了私有模块，例如像是你公司的私有 git 仓库，又或是 github 中的私有库，都属于私有模块。所谓私有模块，就是依赖了由 GOPROXY 指定的 Go 模块代理或由 GOSUMDB 指定 Go checksum database 都无法访问到的模块时的场景。所以要对其进行设置，否则会拉取失败。

一般建议直接设置 GOPRIVATE，它的值将作为 GONOPROXY 和 GONOSUMDB 的默认值。

它的值是一个用 `,` 分隔的模块列表，例如：

```shell
go env -w GOPRIVATE="git.example.com,github.com/eddycjy/mquote"
```

设置后，前缀为 git.example.com 和 github.com/eddycjy/mquote 的模块都会被认为是私有模块。

如果不想每次都重新设置，我们也可以利用通配符，例如：

```shell
$ go env -w GOPRIVATE="*.example.com"
```

这样子设置的话，所有模块路径为 example.com 的子域名（例如：git.example.com）都将不经过 Go module proxy 和 Go checksum database，**需要注意的是不包括 example.com 本身**。

### 基本使用

#### go mod 命令

Go modules 为我们提供了以下命令：

| 命令            | 作用                             |
| --------------- | -------------------------------- |
| go mod init     | 生成 go.mod 文件                 |
| go mod download | 下载 go.mod 文件中指明的所有依赖 |
| go mod tidy     | 整理现有的依赖                   |
| go mod graph    | 查看现有的依赖结构               |
| go mod edit     | 编辑 go.mod 文件                 |
| go mod vendor   | 导出项目所有的依赖到vendor目录   |
| go mod verify   | 校验一个模块是否被篡改过         |
| go mod why      | 查看为什么需要依赖某模块         |

#### 初始化项目



#### go.mod 文件

该文件有两个作用，一是标识作用，当环境变量 `GO!111MODULE=auto` 时，标识该项目为 `Go Modules` 项目，二是描述了当前项目的一些元信息，包括当前项目的模块路径、go 版本、需要依赖的模块等，内容类似下面这样：

```go
module github.com/eddycjy/module-repo
 
go 1.13
 
require (
    example.com/apple v0.1.2
    example.com/banana v1.2.3
    example.com/banana/v2 v2.3.4
    example.com/pear // indirect
    example.com/strawberry // incompatible
)
 
exclude example.com/banana v1.2.4
replace example.com/apple v0.1.2 => example.com/fried v0.1.0 
replace example.com/banana => example.com/fish
```

- **module**：用于定义当前项目的模块路径。
- **go**：用于标识当前模块的 Go 语言版本，值为初始化模块时的版本，目前来看还只是个标识作用。
- **require**：用于设置一个特定的模块版本。
- **exclude**：用于从使用中排除一个特定的模块版本。
- **replace**：用于将一个模块版本替换为另外一个模块版本。

另外你会发现 `example.com/pear` 的后面会有一个 `indirect` 标识，`indirect` 标识表示该模块为间接依赖，也就是在当前项目的所有 import 语句中，并没有发现这个模块的明确引用，有可能是你先手动 `go get` 拉取下来的，也有可能是你所依赖的模块所依赖的。

#### go.sum 文件

在第一次拉取模块依赖后，会发现多出了一个 go.sum 文件，其详细罗列了当前项目直接或间接依赖的所有模块版本，并写明了那些模块版本的 SHA-256 哈希值以备 Go 在今后的操作中保证项目所依赖的那些模块版本不会被篡改。

```text
github.com/eddycjy/mquote v0.0.1 h1:4QHXKo7J8a6J/k8UA6CiHhswJQs0sm2foAQQUq8GFHM=
github.com/eddycjy/mquote v0.0.1/go.mod h1:ZtlkDs7Mriynl7wsDQ4cU23okEtVYqHwl7F1eDh4qPg=
github.com/eddycjy/mquote/module/tour v0.0.1 h1:cc+pgV0LnR8Fhou0zNHughT7IbSnLvfUZ+X3fvshrv8=
github.com/eddycjy/mquote/module/tour v0.0.1/go.mod h1:8uL1FOiQJZ4/1hzqQ5mv4Sm7nJcwYu41F3nZmkiWx5I=
....
```

我们可以看到一个模块路径可能有如下两种：

```text
github.com/eddycjy/mquote v0.0.1 h1:4QHXKo7J8a6J/k8UA6CiHhswJQs0sm2foAQQUq8GFHM=
github.com/eddycjy/mquote v0.0.1/go.mod h1:ZtlkDs7Mriynl7wsDQ4cU23okEtVYqHwl7F1eDh4qPg=
```

h1 hash 是 Go modules 将目标模块版本的 zip 文件开包后，针对所有包内文件依次进行 hash，然后再把它们的 hash 结果按照固定格式和算法组成总的 hash 值。

而 h1 hash 和 go.mod hash 两者，要不就是同时存在，要不就是只存在 go.mod hash。那什么情况下会不存在 h1 hash 呢，就是当 Go 认为肯定用不到某个模块版本的时候就会省略它的 h1 hash，就会出现不存在 h1 hash，只存在 go.mod hash 的情况。

### 模块版本及其导入路径

#### 语义化版本控制

![语义化版本控制](https://www.cmdbyte.com/2021/02/%E8%AF%AD%E4%B9%89%E5%8C%96%E7%89%88%E6%9C%AC%E6%8E%A7%E5%88%B6.jpg)

`Go Modules` 有一个语义化的版本规范，版本主要由三部分组成：`主版本号`，`次版本号`，`修订号`。另外，如果是先行版本或特殊情况，可以将版本信息追加到“主版本号.次版本号.修订号”的后面，作为延伸。

版本号的递增规则如下：

- 主版本号：当你做了不兼容的 API 修改。
- 次版本号：当你做了向下兼容的功能性新增。
- 修订号：当你做了向下兼容的问题修正。

基于上面两类版本号形式，在我们发布新版本打 tag 的时候，需要注意遵循，不遵循语义化版本规则的版本号都是无法进行拉取的。

#### 不同版本的导入路径

在导入模块时，若主版本号为 `v0` 或者 `v1`，则无需指定版本，而在主版本号为 `v2` 及以上则需要明确指定主版本号，否则会出现冲突，其 `tag` 与模块导入路径的大致对应关系如下：

| tag    | 模块导入路径                 |
| :----- | :--------------------------- |
| v0.0.0 | github.com/eddycjy/mquote    |
| v1.0.0 | github.com/eddycjy/mquote    |
| v2.0.0 | github.com/eddycjy/mquote/v2 |
| v3.0.0 | github.com/eddycjy/mquote/v3 |

注意，忽略主版本号 `v0` 和 `v1` 是强制性的（不是可选项），因此每个软件包只有一个明确且规范的导入路径。

#### 为什么忽略 v0 和 v1 的主版本号

- 忽略 `v1` 版本的原因是：考虑到许多开发人员创建一旦到达 v1 版本便永不改变的软件包，这是官方所鼓励的，不认为所有这些开发人员在无意发布 v2 版时都应被迫拥有明确的 v1 版本尾缀，这将导致 v1 版本变成“噪音”且无意义。
- 忽略 `v0` 版本的原因是：根据语义化版本规范，v0的这些版本完全没有兼容性保证。需要一个显式的 v0 版本的标识对确保兼容性没有多大帮助。

### 最小版本选择

在实际项目中，一个模块往往依赖许多其他的模块，而这些其他的模块又可能依赖于别的模块，所以，很可能出现不同的模块依赖同一模块的不同版本的情况，比如下图 A1 的依赖关系：

![模块依赖1](https://www.cmdbyte.com/2021/02/%E6%A8%A1%E5%9D%97%E4%BE%9D%E8%B5%961.png)

在上述依赖中，模块 A 依赖了模块 B 和模块 C，而模块 B 依赖了模块 D，模块 C 依赖了模块 D 和 F，模块 D 又依赖了模块 E，而且同模块的不同版本还依赖了对应模块的不同版本。那么这个时候 Go modules 怎么选择版本，选择的是哪一个版本呢？

面对这种情况，Go modules 会把每个模块的依赖版本清单都整理出来，最终得到一个构建清单，如下图：

![模块构建清单1](https://www.cmdbyte.com/2021/02/%E6%A8%A1%E5%9D%97%E6%9E%84%E5%BB%BA%E6%B8%85%E5%8D%951.png)

可以看到 rough list 和 final list，两者的区别在于重复引用的模块 D（v1.3、v1.4），其最终清单选用了模块 D 的 v1.4 版本，主要原因：

- 语义化版本的控制：因为模块 D 的 v1.3 和 v1.4 版本变更，都属于次版本号的变更，而在语义化版本的约束下，v1.4 必须是要向下兼容 v1.3 版本，因此认为不存在破坏性变更，也就是兼容的。
- 模块导入路径的规范：主版本号不同，模块的导入路径不一样，因此若出现不兼容的情况，其主版本号会改变，模块的导入路径自然也就改变了，因此不会与第一点的基础相冲突。

