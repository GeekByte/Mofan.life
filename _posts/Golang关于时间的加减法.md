---
title: Golang关于时间的加减法
categories:
  - 编程语言
  - Go
tags:
  - Go
date: 2021-05-11 22:15:20
---

> 文章来源：[Golang 时间加减、计算方法耗、毫秒转 Time | 程序员技术之旅](https://www.zhangbj.com/p/652.html)

## 时间日期

- `Now()`：当前`Time`对象。
- `Date()`：当前年月日。年和日为`int`类型，月为`Month`类型。
- `YearDay()`：当天是一年中的第几天。
- `Weekday()`：当天是星期几。
- `Unix()`：时间戳，秒。
- `UnixNano()`：时间戳，纳秒。
- `UnixNano() / 1e6`：时间戳，毫秒。

```go
t := time.Now()
fmt.Println("time.Now()：", t) // 2020-10-24 22:10:53.328973 +0800 CST m=+0.006015101
year, month, day := t.Date()
fmt.Println("日期：", year, month, day) // 2020 October 24
fmt.Println("一年中的第几天：", t.YearDay()) // 298
fmt.Println("星期几：", t.Weekday()) // Saturday
fmt.Println("年：", t.Year()) // 2020
fmt.Println("月：", t.Month()) // October
fmt.Println("日：", t.Day()) // 24
fmt.Println("时：", t.Hour()) // 22
fmt.Println("分：", t.Minute()) // 10
fmt.Println("秒：", t.Second()) // 53
fmt.Println("纳秒：", t.Nanosecond()) // 328973000
fmt.Println("秒时间戳：", t.Unix()) // 1603548653
fmt.Println("纳秒时间戳：", t.UnixNano()) // 1603548653328973000
fmt.Println("毫秒时间戳：", t.UnixNano() / 1e6) // 1603548653328
```

## 线程睡眠

可以使用`Duration`对象和指数`e`

```go
time.Sleep(2 * time.Second) // 休眠2秒
time.Sleep(2e9) // 休眠2秒
```

## 计算耗时

使用`Sub()`计算两个`Time`间隔。

```go
t := time.Now()
time.Sleep(2e9) // 休眠2秒
delta := time.Now().Sub(t)
fmt.Println("时间差：", delta) // 2.0534341s
```

## 时间加减

使用`Add`增加纳秒、微秒、毫秒、秒、分、时，接收`Duration`对象。

使用`AddDate`增加年、月、日，接收`int`参数。

```go
t := time.Now()
addOneHour := t.Add(time.Hour)
addTwoHour := t.Add(2 * time.Hour)
fmt.Println("增加1小时：", addOneHour)
fmt.Println("增加2小时：", addTwoHour)

subTwoHour := t.Add(-2 * time.Hour)
fmt.Println("减去2小时：", subTwoHour)

addDate := t.AddDate(1, 0, 0)
fmt.Println("增加1年：", addDate) // 2021-10-24 22:10:53.328973 +0800 CST

subDate := t.AddDate(-1, 0, 0)
fmt.Println("减去1年：", subDate) // 2019-10-24 22:10:53.328973 +0800 CST

before := t.Before(t.Add(time.Hour))
fmt.Println("before：", before)

after := t.After(t.Add(time.Hour))
fmt.Println("after：", after)
```

## 毫秒转换

毫秒转换`Time`

```go
nanoSecondToTime := time.Unix(0, 1603546715761482000)
fmt.Println("毫秒值转Time：", nanoSecondToTime) // 2020-10-24 21:38:35.761482 +0800 CST
```

秒转换`Time`

```go
secondToTime := time.Unix(1603546715, 0)
fmt.Println("秒值转Time：", secondToTime) // 2020-10-24 21:38:35 +0800 CST
```

