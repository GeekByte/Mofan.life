---
title: PostgreSQL对表的常用操作
categories:
  - 数据库
  - PostgreSQL
tags:
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

#### 修改列的数据类型

```SQL
ALTER TABLE table_name ALTER column_name TYPE datatype;
```

#### 修改列的名称

```sql
 ALTER TABLE table_name RENAME old_cloumn_name TO new_column_name;
```

#### 删除列

删除一列

```sql
ALTER TABLE table_name DROP COLUMN col1;
```

删除多列

```SQL
ALTER TABLE table_name DROP COLUMN col1, DROP COLUMN col2;
```

#### 新增列

在`company` 表新增 `age` 列，类型为`real`，非空。

```sql
ALTER TABLE company ADD column real real NOT NULL;
```

#### 给列添加 NOT NULL 约束

```sql
ALTER TABLE table_name MODIFY column_name datatype NOT NULL;
```

#### 给列添加 UNIQUE 约束

```sql
ALTER TABLE table_name ADD CONSTRAINT MyUniqueConstraint UNIQUE(column1, column2...);
```

`MyUniqueConstraint`: 约束的名字，方便管理

#### 给列添加 CHECK 约束

```sql
ALTER TABLE table_name ADD CONSTRAINT MyUniqueConstraint CHECK (CONDITION);
```

`MyUniqueConstraint`: 约束的名字，方便管理

`CONDITION`: 约束，即为列的条件，比如`age > 20`

#### 删除约束

```sql
ALTER TABLE table_name DROP CONSTRAINT MyUniqueConstraint;

# 如果是MySQL
ALTER TABLE table_name DROP INDEX MyUniqueConstraint;
```

#### 给表添加主键

```sql
ALTER TABLE table_name ADD CONSTRAINT MyPrimaryKey PRIMARY KEY (column1, column2...);
```

#### 删除主键

```sql
ALTER TABLE table_name DROP CONSTRAINT MyPrimaryKey;

# 如果是MySQL
ALTER TABLE table_name DROP PRIMARY KEY;
```

