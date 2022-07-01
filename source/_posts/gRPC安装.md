---
title: gRPC安装
categories:
  - RPC
  - gRPC
tags:
  - RPC
  - gRPC
date: 2021-03-31 21:57:14
---

> 卸载前面，这篇文章是我在3月份写的，当时刚入门Go，好多坑不懂，刚入职就碰到grpc,protobuf这些，对我来说都算新鲜事物，所以该有的坑都踩了一下。
> 这篇文章无形中安装了官方文档里写的C++安装这块（[Quick start | C++ | gRPC](https://grpc.io/docs/languages/cpp/quickstart/)），所以，我建议，如果安装C++的直接参考官方文档即可，当然安装其他的也可以参考官方文档，都是走的通的，但是有一点需要注意，在跟官方文档走的时候，最好有自己的梯子。
> 我这篇文档以及官方文档里C++的部分，都是从源码编译的角度出发，所以，编译后不仅会生成grpc_cpp_plugin，还会生成诸如：grpc_python_plugin、grpc_node_plugin等，同时也会生成protoc，所以，这算是一个比较完全的方式，大多数情况下，只要不涉及到C++，直接去上面官方文档里找对应的语言进行安装即可.

> Ubuntu 16.04 LTS
>
> 或
>
> Mac OS BigSur

在安装`gRPC` 时，竟然莫名其妙的走了很多弯路，其实官方安装方法很简单，但是困难的地方在于你要用龟速来从`GitHub`下载这么庞大的一个东西。

为了节省时间，我强烈建议你整个梯子用，或者晚上睡觉前让它执行克隆任务。

### 资源准备

这一步需要点时间，如果没有梯子的话。

```shell
# 下载grpc代码
git clone https://github.com/grpc/grpc.git

# 下载完后进入grpc目录
cd grpc

# 更新子模块, 加上--recursive可以把源码下载下来，为了避免乱七八糟的问题，强烈建议你带上
git submodule update --init --recursive
```

#### 安装依赖

这一步还好，如果网速不错，很快就能完成。

##### Linux系统

```shell
sudo apt-get install pkg-config

sudo apt-get install autoconf automake libtool make g++ unzip

sudo apt-get install libgflags-dev libgtest-dev

sudo apt-get install clang libc++-dev
```

##### Mac系统

```shell
brew install autoconf automake libtool
```

### 编译安装

这是重头戏，编译也挺慢的，看机器性能。

#### 安装ProtoBuf

`gRPC`默认使用`protobuf`作为传输协议。我们先安装protobuf，在`grpc/third_party/protobuf/`下：

```shell

sudo ./autogen.sh   #生成配置脚本
sudo ./configure    #生成Makefile文件，默认路径为/usr/local/
sudo make
sudo make install 
sudo ldconfig       #更新共享库缓存
```

此时，在`/usr/local/bin`你会看到`protoc`可执行文件，新开一个终端，然后`protoc --version`试一下是否成功安装。

#### 安装gRPC

官方推荐使用`bazel`进行编译，但我用的是`cmake`进行的编译，不同平台的编译方法在`/grpc/BUILDING.md`文件有说明，这里的`cmake`编译方法也是来自这个文件。

```shell
$ mkdir -p cmake/build
$ cd cmake/build
$ cmake ../..
$ make
# 执行make install 进行安装
$ make install
```

这里编译的时候在`ubuntu  16.04`上可能会遇到ld的报错，意思大概是说你装了两个不同版本的`libprotobuf.so`，可能会导致冲突。上网搜索之后了解到这是因为`ubuntu`默认安装了一个低版本的`protobuf`，解决办法是卸载掉这个就好了，用上面编译安装的`3.x`版本：

```
sudo apt-get remove libprotobuf-dev
```

然后重新`cmake`一下就好了。

完成上面的步骤后，你会发现在创建的`cmake/build`文件夹里，有`grpc_xxx_plugin`这些可执行文件，使用命令将他们移动到`/usr/local/bin`下，这样就可以使用`which grpc_xxx_plugin`打印它的位置了，这在将来使用`protoc`命令生成`protobuf`文件时需要用到。

```shell
sudo mv grpc* /usr/local/bin
```

### 测试成果

```shell
cd examples/cpp/helloworld/
make
# 开启一个服务
./greeter_server 
# 在另一个terminal
./greeter_client
```

看到程序输出`Hello world`，就意味着你成功了。
