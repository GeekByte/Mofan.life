---
title: MongoDB创建用户时角色指定问题
categories:
  - 数据库
  - MongoDB
tags:
  - MongoDB
date: 2021-04-20 20:25:43
---

`MongoDB`是基于角色来分配用户权限的。

现在又这样一个场景，我要在`MongoDB`里为一个数据库创建一个用户，并让这个用户对于这个数据库有读写权限。于是就有了下面的语句。

```sql
# 选择数据库，如果数据库不存在就创建
use mo

# 为mo数据库创建用户mofan,并分配读写权限
db.createUser({user:"mofan", pwd:"nihao", roles[{role:"readWrite", db:"mo"}]})

# 如果是新创建的数据库，为了让其可见，要插入条记录
db.mo.insert({"a":"b"})
```

在分配角色的时候，有些角色只能在`admin`数据库里使用，所以，都有什么角色，这些角色又是对谁用的呢？

### MongoDB提供的角色有下面这几种

* 数据库用户角色：read、readWrite;
* 数据库管理角色：dbAdmin、dbOwner、userAdmin；
* 集群管理角色：clusterAdmin、clusterManager、clusterMonitor、hostManager；
* 备份恢复角色：backup、restore；
* 所有数据库角色：readAnyDatabase、readWriteAnyDatabase、userAdminAnyDatabase、dbAdminAnyDatabase
* 超级用户角色：root ，这里还有几个角色间接或直接提供了系统超级用户的访问（dbOwner 、userAdmin、userAdminAnyDatabase）
* 内部角色：__system

### 对于常用角色的一些描述

* Read：允许用户读取指定数据库
* readWrite：允许用户读写指定数据库
* dbAdmin：允许用户在指定数据库中执行管理函数，如索引创建、删除，查看统计或访问system.profile
* userAdmin：允许用户向system.users集合写入，可以找指定数据库里创建、删除和管理用户
* clusterAdmin：只在admin数据库中可用，赋予用户所有分片和复制集相关函数的管理权限。
* readAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的读权限
* readWriteAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的读写权限
* userAdminAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的userAdmin权限
* dbAdminAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的dbAdmin权限。
* root：只在admin数据库中可用。超级账号，超级权限。

