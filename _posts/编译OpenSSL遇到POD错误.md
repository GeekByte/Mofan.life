---
title: 编译OpenSSL遇到POD错误
categories:
  - 小问题
tags:
  - 小问题
date: 2021-03-23 22:23:48
---

解压玩OpenSSL包后，执行`./configure`时，发现这个错误：

```text
POD document had syntax errors at /usr/bin/pod2man5.28 line 72. 　　
make： *** ［install_docs］ 错误 255
```

解决：删除 pod2man文件：

```shell
sudo rm -rf /usr/bin/pod2man
```





来自网上的分析：

原因分析：这是由于OpenSSL 1.0.1e 与 perl5.18 不兼容。有人验证 安装perl 5.16 可以兼容，安排低版本perl 5.16可以解决问题。
　　