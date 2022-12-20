# 关于数据库的自增ID

MySQL 里的几种自增ID：表定义自增ID、Xid、tree_id、row_id

当这些ID达到最大值时

### 表定义自增ID

表定义的自增值达到上限后的逻辑是：**再申请下一个 id 时，得到的值保持不变。**

**如果这个自增ID作为主键，会报主键冲突错误。**

在实际使用中，需要考虑表的主键自增ID是否会达到 `int` 型的最大值，如果可能会达到，则应该创建成 8 个字节的 `bigint unsigned`。

```sql
create table t(id int unsigned auto_increment primary key) auto_increment=4294967295;
insert into t values(null);
//成功插入一行 4294967295
show create table t;
/* CREATE TABLE `t` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4294967295;
*/

insert into t values(null);
//Duplicate entry '4294967295' for key 'PRIMARY'
```

### InnoDB 系统自增 row_id

**在 InnoDB 逻辑里，申请到 row_id=N 后，就将这行数据写入表中；如果表中已经存在 row_id=N 的行，新写入的行就会覆盖原有的行。**

从这个角度看，我们还是**应该在 InnoDB 表中主动创建自增主键**。因为，表自增 id 到达上限后，再插入数据时报主键冲突错误，是更能被接受的。毕竟覆盖数据，就意味着数据丢失，影响的是数据可靠性；报主键冲突，是插入失败，影响的是可用性。而一般情况下，可靠性优先于可用性。

#### 何为 row_id

如果你创建的 InnoDB 表没有指定主键，那么 InnoDB 会创建一个不可见的，长度为 6 个字节的 row_id。InnoDB 维护了一个全局的 dict_sys.row_id，所以无主键的 InnoDB 表，每插入一行数据，都将当前的 dict_sys.row_id 作为新插入数据的 row_id，然后将 dict_sys.row_id 的值加 1。

> InnoDB 中 row_id 的实现
>
> 在代码实现时 row_id 是一个长度为 8 字节的无符号长整型 (bigint unsigned)。但是，InnoDB 在设计时，给 row_id 留的只是 6 个字节的长度，这样写到数据表中时只放了最后 6 个字节，所以 row_id 能写到数据表中的值，就有两个特征：
>
> * row_id 写入表中的值范围，是从 0 到 248-1；
> * 当 dict_sys.row_id=2^48时，如果再有插入数据的行为要来申请 row_id，拿到以后再取最后 6 个字节的话就是 0。



### Xid

Xid 在 MySQL 中是用来对齐事务的。在 redo log 和 binlog 中，他们有一个共同的字段，就是 Xid。

### InnoDB trx_id

trx_id 就是 InnoDB 控制事务可见性时，用到的事务 id（transaction id）。

**try_Id 的来源:**

InnoDB 内部维护了一个 max_trx_id 全局变量，每次需要申请一个新的 trx_id 时，就获得 max_trx_id 的当前值，然后并将 max_trx_id 加 1。

**InnoDB 数据可见性的核心思想：**

每一行数据都记录了更新它的 trx_id，当一个事务读到一行数据的时候，判断这个数据是否可见的方法，就是通过事务的一致性视图与这行数据的 trx_id 做对比。

> Xid 与 trx_id 的区别：
>
> Xid 是 server 层维护的，InnoDB 使用 Xid，就是为了能够在 InnoDB事务 和 server 之间做关联。
>
> InnoDB 自己的 trx_id 是要另外维护的。