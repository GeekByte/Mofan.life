---
title: 'Linux wc 命令'
categories:
  - Linux
  - Linux Command
tags:
  - Linux
  - Linux Command
date: 2022-03-24 18:05:40
---

`wc` 命令用于统计文件的行数、字符数以及字节数信息。

#### 命令格式

wc [选项] 文件...

选项有：

- -l 统计行数

- -c 统计字节数（一个中文字符占 3 个字节）
- -m 统计字符数，不能和 `-c` 连用（一个中文字符占 1 个字符）
- -w 统计字数（一个字被定义为由`空白`、`跳格`或`换行字符`分隔的字符串）

注：选项可组合使用，但 `-m` 和 `-c` 不能组合使用，如果组合使用，或者不使用任何参数，则打印的结果从左到右分别是：行数、字数、字节数、文件名。

#### 使用实例

##### 1.统计一个文件信息

```shell
$ wc testfile           # testfile文件的统计信息  
3 92 598 testfile       # testfile文件的行数为3、单词数92、字节数598 
```

##### 2.统计多个文件信息

```shell
$ wc testfile testfile_1 testfile_2  #统计三个文件的信息  
3 92 598 testfile                    #第一个文件行数为3、单词数92、字节数598  
9 18 78 testfile_1                   #第二个文件的行数为9、单词数18、字节数78  
3 6 32 testfile_2                    #第三个文件的行数为3、单词数6、字节数32  
15 116 708 总用量                    #三个文件总共的行数为15、单词数116、字节数708 
```

##### 3.配合 cat 使用，统计文件信息，但不打印文件名

```shell
 $ cat password.md | wc 
      20      22     205
```

##### 4.其他

```shell
$ echo -n "你好，Mofan" | wc -c #中文共9个字节，英文5个，所以输出14
14

$ ls -l | grep '^d'| wc -l # 当前子目录的数量

$ ls -l | grep '^-'| wc -l # 当前目录下文件的数量

$ cat /etc/password | wc -l # 当前系统用户数

$ find / -name "*.sh" | xargs cat | grep -v "^$" | wc -l # 统计目录下所有shell脚本行数（去除空行） 

$ last | grep [a-zA-Z] | grep -v "wtmp" | wc -l # 统计最近一个月登录用户数
```

