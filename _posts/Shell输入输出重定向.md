---
title: Shell脚本之输入输出重定向
categories:
  - Linux
  - Shell
tags:
  - Linux
  - Shell
date: 2021-07-31 13:14:40
---

一个命令通常从一个叫标准输入的地方读取输入，默认情况下，这恰好是你的终端。同样，一个命令通常将其输出写入到标准输出，默认情况下，这也是你的终端。

重定向一般通过在命令间插入特定的符号来实现。

**重定向符号列表如下：**

| 命令            | 说明                                                    |
| :-------------- | :------------------------------------------------------ |
| command > file  | 将输出重定向到 file，注意 file 中已存在的内容会被覆盖。 |
| command < file  | 将输入重定向到 file。                                   |
| command >> file | 将输出以追加的方式重定向到 file。                       |
| n > file        | 将文件描述符为 n 的文件重定向到 file。                  |
| n >> file       | 将文件描述符为 n 的文件以追加的方式重定向到 file。      |
| n >& m          | 将输出文件 m 和 n 合并。                                |
| n <& m          | 将输入文件 m 和 n 合并。                                |
| << tag          | 将开始标记 tag 和结束标记 tag 之间的内容作为输入。      |

> *文件描述符 0 通常是标准输入（STDIN），1 是标准输出（STDOUT），2 是标准错误输出（STDERR）。*

#### 输出重定向

```shell
# 将 who 命令执行结果输出到 users 文件中
# > 会覆盖 users 中已有的内容
$ who > users

# 查看
$ cat users
输出结果：
cyp      console  Jul 31 15:50
cyp      ttys000  Jul 31 18:39

# >> 将 who 命令执行结果 追加 到 users 文件中（在最后一行的下一行追加）
$ who >> users
```

#### 输入重定向

```shell
# 统计users文件中的行数(注意我执行了上面的 who >> users, 所以这里是4)

# 默认使用标准输入
$ wc -l users
       4 users

# 采用输入重定向
$ wc -l < users
       4
```

**注意：**上面第一个输出有 users，第二个没有，原因是第一个是标准输入，读取的是 users整个文件本身，所以结果里带着文件的名称，第二个是出入重定向，输入的是文件内的内容，所以只输出了文件里内容的行数。

#### 同时使用输入重定向与输出重定向

格式：`command1 < infile > outfile`

从 infile 中读取内容，将结果写入 outfile。注意 `>` 也可以替换成`>>` 进行追加。

```shell
#  继续使用users，读取users内容，输出到nums
$ wc -l < users > nums
$ cat users
cyp      console  Jul 31 15:50
cyp      ttys000  Jul 31 18:39
cyp      console  Jul 31 15:50
cyp      ttys000  Jul 31 18:39
$ cat nums
       4
```

#### 重定向深入理解

一般情况下，每个 Unix/Linux 命令运行时都会打开三个文件：

- 标准输入文件(stdin)：stdin的文件描述符为0，Unix程序默认从stdin读取数据。
- 标准输出文件(stdout)：stdout 的文件描述符为1，Unix程序默认向stdout输出数据。
- 标准错误文件(stderr)：stderr的文件描述符为2，Unix程序会向stderr流中写入错误信息。

默认情况下，command > file 将 stdout 重定向到 file，command < file 将stdin 重定向到 file。

```shell
# 将 stderr 重定向到 err_file
$ command 2>err_file
# 或者追加
$ command 2>>err_file

# 将 stderr 与 stdout 合并后追加到 outfile
$ command > file 2>&1
# 或者追加
$ command >> file 2>&1
```

> *这里的* **2** *和* **>** *之间不可以有空格，***2>** *是一体的时候才表示错误输出。*

#### Here Document

Here Document 是 Shell 中的一种特殊的重定向方式，用来将**输入重定向到一个交互式 Shell 脚本或程序**。

形式：

```shell
command << delimiter
    document
delimiter
```

作用是将两个 delimiter 之间的内容(document) 作为输入传递给 command。

> **注意：**
>
> - shell脚本文件中结尾的delimiter 一定要顶格写，前面不能有任何字符，后面也不能有任何字符，包括空格和 tab 缩进。
> - 开始的delimiter前后的空格会被忽略掉。

```shell
# 把上面输入重定向那块的内容拷贝过来作为输入
$ wc -l << EOF
heredoc> cyp      console  Jul 31 15:50
cyp      ttys000  Jul 31 18:39
cyp      console  Jul 31 15:50
cyp      ttys000  Jul 31 18:39
heredoc> EOF
       4
```

#### /dev/null 文件

/dev/null 是一个特殊的文件，写入到它的内容都会被丢弃；如果尝试从该文件读取内容，那么什么也读不到。但是 /dev/null 文件非常有用，将命令的输出重定向到它，会起到"禁止输出"的效果。

```shell
# 不想在屏幕上显示输出结果
$ command > /dev/null
# 屏蔽 stdout 和 stderr
$ command > /dev/null 2>&1
```

