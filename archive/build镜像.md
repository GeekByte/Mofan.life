主要介绍的是`docker build`命令

`--tag` 参数： 用一个字符串标记镜像，主要用于方便我们阅读和识别镜像，如果不指定，镜像默认的标记是`latest`。



对于`docker tag`命令
用于给镜像打标签，一般指定版本信息，一个镜像可以有好几个标签，但他们都是基于一个镜像。
```shell
docker tag hell:v1.0 hello:latest
```
可以用`docker images` 查看所有镜像。

删除tag
```shell
docker rmi hello:latest
```



