---
title: 网站返回403 Forbidden的原因及排查思路
categories:
  - 技术
tags:
  - 技术
date: 2021-10-20 18:03:25
---

**导致403错误的主要原因**

　　403 Forbidden错误的原因和解决方法

　　1、你的IP被列入黑名单。

　　2、你在一定时间内过多地访问此网站(一般是用采集程序)，被防火墙拒绝访问了。

　　3、网站域名解析到了空间，但空间未绑定此域名。

　　4、你的网页脚本文件在当前目录下没有执行权限。

　　5、在不允许写/创建文件的目录中执行了创建/写文件操作。

　　6、以http方式访问需要ssl连接的网址。

　　7、浏览器不支持SSL 128时访问SSL 128的连接。

　　8、在身份验证的过程中输入了错误的密码。

　　9、DNS解析错误，手动更改DNS服务器地址。

　　10、连接的用户过多，可以过后再试。

　　11、服务器繁忙，同一IP地址发送请求过多，遭到服务器智能屏蔽。

**解决403 forbidden错误的方法**

　　1、重建dns缓存

　　对于一些常规的403 forbidden错误，马海祥建议大家首先要尝试的就是重建dns缓存，在运行中输入cmd，然后输入ipconfig /flushdns即可。如果不行的话，就需要在hosts文件里把主页解析一下了。

　　2、修改文件夹安全属性

　　3、关于apache导致的403 forbidden错误，需设置Apache的配置文件。

　　4、关于HawkHost空间出现403 Forbidden错误需设置htaccess文件。
