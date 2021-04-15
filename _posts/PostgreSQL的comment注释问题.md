---
title: PostgreSQL的comment注释问题
categories:
  - 数据库
  - PostgreSQL
tags:
  - PostgreSQL
date: 2021-04-15 22:29:26
---

由`MySQL`到`PostgreSQL`，会带来很多使用`MySQL`的习惯。

今天在使用`GORM`框架创建一个表的时候，我在使用`GORM`的`Tag`为字段添加了`comment`，想着这样就不用加在代码里加注释了，这在`MySQL` 中属于基操。

然后在运行代码生成表结构的时候总是提示在`COMMENT`处存在错误，也并不说不支持，由于对`GORM`不是很熟悉，让我一度以为是我写的不对，于是翻阅官方文档，`GitHub`的`Issuses`，最终发现是`PostgreSQL`不支持在创建表的时候直接加`comment`，我真是。。。

当然，虽然不能在创建表的时候加`comment`，但是可以在创建后加。

**给表添加注释：**

```sql
comment on table mofan is '莫凡';
```

这里是在给`mofan`表添加注释。



给字段添加注释？？？？？

等待补充。