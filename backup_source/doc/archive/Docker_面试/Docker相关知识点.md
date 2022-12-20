# Docker相关知识点

### Docker 常用的命令

* docker pull 拉取或更新镜像
* docker push 推送镜像至远程仓库
* docker rm 删除容器
* docker rmi 删除镜像
* docker images 列出所有镜像
* docker ps 列出正在运行的容器
* docker ps -a 列出全部容器（包括不再运行的容器）

### Docker 是怎么样工作的

docker 是一种 C/S 架构模式（Client-Server)。

docker client 与 docker demon 的连接是通过 websocket。

docker client 负责处理用户输入的各种命令，然后将命令发送到 server 中，docker 中真正管理容器的是 server，也就是 docker demon（docker 守护进程）。

### Docker 容器之间怎么隔离

Linux 中的 PID、IPC、网络等资源是全局的，Docker 中使用 namespace 机制进行资源隔离，在该机制下，这些资源就不再是全局的，而是属于某个特定的 namespace，各个 namespace 下的资源互不打扰。

虽然 namespace 在逻辑上控制资源互相隔离，但容器中的进程还是可以不受控制的访问系统资源，所以，docker 采用 control groups 技术（也就是cgroup)，有了cgroup就可以控制容器中进程对系统资源的消耗了，比如你可以限制某个容器使用内存的上限、可以在哪些CPU上运行等等。

有了这两项技术，容器看起来就真的像是独立的操作系统了。

### Docker 容器与主机间资源的拷贝

docker cp命令用于容器与主机之间的数据拷贝

主机到哦容器：docker cp /www 96f7f14e99ab:/www/

容器到主机：docker cp 96f7f14e99ab:/www /tmp

### 如何在生产中监控 Docker

docker 通过 docker status 命令和 docker事件 等工具来监控生产环境中的docker，我们可以通过这些命令获取关于容器的一些数据。

* docker status 统计数据：当我们使用容器ID调用docker stats时，我们获得容器的CPU，内存使用情况等。它类似于Linux中的top命令。
* docker事件：docker事件是一个命令，用于查看docker守护程序中正在进行的活动流。一些常见的docker事件是：attach，commit，die，detach，rename，destroy等。我们还可以使用各种选项来限制或过滤我们感兴趣的事件。

### Dcokerfile中的命令 COPY 和 ADD 的区别

COPY 的 src 只能是本地文件，其他无区别。

### 一个完整的Docker由哪些部分组成

* Docker Client
* Docker Server （or Docker Daemon)
* Container
* Images

### 进入容器的方法

1. 使用 docker attach 命令
2. 使用 docker exec 命令， eg：docker exec -i -t 784fd3b294d7 /bin/bash

### 什么是联合文件系统（UnionFS）

docker 的镜像实际上是由一层一层的文件系统组成的，这种层级的文件系统就是 UnionFS。UnionFS 是一种分层、轻量级并且高性能的文件系统。联合加载会把各层的文件系统叠加起来，这样最终的文件系统会包含所有底层的文件和目录。

### Docker与虚拟机的区别

* Docker 是一种应用程序容器，专注于在应用程序容器内自动部署应用程序，应用程序容器旨在打包和运行单个服务，而虚拟机是一种系统容器，系统容器专注于运行多个进程。
* Docker 不需要引导操作系统内核，所以，可以在短时间内创建一个容器，且基于容器的虚拟化对主机资源消耗很低，所以，可以用于接近主机的性能
* 主机上的所有容器共享主机的调度程序，从而节省了额外资源需求
* 容器中的资源管理是通过 cgroup 实现的， cgroup 不允许容器消耗比分配给他们的更多的资源。





### 什么是Docker

* Docker 是一个容器化平台，它以容器的方式将应用程序及其所需的依赖项打包在一起，以确保在开发、测试及生产的任何环境中无缝运行。
* Docker 容器将一个软件包装在一个完整的文件系统中，该文件系统包含软件运行所需的一切，

### 什么是Docker镜像？

Docker镜像是**Docker容器的源代码**。换句话说，Docker镜像**用于创建容器**。使用build命令创建镜像，并且在使用run启动使它们生成容器。镜像存储在Docker注册表registry.hub.docker.com中，因为它们可能变得非常大，镜像被设计为由其他镜像层组成，允许在通过网络传输镜像时发送最少量的数据。 

### 什么是Docker容器？

Docker容器包括**应用程序及其所有依赖项**，但**与其他容器共享内核**，作为主机操作系统上**用户空间中的独立进程**运行。Docker容器不依赖于任何特定的基础架构：它们可以在任何计算机，任何基础架构和任何云中运行。 

### 什么类型的应用程序 - 无状态或有状态更适合Docker容器？

最好为Docker Container创建无状态应用程序。我们可以从应用程序中创建一个容器，并从应用程序中取出可配置的状态参数。现在我们可以在生产和具有不同参数的QA环境中运行相同的容器。这有助于在不同场景中重用相同的镜像。使用Docker Containers比使用有状态应用程序更容易扩展无状态应用程序。

### Docker的使用流程

1. 首先要编写 Dockerfile 文件，Dockerfile 是镜像的源代码；
2. 然后基于 Dockerfile 构建容器的镜像，镜像可以理解为 ”源代码“ 的 ”编译版本“；
3. 获得容器的镜像后，应使用注册表重新分发容器。注册表就像一个 git仓库，它用于 推送和拉取 镜像；
4. 使用该镜像来运行容器。

### Dockerfile中常见的指令

* FROM：使用 FROM 为后续指令设置 基础镜像，在每个有效的 Dockerfile 中，FROM是第一条指令。
* MAINTAINER：镜像维护者的姓名和邮箱。
* RUN：容器构建时需要运行的命令，该命令基于基础镜像支持的命令。
* EXPOSE：当前容器对外界暴露的端口。
* WORKDIR：（默认在/根目录），终端登录进去后的落脚点。
* ENV：构建镜像过程中的环境变量。
* ADD：拷贝 + 解压 功能。
* COPY：直接拷贝。
* VOLUME：自建容器卷。
* CMD：容器启动时需要运行的命令。可能有多个CMD，但只有最后一个生效，CMD会被 docker run 之后的参数替换。
* ENTRYPOINT：目的和CMD一样，但不会被 docker run 之后的参数替换。
* ONBUILD：触发器，当镜像当作另一个镜像的构建基础时，ONBUILD指令向镜像添加将在稍后执行的触发指令。

镜像：Docker镜像由一系列只读层构建的；

层：每个层代表 Dockerfile 中的一条指令。