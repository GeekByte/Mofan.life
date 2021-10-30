---
title: Mac使用命令查看SSD健康情况
categories:
  - Issues
tags:
  - Mac
date: 2021-10-30 21:46:04
---

本方式是借助命令行工具实现。

该工具使用 HomeBrew 进行安装，如果未安装 HomeBrew，请先到HomeBrew官方安装。

1. 打开终端工具，输入如下命令：

   ```shell
   brew install smartmontools
   ```

2. 获取硬盘设备标签代码，有两种方式，第一种较为简单(推荐)：

   * 一：通过图形化界面（推荐）：

     打开Mac上的 **磁盘工具**，点击Mac硬盘，在右侧找到 **设备** 对应的值，例如：disk1s1。

   * 二：通过命令行:

     在终端中输入 `diskutil list`，找到 **TYPE NAME** 为 **APFS Volume ⁨Macintosh HD⁩ ** 的行所对应的 **IDENTIFIER** 的值。

3. 开始进行SSD检查，输入命令，后面的值就是第 2 步拿到的硬盘标识码:

   ```shell
   smartctl -a disk1s1
   ```



执行结束后，会输出一堆信息，可对照下面进行查看:

```txt
严重警告（Critical Warning）：会显示控制器状态警告讯息，如果都显示0x00 就表示没事

温度（Temperature）：会显示当前SSD 温度资讯

可用备用空间（Available Spare）：SSD 剩余空间百分比

可用备用临界值（Available Spare Threshold）：临界值全由厂商定义

寿命百分比（Percentage Used）：目前SSD 寿命百分比数值，具体取决于实际设备使用情况和厂商对设备寿命的预测。

资料读取（Data Units Read）：记录电脑从SSD读取512字节数据单元的总量，每1000个单元记录一次，即这项Raw数据1的值等于500KB。

资料写入（Data Units Read）：如上，就是写入总量。

主机读取命令（Host Read Commands）：主控收到的读取命令数量。

主机写入命令（Host Write Commands）：主控收到的写入命令数量。

控制器忙碌时间（Controller Busy Time）：主控忙于I/O命令的时间。

意外关机（Unsafe Shutdowns）：纪录不正常断电次数

媒体和资料完整性错误（Media and Data Integrity Errors）：主控检测得到的未恢复的数据完整性错误次数。

错误资料纪录（Number of Error Information Log Entries）：主控总共收到的错误信息日志数量.
```

通常我们主要确认「寿命百分比（Percentage Used）」这项数值就好，通常达到90%以上就要额外注意。
