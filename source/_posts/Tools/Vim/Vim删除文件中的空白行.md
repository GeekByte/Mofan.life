---
title: Vim删除文件中的空白行.md
categories:
  - Tools
  - Vim
tags:
  - Vim
date: 2024-05-14 11:16:10
---



## 使用 global 命令删除空白行

```txt
:g/^\s*$/d
```

- `^` 表示行首
- `\s` 表示任何空白字符，包括空格、制表符、换页符等
- `*` 表示匹配零次或多次
- `$` 表示行尾



## 使用 vglobal 命令删除空白行

vim 命令行模式下的命令 vglobal (简写 v) 执行与 global 完全相反的操作。

而正则表达式中 `.` 表示匹配除换行符 `\n` 外的任何字符。

所以可以使用下面命令删除文件中的空白行，

```json
:v/./d
```

删除空白行后，会高亮剩下的内容，执行 `:nohl` 命令取消高亮即可。



## 执行 shell 命令删除空白行

linux 中有 `cat -s filename` ，可将连续的空行合并成一个空行。`grep -v '^\s*$' filename` 可以过滤文件中的所有空白行。

```shell
:%!grep -v '^\s*$'
```



## 使用替换命令删除空白行

```txt
:%s/^\s*$\n//g
```

上面这个命令不会删除文件的最后一个空白行，因为不符合规则中的换行。

在使用 Vim 中的 `:%s/^\s*$\n//g` 命令时，它会匹配所有连续的空白行并将它们删除。但是，如果文件的最后一行是空行并且没有换行符（`\n`），则该命令不会匹配到这一行，因为它不符合正则表达式 `^\s*$\n` 的模式。

解决这个问题的一种方法是，在命令末尾加上 `\n\?$`，这样可以匹配到可能存在的最后一个空行。修改后的命令如下：

```txt
:%s/^\s*$\n\?$//g
```

这样，无论最后一行是否有换行符，都会被匹配到并删除。



