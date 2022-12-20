---
title: Linux修改时区
categories:

  - Linux

tags:

  - Linux
  date: 2022-12-20 11:07:00

---

## 方式一：使用 timedatectl

timedatectl 是一个管理系统日期与时间的工具。

打印系统的时区和通用时区（UTC）的当前时间，并显示系统时钟服务同步以及NTP服务的状态：

```sh
$ timedatectl

               Local time: Tue 2022-12-20 10:55:43 CST
           Universal time: Tue 2022-12-20 02:55:43 UTC
                 RTC time: Tue 2022-12-20 02:55:44    
                Time zone: Asia/Shanghai (CST, +0800) 
System clock synchronized: yes                        
              NTP service: active                     
          RTC in local TZ: no 
```



筛选时区

```sh
$ timedatectl list-timezones | grep -i shang

Asia/Shanghai
```



修改时区

```sh
$ sudo timedatectl set-timezone Asia/Shanghai
```



## 方式二：使用符号链接

Linux系统使用`/etc/localtime`文件存储着系统的时区，它是一个软链接/符号链接文件。它指向`/usr/share/zoneinfo/`目录以及子目录下的时区文件。

这些时区文件以二进制的存储着时区的信息。当应用程序需要用户展示时区时。应用程序将读取`/etc/localtime`最终指向的二进制时区文件。



使用 `ls` 命令将打印`/etc/localtime`所有信息，你会看到`/etc/localtime`文件的类型是符号链接，并指向`/usr/share/zoneinfo/Hongkong`。

```sh
$ ls -al /etc/localtime

/etc/localtime -> /usr/share/zoneinfo/Asia/Shanghai
```



搜索时区

```sh
$ find . -iname "*时区关键字*"

# -i 表示不区分大小写
```



修改时区

```sh
$ sudo ln -s /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
```



## 查看时间

```sh
$ date
```

