---
title: 防火墙iptables
categories:
  - Linux
tags:
  - Linux
  - iptables
date: 2021-04-11 10:22:49
---

从Cent OS 7.0开始，Cent OS 默认使用`firewall`作为其防火墙。若使用`iptable`，需要关闭`firewall`。

```bash
# 1、直接关闭firewalld防火墙
systemctl stop firewalld.service        #停止firewall
systemctl disable firewalld.service     #禁止firewall开机启动

# 2、安装 iptables service
yum -y install iptables-services

# 如果要修改防火墙配置，如增加防火墙端口3306
vi /etc/sysconfig/iptables 
# 增加规则
-A INPUT -m state --state NEW -m tcp -p tcp --dport 3306 -j ACCEPT

# 保存退出后
systemctl restart iptables.service    #重启防火墙使配置生效
systemctl enable iptables.service     #设置防火墙开机启动

# 最后重启系统使设置生效。
```

## iptables 配置

```bash
# 查看iptables配置
iptables -L -n

# 添加常用端口规则：
#允许对外请求的返回包
iptables -A INPUT -m state --state RELATED,ESTABLISHED -j ACCEPT
#允许icmp包通过
iptables -A INPUT -p icmp --icmp-type any -j ACCEPT
#允许来自于lo接口的数据包，如果没有此规则，将不能通过127.0.0.1访问本地服务
iptables -A INPUT -i lo -j ACCEPT
 
#常用端口
iptables -A INPUT -p tcp -m state --state NEW -m tcp --dport 21 -j ACCEPT
iptables -A INPUT -p tcp -m state --state NEW -m tcp --dport 22 -j ACCEPT
iptables -A INPUT -p tcp -m state --state NEW -m tcp --dport 23 -j ACCEPT
iptables -A INPUT -p tcp -m state --state NEW -m tcp --dport 80 -j ACCEPT
iptables -A INPUT -p tcp -m state --state NEW -m tcp --dport 443 -j ACCEPT
iptables -A INPUT -p tcp -m state --state NEW -m tcp --dport 3306 -j ACCEPT
iptables -A INPUT -p tcp -m state --state NEW -m tcp --dport 8080 -j ACCEPT

#过滤所有非以上规则的请求
iptables -P INPUT DROP

#如果要添加内网ip信任（接受其所有TCP请求）
#注：(**.**.**.**)为IP,下同
iptables -A INPUT -p tcp -s **.**.**.** -j ACCEPT

#要封停一个IP，使用下面这条命令
iptables -I INPUT -s **.**.**.** -j DROP
#要解封一个IP，使用下面这条命令
iptables -D INPUT -s **.**.**.** -j DROP

# 保存重启防火墙
/etc/init.d/iptables save
service iptables restart
```

## 用法实例

```bash
#允许所有入栈规则
iptables -P INPUT ACCEPT

#清空默认所有规则
iptables -F

#清空自定义的所有规则
iptables -X

#计数器置0
iptables -Z

# 关闭端口,常用删除端口规则命令
# 查看当前端口所在行数
iptables -L -n --line-number

# 删除指定序列的端口（下面是删除第五条端口）
iptables -D INPUT 5

# 确认是否已经删除，可以重新查看列表
iptables -L -n --line-number
```
