---
title: ROS学习笔记
categories:
  - ROS
tags:
  - ROS
date: 2021-11-04 21:33:47
---

官网: [cn/ROS/Tutorials - ROS Wiki](http://wiki.ros.org/cn/ROS/Tutorials)

首先要记住几点:

1. ros与系统环境变量关系密切，所以要时刻注意当前终端的环境信息，比如要source工作空间下devel/setup.sh
2. 启动ros节点之前，必须先启动`roscore`

## 文件系统

### 概念

- **软件包（Packages）：**包是ROS代码的软件组织单元，每个软件包都可以包含程序库、可执行文件、脚本或其他构件。
- **Manifests ([package.xml](http://wiki.ros.org/catkin/package.xml))：** 清单（Manifest）是对软件包的描述。它用于定义软件包之间的依赖关系，并记录有关软件包的元信息，如版本、维护者、许可证等。

### 工具

#### roscd: 直接切换目录(cd)到某个软件包或者软件包集当中。

* `roscd [locationname[/subdir]]`
* 进入存储ROS日志文件的目录: `roscd log`

#### rosls: 直接按软件包的名称执行(ls)命令（而不必输入绝对路径）。

## 软件包(package)

### 软件包的结构

- 这个包必须有一个符合catkin规范的[package.xml](http://wiki.ros.org/catkin/package.xml)文件，这个`package.xml`文件提供有关该软件包的元信息
- 这个包必须有一个[catkin版本的CMakeLists.txt](http://wiki.ros.org/catkin/CMakeLists.txt)文件，如果它是个[Catkin元包](http://wiki.ros.org/catkin/package.xml#Metapackages)的话，则需要有一个`CMakeList.txt`文件的相关样板
- 每个包必须有自己的目录，这意味着在同一个目录下不能有嵌套的或者多个软件包存在

最简单的软件包看起来就像这样：

```txt
my_package/
  CMakeLists.txt
  package.xml
```

### catkin工作空间中的软件包

```txt
workspace_folder/        -- WORKSPACE
  src/                   -- SOURCE SPACE
    CMakeLists.txt       -- 'Toplevel' CMake file, provided by catkin
    package_1/
      CMakeLists.txt     -- CMakeLists.txt file for package_1
      package.xml        -- Package manifest for package_1
    ...
    package_n/
      CMakeLists.txt     -- CMakeLists.txt file for package_n
      package.xml        -- Package manifest for package_n
```

### 工具

#### catkin_create_pkg 创建(构建)软件包

`catkin_create_pkg <package_name> <dependence>`

#### catkin_make 构建一个catkin工作区并生效配置文件

要将新工作区添加到ROS环境中，需要source工作空间内的`devel/setup.sh`

**执行时机:**

* 开启新终端的时候
* 增加工作区的时候

#### rospack: 软件包信息查询

* 返回软件包所在路径: `rospack find [package_name]`
* 打印软件包依赖关系
    * 查看一级依赖: `rospack depends1 <package_name>`
    * 递归检测出所有嵌套的依赖包: `rospack depends <package_name>`

### 软件包内的package.xml

package.xml 包含：描述标签、维护者标签、许可证标签、依赖项标签。

通过package.xml可以自定义软件包，所以新软件包的诞生不一定非要通过`catkin_create_pkg`创建

```xml
<?xml version="1.0"?>
<package format="2">
  <name>beginner_tutorials</name>
  <version>0.1.0</version>
  <description>The beginner_tutorials package</description>

  <maintainer email="you@yourdomain.tld">Your Name</maintainer>
  <license>BSD</license>
  <url type="website">http://wiki.ros.org/beginner_tutorials</url>
  <author email="you@yourdomain.tld">Jane Doe</author>

  <buildtool_depend>catkin</buildtool_depend>

  <build_depend>roscpp</build_depend>
  <build_depend>rospy</build_depend>
  <build_depend>std_msgs</build_depend>

  <exec_depend>roscpp</exec_depend>
  <exec_depend>rospy</exec_depend>
  <exec_depend>std_msgs</exec_depend>

</package>
```

## 节点(node)

> **图概念**
>
> [计算图（Computation Graph）](http://wiki.ros.org/cn/ROS/Concepts#ROS.2Bi6F7l1b.2BXEJrIQ-)是一个由ROS进程组成的点对点网络，它们能够共同处理数据。ROS的基本计算图概念有节点（Nodes）、主节点（Master）、参数服务器（Parameter Server）、消息（Messages）、服务（Services）、话题（Topics）和袋（Bags），它们都以不同的方式向图（Graph）提供数据。
>
> - [节点（Nodes）](http://wiki.ros.org/Nodes)：节点是一个可执行文件，它可以通过ROS来与其他节点进行通信。
> - [消息（Messages）](http://wiki.ros.org/Messages)：订阅或发布话题时所使用的ROS数据类型。
> - [话题（Topics）](http://wiki.ros.org/Topics)：节点可以将消息*发布*到话题，或通过*订阅*话题来接收消息。
> - [主节点（Master）](http://wiki.ros.org/Master)：ROS的命名服务，例如帮助节点发现彼此。
> - [rosout](http://wiki.ros.org/rosout)：在ROS中相当于`stdout/stderr（标准输出/标准错误）`。
> - [roscore](http://wiki.ros.org/roscore)：主节点 + rosout + [参数服务器](http://wiki.ros.org/Parameter Server)（会在以后介绍）。

ROS节点使用ROS[客户端库](http://wiki.ros.org/cn/Client Libraries)与其他节点通信。节点可以发布或订阅话题，也可以提供或使用[服务](http://wiki.ros.org/Services)。

### 工具

#### rosnode 显示当前正在运行的ROS节点信息

* 列出当前活动的节点:  `rosnode list`
* 查看某节点信息: `rosnode info <node_name>`

#### rosrun 运行软件包内的节点 

`rosrun [package_name] [node_name]`

## 话题(topic)

**节点**之间的通信通过**话题**实现。

**节点**可以**订阅**与**发布**话题。

### 工具

#### rat_graph 用动态的图显示了系统中正在发生的事情

#### rostopic 话题信息相关

* `rostopic echo [topic]` 显示某个话题上发布的数据

* `rostopic list -v` 列出所有发布和订阅的主题及其类型的详细信息

* `rostopic type [topic]` 查看所发布话题的消息类型

    进而查看某消息类型的详细信息: `rosmsg show [msg_type]`

* `rostopic pub [topic] [msg_type] [args]` 把数据发布到当前某个正在广播的话题上

* `rostopic hz [topic]` 报告话题上数据发布的速率

## 服务

[服务（Services）](http://wiki.ros.org/Services)是节点之间通讯的另一种方式。服务允许节点发送一个**请求（request）**并获得一个**响应（response）**

```txt
rosservice list         输出活跃服务的信息
rosservice call         用给定的参数调用服务
rosservice type         输出服务的类型
rosservice find         按服务的类型查找服务
rosservice uri          输出服务的ROSRPC uri
```

用法:

```txt
rosservice type [service]

rosservice call [service] [args]

rosservice type [service] | rossrv show
```

### 参数服务器

`rosparam`能让我们在ROS[参数服务器（Parameter Server）](http://wiki.ros.org/Parameter Server)上存储和操作数据。参数服务器能够存储整型（integer）、浮点（float）、布尔（boolean）、字典（dictionaries）和列表（list）等数据类型。rosparam使用YAML标记语言的语法。

```
rosparam set            设置参数
rosparam get            获取参数
rosparam load           从文件中加载参数
rosparam dump           向文件中转储参数
rosparam delete         删除参数
rosparam list           列出参数名
```

用法:

```txt
rosparam set [param_name]
rosparam get [param_name]

rosparam dump [file_name] [namespace]
rosparam load [file_name] [namespace]
```

## 日志

### 工具 rqt_console和rqt_logger_level

`rqt_console`连接到了ROS的日志框架，以显示节点的输出信息。`rqt_logger_level`允许我们在节点运行时改变输出信息的详细级别，包括`Debug`、`Info`、`Warn和`Error`。

### 日志级别

```txt
Fatal （致命）
Error （错误）
Warn  （警告）
Info  （信息）
Debug （调试）
```

## roslaunch

`roslaunch`可以用来启动定义在`launch（启动）`文件中的节点。

Eg:

```xml
<launch>

  <group ns="turtlesim1">
    <node pkg="turtlesim" name="sim" type="turtlesim_node"/>
  </group>

  <group ns="turtlesim2">
    <node pkg="turtlesim" name="sim" type="turtlesim_node"/>
  </group>

  <node pkg="turtlesim" name="mimic" type="mimic">
    <remap from="input" to="turtlesim1/turtle1"/>
    <remap from="output" to="turtlesim2/turtle1"/>
  </node>

</launch>
```

用法:

```txt
roslaunch [package_name] [launch_file]
```

## rosed

可以直接通过软件包名编辑包中的文件，而无需键入完整路径。（默认采用vim）

切换默认编辑器，只需在~/.bashrc中加入:

```shell
# 切换到nano
export EDITOR='nano -w'

# 或者切换到emacs
export EDITOR='emacs -nw'
```

## 消息与服务

- [msg](http://wiki.ros.org/msg)（消息）：msg文件就是文本文件，用于描述ROS消息的字段。它们用于为不同编程语言编写的消息生成源代码。
- [srv](http://wiki.ros.org/srv)（服务）：一个srv文件描述一个服务。它由两部分组成：请求（request）和响应（response）。

msg文件存放在软件包的`msg`目录下，srv文件则存放在`srv`目录下。

msg文件就是简单的文本文件，每行都有一个字段类型和字段名称。可以使用的类型为：

- int8, int16, int32, int64 (以及 uint*)
- float32, float64
- string
- time, duration
- 其他msg文件
- variable-length array[] 和 fixed-length array[C]

ROS中还有一个特殊的数据类型：`Header`，它含有时间戳和ROS中广泛使用的坐标帧信息。在msg文件的第一行经常可以看到`Header header`。

下面是一个使用了Header、字符串原语和其他两个消息的示例： 下面是一个msg文件的样例，它使用了Header，string，和其他另外两个消息的类型：

```txt
  Header header
  string child_frame_id
  geometry_msgs/PoseWithCovariance pose
  geometry_msgs/TwistWithCovariance twist
```

srv文件和msg文件一样，只是它们包含两个部分：请求和响应。这两部分用一条`---`线隔开。下面是一个srv文件的示例：

```txt
int64 A
int64 B
---
int64 Sum
```

在上面的例子中，`A`和`B`是请求, `Sum`是响应。

### 工具

#### rosmsg 消息相关

`rosmsg show [message type]`可以显示消息的定义信息，同时可以用来检查创建的消息能否被ROS识别。

#### rossrv 服务相关

`rossrv show <service type>` 类似rosmsg

## rosbag 数据的录制与回放

```txt
$ rosbag -h

   check        Determine whether a bag is playable in the current system, or if it can be migrated.
   compress     Compress one or more bag files.
   decompress   Decompress one or more bag files.
   decrypt      Decrypt one or more bag files.
   encrypt      Encrypt one or more bag files.
   filter       Filter the contents of the bag.
   fix          Repair the messages in a bag file so that it can be played in the current system.
   help  
   info         Summarize the contents of one or more bag files.
   play         Play back the contents of one or more bag files in a time-synchronized fashion.
   record       Record a bag file with the contents of specified topics.
   reindex      Reindexes one or more bag files.
```

rosbag不能完整的录制系统运行行为，因为对系统定时精度依赖比较大。

### 为什么用ros_readbagfile而不是rostopic echo -b呢？

1. 因为`rostopic`**极其地**慢！ 举个例子，就算在高配计算机（4核8线程的奔腾i7和m.2固态硬盘）上运行这个命令，也需要**11.5分钟**才能读取一个18GB的bag文件！

    ```txt
    time rostopic echo -b large_bag_file.bag /topic1
    ```

    而用`ros_readbagfile`脚本，在相同计算机上只要花费**1分钟37秒**就能读取同样的话题和18GB的bag文件！因此`ros_readbagfile`比`rostopic`快了11.5/(1+37/60) = **大约7倍**！

    ```txt
    time ros_readbagfile large_bag_file.bag /topic1
    ```

2. 因为`rostopic`一次只能读取**单个话题**，而`ros_readbagfile`可以同时读取**任意多的话题**！

    ```txt
    ros_readbagfile <mybagfile.bag> [topic1] [topic2] [topic3] [...] [topic1000]
    ```

## roswtf 查你的系统并尝试发现问题

