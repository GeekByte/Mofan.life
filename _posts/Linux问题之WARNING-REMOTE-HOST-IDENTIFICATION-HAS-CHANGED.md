---
title: Linux问题之WARNING REMOTE HOST IDENTIFICATION HAS CHANGED!
categories:
  - Linux
tags:
  - Linux
date: 2021-04-10 16:57:13
---

在使用`ssh` 传输文件时，报了下面的问题：

```txt
[root@xx]# scp xxx.tar root@192.168.13.14:/root/
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@    WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!     @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!
Someone could be eavesdropping on you right now (man-in-the-middle attack)!
It is also possible that a host key has just been changed.
The fingerprint for the ECDSA key sent by the remote host is
SHA256:9XvufSSIeZ7MAurIZ1Qw9Z13YV1Zcim2kthmECgYw.
Please contact your system administrator.
Add correct host key in /root/.ssh/known_hosts to get rid of this message.
Offending ECDSA key in /root/.ssh/known_hosts:8
ECDSA host key for 192.168.13.14 has changed and you have requested strict checking.
Host key verification failed.
lost connection
```

文件传输不过去，只需要删除`.ssh`目录下的known_hosts文件就能传输了。
`rm -rf ~/.ssh/known_hosts`

应该是之前进行过传输，生成了这么一个认证文件，后来另一台机器可能重装系统了，但是路由器分给它的内网IP没有变，但是在通信认证的时候发现和原先的认证记录对不起来，造成了这个问题。这是我的个人猜测，如果有更好的简介，欢迎留言交流。

