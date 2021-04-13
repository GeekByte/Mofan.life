---
title: PostgreSQL对表的常用操作
categories:
  - 数据库
  - PostgreSQL
tags:
  - 数据库
  - PostgreSQL
date: 2021-04-13 21:35:31
---

### 创建表

使用`CREATE TABLE` 语句。

示例：

```SQL
CREATE TABLE COMPANY(
   ID INT PRIMARY KEY     NOT NULL,
   NAME           TEXT    NOT NULL,
   AGE            INT     NOT NULL,
   ADDRESS        CHAR(50),
   SALARY         REAL
);
```

其他命令:

`\d` : 查看存在的表的列表

`\d tablename` : 查看表的信息

### 删除表

使用`DROP TABLE` 语句。

示例：

```SQL
DROP TABLE department, company;

-- 配合 IF EXISTS 使用, 如果存在删除表
DROP TABLE IF EXISTS department, company;
```

### 修改表



#### 修改列的属性



#### 删除列



#### 新增列

