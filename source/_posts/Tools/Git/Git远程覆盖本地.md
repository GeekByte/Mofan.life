---
title: Git远程覆盖本地
categories:
  - Tools
  - Git
tags:
  - Git
date: 2022-12-20 17:46:56
---

1. 将远程更新拉回本地

```sh
git fetch --all
```

2. 用远程分支代码替换本地工作区、暂存区代码

```sh
git reset --hard origin/main
```

3. 同步远程仓库代码

```sh
git pull origin main
```


简写

```sh
git fetch --all && git reset --hard origin/main && git pull
```

