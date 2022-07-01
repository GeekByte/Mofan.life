---
title: PostgreSQL查询
categories:
  - 数据库
  - PostgreSQL
tags:
  - PostgreSQL
date: 2021-04-21 07:39:35
---



**持续补充**



### 子查询

#### 在SELECT语句中使用

##### 语法

```sql
SELECT column_name [, column_name ]
FROM   table1 [, table2 ]
WHERE  column_name OPERATOR
      (SELECT column_name [, column_name ]
      FROM table1 [, table2 ]
      [WHERE])
```

##### 实例

```sql
SELECT * FROM company WHERE id IN (SELECT id FROM company WHERE salary > 20000);
```

#### 在INSERT语句中使用

##### 语法

```sql
INSERT INTO table_name [ (column1 [, column2 ]) ]
   SELECT [ *|column1 [, column2 ] ]
   FROM table1 [, table2 ]
   [ WHERE VALUE OPERATOR ]
```

##### 实例

`company_bkp`要和`company`表结构相同

```sql
INSERT INTO company_bkp SELECT * FROM company  WHERE id IN (SELECT id FROM company) ;
```

#### 在UPDATE中使用

##### 语法

```sql
UPDATE table
SET column_name = new_value
[ WHERE OPERATOR [ VALUE ]
   (SELECT COLUMN_NAME
   FROM TABLE_NAME)
   [ WHERE) ]
```

##### 实例

```sql
UPDATE company SET salary = salary * 0.50 WHERE age IN (SELECT age FROM company_bkp WHERE age >= 27);
```

#### 在DELETE中使用

##### 语法

```sql
DELETE FROM TABLE_NAME
[ WHERE OPERATOR [ VALUE ]
   (SELECT COLUMN_NAME
   FROM TABLE_NAME)
   [ WHERE) ]
```

##### 实例

```sql
DELETE FROM company WHERE age IN (SELECT age FROM company_bkp WHERE age > 27 );
```

