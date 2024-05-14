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
| -e   | 允许指定一个或多个模式进行搜索。你可以多次使用 `-e` 选项来指定多个模式 |
| -E   | -e 的拓展，可以使用更多的元字符和语法来描述模式，例如使用`+`来匹配一个或多个重复的字符，使用`|`来表示逻辑或等等 |



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



## AND, OR, NOT 运算符实例

**问题：**您能否通过一些示例解释如何在 Unix grep 命令中使用 OR、AND 和 NOT 运算符？

**答：**在 grep 中，我们有与 OR 和 NOT 运算符等效的选项。没有 grep AND 运算符。但是，您可以使用模式模拟 AND。下面提到的示例将帮助您了解如何在 Linux grep 命令中使用 OR、AND 和 NOT。

以下示例中使用了以下employee.txt 文件。

```javascript
$ cat employee.txt
100  Thomas  Manager    Sales       $5,000
200  Jason   Developer  Technology  $5,500
300  Raj     Sysadmin   Technology  $7,000
400  Nisha   Manager    Marketing   $9,500
500  Randy   Manager    Sales       $6,000
```

### OR 运算符

对 grep OR 使用以下 4 种方法中的任何一种。

#### 1.Grep OR 使用 \|

如果使用不带任何选项的 grep 命令，则需要使用 \| 为 or 条件分隔多个模式。

```javascript
grep 'pattern1\|pattern2' filename
```

例如，从employee.txt 文件中grep Tech 或Sales。如果管道前面没有反斜杠，以下将不起作用。

```javascript
$ grep 'Tech\|Sales' employee.txt
100  Thomas  Manager    Sales       $5,000
200  Jason   Developer  Technology  $5,500
300  Raj     Sysadmin   Technology  $7,000
500  Randy   Manager    Sales       $6,000
```

#### 2. Grep OR使用 -E

grep -E 选项用于扩展正则表达式。如果您使用带有 -E 选项的 grep 命令，您只需要使用 | 为 or 条件分隔多个模式。

```javascript
grep -E 'pattern1|pattern2' filename
```

例如，从employee.txt 文件中grep Tech 或Sales。只需使用 | 分隔多个 OR 模式。

```javascript
$ grep -E 'Tech|Sales' employee.txt
100  Thomas  Manager    Sales       $5,000
200  Jason   Developer  Technology  $5,500
300  Raj     Sysadmin   Technology  $7,000
500  Randy   Manager    Sales       $6,000
```

#### 3. Grep OR 使用 egrep

egrep 与'grep -E' 完全相同。因此，使用 egrep（不带任何选项）并为 or 条件分隔多个模式。

```javascript
egrep 'pattern1|pattern2' filename
```

例如，从employee.txt 文件中grep Tech 或Sales。只需使用 | 分隔多个 OR 模式。

```javascript
$ egrep 'Tech|Sales' employee.txt
100  Thomas  Manager    Sales       $5,000
200  Jason   Developer  Technology  $5,500
300  Raj     Sysadmin   Technology  $7,000
500  Randy   Manager    Sales       $6,000
```

#### 4. Grep OR 使用 grep -e

使用 grep -e 选项，您只能传递一个参数。在单个命令中使用多个 -e 选项可为 or 条件使用多个模式。

```javascript
grep -e pattern1 -e pattern2 filename
```

例如，从employee.txt 文件中grep Tech 或Sales。将多个 -e 选项与 grep 一起用于多个 OR 模式。

```javascript
$ grep -e Tech -e Sales employee.txt
100  Thomas  Manager    Sales       $5,000
200  Jason   Developer  Technology  $5,500
300  Raj     Sysadmin   Technology  $7,000
500  Randy   Manager    Sales       $6,000
```

### AND 运算符

#### 1. Grep AND 使用 -E 'pattern1.*pattern2'

grep 中没有 AND 运算符。但是，您可以使用 grep -E 选项模拟 AND。

```javascript
grep -E 'pattern1.*pattern2' filename
grep -E 'pattern1.*pattern2|pattern2.*pattern1' filename
```

下面的示例将 grep 所有包含“Dev”和“Tech”的行（以相同的顺序）。

```javascript
$ grep -E 'Dev.*Tech' employee.txt
200  Jason   Developer  Technology  $5,500
```

以下示例将 grep 中包含“Manager”和“Sales”的所有行（以任何顺序）。

```javascript
$ grep -E 'Manager.*Sales|Sales.*Manager'employee.txt
```

#### 2. Grep AND 使用多个 grep 命令

您还可以使用多个由管道分隔的 grep 命令来模拟 AND 场景。

```javascript
grep -E 'pattern1' filename | grep -E 'pattern2'
```

下面的示例将 grep 在同一行中同时包含“Manager”和“Sales”的所有行。

```javascript
$ grep Manager employee.txt | grep Sales
100  Thomas  Manager    Sales       $5,000
500  Randy   Manager    Sales       $6,000
```

### NOT 运算符

#### 1. Grep NOT使用 grep -v

使用 grep -v 可以模拟 NOT 条件。**-v 选项用于反转匹配**。即它匹配除给定模式之外的所有行。

```javascript
grep -v 'pattern1' filename
```

例如，显示除包含关键字“Sales”之外的所有行。

```javascript
$ grep -v Sales employee.txt
200  Jason   Developer  Technology  $5,500
300  Raj     Sysadmin   Technology  $7,000
400  Nisha   Manager    Marketing   $9,500
```

您还可以将 NOT 与其他运算符结合以获得一些强大的组合。

例如，以下将显示经理或开发人员（机器人忽略销售）。

```javascript
$ egrep 'Manager|Developer' employee.txt | grep -v Sales
200  Jason   Developer  Technology  $5,500
400  Nisha   Manager    Marketing   $9,500
```



