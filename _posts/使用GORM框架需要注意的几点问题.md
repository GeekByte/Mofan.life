---
title: 使用GORM框架需要注意的几点问题
categories:
  - 开源项目
  - Go
tags:
  - Go
  - GORM
date: 2021-04-15 21:19:26
---

#### 表名末尾自动追加`s`问题

当使用GORM框架构建数据库表的结构时，它会在表明的结尾自动追加`s`字符，例如表明为`abc`，则到数据库中就变成了`abcs`。

仅用的方法很简单，把构建表结构的`DB`对象的`SingularTable`属性设置为`true`，默认是`false`。

```go
db.SingularTable(true)
```

