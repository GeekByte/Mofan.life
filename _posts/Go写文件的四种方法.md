---
title: Go写文件的四种方法
categories:
  - 编程语言
  - Go
tags:
  - Go
date: 2021-07-09 10:55:59
---

> Talk is cheap, show me the code!

```go
Last login: Fri Jul  9 09:36:17 on ttys000
cyp@MacBook-Pro:~ $ ls
0dfa_core_6625_de8a558f85ab38e0bd1a0a3cfde2e121.mp4
Applications
CYP.vpn
Desktop
Documents
Downloads
Library
Mojave-CT-Light.tar.xz
Movies
Music
Pictures
Public
Qv2ray.v2.7.0-alpha1.linux-x64.AppImage
Untitled-1.go
VMware
all_robot.json
bt
code
consul_1.9.3_darwin_amd64.zip
dalu
dump.rdb
geekbyte
github
go
go-learn
grpc
grpc.tar
horse-or-human
house_imagex.webp
iTerm2快捷命令.txt
icon.sh
influxdb
looksphinx.sh
mac-grpc.tar
mdalu
mianshi
mofan
mongo.conf
mongodb
mserver
one_robot.json
pass.txt
qau
resshUbuntu.sh
ro.txt
rust
rust_code
sensors
server_ip.txt
shortcuts.txt
 15 }
 29   from: http://www.isharey.com/?p=143
 35     var f *os.File
 38     if checkFileIsExist(filename) { //如果文件存在
 46     n, err1 := io.WriteString(f, wireteString) //写入文件(字符串)
 52     err2 := ioutil.WriteFile("./output2.txt", d1, 0666) //写入文件(字节数组)
 53     check(err2)
 54
 55     /*****************************  第三种方式:  使用 File(Write,WriteString    ) 写入文件 ***********************************************/
 56     f, err3 := os.Create("./output3.txt") //创建文件
 57     check(err3)
 58     defer f.Close()
 59     n2, err3 := f.Write(d1) //写入文件(字节数组)
 60     check(err3)
 61     fmt.Printf("写入 %d 个字节n", n2)
 62     n3, err3 := f.WriteString("writesn") //写入文件(字节数组)
 63     fmt.Printf("写入 %d 个字节n", n3)
 64     f.Sync()
 65
 66     /***************************** 第四种方式:  使用 bufio.NewWriter 写入文>    件 ***********************************************/
 67     w := bufio.NewWriter(f) //创建新的 Writer 对象
 68     n4, err3 := w.WriteString("bufferedn")
 69     fmt.Printf("写入 %d 个字节n", n4)
 70     w.Flush()
 71     f.Close()
 72 }
 24     }
 25     return exist
 26 }
 27
 28 /**
 29   from: http://www.isharey.com/?p=143
 30 */
 31
 32 func main() {
 33     var wireteString = "测试n"
 34     var filename = "./output1.txt"
 35     var f *os.File
 36     var err1 error
 37     /***************************** 第一种方式: 使用 io.WriteString 写入文件 ***********************************************/
 38     if checkFileIsExist(filename) { //如果文件存在
 39         f, err1 = os.OpenFile(filename, os.O_APPEND, 0666) //打开文件
 40         fmt.Println("文件存在")
 41     } else {
 42         f, err1 = os.Create(filename) //创建文件
 43         fmt.Println("文件不存在")
 44     }
 45     check(err1)
 46     n, err1 := io.WriteString(f, wireteString) //写入文件(字符串)
 47     check(err1)
 48     fmt.Printf("写入 %d 个字节n", n)
 49
 50     /*****************************  第二种方式: 使用 ioutil.WriteFile 写入文件 ***********************************************/
 51     var d1 = []byte(wireteString)
 52     err2 := ioutil.WriteFile("./output2.txt", d1, 0666) //写入文件(字节数组)
 53     check(err2)
 54
 55     /*****************************  第三种方式:  使用 File(Write,WriteString) 写入文件 ***********************************************/
 56     f, err3 := os.Create("./output3.txt") //创建文件
 57     check(err3)
 58     defer f.Close()
 59     n2, err3 := f.Write(d1) //写入文件(字节数组)
 60     check(err3)
 61     fmt.Printf("写入 %d 个字节n", n2)
 62     n3, err3 := f.WriteString("writesn") //写入文件(字节数组)
 63     fmt.Printf("写入 %d 个字节n", n3)
 64     f.Sync()
 65
 66     /***************************** 第四种方式:  使用 bufio.NewWriter 写入文件 ***********************************************/
 67     w := bufio.NewWriter(f) //创建新的 Writer 对象
 68     n4, err3 := w.WriteString("bufferedn")
 69     fmt.Printf("写入 %d 个字节n", n4)
 70     w.Flush()
 71     f.Close()
 72 }
~
~
~
~
~
  1 package main
  2
  3 import (
  4     "bufio" //缓存IO
  5     "fmt"
  6     "io"
  7     "io/ioutil" //io 工具包
  8     "os"
  9 )
 10
 11 func check(e error) {
 12     if e != nil {
 13         panic(e)
 14     }
 15 }
 16
 17 /**
 18  * 判断文件是否存在  存在返回 true 不存在返回false
  1 package main
 14     }
  1 package main
  2
  3 import (
  4     "bufio" //缓存IO
  5     "fmt"
  6     "io"
  7     "io/ioutil" //io 工具包
  8     "os"
  9 )
 10
 11 func check(e error) {
 12     if e != nil {
  1 package main
shutdown.sh
sshUbuntu.sh
start.sh
test
tong
v2ray_config.json
v2rayx.json
v2rayx_backup_10-06-2021 13:03.json
v2rayx_backup_26-06-2021 11:10.json
vid.html
vue_learn
xgo
xx
xx.tar
yizu
信息与计算科学+20170204228+崔有朋.zip
cyp@MacBook-Pro:~ $ cd xgo
cyp@MacBook-Pro:~/xgo ‹main*›$ ls
del.go             del4.go            reflect_struct.go  xgo
del1.go            del5.go            t1                 xx.go
del10.html         delxx.go           t1.go              xxx.go
del2.go            go.mod             x.go               xy.go
del3.go            reflect_pointer.go x3.go
cyp@MacBook-Pro:~/xgo ‹main*›$ vim file_write.go
cyp@MacBook-Pro:~/xgo ‹main*›$ go run file_write.go
文件不存在
写入 7 个字节n写入 7 个字节n写入 7 个字节n写入 9 个字节n%
cyp@MacBook-Pro:~/xgo ‹main*›$ ls
del.go             del2.go            del5.go            go.mod             output3.txt        t1                 x3.go              xxx.go
del1.go            del3.go            delxx.go           output1.txt        reflect_pointer.go t1.go              xgo                xy.go
package main

import (
    "bufio" //缓存IO
    "fmt"
    "io"
    "io/ioutil" //io 工具包
    "os"
)

func check(e error) {
    if e != nil {
        panic(e)
    }
}

// 判断文件是否存在, 存在返回true, 不存在返回false
func checkFileIsExist(filename string) bool {
    if _, err := os.Stat(filename); os.IsNotExist(err) {
        return false
    }
    return true
}

func main() {
    var wireteString = "测试n"
    var filename = "./output1.txt"
    var f *os.File

    // 第一种方式: 使用io.WriteString写入文件
    var err1 error
    if checkFileIsExist(filename) { //如果文件存在
        f, err1 = os.OpenFile(filename, os.O_APPEND, 0666) //打开文件
        fmt.Println("文件存在")
    } else {
        f, err1 = os.Create(filename) //创建文件
        fmt.Println("文件不存在")
    }
    check(err1)
    n, err1 := io.WriteString(f, wireteString) //写入文件(字符串)
    check(err1)
    fmt.Printf("写入 %d 个字节n", n)

    // 第二种方式: 使用ioutil.WriteFile写入文件
    var d1 = []byte(wireteString)
    err2 := ioutil.WriteFile("./output2.txt", d1, 0666) //写入文件(字节数组)
    check(err2)

    // 第三种方式: 使用File(Write,WriteString)写入文件
    f, err3 := os.Create("./output3.txt") //创建文件
    check(err3)
    defer f.Close()
    n2, err3 := f.Write(d1) //写入文件(字节数组)

```
