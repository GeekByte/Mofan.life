---
title: tcpdump指南
categories:
  - Tools
tags:
  - tcpdump
date: 2022-12-20 15:47:21
---
## tcpdump 参数指南

```txt
-D    列出机器连接层的接口
-i    指定连接的接口，-i any 表示监听任何接口
-c    收到某数量包后退出
-S    打印 seq 的绝对值，而不是相对值 --absolute-tcp-sequence-numbers
-X    用 hex 和 ASCII 打印包内容
-v    在处理的时候，产生简化的输出
-vv   更详细的输出，包括 NFS，SMB 等数据
-vvv  更详细的输出，包含 -X 打出的数据
-w    写入到 pcap 文件中
-xx   打印包的头部数据
-XX   用 hex 和 ASCII 打印包头部数据
-A    用 ASCII 打印包内容
-n    不把地址转成主机名
-N    不打印域名中主机名部分
-l    将标准输出缓冲，在捕获流量时分析数据比较有用，比如：tcpdump -l | tee dat 或者 tcpdump -l > dat & tail -f dat
-r    读取 pcap 文件
```

## 理解 tcpdump 的输出

```txt
08:41:13.729687 IP 192.168.64.28.22 > 192.168.64.1.41916: Flags [P.], seq 196:568, ack 1, win 309, options [nop,nop,TS val 117964079 ecr 816509256], length 372
```

* 08:41:13.729687 在系统时间中，此包的时间戳

* IP 代表网络层的协议，指 IPv4，如果是 IP6，则指 IPv6

* 192.168.64.28.22 源 IP 地址和端口，> 后指的是目标 IP 地址和端口

* Flags [P.] TCP Flags，具体含义如下：

    | Value | Flag Type | Description       |
    | ----- | --------- | ----------------- |
    | S     | SYN       | Connection Start  |
    | F     | FIN       | Connection Finish |
    | P     | PUSH      | Data push         |
    | R     | RST       | Connection reset  |
    | .     | ACK       | Acknowledgment    |

    Flags 的值可以是上面 Value 的组合，如：[S.] 代表 SYN-ACK 包

* seq 196:568 表示这个包包含的数据量，第一个包是一个绝对数字，后面的包使用相对数字进行跟随，此处的含义指，这个包包含了数据流 196 到 568 的字节。

* ack 1 ACK 值，在这个例子中，1 是来自数据发送方，对于数据接收方，其表示此流上的下一个字节，例如，其值将会是 568

