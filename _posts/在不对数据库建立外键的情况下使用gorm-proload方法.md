---
title: 在不对数据库建立外键的情况下使用gorm proload方法
categories:
  - 开源项目
  - Go
  - Gorm
tags:
  - Go
  - Gorm
date: 2021-08-13 18:03:26
---

在很多情况下，通过 Gorm 框架提供的 AutoMigrate 方法，我们不需要编写 SQL 语句(这里指创建表结构的语句)，对于表字段的一些属性，也可以利用 Go Tag 特性，通过 Gorm 进行指定。

当我们想定义两个表之间的关系时(属于，多对多等)，使用 Gorm Tag 定义的 "foreignKey: xxx; references: xxx"，这些列属性会影响到数据库里表的结构，这点我们应该清楚，但指定了这种 Tag，便可以使用 Gorm 的Preload 方法，为进行多个具有关系的表的查找提供了便利。

但是，DBA建议我们尽量不要在数据库中使用外键约束，因为这种结构会对后续的一些操作（比如分库）遭成麻烦，同时，也会使对数据进行更细粒度的控制受限。

于是，有没有一种方法，既能享受 Gorm 的 Preload 带来的便利，又能不在实际的表结构中定义外键约束呢？

**可以用SQL语句定义表结构，在代码中虽然也要定义具有映射关系的struct，但是，不要对这个struct执行Gorm的AutoMigrate方法，也就是不要将gorm tag中的信息应用到实际表结构上。**

这样，你就可以通过gorm tag定义的"foreignKey: xxx; references: xxx" 信息使用gorm 的Preload 方法，从而不在实际的表中应用外键约束。但是，当增加新字段时需要改SQL语句和用SQL修改数据库表结构。

