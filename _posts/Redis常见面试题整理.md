---
title: Redis常见面试题整理
categories:
  - 面试
  - Redis
tags:
  - 面试
  - Redis
date: 2021-03-18 16:38:00
---

> 文章来自：http://www.devcheng.net/post/3ffff771.html

## Redis是什么

Redis是一个开源的，使用ANSI C语言编写，遵循BSD协议，支持网络、可基于内存亦可持久化的日志型、Key-Value数据库，并提供多种语言API的非关系型数据库。

传统数据库遵循ACID原则，而 Nosql（Not Only SQL 的缩写，是对不同于传统的关系型数据库的数据库管理系统的统称） 一般为分布式而分布式一般遵循 [CAP 定理](https://baike.baidu.com/item/CAP原则/5712863?fr=aladdin)。

## Redis支持哪几种数据类型

* String：最基本的数据类型，二进制安全的字符串，最大512MB
* List：按照添加顺序保持顺序的字符串列表，最大存储数据量 2^32 - 1
* Set：无序的字符串集合，不存在重复元素，最大存储数据量 2^32 - 1
* Sorted Set：已排序的字符串集合，最大存储数据量 2^32 - 1
* Hash：Key-Value对的一种集合，最大存储数据量 2^32 - 1

另外还有四种特殊的数据类型：

1.BloomFilter
2.HyperLogLog
3.BitMap
4.Geo

详细介绍请看：https://developer.51cto.com/art/201911/605731.htm

**注意 关于数据类型多说两句：**

redis里存的都是二进制数据，其实就是字节数组（byte[]），这些字节数据是没有数据类型的，只有把它们按照合理的格式解码后，可以变成一个字符串，整数或对象，此时才具有数据类型。

这一点必须要记住。
**所以任何东西只要能转化成字节数组（byte[]）的，都可以存到redis里**。管你是字符串、数字、对象、图片、声音、视频、还是文件，只要变成byte数组。

- 关键字（Keys）是用于标识一段数据的一个字符串
- 值（Values）是一段任意的字节序列，Redis不会关注它们实质上是什么

**关于key**

- key不要太长，尽量不要超过1024字节，这不仅消耗内存，而且会降低查找的效率
- key也不要太短，太短的话，key的可读性会降低
- 在一个项目中，key最好使用统一的命名模式，例如 user:10000:passwd

## Redis是单进程单线程的吗

Redis是单进程单线程的，Redis利用队列技术将并发访问变成串行访问，消除了传统数据库串行控制的开销

## Redis为什么是单线程的

首先多线程会涉及到锁，而且多线程处理会涉及到线程切换而消耗CPU。

CPU不是Redis的性能瓶颈，Redis的性能瓶颈最可能是内存和网络带宽。

Redis的单线程不能发挥多核CPU性能，但是可以通过在单机上开多个Redis实例来解决。

**补充额外知识点 ：**其它开源软件采用的模型
Nginx：多进程单线程模型
Memcached：单进程多线程模型

## Memcache与Redis的区别有哪些

**Memcache （MC）**

看看 MC 的特点：
MC 处理请求时使用多线程异步 IO 的方式，可以合理利用 CPU 多核的优势，性能非常优秀；
MC 功能简单，使用内存存储数据；
MC 的内存结构以及钙化问题我就不细说了，大家可以查看官网了解下；
MC 对缓存的数据可以设置失效期，过期后的数据会被清除；
失效的策略采用延迟失效，就是当再次使用数据时检查是否失效；
当容量存满时，会对缓存中的数据进行剔除，剔除时除了会对过期 key 进行清理，还会按 LRU 策略对数据进行剔除。

另外，使用 MC 有一些限制，这些限制在现在的互联网场景下很致命，成为大家选择Redis、MongoDB的重要原因：
key 不能超过 250 个字节；
value 不能超过 1M 字节；
key 的最大失效时间是 30 天；
只支持 K-V 结构，不提供持久化和主从同步功能。

**Redis**

先简单说一下 Redis 的特点，方便和 MC 比较。

与 MC 不同的是，Redis 采用单线程模式处理请求。
这样做的原因有 2 个：
一个是因为采用了非阻塞的异步事件处理机制；
另一个是缓存数据都是内存操作 IO 时间不会太长，单线程可以避免线程上下文切换产生的代价。
Redis 支持持久化，所以 Redis 不仅仅可以用作缓存，也可以用作 NoSQL 数据库。
相比 MC，Redis 还有一个非常大的优势，就是除了 K-V 之外，还支持多种数据格式，例如 list、set、sorted set、hash 等。
Redis 提供主从同步机制，以及 Cluster 集群部署能力，能够提供高可用服务。

## 什么是Redis数据持久？方式都有哪些，各自的优缺点是什么？

1.redis持久化就是把内存的数据写到磁盘中去，防止服务器宕机了内存数据丢失。
2.数据持久化的方式有2种： RDB(默认) 和 AOF 。

**RDB （redis database）**
核心函数rdbSave(生成RDB文件)和rdbLoad（从文件加载内存）两个函数

![20200401173912460](https://www.cmdbyte.com/2021/02/20200401173912460.png)

**AOF （append-only file）**
每当执行服务器(定时)任务或者函数时flushAppendOnlyFile 函数都会被调用， 这个函数执行以下两个工作
AOF 写入保存。

存储的内容是 redis通讯协议格式命令的命令文本存储。点击立即了解 —> https://www.cnblogs.com/nele/p/8908298.html

WRITE：根据条件，将 aof_buf 中的缓存写入到 AOF 文件
SAVE：根据条件，调用 fsync 或 fdatasync 函数，将 AOF 文件保存到磁盘中。

![20200401174021504](https://www.cmdbyte.com/2021/02/20200401174021504.png)

**区别：**
1、AOF 文件比 RDB 更新频率高，优先使用 AOF 还原数据。
2、AOF 比 RDB 更安全也更大
3、RDB 性能比 AOF 好
4、如果两个都配了优先加载AOF

## Redis的淘汰策略

Redis提供了六种淘汰策略：

* volatile-lru：从已设置过期时间的数据集（server.db[i].expires）中挑选最近最少使用的数据淘汰
* volatile-ttl：从已设置过期时间的数据集（server.db[i].expires）中挑选将要过期的数据淘汰
* volatile-random：从已设置过期时间的数据集（server.db[i].expires）中任意选择数据淘汰
* allkeys-lru：从数据集（server.db[i].dict）中挑选最近最少使用的数据淘汰
* allkeys-random：从数据集（server.db[i].dict）中任意选择数据淘汰
* no-enviction（驱逐）：禁止驱逐数据

使用策略规则：
1、如果数据呈现幂律分布，也就是一部分数据访问频率高，一部分数据访问频率低，则使用allkeys-lru
2、如果数据呈现平等分布，也就是所有的数据访问频率都相同，则使用allkeys-random

## 什么是缓存穿透，缓存击穿，缓存雪崩？

**缓存穿透**
描述： 缓存穿透是指缓存和数据库中都没有的数据，而用户不断发起请求，如发起为id为“-1”的数据或id为特别大不存在的数据。这时的用户很可能是攻击者，攻击会导致数据库压力过大。

解决方案：

接口层增加校验，如用户鉴权校验，id做基础校验，id<=0的直接拦截；
从缓存取不到的数据，在数据库中也没有取到，这时也可以将key-value对写为key-null，缓存有效时间可以设置短点，如30秒（设置太长会导致正常情况也没法使用）。这样可以防止攻击用户反复用同一个id暴力攻击

**缓存击穿**

描述：缓存击穿是指缓存中没有但数据库中有的数据（一般是缓存时间到期），这时由于并发用户特别多，同时读缓存没读到数据，又同时去数据库去取数据，引起数据库压力瞬间增大，造成过大压力

解决方案：

设置热点数据永远不过期。
加互斥锁，互斥锁参考代码如下：

![20200401174137877](https://www.cmdbyte.com/2021/02/20200401174137877.png)

1）缓存中有数据，直接走上述代码13行后就返回结果了

2）缓存中没有数据，第1个进入的线程，获取锁并从数据库去取数据，没释放锁之前，其他并行进入的线程会等待100ms，再重新去缓存取数据。这样就防止都去数据库重复取数据，重复往缓存中更新数据情况出现。

3）当然这是简化处理，理论上如果能根据key值加锁就更好了，就是线程A从数据库取key1的数据并不妨碍线程B取key2的数据，上面代码明显做不到这点。

**缓存雪崩**

描述： 缓存雪崩是指缓存中数据大批量到过期时间，而查询数据量巨大，引起数据库压力过大甚至down机。和缓存击穿不同的是， 缓存击穿指并发查同一条数据，缓存雪崩是不同数据都过期了，很多数据都查不到从而查数据库。

解决方案：

缓存数据的过期时间设置随机，防止同一时间大量数据过期现象发生。
如果缓存数据库是分布式部署，将热点数据均匀分布在不同搞得缓存数据库中。
设置热点数据永远不过期。

## 在Redis中如何保证只存20W的热点数据？

先计算出20W数据需要占用数据的空间，然后设置数据淘汰策略为 allkey-lru 回收最少使用策略。

## Redis支持事务吗？

支持 , 表现为多条命令，要么都执行，要么都不执行。

redis的事务可以分为两步，定义事务和执行事务。
使用multi命令开启一个事务，然后把要执行的所有命令都依次排上去。
这就定义好了一个事务。此时使用exec命令来执行这个事务，或使用discard命令来放弃这个事务。
你可能希望在你的事务开始前，你关心的key不想被别人操作，那么可以使用watch命令来监视这些key，
如果开始执行前这些key被其它命令操作了则会取消事务的。也可以使用unwatch命令来取消对这些key的监视。

redis事务具有以下特点：
1、如果开始执行事务前出错，则所有命令都不执行
2、一旦开始，则保证所有命令一次性按顺序执行完而不被打断
3、如果执行过程中遇到错误，会继续执行下去，不会停止的
4、对于执行过程中遇到错误，是不会进行回滚的

很显然，这并不是我们通常认为的事务，因为它连原子性都保证不了。保证不了原子性是因为redis不支持回滚，不过它也给出了不支持的理由。

不支持回滚的理由：
1、redis认为，失败都是由命令使用不当造成
2、redis这样做，是为了保持内部实现简单快速
3、redis还认为，回滚并不能解决所有问题
因此 , 使用redis事务的不太多

## Redis 架构模式有哪些？讲讲各自的特点？

![20200401174303361](https://www.cmdbyte.com/2021/02/20200401174303361.png)

![2020040117431646](https://www.cmdbyte.com/2021/02/2020040117431646.png)

![20200401174326799](https://www.cmdbyte.com/2021/02/20200401174326799.png)

![20200401174336173](https://www.cmdbyte.com/2021/02/20200401174336173.png)

## Redis 集群方案都有哪些？

1.twemproxy，大概概念是，它类似于一个代理方式， 使用时在本需要连接 redis 的地方改为连接 twemproxy， 它会以一个代理的身份接收请求并使用一致性 hash 算法，将请求转接到具体 redis，将结果再返回 twemproxy。
缺点： twemproxy 自身单端口实例的压力，使用一致性 hash 后，对 redis 节点数量改变时候的计算值的改变，数据无法自动移动到新的节点。

2.codis，目前用的最多的集群方案，基本和 twemproxy 一致的效果，但它支持在 节点数量改变情况下，旧节点数据可恢复到新 hash 节点

3.redis cluster3.0 自带的集群，特点在于他的分布式算法不是一致性 hash，而是 hash 槽的概念，以及自身支持节点设置从节点。具体看官方文档介绍。

## Redis支持的Java客户端都有哪些？官方推荐使用哪个？

Redisson、Jedis、lettuce等等，官方推荐使用Redisson。

## Redis和Redisson有什么关系？

Redisson是一个高级的分布式协调Redis客服端，能帮助用户在分布式环境中轻松实现一些Java的对象
(Bloom filter, BitSet, Set, SetMultimap, ScoredSortedSet, SortedSet, Map, ConcurrentMap, List, ListMultimap, Queue, BlockingQueue, Deque, BlockingDeque, Semaphore, Lock, ReadWriteLock, AtomicLong, CountDownLatch, Publish / Subscribe, HyperLogLog)。

## Jedis与Redisson对比有什么优缺点？

Jedis是Redis的Java实现的客户端，其API提供了比较全面的Redis命令的支持；

Redisson实现了分布式和可扩展的Java数据结构，和Jedis相比，功能较为简单，不支持字符串操作，不支持排序、事务、管道、分区等Redis特性。
Redisson的宗旨是促进使用者对Redis的关注分离，从而让使用者能够将精力更集中地放在处理业务逻辑上

## Redis分布式锁如何续期？

https://zhuanlan.zhihu.com/p/71185118

## Redis分布式锁如何防止死锁

方法1 ， 编写2个方法一个加锁，一个解锁

**加锁代码：**

```java
private static final String LOCK_SUCCESS = "OK";
   private static final String SET_IF_NOT_EXIST = "NX";
   private static final String SET_WITH_EXPIRE_TIME = "PX";

   /**
    * 尝试获取分布式锁
    * @param jedis Redis客户端
    * @param lockKey 锁
    * @param requestId 请求标识
    * @param expireTime 超期时间
    * @return 是否获取成功
    */
   public static boolean tryGetDistributedLock(Jedis jedis, String lockKey, String requestId, int expireTime) {
        String result = jedis.set(lockKey, requestId, SET_IF_NOT_EXIST, SET_WITH_EXPIRE_TIME, expireTime);
        if (LOCK_SUCCESS.equals(result)) {
           return true;
        }
        return false;
     }
```

可以看到，我们加锁就一行代码：jedis.set(String key, String value, String nxxx, String expx, int time)，这个set()方法一共有五个形参：

- 第一个为key，我们使用key来当锁，因为key是唯一的。
- 第二个为value，我们传的是requestId，很多童鞋可能不明白，有key作为锁不就够了吗，为什么还要用到value？原因就是我们在上面讲到可靠性时，分布式锁要满足第四个条件解铃还须系铃人，通过给value赋值为requestId，我们就知道这把锁是哪个请求加的了，在解锁的时候就可以有依据。requestId可以使用UUID.randomUUID().toString()方法生成。
- 第三个为nxxx，这个参数我们填的是NX，意思是SET IF NOT EXIST，即当key不存在时，我们进行set操作；若key已经存在，则不做任何操作；
- 第四个为expx，这个参数我们传的是PX，意思是我们要给这个key加一个过期的设置，具体时间由第五个参数决定。
- 第五个为time，与第四个参数相呼应，代表key的过期时间。
- 总的来说，执行上面的set()方法就只会导致两种结果：

当前没有锁（key不存在），那么就进行加锁操作，并对锁设置个有效期，同时value表示加锁的客户端。
已有锁存在，不做任何操作。

**解锁代码：**

```java
private static final Long RELEASE_SUCCESS = 1L;
    /**
    * 释放分布式锁
    * @param jedis Redis客户端
    * @param lockKey 锁
    * @param requestId 请求标识
    * @return 是否释放成功
    */
   public static boolean releaseDistributedLock(Jedis jedis, String lockKey, String requestId) {
       String script = "if redis.call('get', KEYS[1]) == ARGV[1] then return redis.call('del', KEYS[1]) else return 0 end";
       Object result = jedis.eval(script, Collections.singletonList(lockKey), Collections.singletonList(requestId));
       if (RELEASE_SUCCESS.equals(result)) {
           return true;
       }
       return false;
    }
```

可以看到，我们解锁只需要两行代码就搞定了！第一行代码，我们写了一个简单的Lua脚本代码，没想到这次居然用上了。
第二行代码，我们将Lua代码传到jedis.eval()方法里，并使参数KEYS[1]赋值为lockKey，ARGV[1]赋值为requestId。
eval()方法是将Lua代码交给Redis服务端执行

## Redis常用命令介绍

**字符串：**
setnx(key,value) 只在键 key 不存在的情况下， 将键 key 的值设置为 value 。key存在,不做任何操作。
setex(key,seconds,value) 将key设置及生存时间seconds秒,原值存在覆盖。
psetex(key,milliseconds,value) 与setex同样,只是单位是毫秒。
getset(key,value) 设置新值并返回旧值,不存在返回nil
setrange(key,offset,value) 从偏移量开始offset开始
mset 同时给多个key复制

**哈希表(map)：**
hset(hash field value) 将哈希表 hash 中域 field 的值设置为 value
hmset key field value [field value …] 同时将多个 field-value (域-值)对设置到哈希表 key 中。
hget hash field 返回哈希表中给定域的值。
hgetall key 返回哈希表 key 中，所有的域和值。

**队列(queue):**
lpush key value [value …] 将一个或多个值 value 插入到列表 key 的表头
lpop key 移除并返回列表 key 的头元素,不存在返回nil
lset key index value 将列表 key 下标为 index 的元素的值设置为 value 。
brpop key [key …] timeout 在超时时间内移除列表尾元素，阻塞的。

**集合：**
sadd key member [member …] 将一个或多个 member 元素加入到集合 key 当中，已经存在于集合的 member 元素将被忽略
sismember key member 如果 member 元素是集合的成员，返回 1 。 如果 member 元素不是集合的成员，或 key 不存在，返回 0 。
spop key 移除集合key的随机元素
smembers key 返回集合 key 中的所有成员。
sdiff key [key …] 返回给定多个集合之间的差集。

**有序集合：**
zadd key score member [[score member] [score member] …] 将一个或多个 member 元素及其 score 值加入到有序集 key 当中。
zscore key member 返回有序集 key 中，成员 member 的 score 值。
zcount key min max score 值在 min 和 max 之间的成员的数量。
zrange key start stop [withscores] 返回有序集 key 中，指定区间内的成员(从小到大)。
zrank key member 返回有序集 key 中成员 member 的排名。其中有序集成员按 score 值递增(从小到大)顺序排列。
zrem key member [member …] 移除有序集 key 中的一个或多个成员，不存在的成员将被忽略。

**时效性：**
expire(key,seconds) 为给定 key 设置生存时间，当 key 过期时(生存时间为 0 )，它会被自动删除。
expireat( key,timestamp) 设置过期时间戳,expireatcache1355292000# 这个 key 将在 2012.12.12 过期
ttl(key) 返回剩余时间
persist key 移除key有效期，转换成永久的

**数据指令：**
keys pattern 符合给定模式的 key 列表。阻塞的
scan 异步的 有重复