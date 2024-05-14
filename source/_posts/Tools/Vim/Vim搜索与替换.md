---
title: Vim 搜索与替换
categories:
  - Tools
  - Vim
tags:
  - Vim
date: 2022-05-23 11:30:33
---

原文：[Find and Replace in Vim / Vi | Linuxize](https://linuxize.com/post/vim-find-replace/)



## ignorecase 与 smartcase

Vim 中的 `ignorecase` 用于设置大小写敏感，它将在所有搜索、替换命令中生效。 在 normal 模式中 `:set ignorecase` 设置为不敏感；`:set noignorecase` 设置为敏感。 `ignorecase` 属于选项变量，因此也可以通过 `&` 来设置，例如：`:let &ignorecase=1`。 把冒号去掉后可以直接放到 .vimrc 文件里持久生效。

> 更多 Vim 变量赋值和引用的细节，可参考这篇文章：[Vim 中的变量赋值、引用与作用域](https://harttle.land/2017/01/30/variables-in-vim.html)。

开启 `ignorecase` 之后还可以把 `smartcase` 也打开（后者要求前者出于开启状态）， Vim 会启用智能模式：

- 在你输入的模式中包含大写时，启用大小写敏感模式；
- 在你输入的模式中只有小写时，启用大小写不敏感模式。



## 常规使用

vim查找与替换的命令结构：

```tex
:[range]s/{pattern}/{string}/[flags] [count]
```

在使用上，分隔符并不一定必须斜杠字符 `/` ，也可以使用其他的非字母数字的字符，例如使用 `|`（`s|foo|bar|`)

1. 替换当前行第一个匹配到的模式

    ```tex
    :s/foo/bar/
    ```

2. 替换当前行所有匹配到的模式

    ```tex
    :s/foo/bar/g
    ```

3. 替换当前文件中所有匹配到的模式

    ```tex
    :%s/foo/bar/g
    ```

4. 删除当前行中所有匹配到的模式

    ```tex
    :s/foo//g
    ```



## 替换前进行确认

每次替换前进行确认操作：

```tex
:s/foo/bar/gc
```

执行上面命令后，会输出：

```tex
replace with bar (y/n/a/q/l/^E/^Y)?
```

含义:

- y: 确认替换
- n: 跳过当前模式
- a: 替换所有匹配的模式
- q: 确认替换并退出，也可以直接按 `ESC` 达到相同目的
- ^E: 为 `Ctrl + E`，往上翻屏
- ^Y: 为 `Ctrl + Y`，往下翻屏



## 使用正则搜索

搜索模式可以使用正则，比如：将文件中所有以 foo 开头的行 替换为 Vim is the best，并确认每一步操作

```tex
:%s/^foo.*/Vim is the best/gc
```

`^` 表示从行的开始进行模式匹配，`.*` 表示匹配任何字符



## 大小写敏感性

默认是大小写敏感的，即模式 `foo` 无法匹配到 `Foo`。

#### 忽略大小写敏感

在 `flag` 位置使用 `i` 字符 或 在模式中加入 `\c`

```tex
:%s/foo/bar/gi

:%s/foo\c/bar/g
```

#### 对大小写敏感

在 `flag` 位置使用 `I` 字符 或 在模式中加入 `\C`

```tex
:%s/foo/bar/gI

:%s/foo\C/bar/g
```



## 控制搜索范围

如果没有指定搜索范围，则默认搜索当前行，在上面的使用中，已经知道 `%` 控制的范围是整个文件。

范围作用于行，可以使用行号或者特殊符号指定，分割使用 `,` 或 `;`

1. 搜索第3行到第10行，并替换

    ```tex
    :3,10s/foo/bar/g
    ```

2. 搜索当前行到行尾的范围，并替换

    ```tex
    :.,$s/foo/bar/g
    ```

    - `.`: 代表当前行
    - `$`: 代表行尾

3. 从当前行开始，向下搜索4行，并替换

    ```tex
    :.,+4s/foo/bar/g
    ```

    可以使用 `+` 或 `-` 控制从指定的行加或者减（向下或者向上）多少行用于搜索

    - `+`: 搜索范围从指定行向下增加多少行
    - `-`: 搜索范围从指定行向上减少多少行



## 按照词进行匹配

默认的匹配模式都是基于字符的，比如 `gnu` 可以匹配到 `gnu`、`cygnus`、 `magnum` ，如果我只想匹配到 `gnu`，则可以控制模式匹配按词的方式进行。

`\<` 标识词的开始，`\>` 标识词的结束

搜索当前行 词为 `foo` 的并替换

```tex
:s/\<foo\>/bar/g
```

搜索词也可以使用 [very magic](https://vim.fandom.com/wiki/Simplifying_regular_expressions_using_magic_and_no-magic) 模式

```shell
:/\v<foo>
```

## 搜索历史

使用 `:s` 调出搜索历史，然后使用 上下方向键 选择之前的操作，按 Enter 可执行选中的命令，当然，执行前也可以编辑历史命令。



## Demo

注释 5 到 20 行 (在5到20行前加 #) ：

```tex
:5,20s/^/#/
```

取消注释 5 到 20 行 (删除5到20行前的 #) ：

```tex
:5,20s/^#//
```

将 `apple`、`orange`、 `mango` 替换为 `fruit`:

```tex
:s/apple\|orange\|mango/fruid/g
```

删除每行行尾空格

```tex
:s/\s\+$//e
```

