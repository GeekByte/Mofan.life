---
title: MySQL索引
categories:
  - null
tags:
  - null
date: 2024-02-28 15:09:35
---



提到 MySQL 索引你可能会有3个问题：

1. 该sql语句加索引了没？
2. 加的索引生效了没？
3. mysql选错索引了没？



## 索引操作

##### 查看MySQL的索引

```sql
show index from `table_name`;
# or
show create table `table_name`;
```

##### 创建索引

```sql
alter table `table_name` add index idx_name(column_name);
# or
create index idx_name on `tablename` (column_name);
```

##### 删除索引

```sql
DROP INDEX idx_name ON `table_name`;
# or
ALTER TABLE `table_name` DROP INDEX idx_name;
```

##### 修改索引

只能先删除索引，然后再创建。



## explain 命令



执行 `explain select * from jzx_user_answer_step_log where id > 100 limit 10;` 会得到如下输出，那么各个字段是什么意思？

| id   | select_type | table      | partitions | type  | possible_keys | key     | key_len | ref  | rows | filtered | Extra       |
| ---- | ----------- | ---------- | ---------- | ----- | ------------- | ------- | ------- | ---- | ---- | -------- | ----------- |
| 1    | SIMPLE      | test_table |            | range | PRIMARY       | PRIMARY | 8       |      | 8590 | 100.00   | Using where |

explain 字段含义

* id: select唯一标识
* select_type: select类型
* table: 表名称
* partitions: 匹配的分区
* type: 连接类型
* possible_keys: 可能的索引选择
* key: 实际用到的索引
* key_len: 实际索引长度
* ref: （与索引比较的列
* rows: 预计要检查的行数
* filtered: 按表条件过滤的行百分比
* extra: 附加信息

### explain 字段含义

#### id：select唯一标识

该列的值是select查询中的序号，比如：1、2、3、4等，它决定了表的执行顺序。

某条sql的执行计划中一般会出现三种情况：

1. id相同
2. id不同
3. id相同和不同都有

那么这三种情况表的执行顺序是怎么样的呢？

###### 1.id相同

执行sql如下：

```sql
explain select * from test1 t1 inner join test1 t2 on t1.id=t2.id;
```

结果：

| id   | select_type | table | partitions | type   | possible_keys | key     | key_len | ref   | rows | filtered | Extra                    |
| ---- | ----------- | ----- | ---------- | ------ | ------------- | ------- | ------- | ----- | ---- | -------- | ------------------------ |
| 1    | SIMPLE      | t2    |            | range  | PRIMARY       | PRIMARY | 8       |       | 1911 | 100.00   | Using where; Using index |
| 1    | SIMPLE      | t1    |            | eq_ref | PRIMARY       | PRIMARY | 8       | t2.id | 1    | 100.00   |                          |

我们看到执行结果中的两条数据id都是1，是相同的。

这种情况表的执行顺序是怎么样的呢？

答案：从上到下执行，先执行表t1，再执行表t2。

执行的表要怎么看呢？

答案：看table字段，这个字段后面会详细解释。

###### 2.id不同

执行sql如下：

```sql
explain select * from test1 t1 where t1.id = (select id from  test1 t2 where  t2.id=2);
```

结果：

| id   | select_type | table | partitions | type   | possible_keys | key     | key_len | ref   | rows | filtered | Extra                    |
| ---- | ----------- | ----- | ---------- | ------ | ------------- | ------- | ------- | ----- | ---- | -------- | ------------------------ |
| 1    | SIMPLE      | t2    |            | range  | PRIMARY       | PRIMARY | 8       |       | 1911 | 100.00   | Using where; Using index |
| 1    | SIMPLE      | t1    |            | eq_ref | PRIMARY       | PRIMARY | 8       | t2.id | 1    | 100.00   |                          |

我们看到执行结果中两条数据的id不同，第一条数据是1，第二条数据是2。

这种情况表的执行顺序是怎么样的呢？

答案：序号大的先执行，这里会从下到上执行，先执行表t2，再执行表t1。

###### 3.id相同和不同都有

执行sql如下：

```sql
explain
select t1.* from test1 t1
inner join (select max(id) mid from test1 group by id) t2
on t1.id=t2.mid;
```

