---
title: 关于Go语言数组索引的有趣现象
categories:
  - Go
  - 数组
tags:
  - Go
date: 2021-03-07 15:19:25
---

> 转载：https://blog.csdn.net/u012807459/article/details/39135849

在Twitter上看到Dave Cheney提了个pop quiz  勾起了我的好奇心，可以猜下下面这段代码的运行结果。

```go
package main
 
import "fmt"
 
func main() {
	a := [...]int{5, 4: 1, 0, 2: 3, 2, 1: 4}
	fmt.Println(a)
}
```

go run 一下结果就出来了 但是比较有意思的是结果是

```text
[5 4 3 2 1 0]
```

下面就一步步地分析是什么情况

[number:value] 在go的数组中代表的是在索引未number处的位置上值为value 如果索引值越界了就会重置。

5 _ _ _ _ _   index : 0, value : 5

5 _ _ _ 1 _   index : 4, value : 1

5 _ _ _ 1 0   index : 5, value : 0 因为上一个操作的元素索引为4 ([4:1])所以下一个操作的元素索引自动加1

5 _ 3 _ 1 0   index : 2, value : 3

5 _ 3 2 1 0   index : 3, value : 2 因为上一个操作的元素索引为2 ([2:3])所以下一个操作的元素索引自动加1 

5 1 3 2 1 0   index : 1, value : 4

操作数组元素的顺序是按照声明时的顺序，顺序操作的。5 1 0 3 2 4就是按照这个顺序 进行操作的。

所以如果把代码改一下就会报错 比如下面的例子

```go
package main
 
import "fmt"
 
func main() {
	a := [...]int{5, 4: 1, 0, 2: 3, 2, 1: 4, 10}
	fmt.Println(a)
}
```

结果：

```text
prog.go:6: duplicate index in array literal: 2
 [process exited with non-zero status]
```

报错信息是 第二个索引重复了

接着上面的分析

5 1 3 2 1 0 index : 1, value : 4 这时如果继续操作下一个元素根据规则 索引加1

也就是 要对index : 2 的元素进行 value : 10的操作 但是之前我们已经在索引为2时赋值过了 所以就会有异常

```text
duplicate index in array literal: 2
```