* win 309 表示接受缓存的可用大小，此处表示 309 byte，由 TCP 中MSS（Maximum Segment Size）或 Window Scale 确定，具体参考 [Transmission Control Protocol (TCP) Parameters](https://www.iana.org/assignments/tcp-parameters/tcp-parameters.xhtml)

* length 372 表示包里数据的长度，注意，第一个包和最后一个包的数值不同



## 用例

### 创建复杂条件

可以通过 `and` 或者 `or` 创建更复杂的过滤条件，例如，过滤源 IP 为 192.168.122.98，端口为 80 的包

```sh
$ sudo tcpdump -i any -c5 -nn src 192.168.122.98 and port 80

tcpdump: verbose output suppressed, use -v or -vv for full protocol decode
listening on any, link-type LINUX_SLL (Linux cooked), capture size 262144 bytes
10:08:00.472696 IP 192.168.122.98.39342 > 54.204.39.132.80: Flags [S], seq 2712685325, win 29200, options [mss 1460,sackOK,TS val 123170822 ecr 0,nop,wscale 7], length 0
10:08:00.516118 IP 192.168.122.98.39342 > 54.204.39.132.80: Flags [.], ack 268723504, win 229, options [nop,nop,TS val 123170865 ecr 522918648], length 0
10:08:00.516583 IP 192.168.122.98.39342 > 54.204.39.132.80: Flags [P.], seq 0:112, ack 1, win 229, options [nop,nop,TS val 123170866 ecr 522918648], length 112: HTTP: GET / HTTP/1.1
10:08:00.567044 IP 192.168.122.98.39342 > 54.204.39.132.80: Flags [.], ack 643, win 239, options [nop,nop,TS val 123170916 ecr 522918661], length 0
10:08:00.788153 IP 192.168.122.98.39342 > 54.204.39.132.80: Flags [F.], seq 112, ack 643, win 239, options [nop,nop,TS val 123171137 ecr 522918661], length 0
5 packets captured
5 packets received by filter
0 packets dropped by kernel
```

通过圆括号对过滤条件分组，用引号为了防止与终端表达式混淆

```sh
$ sudo tcpdump -i any -c5 -nn "port 80 and (src 192.168.122.98 or src 54.204.39.132)"

tcpdump: verbose output suppressed, use -v or -vv for full protocol decode
listening on any, link-type LINUX_SLL (Linux cooked), capture size 262144 bytes
10:10:37.602214 IP 192.168.122.98.39346 > 54.204.39.132.80: Flags [S], seq 871108679, win 29200, options [mss 1460,sackOK,TS val 123327951 ecr 0,nop,wscale 7], length 0
10:10:37.650651 IP 54.204.39.132.80 > 192.168.122.98.39346: Flags [S.], seq 854753193, ack 871108680, win 28960, options [mss 1460,sackOK,TS val 522957932 ecr 123327951,nop,wscale 9], length 0
10:10:37.650708 IP 192.168.122.98.39346 > 54.204.39.132.80: Flags [.], ack 1, win 229, options [nop,nop,TS val 123328000 ecr 522957932], length 0
10:10:37.651097 IP 192.168.122.98.39346 > 54.204.39.132.80: Flags [P.], seq 1:113, ack 1, win 229, options [nop,nop,TS val 123328000 ecr 522957932], length 112: HTTP: GET / HTTP/1.1
10:10:37.692900 IP 54.204.39.132.80 > 192.168.122.98.39346: Flags [.], ack 113, win 57, options [nop,nop,TS val 522957942 ecr 123328000], length 0
5 packets captured
5 packets received by filter
0 packets dropped by kernel
```



### 打印包的内容

`-X` 用 hex 和 ASCII 打印包内容

`-A` 用 ASCII 打印包内容

对于纯 HTTP 请求，通过查看包内容便于定位问题，但对于加密的连接，此方式意义不大。

```sh
$ sudo tcpdump -i any -c10 -nn -A port 80

tcpdump: verbose output suppressed, use -v or -vv for full protocol decode
listening on any, link-type LINUX_SLL (Linux cooked), capture size 262144 bytes
13:02:14.871803 IP 192.168.122.98.39366 > 54.204.39.132.80: Flags [S], seq 2546602048, win 29200, options [mss 1460,sackOK,TS val 133625221 ecr 0,nop,wscale 7], length 0
E..<..@.@.....zb6.'....P...@......r............
............................
13:02:14.910734 IP 54.204.39.132.80 > 192.168.122.98.39366: Flags [S.], seq 1877348646, ack 2546602049, win 28960, options [mss 1460,sackOK,TS val 525532247 ecr 133625221,nop,wscale 9], length 0
E..<..@./..a6.'...zb.P..o..&...A..q a..........
.R.W.......     ................
13:02:14.910832 IP 192.168.122.98.39366 > 54.204.39.132.80: Flags [.], ack 1, win 229, options [nop,nop,TS val 133625260 ecr 525532247], length 0
E..4..@.@.....zb6.'....P...Ao..'...........
.....R.W................
13:02:14.911808 IP 192.168.122.98.39366 > 54.204.39.132.80: Flags [P.], seq 1:113, ack 1, win 229, options [nop,nop,TS val 133625261 ecr 525532247], length 112: HTTP: GET / HTTP/1.1
E.....@.@..1..zb6.'....P...Ao..'...........
.....R.WGET / HTTP/1.1
User-Agent: Wget/1.14 (linux-gnu)
Accept: */*
Host: opensource.com
Connection: Keep-Alive

................
13:02:14.951199 IP 54.204.39.132.80 > 192.168.122.98.39366: Flags [.], ack 113, win 57, options [nop,nop,TS val 525532257 ecr 133625261], length 0
E..4.F@./.."6.'...zb.P..o..'.......9.2.....
.R.a....................
13:02:14.955030 IP 54.204.39.132.80 > 192.168.122.98.39366: Flags [P.], seq 1:643, ack 113, win 57, options [nop,nop,TS val 525532258 ecr 133625261], length 642: HTTP: HTTP/1.1 302 Found
E....G@./...6.'...zb.P..o..'.......9.......
.R.b....HTTP/1.1 302 Found
Server: nginx
Date: Sun, 23 Sep 2018 17:02:14 GMT
Content-Type: text/html; charset=iso-8859-1
Content-Length: 207
X-Content-Type-Options: nosniff
Location: https://opensource.com/
Cache-Control: max-age=1209600
Expires: Sun, 07 Oct 2018 17:02:14 GMT
X-Request-ID: v-6baa3acc-bf52-11e8-9195-22000ab8cf2d
X-Varnish: 632951979
Age: 0
Via: 1.1 varnish (Varnish/5.2)
X-Cache: MISS
Connection: keep-alive

<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">
<html><head>
<title>302 Found</title>
</head><body>
<h1>Found</h1>
<p>The document has moved <a href="https://opensource.com/%3C/span%3Ehttps%3A%3Cspan%20class%3D"sy0">//opensource.com/">here</a>.</p>
</body></html>
................
13:02:14.955083 IP 192.168.122.98.39366 > 54.204.39.132.80: Flags [.], ack 643, win 239, options [nop,nop,TS val 133625304 ecr 525532258], length 0
E..4..@.@.....zb6.'....P....o..............
.....R.b................
13:02:15.195524 IP 192.168.122.98.39366 > 54.204.39.132.80: Flags [F.], seq 113, ack 643, win 239, options [nop,nop,TS val 133625545 ecr 525532258], length 0
E..4..@.@.....zb6.'....P....o..............
.....R.b................
13:02:15.236592 IP 54.204.39.132.80 > 192.168.122.98.39366: Flags [F.], seq 643, ack 114, win 57, options [nop,nop,TS val 525532329 ecr 133625545], length 0
E..4.H@./.. 6.'...zb.P..o..........9.I.....
.R......................
13:02:15.236656 IP 192.168.122.98.39366 > 54.204.39.132.80: Flags [.], ack 644, win 239, options [nop,nop,TS val 133625586 ecr 525532329], length 0
E..4..@.@.....zb6.'....P....o..............
.....R..................
10 packets captured
10 packets received by filter
0 packets dropped by kernel
```

### 显示监控的网卡

```sh
$ sudo tcpdump -D

1.eth0 [Up, Running]
2.tunl0 [Up, Running]
3.lo [Up, Running, Loopback]
```

### 监控 HTTPS 流量

```sh
$ sudo tcpdump -nnSX port 443

tcpdump: verbose output suppressed, use -v or -vv for full protocol decode
listening on pktap, link-type PKTAP (Apple DLT_PKTAP), capture size 262144 bytes
22:24:44.638181 IP 192.168.63.207.51909 > 216.58.196.106.443: UDP, length 33
	0x0000:  0eb2 d85d dc39 88e9 fe80 f2ee 0800 4500  ...].9........E.
	0x0010:  003d d52e 0000 4011 0865 c0a8 3fcf d83a  .=....@..e..?..:
	0x0020:  c46a cac5 01bb 0029 5473 481c 942c ee01  .j.....)TsH..,..
	0x0030:  466b 662d 5d8d 0b6d e459 87e2 c993 b2d5  Fkf-]..m.Y......
	0x0040:  179f d0e2 91b4 1cca 3606 ac              ........6..
22:24:44.735185 IP 216.58.196.106.443 > 192.168.63.207.51909: UDP, length 28
	0x0000:  88e9 fe80 f2ee 0eb2 d85d dc39 0800 4580  .........].9..E.
	0x0010:  0038 0000 4000 3511 a818 d83a c46a c0a8  .8..@.5....:.j..
	0x0020:  3fcf 01bb cac5 0024 bce1 4e83 76fc 3129  ?......$..N.v.1)
	0x0030:  3c69 8655 3736 57c9 0374 ba71 7f24 780e  <i.U76W..t.q.$x.
	0x0040:  b22f 3686 f2f0  
```



### 监控以太网/接口的所有流量

首先查找需要监听的接口

```sh
$ sudo netstat -I

Name  Mtu   Network       Address            Ipkts Ierrs    Opkts Oerrs  Coll
lo0   16384 <Link#1>                          5596     0     5596     0     0
lo0   16384 127           localhost           5596     -     5596     -     -
lo0   16384 localhost   ::1                   5596     -     5596     -     -
lo0   16384 fe80::1%lo0 fe80:1::1             5596     -     5596     -     -
gif0* 1280  <Link#2>                             0     0        0     0     0
stf0* 1280  <Link#3>                             0     0        0     0     0
XHC0* 0     <Link#4>                             0     0        0     0     0
XHC20 0     <Link#5>                             0     0        0     0     0
en0   1500  <Link#6>    88:e9:fe:80:f2:ee  3842012     0  2944930     0     0
```

然后运行下面命令

```sh
$ sudo tcpdump -i en0

tcpdump: verbose output suppressed, use -v or -vv for full protocol decode
listening on en0, link-type EN10MB (Ethernet), capture size 262144 bytes
22:33:43.964384 IP 192.168.63.207.52021 > del12s01-in-f14.1e100.net.https: UDP, length 33
22:33:43.966916 IP 192.168.63.207.50525 > dns.google.domain: 49613+ PTR? 14.194.250.142.in-addr.arpa. (45)
22:33:44.061246 IP 192.168.63.207.52021 > del12s01-in-f14.1e100.net.https: UDP, length 304
22:33:44.073895 IP del12s01-in-f14.1e100.net.https > 192.168.63.207.52021: UDP, length 26
22:33:44.128842 IP del12s01-in-f14.1e100.net.https > 192.168.63.207.52021: UDP, length 32
22:33:44.137628 IP 192.168.63.207.52021 > del12s01-in-f14.1e100.net.https: UDP, length 33
```



### 监控指定 IP 流量

```sh
$ sudo tcpdump host 13.234.208.117

tcpdump: data link type PKTAP
tcpdump: verbose output suppressed, use -v or -vv for full protocol decode
listening on pktap, link-type PKTAP (Apple DLT_PKTAP), capture size 262144 bytes
22:45:57.367013 IP 192.168.63.207.64592 > ec2-13-234-208-117.ap-south-1.compute.amazonaws.com.http: Flags [S], seq 3539239920, win 65535, options [mss 1460,nop,wscale 6,nop,nop,TS val 310135746 ecr 0,sackOK,eol], length 0
22:45:57.443581 IP ec2-13-234-208-117.ap-south-1.compute.amazonaws.com.http > 192.168.63.207.64592: Flags [S.], seq 2896228504, ack 3539239921, win 26847, options [mss 1370,sackOK,TS val 466856669 ecr 310135746,nop,wscale 7], length 0
22:45:57.443629 IP 192.168.63.207.64592 > ec2-13-234-208-117.ap-south-1.compute.amazonaws.com.http: Flags [.], ack 1, win 2058, options [nop,nop,TS val 310135822 ecr 466856669], length 0
```



#### 通过 Source & Destination 进行过滤

通过来源 IP 过滤

```txt
sudo tcpdump src 13.234.208.117

tcpdump: data link type PKTAP
tcpdump: verbose output suppressed, use -v or -vv for full protocol decode
listening on pktap, link-type PKTAP (Apple DLT_PKTAP), capture size 262144 bytes
22:49:12.316783 IP ec2-13-234-208-117.ap-south-1.compute.amazonaws.com.http > 192.168.63.207.64732: Flags [F.], seq 2354751256, ack 1264243161, win 231, options [nop,nop,TS val 466905387 ecr 310324778], length 0
22:49:12.394468 IP ec2-13-234-208-117.ap-south-1.compute.amazonaws.com.http > 192.168.63.207.64732: Flags [.], ack 2, win 231, options [nop,nop,TS val 466905406 ecr 310329720], length 0
22:49:12.394471 IP ec2-13-234-208-117.ap-south-1.compute.amazonaws.com.http > 192.168.63.207.64732: Flags [.], ack 2, win 231, options [nop,nop,TS val 466905406 ecr 310329720], length 0
22:49:20.285971 IP ec2-13-234-208-117.ap-south-1.compute.amazonaws.com.http > 192.168.63.207.64738: Flags [S.], seq 1494685197, ack 2749736154, win 26847, options [mss 1370,sackOK,TS val 466907380 ecr 310337605,nop,wscale 7], length 0
```

通过目的 IP 过滤

```sh
$ sudo tcpdump dst 192.168.63.207
```



### 监控某子网

```sh
$ sudo tcpdump net 192.168.0.0/24
```

### 监控指定端口

```sh
$ sudo tcpdump port 3306

$ sudo tcpdump src port 2202

# 指定端口范围
$ sudo tcpdump portrange 21-30
```

### 监控某协议

可选择 TCP, UDP, ICMP  等协议。

```sh
$ sudo tcpdum icmp
```

### 只监控 IPv6 的流量

```sh
$ sudo tcpdump -i any -c5 icmp
```

### 将捕捉到的信息存到文件中

```sh
$ sudo tcpdump -i any -c10 -nn -w -v webserver.pcap port 80
```

### 读取 PCAP 文件

```sh
$ tcpdump -nn -r webserver.pcap src 54.204.39.132

reading from file webserver.pcap, link-type LINUX_SLL (Linux cooked)
13:36:57.718932 IP 54.204.39.132.80 > 192.168.122.98.39378: Flags [S.], seq 1999298316, ack 3709732620, win 28960, options [mss 1460,sackOK,TS val 526052949 ecr 135708029,nop,wscale 9], length 0
13:36:57.756979 IP 54.204.39.132.80 > 192.168.122.98.39378: Flags [.], ack 113, win 57, options [nop,nop,TS val 526052959 ecr 135708068], length 0
13:36:57.760122 IP 54.204.39.132.80 > 192.168.122.98.39378: Flags [P.], seq 1:643, ack 113, win 57, options [nop,nop,TS val 526052959 ecr 135708068], length 642: HTTP: HTTP/1.1 302 Found
13:36:58.022089 IP 54.204.39.132.80 > 192.168.122.98.39378: Flags [F.], seq 643, ack 114, win 57, options [nop,nop,TS val 526053025 ecr 135708327], length 0
```

可以将 pcap 文件导入可视化工具（如 WireShark）进行分析。


参考：

* [An introduction to using tcpdump at the Linux command line | Opensource.com](https://opensource.com/article/18/10/introduction-tcpdump)
* [How to:- Install tcpdump on CentOS/Redhat 5/6/7/8 Version - yum/rpm - LookLinux](https://www.looklinux.com/how-to-install-tcpdump-on-centosrhel-system/)
* [Transmission Control Protocol (TCP) Parameters](https://www.iana.org/assignments/tcp-parameters/tcp-parameters.xhtml)
