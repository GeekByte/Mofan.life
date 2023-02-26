---
title: Linux修改su密码及免密登陆
categories:
  - Linux
tags:
  - Linux
date: 2021-05-24 10:43:20
---

### 修改su密码

在Linux终端输入命令，然后依次输入新密码即可.

```sh
# sudo passwd root
输入新的 UNIX 密码：
重新输入新的 UNIX 密码：
passwd：已成功更新密码
```

### 使用ssh公钥实现免密登陆

使用`ssh-key-id`命令将公钥发给免密登陆的服务器，其中`-i`是指定公钥文件。

```sh
# ssh-key-id -i .ssh/id_rsa.pub root@192.168.8.88
```

