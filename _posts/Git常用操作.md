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

查看提交历史

```shell
git log
```

回退到指定版本

```shell
git reset --hard <版本号>

# 版本号不需要全写，可以只写前几位，具体几位要看git能不能根据此只找到一条记录，比如你只写一位可能找到很多条包含前一位的记录，这是不行的
```

强制推送到服务器

```shell
shellgit push -f origin master
```

