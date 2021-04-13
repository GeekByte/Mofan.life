---
title: MySQL的几种查询方式
categories:
  - 数据库
  - MySQL
tags:
  - MySQL
date: 2021-03-04 21:50:12
---

> 表结构声明：
>
> students 表
>
> ```text
> +----+----------+--------+--------+-------+
> | id | class_id | name   | gender | score |
> +----+----------+--------+--------+-------+
> |  1 |        1 | 小明   | M      |    90 |
> |  2 |        1 | 小红   | F      |    95 |
> |  3 |        1 | 小军   | M      |    88 |
> |  4 |        1 | 小米   | F      |    73 |
> |  5 |        2 | 小白   | F      |    81 |
> |  6 |        2 | 小兵   | M      |    55 |
> |  7 |        2 | 小林   | M      |    85 |
> |  8 |        3 | 小新   | F      |    91 |
> |  9 |        3 | 小王   | M      |    89 |
> | 10 |        3 | 小丽   | F      |    85 |
> +----+----------+--------+--------+-------+
> ```
>
> 
>
> classes 表
>
> ```text
> +----+--------+
> | id | name   |
> +----+--------+
> |  1 | 一班   |
> |  2 | 二班   |
> |  3 | 三班   |
> |  4 | 四班   |
> +----+--------+
> ```
>
> 创建语句在文末。

## 基本查询

```sql
# 查询所有学生的全部信息
SELECT * FROM students;
# 查询所有学生的姓名和分数
SELECT name, score FROM students;
```

`*` 表示查询所有列，查询结果是一个二维表，包含一个表的所有列以及所有列的数据。

`SELECT` 的其他用法：

```sql
# 计算
SELECT 100 + 100;
# 测试数据库是否连接
SELECT 1;
```

## 条件查询

```sql
# 查询 score >= 80 的信息
SELECT * FROM students WHERE score >= 80;

# 查询 score >= 80 且 gender = 'M' 的信息
SELECT * FROM students WHERE score >= 80 AND gender = 'M';

# 查询 score >= 80 或者 gender = 'F' 的信息
SELECT * FROM students WHERE score >= 80 OR gender = 'F';

# 查询 class_id 不等于 2 的信息
SELECT * FROM students WHERE NOT class_id = 2; (NOT的写法不常用)
SELECT * FROM students WHERE class_id <> 2;
```

条件运算符的优先级从高到低为：`NOT`, `AND`, `OR`。

所以，在组合三个或者更多的条件时，要加上`()` 改变优先级。

```sql
# 查询 score < 80 或者 score > 90 中 gender = 'M' 的信息
SELECT * FROM students WHERE (score < 80 OR score > 90) AND gender = 'M';
```

## 投影查询

使用`SELECT * FROM <表名> WHERE <条件>`可以选出表中的若干条记录。我们注意到返回的二维表结构和原表是相同的，即结果集的所有列与原表的所有列都一一对应。

如果我们只希望返回某些列的数据，而不是所有列的数据，我们可以用`SELECT 列1, 列2, 列3 FROM …`，让结果集仅包含指定列。这种操作称为投影查询。

```sql
# 使用投影查询，并将列名重命名
SELECT id, score points, name FROM students WHERE gender = 'M';
```

返回的结果集中，原先的 `score` 列名变成了 `points`。

## 排序

```sql
# 按照 score 从低到高排序
SELECT id, name, gender, score FROM students ORDER BY score;

# 按照 score 从高到低排序
SELECT id, name, gender, score FROM students ORDER BY score DESC;

# 按照 score 从高到低排序, 如果 score 相同，则根据 gender 列按从高到低排序
SELECT id, name, gender, score FROM students ORDER BY score DESC, gender;
```

排序规则中出了 `DESC`，还有 `ASC`，升序排序，即从小到大排列，可以省略，因为 `ORDER BY 列名` 和 `ORDER BY 列名 ASC` 等价。

## 分页查询

使用SELECT查询时，如果结果集数据量很大，比如几万行数据，放在一个页面显示的话数据量太大，就不如分页显示。比如，查处来的数据量多打几万条，此时可设置每页显示100条数据，那么第一页显示1～100条数据，第二页显示101～200条数据，以此类推。

分页实际上就是从结果集的第`N`条记录开始，取出后面的`M`条记录，这个查询可以通过`LIMIT <M> OFFSET <N>`子句实现。

在这里`M`为`pageSize`，如果我们知道页码`index`，则`N`的计算公式为：`N = pageSize * (index - 1)`，`index` 默认大于0，因为页数一般是从第 1 页开始。

```sql
# 按照 score 升序排序，每页显示 3 条数据
# 查询第 1 页数据
SELECT id, name, gender, score FROM students ORDER BY score LIMIT 3 OFFSET 0;

# 查询第 2 页数据
SELECT id, name, gender, score FROM students ORDER BY score LIMIT 3 OFFSET 3;

# 查询第 3 页数据
SELECT id, name, gender, score FROM students ORDER BY score LIMIT 3 OFFSET 6;
```

如果省略`OFFSET N` ，则默认从第 0 条开始。

上面的`LIMIT M OFFSET N`也可以写成`LIMIT N, M`。

**注意：**当 N 的值越来越大时，查询效率也会降低

## 聚合查询



