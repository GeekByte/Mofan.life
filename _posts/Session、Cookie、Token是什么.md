---
title: Session、Cookie、Token是什么
categories:
  - 技术
tags:
  - 网络
date: 2021-03-27 14:32:23
---

**不要混淆 session 和 session 实现。**

本来 session 是一个抽象概念，开发者为了实现中断和继续等操作，将 user agent 和 server 之间一对一的交互，抽象为“会话”，进而衍生出“会话状态”，也就是 session 的概念。

 而 cookie 是一个实际存在的东西，http 协议中定义在 header 中的字段。可以认为是 session 的一种后端无状态实现。

而我们今天常说的 “session”，是为了绕开 cookie 的各种限制，通常借助 cookie 本身和后端存储实现的，一种更高级的会话状态实现。

所以 cookie 和 session，你可以认为是同一层次的概念，也可以认为是不同层次的概念。具体到实现，session 因为 session id 的存在，通常要借助 cookie 实现，但这并非必要，只能说是通用性较好的一种实现方案。



1，session 在服务器端，cookie 在客户端（浏览器）
 2，session 默认被存在在服务器的一个文件里（不是内存）
 3，session 的运行依赖 session id，而 session id 是存在 cookie 中的，也就是说，如果浏览器禁用了 cookie ，同时 session 也会失效（但是可以通过其它方式实现，比如在 url 中传递 session_id）
 4，session 可以放在 文件、数据库、或内存中都可以。
 5，用户验证这种场合一般会用 session



设计方案：

[请教如何使用 gorilla/sessions 实现多点登陆 - V2EX](https://www.v2ex.com/t/571680)

