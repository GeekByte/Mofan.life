---
title: 'Linux grep 命令 - 文本搜索工具'
categories:
  - Linux
  - Linux Command
tags:
  - Linux
  - Linux Command
date: 2022-12-27 16:04:42
---



通过模式匹配在各个文件中搜索，“global search regular expression and print out the line”的缩写。



## 参数及作用

| 参数 | 作用                                                         |
| ---- | ------------------------------------------------------------ |
| -l   | 只列出符合条件的文件名                                       |
| -L   | 只列出不符合条件的文件名                                     |
| -n   | 列出所有匹配行，并显示行号                                   |
| -h   | 查询多个文件时不显示文件名，类似只查询一个文件时默认不显示文件名 |
| -c   | 列出每个文件中匹配到的行数，配合 -v 列出不符合匹配条件的行数 |
| -i   | 忽略大小写                                                   |
| -s   | 不显示不存在、没有匹配文本的错误信息                         |
| -w   | 按词匹配                                                     |
| -x   | 按行匹配                                                     |
| -r   | 递归搜索                                                     |
| -F   | 匹配固定字符串的内容，不支持正则                             |
| -q   | 禁止输出任何结果，以退出状态表示搜索是否成功，0: 匹配到，1: 没匹配到，2: 有错误 |



## 例子

**搜索某个文件中，包含某个关键词的内容**

```sh
grep root /etc/passwd

root:x:0:0:root:/root:/bin/bash
operator:x:11:0:operator:/root:/sbin/nologin
```

**搜索某个文件中，以某个关键词开头的内容**

```sh
grep ^root /etc/passwd

root:x:0:0:root:/root:/bin/bash
```

**搜索多个文件中，包含某个关键词的内容**

```sh
grep linuxprobe /etc/passwd /etc/shadow

/etc/passwd:linuxprobe:x:1000:1000:linuxprobe:/home/linuxprobe:/bin/bash
/etc/shadow:linuxprobe:$6$9Av/41hCM17T2PrT$hoggWJ3J/j6IqEOSp62elhdOYPLhQ1qDho7hANcm5fQkPCQdib8KCWGdvxbRvDmqyOarKpWGxd8NAmp3j2Ln00::0:99999:7:::
```

**搜索多个文件中，包含某个关键词的内容，不显示文件名称**

```sh
grep -h linuxprobe /etc/passwd /etc/shadow

linuxprobe:x:1000:1000:linuxprobe:/home/linuxprobe:/bin/bash
linuxprobe:$6$9Av/41hCM17T2PrT$hoggWJ3J/j6IqEOSp62elhdOYPLhQ1qDho7hANcm5fQkPCQdib8KCWGdvxbRvDmqyOarKpWGxd8NAmp3j2Ln00::0:99999:7:::
```

**输出每个文件中，某个关键词的数量**

```sh
grep -c root /etc/passwd /etc/shadow

/etc/passwd:2
/etc/shadow:1
```

**搜索文件中，关键词所在行号及内容**

```sh
grep -n network anaconda-ks.cfg 

17:network  --bootproto=static --device=ens160 --ip=192.168.10.10 --netmask=255.255.255.0 --onboot=off --ipv6=auto --activate
18:network  --hostname=linuxcool.com
```

**搜索文件中，不包含关键词的内容**

```sh
grep -v nologin /etc/passwd

root:x:0:0:root:/root:/bin/bash
sync:x:5:0:sync:/sbin:/bin/sync
shutdown:x:6:0:shutdown:/sbin:/sbin/shutdown
halt:x:7:0:halt:/sbin:/sbin/halt
linuxprobe:x:1000:1000:linuxprobe:/home/linuxprobe:/bin/bash
```

**搜索指定目录中，包含关键词的文件，不包含则提示**

如果不需要提示，加 `-s` 参数。

```sh
grep -l root *

anaconda-ks.cfg
grep: Desktop: Is a directory
grep: Documents: Is a directory
grep: Downloads: Is a directory
initial-setup-ks.cfg
grep: Music: Is a directory
grep: Pictures: Is a directory
grep: Public: Is a directory
grep: Templates: Is a directory
grep: Videos: Is a directory


grep -ls root *

anaconda-ks.cfg
initial-setup-ks.cfg
```

**搜索指定目录及子目录中包含关键词的文件**

```sh
grep -lsr root /etc

/etc/fstab
/etc/X11/xinit/Xclients
/etc/X11/xinit/xinitrc
/etc/libreport/events.d/collect_dnf.conf
/etc/libreport/events.d/bugzilla_anaconda_event.conf
/etc/libreport/forbidden_words.conf
```

**搜索某文件中，整行为关键词的内容，并输出行号**

```sh
grep -x cd anaconda-ks.cfg

grep -xn cdrom anaconda-ks.cfg

5:cdrom
```

**判断某个文件中，是否包含某个关键词，通过返回状态值输出结果（0为包含，1为不包含，2为有错误），方便在Shell脚本中判断和调用**

```sh
grep -q linuxprobe anaconda-ks.cfg
echo $?

0

grep -q linuxcool anaconda-ks.cfg 
echo $?

1
```

**搜索文件中，空行的数量**

```sh
grep -c ^$ anaconda-ks.cfg 

6
```

