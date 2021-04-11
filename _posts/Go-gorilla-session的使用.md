---
title: Go-gorilla/session的使用
categories:
  - 开源项目
  - Go
tags:
  - 开源项目
  - Go
  - gorilla
date: 2021-03-27 15:55:23
---

我们都知道，现在的互联网都是可以交互的，都是可以记录用户信息的。比如我的浏览记录，我的订单，我的个人信息。这些都是可以保存到服务器上的。那么服务器是如何识别每个用户的呢？答案就是session.通过session我们可以识别是哪个用户访问了网站，我们就可以返回给他指定的信息。

那么session的原理是什么？它是怎么实现的呢？

简单来说，session就是一个记录，一个记录用户标识的记录。那么用户是如何告知我们这个记录的呢，一般情况就是通过cookie.将cookie发送给服务器，服务器进行解析，就会识别相应的记录，然后在session记录表中（可以是文件或者数据库）找到对应信息。

在go语言中我们使用session也非常的方便。

我们只需要引入gorilla这个包就可以

```go
import(
"github.com/gorilla/sessions"
）
```

这样我们就可以使用session了。

```go
var store = sessions.NewCookieStore([]byte("test"))
handleSetSession(w http.ResponseWriter, r *http.Request) {
   session, err := store.Get(r, )
   err != nil {
      http.Error(w, err.Error(), http.)
      }
   session.Values[] = session.Values[] = session.Save(r, w)
}
```

我们先通过newcookiestore方法声明一个session的空间。然后通过store.get方法设置获取session变量。然后调用session.Values["name"] = "tom" session.Save方法就可以将session保存到服务器上。

newCookieStore这里保存的是session的秘钥，一般都是通过配置文件获取。

```go
var store = sessions.NewCookieStore([]byte(os.Getenv("SESSION_KEY")))
store.get(r,"menghuiguli")
```

这里设置的才是session的名字
