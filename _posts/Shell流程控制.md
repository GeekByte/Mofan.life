---
title: Shell脚本之流程控制
categories:
  - Linux
  - Shell
tags:
  - Linux
  - Shell
date: 2021-07-31 13:14:20
---

## if 条件语句

`if` 的语法结构为：

```shell
if condition1
then
    command1
elif condition2 
then 
    command2
else
    commandN
fi
```

**注意：** if 的流程控制不可为空，即符合条件的区域必须有内容。

```shell
a=10
b=20
if [ $a == $b ]
then
   echo "a 等于 b"
elif [ $a -gt $b ]
then
   echo "a 大于 b"
elif [ $a -lt $b ]
then
   echo "a 小于 b"
else
   echo "没有符合的条件"
fi
```

执行结果：

```tex
a 小于 b
```

`if` 语句常和 `test` 搭配使用：

```shell
num1=$[2*3]
num2=$[1+5]
if test $[num1] -eq $[num2]
then
    echo '两个数字相等!'
else
    echo '两个数字不相等!'
fi
```

执行结果：

```tex
两个数字相等!
```

## for 循环

### for in 循环

格式：

```shell
for var in item1 item2 ... itemN
do
    command1
    command2
    ...
    commandN
done

# 也可以写成一行
for var in item1 item2 ... itemN; do command1; command2… done;
```

in 列表可选，如果省略，for 循环将使用命令行的位置参数。

```shell
for loop in 1 2 3 4 5
do
    echo "The value is: $loop"
done

# 顺序输出字符串中的字串
for str in This is a string
do
    echo $str
done
```

### for(()) 循环

格式：

```shell
for((初始值;条件;计算));do
    commnd
done;
```

通常情况下 shell 变量调用需要加 $,但是 for 的 (()) 中不需要。

## while语句

格式：

```shell
while condition
do
    command
done
```

```shell
int=1
while(( $int<=5 ))
do
    echo $int
    let "int++"
done
```

> 上面例子使用了 Bash let 命令，它用于执行一个或多个表达式，变量计算中不需要加上 $ 来表示变量

while 可用于读取键盘信息：

```shell
echo '按下 <CTRL-D> 退出'
echo -n '输入你最喜欢的网站名: '
while read FILM
do
    echo "是的！$FILM 是一个好网站"
done
```

## 无限循环

格式：

```shell
while :
do
    command
done

# or

while true
do
    command
done

# or
for (( ; ; ))
```

## util 循环

until 循环执行一系列命令直至条件为 true 时停止。用的较少，一般用 while 即可

格式：

```shell
until condition
do
    command
done
```

输出 0 ～ 9 之间的数字：

```shell
a=0

until [ ! $a -lt 10 ]
do
   echo $a
   a=`expr $a + 1`
done
```

## case 多分支选择结构

**case ... esac** 为多选择语句，与其他语言中的 switch ... case 语句类似，是一种多分枝选择结构。

格式：

```shell
case 值 in
模式1)
    command1
    command2
    ...
    commandN
    ;;
模式2）
    command1
    command2
    ...
    commandN
    ;;
esac
```

> **注意：**
>
> 1.case 取值后面必须为单词 **in**
>
> 2.每个 case 分支用**右圆括号**开始
>
> 3.用两个分号 **;;** 表示 break，即执行结束，跳出整个 case ... esac 语句
>
> 4.esac（就是 case 反过来）作为结束标记。

```shell
echo '输入 1 到 4 之间的数字:'
echo '你输入的数字为:'
read aNum
case $aNum in
    1)  echo '你选择了 1'
    ;;
    2)  echo '你选择了 2'
    ;;
    3)  echo '你选择了 3'
    ;;
    4)  echo '你选择了 4'
    ;;
    *)  echo '你没有输入 1 到 4 之间的数字'
    ;;
esac
```

执行结果：

```tex
输入 1 到 4 之间的数字:
你输入的数字为:
3
你选择了 3
```

## break 与 continue 循环控制语句

### break

break 终止整个循环。

开启一个死循环，直到用户输入数字大于 5，则结束循环。

```shell
while :
do
    echo -n "输入 1 到 5 之间的数字:"
    read aNum
    case $aNum in
        1|2|3|4|5) echo "你输入的数字为 $aNum!"
        ;;
        *) echo "你输入的数字不是 1 到 5 之间的! 游戏结束"
            break
        ;;
    esac
done
```

执行结果：

```tex
输入 1 到 5 之间的数字:3
你输入的数字为 3!
输入 1 到 5 之间的数字:7
你输入的数字不是 1 到 5 之间的! 游戏结束
```

### continue

与 break 不同，continue 仅仅跳过当前循环中后面的语句，不会终止整个循环。

```shell
while :
do
    echo -n "输入 1 到 5 之间的数字: "
    read aNum
    case $aNum in
        1|2|3|4) echo "你输入的数字为 $aNum!"
        ;;
        5) echo "你输入的数字是5!"
            continue
            echo "游戏结束"
        ;;
    esac
done
```

你会发现，无论你输入什么数字，"游戏结束"这四个字都不会输出。

