---
title: 执行Shell脚本自动kill上次执行创建的进程
categories:
  - 编程语言
  - Shell
tags:
  - Shell
date: 2021-03-03 22:38:24
---

当项目启动需要指定很多参数时，每次启动都需要写很长的指令，于是考虑将启动指令写成脚本形式，于是产生了一个问题，第一次启动项目使用脚本可以正常启动，但是第二次就会报网络地址或者端口占用的错误，所以，需要每次执行脚本的时候，kill 掉上次的进程，然后启动。于是就有了下面的脚本：

```bash
#/bin/bash
PROCESS=`ps -ef|grep './go-admin server'|grep -v grep|grep -v PPID|awk '{ print $2}'`
for i in $PROCESS
do
    if [ -z $i ]
    then
        echo "No process run"
    else
        echo "Kill the go-admin process [ $i ]"
        kill $i
    fi
done

echo "Start run go-admin"

go build
./go-admin server -c=config/settings.dev.yml
```

对上面的代码坐几点说明：

1. `PROCESS` 变量的值中有 `grep './go-admin server'` ，注意 `grep` 在进行匹配的时候是类似 `*Xxx*` 的前后全匹配方式，所以当有多个进程名字中都含有该值时，会返回多个进程ID，于是 `PROCESS` 变量是一个数组。
2. `PROCESS` 变量值中`awk '{ print $2}'` ，`awk` 文本处理命令，此处会返回进程信息中的第二个值。
3. `if [ -z $i]` 中的 `-z` ，是判断 `$i` 是否为空的。

当然，后面的 `kill` 命令，即使传入空值参数也不会产生问题，具体是否需要判断要根据实际情况来。该代码只是对一些特别的地方做了汇总而已。

 
