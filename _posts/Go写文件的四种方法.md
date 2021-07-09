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
Last login: Fri Jul  9 10:38:30 on ttys001
cyp@MacBook-Pro:~ $ cd xgo
cyp@MacBook-Pro:~/xgo ‹main*›$ ll
total 4112
-rw-r--r--  1 cyp  staff   171B  4 19 08:19 del.go
-rw-r--r--  1 cyp  staff    82B  4 19 08:19 del1.go
-rw-r--r--@ 1 cyp  staff   319B  4 20 14:04 del10.html
-rw-r--r--  1 cyp  staff   225B  4 19 08:25 del2.go
-rw-r--r--  1 cyp  staff   253B  4 19 08:28 del3.go
-rw-r--r--  1 cyp  staff   266B  4 19 08:29 del4.go
-rw-r--r--  1 cyp  staff   183B  4 19 08:30 del5.go
-rw-r--r--  1 cyp  staff   273B  6 18 17:01 delxx.go
-rw-r--r--  1 cyp  staff   1.6K  7  9 10:48 file_write.go
-rw-r--r--  1 cyp  staff    20B  7  7 17:47 go.mod
-rw-r--r--  1 cyp  staff   566B  7  7 18:45 reflect_pointer.go
-rw-r--r--  1 cyp  staff   506B  7  7 18:48 reflect_struct.go
-rwxr-xr-x  1 cyp  staff   1.9M  7  8 15:00 t1
-rw-r--r--  1 cyp  staff   103B  7  8 14:53 t1.go
-rw-r--r--  1 cyp  staff   121B  6 29 15:34 x.go
-rw-r--r--  1 cyp  staff   113B  7  7 17:13 x3.go
lrwxr-xr-x  1 cyp  staff     3B  7  7 17:51 xgo -> xgo
-rw-r--r--  1 cyp  staff   993B  7  7 16:12 xx.go
-rw-r--r--  1 cyp  staff   193B  6 30 17:41 xxx.go
-rw-r--r--  1 cyp  staff   187B  6 30 18:15 xy.go
cyp@MacBook-Pro:~/xgo ‹main*›$ cd
cyp@MacBook-Pro:~ $ cd github/goLearnCode/opa
cyp@MacBook-Pro:goLearnCode/opa ‹main*›$ ls
example.rego go.mod       go.sum       input.json   main.go
cyp@MacBook-Pro:goLearnCode/opa ‹main*›$ cd ..
cyp@MacBook-Pro:github/goLearnCode ‹main*›$ git add opa
cyp@MacBook-Pro:github/goLearnCode ‹main*›$ git commit -m "opa test"
[main 9643442] opa test
 5 files changed, 651 insertions(+)
 create mode 100644 opa/example.rego
 create mode 100644 opa/go.mod
 create mode 100644 opa/go.sum
 create mode 100644 opa/input.json
 create mode 100644 opa/main.go
cyp@MacBook-Pro:github/goLearnCode ‹main›$ git push
Enumerating objects: 39, done.
Counting objects: 100% (39/39), done.
Delta compression using up to 8 threads
Compressing objects: 100% (36/36), done.
Writing objects: 100% (38/38), 99.39 MiB | 147.00 KiB/s, done.
Total 38 (delta 9), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (9/9), completed with 1 local object.
remote: error: GH001: Large files detected. You may want to try Git Large File Storage - https://git-lfs.github.com.
remote: error: Trace: a07b3cf3550abb0ea47c83487235cf35bc5e50e19d0a43fbe6b2356fe877ff25
remote: error: See http://git.io/iEPt8g for more information.
commit 9643442741685265c35f3cd0a12cf20bd42a83af (HEAD -> main)
Author: Youpeng <mofankk@gmail.com>
Date:   Fri Jul 9 10:51:17 2021 +0800

    opa test

commit c73ad7a7efabd448c65f3eb223476c399d090cac
Author: Youpeng <mofankk@gmail.com>
Date:   Fri Jul 9 10:48:42 2021 +0800

    update

commit 3095fb0f0a5ce51c616e98a5417854a7e4e1af17
Author: Youpeng <mofankk@gmail.com>
Date:   Wed Jul 7 18:05:16 2021 +0800

    update

