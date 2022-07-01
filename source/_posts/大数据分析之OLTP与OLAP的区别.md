---
title: 大数据分析之OLTP与OLAP的区别
categories:
  - TODO
  - 大数据
tags:
  - 大数据
date: 2021-05-19 07:44:17
---

> OLTP:联机事务处理OLTP（on-line transaction processing）
>
> OLAP:联机分析处理OLAP（On-Line Analytical Processing）

数据从何而来？

企业日常的各个环节都会产生数据，一个企业从小到大的过程中，最初建设IT系统的时刻是一个分隔点。

在此之前，数据零散分布在邮箱、发票、单据、APP等各种地方。

![零散的数据分布](https://www.cmdbyte.com/2021/02/u=2453084096,4005979002&fm=173&app=25&f=JPEG.jpeg)

企业规模达到一定程度时则必须要建设IT系统，此时，数据开始在各种系统（ERP、CRM、MES等）中积累。

![IT系统中的数据分布](https://www.cmdbyte.com/2021/02/u=1162874362,247668556&fm=173&app=25&f=JPEG.jpeg)

数据价值随着其体量不断的累积也在一直增加。

获取其中的知识，能够帮助企业发现问题与机遇并进行正确的决策，以达到赢得市场之目的。

数据分析则是实现以上目标的重要手段之一。

数据分析体系的建设往往是在初次进行信息化建设后某个时间开始。

![数据化后数据分析体系的建立](https://www.cmdbyte.com/2021/02/u=3118014053,2411848866&fm=173&app=25&f=JPEG.jpeg)

数据分析体系与其他业务类系统有着显著的不同。

业务类系统主要供基层人员使用，进行一线业务操作，通常被称为OLTP（On-Line Transaction Processing，联机事务处理）。

数据分析的目标则是探索并挖掘数据价值，作为企业高层进行决策的参考，通常被称为OLAP（On-Line Analytical Processing，联机分析处理）。

从功能角度来看，OLTP负责基本业务的正常运转，而业务数据积累时所产生的价值信息则被OLAP不断呈现，企业高层通过参考这些信息会不断调整经营方针，也会促进基础业务的不断优化，这是OLTP与OLAP最根本的区别。

![OLTP与OLAP](https://www.cmdbyte.com/2021/02/u=1802595313,1865688217&fm=173&app=25&f=JPEG.jpeg)

OLAP不应该对OLTP产生任何影响，（理想情况下）OLTP应该完全感觉不到OLAP的存在。



参考：

[大数据分析之OLTP与OLAP的区别](https://baijiahao.baidu.com/s?id=1611554859260686629&wfr=spider&for=pc)

[OLAP、OLTP的介绍和比较](https://www.cnblogs.com/hhandbibi/p/7118740.html)

[(OLTP与OLAP的关系是什么](https://www.zhihu.com/question/24110442/answer/851671343)

[OLAP和OLTP基本概念和主要区别](https://blog.csdn.net/weixin_43270493/article/details/103123490)

