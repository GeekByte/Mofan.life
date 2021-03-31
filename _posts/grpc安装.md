---
title: grpc安装
categories:
  - grace
tags:
  - grace
date: 2021-03-31 21:57:14
---

转行Go开发，没想到在`grpc`的安装上费了这多时间，首先不得不吐槽，github国内访问真的是太慢了，可能一百多兆的东西你来个十几kb速度下载，我真是吐了。我真怀疑墙github的人脑子是不是有问题，气死我了！

尝试了很多种方法，最后这种方法最靠谱，至少不会出什么幺蛾子，毕竟中间太耗时了！

而且，我不理解github上的grpc库为什么不能把那个`third_party`目录也压缩成一个包，直接下载，总之，安装方式极不友好！

下面开始介绍安装过程：

首先你得有个`GOPATH`，在里面创建个`src` 文件夹，然后，安装顺序一点点来，当然，如果你有`ks`上网工具，那么我建议你打开`全局模式`，没有的，我只能心疼你了。

```shell
% git clone https://github.com/golang/protobuf.git $GOPATH/src/github.com/golang/protobuf

% cd $GOPATH/src/github.com/golang/protobuf

% go install ./proto

% go install ./protoc-gen-go

% git clone https://github.com/golang/net.git $GOPATH/src/golang.org/x/net

% git clone https://github.com/golang/text.git $GOPATH/src/golang.org/x/text

% git clone https://github.com/google/go-genproto.git $GOPATH/src/google.golang.org/genproto

% git clone https://github.com/grpc/grpc-go.git $GOPATH/src/google.golang.org/grpc

% cd $GOPATH/src/

% go install google.golang.org/grpc
```

最后，下载个`grpc-go`的`example`测试一下，用个完美的结束告别这苦逼的一程！

```shell
#下载 example
% git clone -b v1.30.0 https://github.com/grpc/grpc-go

#启动server 
% cd grpc-go/examples/helloworld/greeter_server

% go run main.go 
#注意!!! 光标闪烁即启动完成 没有任何提示，别入坑

#启动client
% cd grpc-go/examples/helloworld/greeter_client

% go run main.go 

#输出,看到 Hello world，就恭喜你了，是不是像极了刚写程序时的你，哈哈哈
Greeting: Hello world
```

