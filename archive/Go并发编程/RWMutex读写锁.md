# RWMutex: 读写锁

读写锁出现的背景：

Go中的同步原语 Mutex 用来保证读写共享资源的安全性。不管是读还是写，我们都通过 Mutex 来保证只有一个 goroutine 访问共享资源，这在某些情况下有点“浪费”。比如说，**在写少读多的情况下**，即使一段时间内没有写操作，大量并发的读访问也不得不在 Mutex 的保护下变成了串行访问，这个时候，使用 Mutex，对性能的影响就比较大。RWMutex的出现，将 Mutex 中的串行读变成并行读，从而提高读操纵的性能。



RWMutex：

当写操作的 goroutine 持有锁的时候，它就是一个排外锁，其它的写操作和读操作的 goroutine，需要阻塞等待持有这个锁的 goroutine 释放锁。	



RWMutex的方法有5个：

* Lock/Unlock：写操作时调用的方法。如果锁已经被 reader 或者 writer 持有，那么，Lock 方法会一直阻塞，直到能获取到锁；Unlock 则是配对的释放锁的方法。
* RLock/RUnlock：读操作时调用的方法。如果锁已经被 writer 持有的话，RLock 方法会一直阻塞，直到能获取到锁，否则就直接返回；而 RUnlock 是 reader 释放锁的方法。
* RLocker：这个方法的作用是为读操作返回一个 Locker 接口的对象。它的 Lock 方法会调用 RWMutex 的 RLock 方法，它的 Unlock 方法会调用 RWMutex 的 RUnlock 方法。













```txt

2022-02-16 18:34:12     [DEBG]: [PullCommand] (session id) i am [1645007652531628652], got session [1645007652531628652],they are same,do nothing!,stream pointer address:0xc0006176a0
2022-02-16 18:34:12     [DEBG]: [PullCommand] i am [1645007652531628652] after send CloseOldConnection
robot-201902052:7d2b0fe5-f675-5ace-b1ed-00420e31df3a

(/root/grpc/restful_api/robot_platform/src/restful_api/service/robot.go:115) 
[2022-02-16 18:34:23]  [1.14ms]  SELECT count(robotsn) as total FROM "robot"    
[0 rows affected or returned ] 

(/root/grpc/restful_api/robot_platform/src/restful_api/service/robot.go:150) 
[2022-02-16 18:34:23]  [1.52ms]  SELECT * FROM "robot"   ORDER BY case when robotsn in ('robot-20220110001:89c3a2d2-e0b4-537c-b6c4-ddab86068a82','robot-20200326001:d3276a3f-588e-5c11-8b20-0aba3b7f2c6f','robot-20211021001:51606b7a-cb9c-57e5-aab6-93611c134d7d','robot-20210820001:db0540e2-a929-5faf-a625-c7a19905d9f3','robot-201902052:7d2b0fe5-f675-5ace-b1ed-00420e31df3a','robot-20200911002:dae17043-ef26-53b7-a4f1-e0ec5d6b5ff0','robot-20211207001:b643c77d-5fd5-52f5-bdab-a6256d413e29','robot-20200313002:37112663-b0f6-55ee-a6a3-0046de8b6a61','robot-2021121001:8b93f629-7352-52e6-ba77-944e7a16e8fc') then 0 when nickname!='' then 1 else 2 end LIMIT 18 OFFSET 0  
[18 rows affected or returned ] 
```





```txt

'robot-20220110001:89c3a2d2-e0b4-537c-b6c4-ddab86068a82',
'robot-20200326001:d3276a3f-588e-5c11-8b20-0aba3b7f2c6f',
'robot-20211021001:51606b7a-cb9c-57e5-aab6-93611c134d7d',
'robot-20210820001:db0540e2-a929-5faf-a625-c7a19905d9f3',


'robot-20200911002:dae17043-ef26-53b7-a4f1-e0ec5d6b5ff0',

 
 'robot-201902052:7d2b0fe5-f675-5ace-b1ed-00420e31df3a',



1)  "robot-20210820001:db0540e2-a929-5faf-a625-c7a19905d9f3"
2)  "robot-20191212004:fb4dc94c-3287-5208-8d50-bcec2327b828"
3)  "robot-20211130001:61b887f7-45e1-505b-a046-a988509a6ce4"
4)  "robot-20220114001:624e8f95-1f6a-574d-8a5b-03c4ff4f7892"
5)  "robot-20211210002:9c45e304-fb9d-58f5-942e-7146947fae6a"
6)  "robot-20211021002:72ac19a3-b414-59df-89e2-65dc6b2527bb"
7)  "robot-20200911002:dae17043-ef26-53b7-a4f1-e0ec5d6b5ff0"
8)  "robot-20220122001:1f55c3ca-914d-5d16-9830-1f0da1c1db98"
9)  "robot-20220114002:bd1080aa-ecb4-5b25-acfd-84c2270d9246"
10) "robot-20211021001:51606b7a-cb9c-57e5-aab6-93611c134d7d"
11) "robot-20220110001:89c3a2d2-e0b4-537c-b6c4-ddab86068a82"
12) "robot-20200310001:6b081aa4-eaf7-5343-86ff-fba65ec1cbbf"
13) "robot-20210201001:fe03c5ea-c945-5b12-9129-6f547a07a5aa"
14) "robot-20211208001:3ef059ef-5efe-53cd-9754-e280ec230dcd"
16) "robot-20211008001:ef131bbc-87d1-5e3e-9ba6-5d76ceca9b60"
17) "robot-20211021005:e56af5d0-ba42-5ecc-8792-b1fdee6bbaec"
18) "robot-20210601002:4324b329-38d3-5d1d-aee8-918cdacf5eed"
19) "robot-20200326001:d3276a3f-588e-5c11-8b20-0aba3b7f2c6f"
20) "robot-2019050001:8b3be2ce-19cf-52aa-a72b-688d5eaa6c57"



15) "robot-20211207001:b643c77d-5fd5-52f5-bdab-a6256d413e29"
    'robot-20211207001:b643c77d-5fd5-52f5-bdab-a6256d413e29',


21) "robot-2021121001:8b93f629-7352-52e6-ba77-944e7a16e8fc"
    'robot-2021121001:8b93f629-7352-52e6-ba77-944e7a16e8fc'
```