| id   | select_type | table      | partitions | type   | possible_keys                                                | key     | key_len | ref    | rows  | filtered | Extra       |
| ---- | ----------- | ---------- | ---------- | ------ | ------------------------------------------------------------ | ------- | ------- | ------ | ----- | -------- | ----------- |
| 1    | PRIMARY     | <derived2> |            | ALL    |                                                              |         |         |        | 17182 | 100.00   | Using where |
| 1    | PRIMARY     | t1         |            | eq_ref | PRIMARY                                                      | PRIMARY | 8       | t2.mid | 1     | 100.00   |             |
| 2    | DERIVED     | test1      |            | index  | PRIMARY,idx_tree_id,idx_user_id,idx_se_node,idx_node_id,idx_node_epoch_id | PRIMARY | 8       |        | 17182 | 100.00   | Using index |

我们看到执行结果中三条数据，前面两条数据的的id相同，第三条数据的id跟前面的不同。

这种情况表的执行顺序又是怎么样的呢？

答案：先执行序号大的，先从下而上执行。遇到序号相同时，再从上而下执行。所以这个列子中表的顺序顺序是：test1、t1、

**也许你会在这里心生疑问：`<``derived2>` 是什么鬼？**

它表示派生表，别急后面会讲的。

**还有一个问题：id列的值允许为空吗？**

答案在后面揭晓。





#### ref

该列表示索引命中的列或者常量。

我们看到表t1命中的索引是const(常量)，而t2命中的索引是列sue库的t1表的id字段。

#### rows

该列表示MySQL认为执行查询必须检查的行数。对于InnoDB表，此数字是估计值，可能并不总是准确的。

#### filters

该列表示按表条件过滤的表行的估计百分比。最大值为100，这表示未过滤行。值从100减小表示过滤量增加。

rows显示了检查的估计行数，**rows × filtered显示了与下表连接的行数**。例如，如果 rows为1000且 filtered为50.00（50％），则与下表连接的行数为1000×50％= 500。

#### extra: 附加信息

该字段包含有关MySQL如何解析查询的其他信息，这列还是挺重要的，但是里面包含的值太多，就不一一介绍了，只列举几个常见的。

##### 1. Impossible WHERE

表示WHERE后面的条件一直都是false，

执行sql如下：

```
explain select code  from test1 where 'a' = 'b';
```

结果：

![图片](https://mmbiz.qpic.cn/mmbiz_png/uL371281oDEWFbxDB7L0jHzTqu6ust2kv2XibVDv5fp0KYu2C7341cnBibTneZznktElC4Yvr2DjuN32RqPG2nBg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

##### 2. Using filesort

表示按文件排序，一般是在指定的排序和索引排序不一致的情况才会出现。

执行sql如下：

```
explain select code  from test1 order by name desc;
```

结果：

![图片](https://mmbiz.qpic.cn/mmbiz_png/uL371281oDEWFbxDB7L0jHzTqu6ust2kZIib3XgpGIuibeRZLHLABdwibPJLmcNolgibq4gORic5VpK0OYNQURBK6wA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

这里建立的是code和name的联合索引，顺序是code在前，name在后，这里直接按name降序，跟之前联合索引的顺序不一样。

##### 3. Using index

表示是否用了覆盖索引，说白了它表示是否所有获取的列都走了索引。

上面那个例子中其实就用到了：Using index，因为只返回一列code，它字段走了索引。

##### 4. Using temporary

表示是否使用了临时表，一般多见于order by 和 group by语句。

执行sql如下：

```
explain select name  from test1 group by name;
```

结果：

![图片](https://mmbiz.qpic.cn/mmbiz_png/uL371281oDEWFbxDB7L0jHzTqu6ust2kLFAtAYJu3vgT4WzZfHXQt04L30zykTONZF4aJRrP7D34fzMmrGd6MQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

##### 5. Using where

表示使用了where条件过滤。

##### 6. Using join buffer

  表示是否使用连接缓冲。来自较早联接的表被部分读取到联接缓冲区中，然后从缓冲区中使用它们的行来与当前表执行联接。



## 索引优化的过程

  1.先用慢查询日志定位具体需要优化的sql

  2.使用explain执行计划查看索引使用情况

  3.重点关注：

​	key（查看有没有使用索引）

​	key_len（查看索引使用是否充分）

​	type（查看索引类型）

​	Extra（查看附加信息：排序、临时表、where条件为false等）

​    一般情况下根据这4列就能找到索引问题。

  4.根据上1步找出的索引问题优化sql

  5.再回到第2步
