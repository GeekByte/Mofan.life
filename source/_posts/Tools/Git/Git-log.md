---
title: Git log
categories:
  - Tools
  - Git
tags:
  - Git
date: 2023-11-17 13:30:57
---



### 查看提交记录

```txt
$ git log

commit fbbbe083aed75b24f2c77b1825ecab10def0953c (HEAD -> dev, origin/dev)
Author: tux <tux@example.com>
Date:   Sun Nov 5 21:40:37 2020 +1300

    exit immediately from failed download

commit 094f9948cd995acfc331a6965032ea0d38e01f03 (origin/master, master)
Author: Tux <tux@example.com>
Date:   Fri Aug 5 02:05:19 2020 +1200

    export makeopts from etc/example.conf

commit 76b7b46dc53ec13316abb49cc7b37914215acd47
Author: Tux <tux@example.com>
Date:   Sun Jul 31 21:45:24 2020 +1200

    fix typo in help message
```

#### 过滤提交者

当前分支某作者的提交

```sh
$ git log --author="Adam"
```

通过 `--all` 查看所有分支某作者的提交

```sh
git log --all --author="Adam"
```

使用正则匹配多个提交者

```sh
git log --author="\(Adam\)\|\(Jon\)"
```

过滤提交者

```sh
git log --author='^(?!Adam|Jon).*$' --perl-regexp
```

通过 shell 过滤提交者

```sh
git log --format='%H %an' | 
  grep -v Adam | 
  cut -d ' ' -f1 | 
  xargs -n1 git log -1
```

Refer: https://stackoverflow.com/questions/4259996/how-can-i-view-a-git-log-of-just-one-users-commits

### 查看有历史和文件改动情况

还有个简单的命令 `git whatchanged` ，简单记就是 `Git, what changed?`，如果提示 `git-split-diffs command not found`， 安装一下`npm install -g git-split-diffs` ，[github 传送门](https://github.com/banga/git-split-diffs)

```sh
$ git log --raw

commit fbbbe083aed75b24f2c77b1825ecab10def0953c (HEAD -> dev, origin/dev)
Author: tux <tux@example.com>
Date:   Sun Nov 5 21:40:37 2020 +1300

    exit immediately from failed download

:100755 100755 cbcf1f3 4cac92f M        src/example.lua

commit 094f9948cd995acfc331a6965032ea0d38e01f03 (origin/master, master)
Author: Tux <tux@example.com>
Date:   Fri Aug 5 02:05:19 2020 +1200

    export makeopts from etc/example.conf
    
:100755 100755 4c815c0 cbcf1f3 M     src/example.lua
:100755 100755 71653e1 8f5d5a6 M     src/example.spec
:100644 100644 9d21a6f e33caba R100  etc/example.conf  etc/example.conf-default

commit 76b7b46dc53ec13316abb49cc7b37914215acd47
Author: Tux <tux@example.com>
Date:   Sun Jul 31 21:45:24 2020 +1200

    fix typo in help message

:100755 100755 e253aaf 4c815c0 M        src/example.lua
```

通过 `--raw` 可以查看哪些文件被 添加/删除/修改

* A：添加(added)
* M：修改(modified)
* R：重命名(renamed)
* D：删除(deleted)

### 查看文件的修改的内容

```sh
$ git log --patch

commit 62a2daf8411eccbec0af69e4736a0fcf0a469ab1 (HEAD -> master)
Author: Tux <Tux@example.com>
Date:   Wed Mar 10 06:46:58 2021 +1300

    commit

diff --git a/hello.txt b/hello.txt
index 65a56c3..36a0a7d 100644
--- a/hello.txt
+++ b/hello.txt
@@ -1,2 +1,2 @@
 Hello
-world
+opensource.com
```

