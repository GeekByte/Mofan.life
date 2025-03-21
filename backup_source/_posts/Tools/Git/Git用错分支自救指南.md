---
title: Git用错分支自救指南
categories:
  - Tools
  - Git
tags:
  - Tools
  - Git
date: 2021-08-16 00:50:14
---

有时候自己分支正在开发东西，但是中途切换到其他分支做了修复 bug 等事情，导致下次写代码时忘记切回自己分支。

### 没有推送到远端

```shell
# 把所有改动暂存
git add .

# 把暂存的改动提交到 git 的暂存栈
git stash

# 切换到本该用来开发代码的分支（假设是xxx)
git checkout xxxx

# 将暂存栈中的代码取出来
git stash pop
```

你会发现在其他分支上写的代码完美的回到了自己要用的分支上，这时候，是提交还是继续编写就看你了。

### 推送到远端了

出现这种情况一般是用 jetbrans 开发的工具了，因为它的代码提交实在方便，如果不是在 push 前看一眼那不太清晰的分支标识，真的不太容易发现自己用错了分支。

```shell
# 切到提交了代码的分支，也就是你用错的分支（假设是xxx）
git checkout xxx

# 把最近一次提交放到暂存区
git reset HEAD-1

# 将修改放到暂存栈
git stash

# 切换到你想用的代码分支（假设是yyy）
git checkout yyy

# 将修改从暂存栈取出来
git stash pop
```

现在你可以在自己的分支上提交，但是别忘了要干掉推送到远端的那个错误分支的代码。

```shell
# 切到用错的分支
git checkout xxx

# 强制推送（因为上一步进行了回退，所以，这次提交的是你错误提交前的代码，以此将错误的提交信息干掉）
# xxx 是你用错的分支，要指定一下
git push origin xxx -f 
```



