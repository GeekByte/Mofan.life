---
title: Rego笔记
categories:
  - null
tags:
  - null
date: 2021-07-14 19:00:39
---


字符串、布尔值等比较`=`和`==`相同

数字比较只能用`==`

如果一个条件，则结果为`true`或者`false`

如果有多个条件，当其中一个为`false`或者为`undefined decision`时，则结果为`undefined decision`

在使用迭代时，如果没有值满足表达式，那么结果为`undefined decision`



规则：

规则分为规则头和规则体

如果规则头是真，那么规则体必须为真。规则头可以省略`= <value>`的写法，这样规则头默认为真(类似 `= true`)。

可以只定义规则头，省略规则体，那么规则体默认为true，规则头为`true/defined`则为`true`或者`定义的值`

可以将规则载入到OPA，通过绝对路径使用规则：`data.<package-path>.<rule-name>`.



substitute: 替代，代替

approach：方式，方法，走进，靠近

problematic：有问题的，有疑问的，不确定的

intermediate：中间，媒介，中间的，中间体

Conceptually：概念上，概念的

encapsulate：压缩，封装；概述；将...封装进内部

if-then：假设的；假定的

constants：常量，常数，物理常数

performance: 性能；绩效；表演；执行；表现

reference：参照；参考；涉及；提及；引用

philosophy：哲学；哲理；人生观；

verbose：详细的；啰嗦的；详细模式；详细信息

convention：约定；习俗；惯例

restricts：约束；制约

fundamental：基本的；根本的；基本原理；根本原理

whatsoever：无论怎样；无论什么；丝毫

relevance：关联；适当；中肯

reason：理由；理性；动机；推论；劝说；说服；由于

indicates：表明；指示；显示

probes：探索；试样；探查

variant：变体；转化；不同的；多样的

sensitive：敏感的；易受影响的；感觉到的

inspect：检查；视察；检阅


