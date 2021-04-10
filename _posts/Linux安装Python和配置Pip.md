---
title: Linux安装Python和配置Pip
categories:
  - Linux
  - 实践问题
tags:
  - Linux
  - Python
  - pip
date: 2021-04-08 19:54:40
---

> 系统：Ubuntu 16.04 LTS
>
> Python 版本：3.9.4
>
> Pip 版本: 21.0.1

用系统默认的 `Python` 安装的 `pip` 一执行 `pip` 命令就报错（默认的`Python` 版本分别是 `2.7` 和 `3.5` ），通过打印的错误来看，应该是兼容性的问题。

为了节省时间，于是决定从官网下载最新 `Python` 使用，并通过创建软连接的方式，达到在终端直接输入 `python` 或者 `pip` ，能够使用我自己装的 `Python` 和 `Pip`。

考虑到默认 `Pip` 仓库的下载速度比较慢，于是将 `Pip` 的仓库换成了清华的，同时在文末也放了几个国内的其他仓库地址，因为有些东西某个仓库里可能没有，需要使用其他仓库下载，视具体情况根据需要设置。

由于自己下载的 `Python` 编译安装完后就自带了对应的 `Pip` ，所以，下面的文章分两部分，分别是`安装Python`、`配置Pip`

### 安装Python

#### 下载

Linux版本的Python下载地址：[Python Source Releases | Python.org](https://www.python.org/downloads/source/)

都是源码下载，需要自己编译，我下载的 `xz` 格式的压缩包。

#### 编译

请在 `sudo` 模式下进行

```shell
# 解压压缩包
tar -xvf Python-3.9.4.tar.xz
# 配置
cd Python-3.9.4
./configure
# 编译 & 安装
make && make install
```

安装完后在`/usr/local/bin` 中会看到编译后的`Python` 可执行文件

#### 创建软连接

```shell
# 先删除原先的python软连接
sudo rm -rf /usr/bin/python
# 创建软连接
sudo ln -s /usr/local/bin/python3.9 /usr/bin/python
```

### 配置Pip

#### 创建软连接

```shell
# 创建软连接
sudo ln -s /usr/local/bin/pip3.9 /usr/bin/pip

# 如果提示已经存在软连接，则先删除再创建
sudo rm -rf /usr/bin/pip
```

#### 修改全局仓库地址

在当前的用户目录下，创建文件夹.pip，在里面新建文件pip.conf

```shell
mkdir .pip && cd .pip
vim pip.conf
```

在里面写入下面的内容：

```txt
[global]
index-url = https://pypi.tuna.tsinghua.edu.cn/simple/
```

#### 其他的仓库地址

```txt
# 阿里源
[global]
index-url = http://mirrors.aliyun.com/pypi/simple/
trusted-host = mirrors.aliyun.com

# 豆瓣源
[global]
index-url = http://pypi.douban.com/simple
trusted-host = pypi.douban.com
```

