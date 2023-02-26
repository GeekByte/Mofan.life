---
title: Rust相关
categories:
  - Lang
  - Rust
tags:
  - Rust
date: 2021-07-08 19:26:08
---

中文文档
[关于本书 |《Rust Lang 2018》| Rust 技术论坛](https://learnku.com/docs/rust-lang/2018/about-this-book/4591)

[crates.io: Rust Package Registry](https://crates.io/)


[Configuration - The Cargo Book](https://doc.rust-lang.org/cargo/reference/config.html#netgit-fetch-with-cli)



在使用cargo引入依赖时，提示:

```txt
Caused by:
  failed to authenticate when downloading repository
attempted ssh-agent authentication, but none of the usernames `git` succeeded
```
解决:

```txt
DenisKolodin commented on 14 Jun 2017
Leave it here to help somebody...
I had a similar issue with ssh: dependency, but fixed it by starting ssh agent:

eval `ssh-agent -s`
ssh-add
cargo ...

```


[Rust今天4岁啦, 为什么越来越多的知名项目用Rust来开发？ - 云+社区 - 腾讯云](https://cloud.tencent.com/developer/article/1428784)



