---
title: 用程序爬取网站返回HTTP418错误
categories:
  - 技术
tags:
  - 爬虫
  - 计算机网络
date: 2021-03-14 09:44:53
---

使用爬虫请求网站页面，返回信息中没有爬到页面，查看返回体中的`Status Code`，显示`418`。

在使用浏览器访问网站的时候，有些网站会检查访问的请求头信息，这也是反扒策略的一种，服务器通过检查请求头信息来判断这是否是人为的一次请求。

在请求中加入请求头信息即可。例如：

```go
req, err := http.NewRequest(http.MethodGet, url, nil)
req.Header.Add("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_0_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36")
```

