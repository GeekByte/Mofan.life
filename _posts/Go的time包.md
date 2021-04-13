---
title: Go的time包
categories:
  - 编程语言
  - Go
tags:
  - Go
date: 2021-03-05 15:44:08
---

## 获取时间对象

```go
// 获取当前时间
func Now() Time

// 获取指定时间
func Date(year int, month Month, day, hour, min, sec, nsec int, loc *Location) Time
/*
Date returns the Time corresponding to

yyyy-mm-dd hh:mm:ss + nsec nanoseconds
in the appropriate zone for that time in the given location.

The month, day, hour, min, sec, and nsec values may be outside their usual ranges and will be normalized during the conversion. For example, October 32 converts to November 1.

A daylight savings time transition skips or repeats times. For example, in the United States, March 13, 2011 2:15am never occurred, while November 6, 2011 1:15am occurred twice. In such cases, the choice of time zone, and therefore the time, is not well-defined. Date returns a time that is correct in one of the two zones involved in the transition, but it does not guarantee which.

Date panics if loc is nil.
*/
```

## 日期和文本的转换

### 日期转文本

```go
func (t Time) Format(layout string) string
/*
Format returns a textual representation of the time value formatted according to layout, which defines the format by showing how the reference time, defined to be

Mon Jan 2 15:04:05 -0700 MST 2006
would be displayed if it were the value; it serves as an example of the desired output. The same display rules will then be applied to the time value.

A fractional second is represented by adding a period and zeros to the end of the seconds section of layout string, as in "15:04:05.000" to format a time stamp with millisecond precision.

Predefined layouts ANSIC, UnixDate, RFC3339 and others describe standard and convenient representations of the reference time. For more information about the formats and the definition of the reference time, see the documentation for ANSIC and the other constants defined by this package.
*/
```

### 文本转日期

```go
func Parse(layout, value string) (Time, error)
/*
Parse parses a formatted string and returns the time value it represents. The layout defines the format by showing how the reference time, defined to be

Mon Jan 2 15:04:05 -0700 MST 2006
would be interpreted if it were the value; it serves as an example of the input format. The same interpretation will then be made to the input string.
*/
```

## 时间戳

指定的日期(当前日期，指定的某个日期)，距离1970年1月1日0点0时0分0秒的时间差值。有秒，纳秒两种函数。

```go
// 单位：秒
func (t Time) Unix() int64
/*
Unix returns t as a Unix time, the number of seconds elapsed since January 1, 1970 UTC. The result does not depend on the location associated with t.
*/

// 单位：纳秒
func (t Time) UnixNano() int64
/*
UnixNano returns t as a Unix time, the number of nanoseconds elapsed since January 1, 1970 UTC. The result is undefined if the Unix time in nanoseconds cannot be represented by an int64 (a date before the year 1678 or after 2262). Note that this means the result of calling UnixNano on the zero Time is undefined. The result does not depend on the location associated with t.
*/
```

## 年月日时分秒等

```go
func (t Time) Year() int
func (t Time) Month() Month
func (t Time) Day() int
func (t Time) Hour() int
func (t Time) Minute() int
func (t Time) Second() int

func (t Time) Date() (year int, month Month, day int)
```

## Sleep()

在程序中调用Sleep()函数，可以让当前的程序，进入睡眠。

```go
type Duration int64

func Sleep(d Duration)
/*
Sleep pauses the current goroutine for at least the duration d. A negative or zero duration causes Sleep to return immediately.
*/
```



## 示例代码

