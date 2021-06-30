---
title: PostgreSQL设置自增序列起始值
categories:
  - 数据库
  - PostgreSQL
tags:
  - PostgreSQL
date: 2021-06-29 18:54:39
---

注意传入的数据格式，不是传入表名称也不是传入字段名称，而是传入一个类似```表明称_字段名称_seq```的东西.



```sql

-- 获取下一个自增值
select nextval('mofan_info_id_seq');

-- 看一下当前最大值
select max(id) from action_group_info;

-- 设置起始值起点，下一个值是1025
select setval('mofan_info_id_seq', 1024); 

```



参考：
1. [PostgreSQL: Documentation: 9.6: Numeric Types](https://www.postgresql.org/docs/9.6/datatype-numeric.html)里面8.1.4. Serial Types 的 Note
2. [PostgreSQL: Documentation: 9.6: Sequence Manipulation Functions](https://www.postgresql.org/docs/9.6/functions-sequence.html)
