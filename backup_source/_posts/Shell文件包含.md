---
title: Shell脚本之引入外部脚本文件
categories:
  - 编程语言
  - Shell
tags:
  - Linux
  - Shell
date: 2021-07-31 13:14:50
---



和其他语言一样，Shell 也可以包含外部脚本。这样可以很方便的封装一些公用的代码作为一个独立的文件。

Shell 文件包含的语法格式如下：

```shell
. filename   # 注意点号(.)和文件名中间有一空格
# 或
source filename
```

测试：

```shell
# 创建t1.sh
$ vim t1.sh

# 输入
url="https://www.mofan.life"

# 创建 t2.sh
vim t2.sh

# 输入
. t1.sh
echo "Welcomt to ${url} ！！！"

# 执行结果
Welcome to https://www.mofan.life ！！！
```

**注：** *被包含的文件 test1.sh 不需要可执行权限。*