```go
package main

import (
    "time"
    "fmt"
    "math/rand"
)

func main() {
    /*
    time包：
    1年=365天
        day
    1天=24小时hour
    1小时=60分钟minute
    1分钟=60秒
        second
    1秒=1000毫秒
        millisecond
    1毫秒=1000微秒
        microsecond-->μs
    1μs = 1000纳秒
        nanosecond-->ns
    1ns = 1000皮秒
        picosecond-->ps

    A:获取时间time对象
        time.Now()当前时间
        time.Date()指定时间
    B：格式化：
        time-->string
            t1.Format(layout string)-->string
        string-->time
            time.Parse(layout string, value string)-->time,error

    C：时间戳：timeStamp
        t1.Unix()
        t1.UnixNano()

    D：获取指定内容
        t1.Date()-->year,month,day
        t1.Clock()-->hour,minute,second
        t1.Year()-->year
        t1.Month()-->Month
        t1.Day()-->day
        t1.Week()
        t1.Hour()
        t1.Minute()
        t1.Second()
        t1.NanoSecond()

    E：时间间隔：Duration
        type Duration int64

        t1.Add(d)-->time
        t1.Sub(t2)-->d

    F：睡眠
        time.Sleep(duration)//NanoSecond

     */
     //1.获取当前的时间
     t1:=time.Now()
     fmt.Printf("%T\n",t1)// time.Time
     fmt.Println(t1)//2018-05-29 10:58:23.789029492 +0800 CST m=+0.001181079
     //2.获取指定的时间
     t2 :=time.Date(2008,7,15,16,30,28,0,time.Local)
     fmt.Println(t2)

     //3.time--string之间的转换
     //fmt.Println(t1.String())
     /*
     t1.Format("格式木板")-->string
        模板的日期必须是固定：6-1-2-3-4-5

     time.parse("模板",str)-->time

      */
     s1 := t1.Format("2006年1月2日 15:04:05")
     fmt.Println(s1)

     s2 :=t1.Format("2006-01-02")
     fmt.Println(s2)

     s3 := "1999年10月10日" //string
     t3,err:=time.Parse("2006年1月2日",s3)
     if err != nil{
        fmt.Println("err:",err.Error())
     }
     fmt.Println(t3)

     //4.时间戳：指定的日期(当前日期，指定的某个日期)，距离1970年1月1日0点0时0分0秒的时间差值：秒，纳秒
     t4 := time.Date(1970,1,1,1,0,0,0,time.UTC)
     timeStamp1:=t4.Unix() //秒的差值
     fmt.Println(timeStamp1)//3600
     timeStamp2 :=t1.Unix()
     fmt.Println(timeStamp2)

     timeStamp3 :=t4.UnixNano()//纳秒差值
     fmt.Println(timeStamp3)//3600 000 000 000
     timeStamp4:=t1.UnixNano()
     fmt.Println(timeStamp4)

     //5.根据当前的时间获取指定的内容：年，月，日，
     year,month,day:=t1.Date()
     fmt.Println(year,month,day)
     hour,min,sec:=t1.Clock()
     fmt.Println(hour,min,sec)

     year2:=t1.Year()
     fmt.Println("年：",year2)
     fmt.Println(t1.YearDay())
     month2:=t1.Month()
     fmt.Println("月：",month2)
     fmt.Println("日：",t1.Day())
     fmt.Println("小时：",t1.Hour())
     fmt.Println("分钟：",t1.Minute())
     fmt.Println("秒：",t1.Second())
     fmt.Println(t1.Weekday())//星期几
     fmt.Println(t1.ISOWeek()) //年份，和该年份中的第几个星期
     //t1.Nanosecond()

     //5.时间间隔

     t5 := t1.Add(time.Minute)//duritaion时间间隔之前/后
     fmt.Println(t1)
     fmt.Println(t5)
     fmt.Println(t1.Add(24*time.Hour)) //1天之后

     t6:=t1.AddDate(1,0,0)
     fmt.Println(t6)

     fmt.Println(t1.Add(-5*time.Minute))

     d1:=t5.Sub(t1) //两个time的时间差值： Duration
     fmt.Printf("%T\n",d1)
     fmt.Println(d1)

     //6.睡眠
     time.Sleep(3*time.Second)//让当前的程序进入睡眠状态
     fmt.Println("main...over.....")

     //睡眠[1-10]的秒随机数
     rand.Seed(time.Now().UnixNano())
     randNum := rand.Intn(10)+1 //int
     fmt.Println(randNum)
     time.Sleep(time.Duration(randNum)*time.Second)//Duration
     fmt.Println("睡醒了。。")

}
```

