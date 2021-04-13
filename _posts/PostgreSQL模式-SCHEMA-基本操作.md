---
title: PostgreSQL模式(SCHEMA)基本操作
categories:
  - 数据库
  - PostgreSQL
tags:
  - PostgreSQL
date: 2021-04-13 21:36:47
---

### 简介

`PostgreSQL` 模式（`SCHEMA`）可以看成是一个表的集合。

一个模式可以包含**视图、索引、数据类型、函数和操作符**等。

相同的对象名称可以被用于不同的模式中而不会出现冲突，例如 `schema1` 和 `myschema` 都可以包含名为 `mytable` 的表。

使用模式的优势：

- 允许多个用户使用一个数据库并且不会互相干扰。
- 将数据库对象组织成逻辑组以便更容易管理。
- 第三方应用的对象可以放在独立的模式中，这样它们就不会与其他对象的名称发生冲突。

模式类似于操作系统层的目录，但是模式不能嵌套。

### 基本操作

#### 创建模式

使用`CREATE SCHEMA` 语句。

示例：

```SQL
-- 创建模式
CREATE SCHEMA myschema;

-- 在某个模式下创建表，如果模式不存在则创建模式并在该模式下创建表，模式存在则仅创建表
create table myschema.company(
   ID   INT              NOT NULL,
   NAME VARCHAR (20)     NOT NULL,
   AGE  INT              NOT NULL,
   ADDRESS  CHAR (25),
   SALARY   DECIMAL (18, 2),
   PRIMARY KEY (ID)
);
```

#### 切换模式

`\dn` : 查看数据库下所有的模式

`\set search_path=模式名` : 切换到对应模式下

`\dt` 或 `\d` : 查看模式下表的**关联列表**

 `\dp` 查看模式下表的**存取权限**

#### 删除模式

删除一个空的模式：

```sql
DROP SCHEMA myschema;
```

删除一个模式以及其中包含的所有对象：

```SQL
DROP SCHEMA myschema CASCADE;
```

