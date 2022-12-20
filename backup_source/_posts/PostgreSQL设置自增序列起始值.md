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
-- 获取下一个自增值, 这会改变自增值的起点，即如果你一直执行该语句，你会看到返回的数字不断变大
select nextval('mofan_info_id_seq');

-- 设置起始值起点，下一个值是1025
select setval('mofan_info_id_seq', 1024);
-- 等价于
select setval('mofan_info_id_seq', 1024, true);

-- 设置起始值起点，下一个值是1024
select setval('mofan_info_id_seq', 1024, false);
```

| 函数                              | 返回类型 | 描述                                                         |
| --------------------------------- | -------- | ------------------------------------------------------------ |
| nextval(regclass)                 | bigint   | 递增序列对象到它的下一个数值并且返回该值。这个动作是自动完成的。即使多个会话并发运行nextval，每个进程也会安全地收到一个唯一的序列值。 |
| currval(regclass)                 | bigint   | 在当前会话中返回最近一次`nextval`抓到的该序列的数值。(如果在本会话中从未在该序列上调用过 `nextval`，那么会报告一个错误。)请注意因为此函数返回一个会话范围的数值，而且也能给出一个可预计的结果，因此可以用于判断其它会话是否执行过`nextval。` |
| lastval()                         | bigint   | 返回当前会话里最近一次`nextval`返回的数值。这个函数等效于`currval`，只是它不用序列名为参数，它抓取当前会话里面最近一次`nextval`使用的序列。如果当前会话还没有调用过`nextval`，那么调用`lastval将`会报错。 |
| setval(regclass, bigint)          | bigint   | 重置序列对象的计数器数值。设置序列的`last_value`字段为指定数值并且将其`is_called`字段设置为`true`，表示下一次`nextval`将在返回数值之前递增该序列。 |
| setval(regclass, bigint, boolean) | bigint   | 重置序列对象的计数器数值。功能等同于上面的setval函数，只是`is_called`可以设置为`true`或`false`。如果将其设置为`false`，那么下一次`nextval`将返回该数值，随后的`nextval`才开始递增该序列。 |



参考：
1. [PostgreSQL: Documentation: 9.6: Numeric Types](https://www.postgresql.org/docs/9.6/datatype-numeric.html)里面8.1.4. Serial Types 的 Note
2. [PostgreSQL: Documentation: 9.6: Sequence Manipulation Functions](https://www.postgresql.org/docs/9.6/functions-sequence.html)
