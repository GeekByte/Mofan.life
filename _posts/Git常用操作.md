---
title: Git常用操作
categories:
  - 工具
  - Git
tags:
  - Git
date: 2021-04-14 09:02:34
---

> 不定时更新，附上一个学习Git的网站：[Git教程 - 廖雪峰的官方网站](https://www.liaoxuefeng.com/wiki/896043488029600)

### 回退到指定版本

#### 查看提交历史

```shell
git log
```

#### 回退到指定版本

```shell
git reset --hard <版本号>

# 版本号不需要全写，可以只写前几位，具体几位要看git能不能根据此只找到一条记录，比如你只写一位可能找到很多条包含前一位的记录，这是不行的
```

#### 强制推送到服务器

```shell
shellgit push -f origin master
```

### 查看Git的配置信息

`git` 中通过 `git config` 查看配置信息
`config` 配置有`system`级别 `global（用户级别）` 和`local（当前仓库）`三个
配置的读取顺序: `system` --> `global` -->`local` ，所以，底层的配置会覆盖高层的配置。

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

### Git打tag与撤销tag


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

