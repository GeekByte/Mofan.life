---
title: Go时间包避坑指南
categories:
  - 编程语言
  - Go
tags:
  - Go
date: 2021-04-15 22:55:19
---

首先看一段代码：

```go
func main() {
	st := "2019-11-21 11:59:01"
	fmt.Printf("%s\n", st)
	t, _ := time.Parse("2006-01-02 15:04:05", st)
	fmt.Println(t.Unix())

	tt := time.Unix(t.Unix(), 0)
	fmt.Println(tt.Format("2006-01-02 15:04:05"))
}
```

上述代码的任务很简单，就是将字符串格式的时间转化为时间戳。
但是直到调试我才无意发现，这个是有问题的，转化后的unix并不是原来的时间。。
运行结果如下：

```text
2019-11-21 11:59:01
1574337541
2019-11-21 19:59:01
```

时间总是会多了8个小时，让我联想到了我们的东8区，估计和时区有关系。

看了下time.Parse的解释：

其中的一句：

`In the absence of a time zone indicator, Parse returns a time in UTC.`

翻译如下：

在没有时区指示符的情况下，Parse以UTC返回时间。

> UTC是什么？
> 整个地球分为二十四时区，每个时区都有自己的本地时间。在国际无线电通信场合，为了统一起见，使用一个统一的时间，称为通用协调时(UTC, Universal Time Coordinated)。UTC与格林尼治平均时(GMT, Greenwich Mean Time)一样，都与英国伦敦的本地时相同。北京时区是东八区，领先UTC八个小时。
>
> UTC + 时区差 ＝ 本地时间
> 所以，前面的问题就是因为没有指定位置符，导致按照UTC时间进行转化的时间戳，错误的多了8个小时，然后使用time.Unix方法按照本地的时间创建Time对象，再次format时就会按照本地时区进行打印，导致时间多了8小时，直接给他减去8小时就好了，当然这样肯定不优雅，golang时间包time已经封装了对应的方法：`ParseInLocation`

使用以下的方式就可以正确的转化时间了：

```go
var LOC, _ = time.LoadLocation("Asia/Shanghai")

func main() {
	st := "2019-11-21 11:59:01"
	fmt.Printf("%s\n", st)
	t, _ := time.ParseInLocation("2006-01-02 15:04:05", st, LOC)
	fmt.Println(t.Unix())

	tt := time.Unix(t.Unix(), 0)
	fmt.Println(tt.Format("2006-01-02 15:04:05"))
}
```

输出结果：

```text
2019-11-21 11:59:01
1574308741
2019-11-21 11:59:01
```

