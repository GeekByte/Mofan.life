---
title: git restore命令
categories:
  - Git
tags:
  - Git
date: 2021-02-27 22:03:24
---
在执行 `git status` 命令查看文件状态时发现类似如下输出：
```text
Changes to be committed:                                                  
  (use "git restore --staged <file>..." to unstage) 
```
这才想起来有个文件忘了执行 `git commit` 就直接 push 了，也顺便了解了下 `git restore`命令。

|                命令                |                        作用                         |     备注      |
| :--------------------------------: | :-------------------------------------------------: | :-----------: |
| `git restore --worktree README.md` |        表示撤销 README.md 文件工作区的的修改        | 参数等同于 -W |
|  `git restore --staged README.md`  | 表示撤销暂存区的修改，将文件状态恢复到未 `add` 之前 | 参数等同于 -S |
| `git restore -s HEAD~1 README.md`  |       表示将当前工作区切换到上个 commit 版本        |               |
| `git restore -s dbv213 README.md`  |     表示将当前工作区切换到指定 commit id 的版本     |               |

