---
title: Shell脚本之变量
categories:
  - 编程语言
  - Shell
tags:
  - Linux
  - Shell
date: 2021-07-31 13:14:10
---

## 注释

单行注释 `#`

```shell
# hello, world
```

多行注释

```shell
:<<EOF
内容1...
内容2...
内容3...
EOF
```

EOF 也可以只用别的符号代替。

## 变量

### 定义变量

关于 Shell 的变量，首先记住两点：一是定义不加 `$`，使用才加；二是 `=` 两边没空格。

另外，只需稍加注意下变量名的命名规则：

* 命名只能使用英文字母，数字和下划线，首个字符不能以数字开头。
* 中间不能有空格，可以使用下划线 `_`。
* 不能使用标点符号。
* 不能使用bash里的关键字（可用help命令查看保留关键字）。

```sh
# 有效变量
ABCD
A_B_C
_abcd
abc123

# 无效变量
?ABc
a*b=abc
```

除了使用显示赋值，还可以使用语句给变量赋值：

```shell
# 下面是将 /etc 目录下的文件名循环出来，file 变量代表命令执行结果中的元素
for file in `ls /etc`
或
for file in $(ls /etc)
```

### 使用变量

变量的使用只需在变量前加上 `$` 即可。

```shell
my_name="mofan"

echo $my_name
或
echo ${my_name}

# {}是可选的，主要是帮助解释器识别边界，例如下面，不加会引发错误。
for skill in Ada Coffe Action Java; do
    echo "I am good at ${skill}Script"
done
```

### 重新定义变量

已定义变量可以重新定义，但要记住，定义变量不加 `$`，使用才加。

```shell
your_name="baitong"
echo $your_name

# 变量重新定义
your_name="geekbyte"
echo $your_name
```

### 只读变量

通过`readonly var1 var2 var3`指定哪些变量只读。

```shell
# 定义只读变量
my_name="mofan"
readonly my_name
my_name="mofankk"
# 发生错误： /bin/sh: NAME: This variable is read only.
```

### 删除变量

通过`unset var1 var2 var3`指定删除哪些变量。

```shell
a="abc"
b="bcd"
unset a b
echo $a
# 输出一个空行
```

### 变量类型

运行shell时，会同时存在三种变量：

- **局部变量** 局部变量在脚本或命令中定义，仅在当前shell实例中有效，其他shell启动的程序不能访问局部变量。
- **环境变量** 所有的程序，包括shell启动的程序，都能访问环境变量，有些程序需要环境变量来保证其正常运行。必要的时候shell脚本也可以定义环境变量。
- **shell变量** shell变量是由shell程序设置的特殊变量。shell变量中有一部分是环境变量，有一部分是局部变量，这些变量保证了shell的正常运行

## 字符串

### 定义

对于字符串的定义，可以用单引号、双引号，也可以不用引号。

单引号和双引号定义字符串存在一些区别：

* 单引号对字符串的限制
	* 单引号中的**任何字符**都会**原样输出**，所以，单引号中的变量是无效的，会被原样输出。
	* 单引号字符串中不能出现单独的单引号（使用转义字符也不行），但可出现成对的单引号。
* 双引号
	* 双引号里可以有变量
	* 双引号里可以出现转义字符

### 字符串拼接

```shell
my_name="mofan"

# 使用双引号拼接
str_a="hello, "$my_name"!"
str_b="hello, ${my_name}!"
echo $str_a $str_b

# 使用单引号拼接 （重点关注下这两个的输出结果）
str_c='hello, '$my_name'!'
str_d='hello, ${my_name}!'
```

输出结果：

```tex
hello, mofan! hello, mofan!
hello, mofan! hello, ${my_name}!
```

### 获取字符串长度

注意，这里不是用`len` `length` 等获取，而是用 `#`。

```shell
str="hello,world"
echo ${#str}
# 输出 11
```

### 提取子字符串

格式：`${变量名:起始值:结束值}`

注意字符串字符的位置从`0`开始计算。

```shell
str="hello,world"
echo ${str:6:11}
# 输出 world
```

## 数组

### 定义

数组定义在一行的，要用 空格 分隔。形式如下：

```shell
arr=(val0 val1 val2 val3)
# 或
arr=(
val0
val1
val2
val3
)
# 或 单独定义数组的各个分量，下标可以不连续，而且没有范围
arr[0]=val0
arr[1]=val1
arr[n]=valn
```

### 读取

```shell
${数组名[下标]}

# 读取全部元素，用 @ 或 *
${数组名[@]}
# or
${数组名[*]}
```

### 获取数组长度

```shell
len=${#数组名[@]}
# or
len=${#数组名[*]}

# 读取数组里单个元素的长度
len=${#数组名[下标]}
```
