---
title: Git的描述信息
categories:
  - Tools
  - Git
tags:
  - Tools
  - Git
date: 2021-04-20 22:42:35
---

> 来源于：[80%的程序员，不会写commit记录！](https://mp.weixin.qq.com/s/vYQcG8yzHjZiuazqOPpFsA)

> 据说，80%的程序员，不会写commit记录。这个比例在无规范的小公司，比例会更高一些，可以看到这是一个多么普遍的问题。

程序员应该写出简洁明了的`commit log`，否则对别人和自己来说就是一种困扰。最近代码review多了，总有一股想笑的感觉。就像下图这满屏的ok，永远无法从中得知提交人的意图。

![commit_1](https://www.cmdbyte.com/2021/02/commit_1.png)

`commit log`将如何提交？都有哪些约定？其实是有答案的。对于Java程序员，尤其幸福。IDEA有一个非常好用的插件，可以用来辅助你进行代码提交，辅助你进行团队规范建设。接下来，我将带大家看一看它的使用方法。

## 安装插件

在IDEA的`Marketplace`中，搜索`Git Commit Template`，就可以安装这个插件。插件很小，很快就能下载下来。

![commit_2](https://www.cmdbyte.com/2021/02/commit_2.webp)

正常从IDEA提交代码的时候。我们发现多了一个小按钮。

![commit_3](https://www.cmdbyte.com/2021/02/commit_3.webp)

点击之后，将弹出一个窗口。让你去设计提交模板。

![commit_4](https://www.cmdbyte.com/2021/02/commit_4.webp)

这么多信息，真的让人头晕。怪不得程序员们都不喜欢写提交记录。

其实，在插件的安装界面，就已经说明了这个提交记录的格式。

```tex
 <type>(<scope>): <subject>
 <BLANK LINE>
 <body>
 <BLANK LINE>
 <footer>
```

从描述中，可以肯容易的看到一个提交记录中，应该包含哪些东西。其中类型最多的，当然是提交类型。

## 提交类型Type

我们按照插件显示的顺序来说明一下。

- `feat` 功能`feature`的意思，也是最常用的。当你的功能有变更的时候，都可以采用这种类型的type
- `fix` 当然指的是bug修复
- `docs` 更新了文档，或者更新了注释
- `style` 代码格式调整，比如执行了format、更改了tab显示等
- `refactor` 重构代码。指的是代码结构的调整，比如使用了一些设计模式重新组织了代码
- `perf` 对项目或者模块进行了性能优化。比如一些jvm的参数改动，把stringbuffer改为stringbuilder等
- `test` 这个简单，就是增加了单元测试和自动化相关的代码
- `build` 影响编译的一些更改，比如更改了maven插件、增加了npm的过程等
- `ci` 持续集成方面的更改。现在有些build系统喜欢把ci功能使用yml描述。如有这种更改，建议使用ci
- `chore` 其他改动。比如一些注释修改或者文件清理。不影响src和test代码文件的，都可以放在这里
- `revert` 回滚了一些前面的代码

除了这些预设的，团队还可以按照自己的需求，增加新的`type`。比如专门处理线上工单，就可以创造一个叫做`ticket`的类型。

## 范围scope

scope是范围的意思，主要指的是代码的影响面。scope并没有要求强制，但团队可以按照自己的理解进行设计。通常由技术维度和业务维度两种划分方式。比如按照技术分为：`controller`、`dto`、`service`、`dao`等。但因为一个功能提交，会涉及到多个scope（都不喜欢非常细粒度的提交），所以按照技术维度分的情况比较少。

按照业务模块进行划分，也是比较不错的选择。比如分为`user`、`order`等划分，可以很容易看出是影响用户模块还是order模块。

如果你实在不知道怎么填，那就留空。

## 其他

### 主题subject

这个体现的是总结概括能力，没得跑。一句话能够说明主要的提交是什么。subject也是众多git管理工具默认显示的一行。如果你写的标准，那么提交记录看起来就很漂亮很规整。

### 正文Body

主要填写详细的改动记录。我一般习惯列上1234，但如果你的subject写的非常好，正文可以直接弱化。但如果时间充裕，填写上重要记录的前因后果，需求背景，是一个好的习惯。

### 尾部Footer

添加一些额外的hook，比如提交记录之后，自动关闭jira的工单（JIRA和gitlab等是可以联动的）。在比如触发一些文档编译或者其他动作。

这部分自定义行也是比较强的。

### Skip CI

最后还有一个skip CI选项。一般的ci工具，都可以设置提交代码时自动触发编译。但你可以告诉它忽略本次提交。这可能是因为你提前预判到了一些构建风险，或者就是不想编译。

## End

最后，看一个典型的提交记录，有了工具的支持，我们的瞎扯也看得正经起来。

```tex
fix(order): 修复了1分钱买汽车的bug

商务反馈可以1分钱买汽车，目前已经卖出了100w量

Closes #2455

[skip ci]
```

其实，提交的核心是`type`和`subject`。一个用来表示它的提交类型，一个用来对提交进行概括性总结，写好了这两点，就能轻轻松松秒杀80%的程序员了。

有了这些基础，从`commit log`，自动生成`change log`，就变的非常的容易。配合持续集成平台，自动生成发版的变更记录，也是可行的，这也是为什么团队管理，都在一直强调git的提交规范。因为它确实非常有用。
