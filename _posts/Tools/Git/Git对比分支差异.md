---
title: Git对比分支差异
categories:
  - Tools
  - Git
tags:
  - Tools
  - Git
date: 2022-03-15 23:50:46
---

### 1. 显示出 branch1 和 branch2 中差异的部分
```sh
git diff branch1 branch2 --stat
```

### 2. 显示指定文件的详细差异
```sh
git diff branch1 branch2 <具体文件路径>
```

### 3. 显示出所有有差异的文件的详细差异
```sh
git diff branch1 branch2
```

### 4. 查看branch1分支有，而branch2中没有的log
```sh
git log branch1 ^branch2
```

### 5. 查看branch2中比branch1中多提交了哪些内容
```sh
git log branch1..branch2
```
注意，列出来的是两个点后边（此处即branch2）多提交的内容。

### 6. 不知道谁提交的多谁提交的少，单纯想知道有什么不一样
```sh
git log branch1...branch2
```

7. 在上述情况下，在显示出每个提交是在哪个分支上
```sh
git log -lefg-right branch1...branch2
```
注意 commit 后面的箭头，根据我们在 –left-right branch1…branch2 的顺序，左箭头 < 表示是 branch1 的，右箭头 > 表示是branch2的。