commit a5b9239c6155f3f25843da87ea2b9ef057c823ca
Author: Youpeng <mofankk@gmail.com>
Date:   Wed Jul 7 17:57:33 2021 +0800

    add test go file

commit 1514cd1be95ef1dd234a7be999f539b9f428da54 (origin/main)
Author: Youpeng <mofankk@gmail.com>
Date:   Thu Jul 1 20:26:53 2021 +0800

    docker test

commit f44638ed98ee172fbd97c95429ab673eafa69fdf
Author: Youpeng <mofankk@gmail.com>
Date:   Thu Jul 1 20:25:52 2021 +0800

    rust code

commit 08c0dd0984ae1ded708c4a8af608a4650fcd8833
Author: Youpeng <mofankk@gmail.com>
Date:   Thu Jul 1 18:26:33 2021 +0800

    add

commit a5565d057eb6c15db4c30f2e11fd4acb6665b2df
Author: Youpeng <mofankk@gmail.com>
Date:   Thu Jun 10 10:47:16 2021 +0800

    gorm log分析

commit 2d41b56fa9456082e043088f8b2c5f931c03cfbe
commit 9643442741685265c35f3cd0a12cf20bd42a83af (HEAD -> main)
Author: Youpeng <mofankk@gmail.com>
Date:   Fri Jul 9 10:51:17 2021 +0800
remote: error: File xgo/xx.tar is 147.10 MB; this exceeds GitHub's file size limit of 100.00 MB
To github.com:GeekByte/GoLearnCode.git
 ! [remote rejected] main -> main (pre-receive hook declined)
error: failed to push some refs to 'github.com:GeekByte/GoLearnCode.git'
cyp@MacBook-Pro:github/goLearnCode ‹main›$ ls
README.md    docker       gorm         opa          sync_map
casbin       docker.tar   microservice protocbuf    usetest
cobra        gopdf        oldgorm      rust         xgo
cyp@MacBook-Pro:github/goLearnCode ‹main›$
cyp@MacBook-Pro:github/goLearnCode ‹main›$ cd xgo
cyp@MacBook-Pro:goLearnCode/xgo ‹main›$ ls
del.go             del4.go            reflect_pointer.go x3.go
del1.go            del5.go            reflect_struct.go  xgo
del10.html         delxx.go           t1                 xx.go
del2.go            file_write.go      t1.go              xxx.go
del3.go            go.mod             x.go               xy.go
cyp@MacBook-Pro:goLearnCode/xgo ‹main›$ git status
On branch main
Your branch is ahead of 'origin/main' by 4 commits.
  (use "git push" to publish your local commits)

