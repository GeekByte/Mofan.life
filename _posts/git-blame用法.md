---
title: git blame用法
categories:
  - 工具
  - Git
tags:
  - Git
date: 2021-04-19 18:34:45
---

在使用`Git`作为代码的版本控制系统时，有时候想查看下这行代码是谁写的或者谁修改的，可以使用`git blame`命令。

其具体用法为：

```shell
# 从文件第一行开始查看
git blame 文件名
# 指定行的范围查看,比如查看10-30行的代码
git blame 10,30 文件名
```

通过`Enter`进行换行，通过`Q`退出查看。

该命令的输出格式为:

```text
commit_ID | 代码提交作者 | 提交时间 | 代码位于文件中的行数 | 实际代码 
```



知道`commit_ID`后，可以使用命令`git show commit_ID`查看具体的改动情况。

