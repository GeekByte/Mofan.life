---
title: Git 常用命令
categories:
  - Tools
  - Git
tags:
  - Tools
  - Git
date: 2021-04-14 09:02:34
---

## 提交记录

#### 查看提交历史

```shell
git log
```

#### 切换到某次提交

此操作不会删除本地修改，适用于只编译某次提交的场景。

```sh
git checkout <版本号>
```

#### 回退到某次提交并删除本地修改

```shell
git reset --hard <版本号>

# 版本号不需要全写，可以只写前几位，但要保证 git 能通过前几位找到唯一一条记录。
```

#### 强制推送到服务器

```shell
git push -f origin <分支名>
```



## 配置信息

`git` 中通过 `git config` 查看配置信息
`config` 配置有`system`级别、 `global（用户级别）` 和`local（当前仓库）`三个
配置的读取顺序: `system` --> `global` -->`local` ，所以底层配置会覆盖高层的配置。

#### 查看系统config

```shell
git config --system --list
```

#### 查看当前用户（global）配置

```shell
git config --global  --list
```

#### 查看当前仓库配置信息

```shell
git config --local  --list
```



## Tag


#### 删除本地tag
```shell
git tag -d <tagname>
```

#### 删除远端tag
```shell
git push origin --delete <tagname>
```


#### 向远端推送本地tag
```shell
git push origin <tagname>
```


#### 向远端推送本地所有tag
```shell
git push origin --tags
```



## 分支

#### 查看分支创建时间与创建者

```sh
git for-each-ref --format='%(committerdate) %09 %(authorname) %09 %(refname)' | sort -k5n -k2M -k3n -k4n
```

#### 批量删除分支

批量删除远程含有 `fix-` 的分支

```sh
git branch -r | grep 'fix-' | cut -b 10- | xargs git push --delete origin
```

批量删除本地含有 `fix-` 的分支

```sh
git branch | grep 'fix-' | cut -b 10- | xargs git branch -d 
```

>  `cut -b 10-`  从标准输入中删除 10 个字节