nothing to commit, working tree clean
cyp@MacBook-Pro:goLearnCode/xgo ‹main›$ git rm --cached xx.tar
fatal: pathspec 'xx.tar' did not match any files
cyp@MacBook-Pro:goLearnCode/xgo ‹main›$ git log
cyp@MacBook-Pro:goLearnCode/xgo ‹main›$
cyp@MacBook-Pro:goLearnCode/xgo ‹main›$ git rm --help
cyp@MacBook-Pro:goLearnCode/xgo ‹main›$
cyp@MacBook-Pro:goLearnCode/xgo ‹main›$ git rm -f xx.tar
fatal: pathspec 'xx.tar' did not match any files
cyp@MacBook-Pro:goLearnCode/xgo ‹main›$ touch xx.tar
cyp@MacBook-Pro:goLearnCode/xgo ‹main*›$ ls
del.go             del5.go            t1                 xx.tar
del1.go            delxx.go           t1.go              xxx.go
del10.html         file_write.go      x.go               xy.go
del2.go            go.mod             x3.go
del3.go            reflect_pointer.go xgo
del4.go            reflect_struct.go  xx.go
cyp@MacBook-Pro:goLearnCode/xgo ‹main*›$ git rm -rf xx.tar
fatal: pathspec 'xx.tar' did not match any files
cyp@MacBook-Pro:goLearnCode/xgo ‹main*›$ rm -rf xx.tar
cyp@MacBook-Pro:goLearnCode/xgo ‹main›$ cp ~/xx.tar ./
cyp@MacBook-Pro:goLearnCode/xgo ‹main*›$ ls
del.go             del5.go            t1                 xx.tar
del1.go            delxx.go           t1.go              xxx.go
del10.html         file_write.go      x.go               xy.go
del2.go            go.mod             x3.go
del3.go            reflect_pointer.go xgo
del4.go            reflect_struct.go  xx.go
cyp@MacBook-Pro:goLearnCode/xgo ‹main*›$ git rm -f xx.tar
fatal: pathspec 'xx.tar' did not match any files
cyp@MacBook-Pro:goLearnCode/xgo ‹main*›$ ls
del.go             del5.go            t1                 xx.tar
del1.go            delxx.go           t1.go              xxx.go
del10.html         file_write.go      x.go               xy.go
del2.go            go.mod             x3.go
del3.go            reflect_pointer.go xgo
del4.go            reflect_struct.go  xx.go
cyp@MacBook-Pro:goLearnCode/xgo ‹main*›$ ls -l
total 305376
 42     fmt.Printf("写入 %d 个字节n", n)
 43
 44     // 第二种方式: 使用ioutil.WriteFile写入文件
 45     var d1 = []byte(wireteString)
 46     err2 := ioutil.WriteFile("./output2.txt", d1, 0666) //写入文件(字节数组)
 47     check(err2)
 48
 49     // 第三种方式: 使用File(Write,WriteString)写入文件
 50     f, err3 := os.Create("./output3.txt") //创建文件
 51     check(err3)
 52     defer f.Close()
 53     n2, err3 := f.Write(d1) //写入文件(字节数组)
 54     check(err3)
 55     fmt.Printf("写入 %d 个字节n", n2)
 56     n3, err3 := f.WriteString("writesn") //写入文件(字节数组)
 57     fmt.Printf("写入 %d 个字节n", n3)
 58     f.Sync()
 59
 60     // 第四种方式: 使用bufio.NewWriter写入文件
 61     w := bufio.NewWriter(f) //创建新的 Writer 对象
 62     n4, err3 := w.WriteString("bufferedn")
 63     fmt.Printf("写入 %d 个字节n", n4)
 64     w.Flush()
 65     f.Close()
 66 }
vim-go: Finished loading packages.
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
 17 // 判断文件是否存在, 存在返回true, 不存在返回false
 18 func checkFileIsExist(filename string) bool {
 19     if _, err := os.Stat(filename); os.IsNotExist(err) {
 20         return false
 21     }
 22     return true
 23 }
 24
 25 func main() {
 26     var wireteString = "测试n"
 27     var filename = "./output1.txt"
 28     var f *os.File
 29
 30     // 第一种方式: 使用io.WriteString写入文件
 31     var err1 error
 32     if checkFileIsExist(filename) { //如果文件存在
 33         f, err1 = os.OpenFile(filename, os.O_APPEND, 0666) //打开文件
 34         fmt.Println("文件存在")
 35     } else {
 36         f, err1 = os.Create(filename) //创建文件
 37         fmt.Println("文件不存在")
 38     }
 39     check(err1)
 40     n, err1 := io.WriteString(f, wireteString) //写入文件(字符串)
 41     check(err1)
 42     fmt.Printf("写入 %d 个字节n", n)
 43
 44     // 第二种方式: 使用ioutil.WriteFile写入文件
 45     var d1 = []byte(wireteString)
 46     err2 := ioutil.WriteFile("./output2.txt", d1, 0666) //写入文件(字节数组)
 47     check(err2)
 48
 49     // 第三种方式: 使用File(Write,WriteString)写入文件
 50     f, err3 := os.Create("./output3.txt") //创建文件
 51     check(err3)
 52     defer f.Close()
 53     n2, err3 := f.Write(d1) //写入文件(字节数组)
 54     check(err3)
 55     fmt.Printf("写入 %d 个字节n", n2)
 56     n3, err3 := f.WriteString("writesn") //写入文件(字节数组)
 57     fmt.Printf("写入 %d 个字节n", n3)
 58     f.Sync()
 59
 60     // 第四种方式: 使用bufio.NewWriter写入文件
 61     w := bufio.NewWriter(f) //创建新的 Writer 对象
 62     n4, err3 := w.WriteString("bufferedn")
 63     fmt.Printf("写入 %d 个字节n", n4)
 64     w.Flush()
 65     f.Close()
 66 }
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
