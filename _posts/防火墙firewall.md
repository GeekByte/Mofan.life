---
title: 防火墙firewall
categories:
  - Linux
  - 防火墙
  - firewall
tags:
  - Linux
  - firewall
date: 2021-04-11 10:28:16
---

从Cent OS 7.0开始，Cent OS 默认使用`firewall`作为其防火墙。

## firewall 常用命令

```sh
firewall-cmd --state                           # 查看防火墙状态，是否是running
firewall-cmd --reload                          # 重新载入配置，比如添加规则之后，需要执行此命令
firewall-cmd --get-zones                       # 列出支持的zone
firewall-cmd --get-services                    # 列出支持的服务，在列表中的服务是放行的
firewall-cmd --query-service ftp               # 查看ftp服务是否支持，返回yes或者no
firewall-cmd --add-service=ftp                 # 临时开放ftp服务
firewall-cmd --add-service=ftp --permanent     # 永久开放ftp服务
firewall-cmd --remove-service=ftp --permanent  # 永久移除ftp服务
firewall-cmd --add-port=80/tcp --permanent     # 永久添加80端口 
iptables -L -n                                 # 查看规则，这个命令是和iptables的相同的
man firewall-cmd                               # 查看帮助
```

## 用法实例

```sh
# 开启80端口
firewall-cmd --zone=public --add-port=80/tcp --permanent
# 参数解析：
# --zone               # 作用域
# --add-port=80/tcp    # 添加端口，格式为：端口/通讯协议
# --permanent          # 永久生效，没有此参数重启后失效

# 启动防火墙
systemctl start firewalld.service   

# 关闭防火墙
systemctl stop firewalld.service   

# 禁止firewall开机启动
systemctl disable firewalld.service       

# 重启防火墙
firewall-cmd --reload

# 查看防火墙状态
systemctl status firewalld.service

# 查看防火墙规则
iptables -L -n
```





