---
title: Nginx配置location问题
categories:
  - Nginx
tags:
  - Nginx
date: 2021-03-28 09:47:34
---

由于我新增了一个静态资源项目，于是我想通过Nginx根据url的不同访问到不同的静态资源。也就是我想让`url+/tonger`的请求解析到/home/tonger下的静态资源，于是就有了下面的配置。

```text
// 配置tonger静态资源路径
location /tonger/ {
root /home/tonger/;
index index.html;
}

location / {
root /html;
index index.html index.html;
}
```

配置完了之后发现总是报404错误，试了location的各种匹配规则写法，还是不行。

知道后来看到博客，说这样配置实际的请求访问的是`url+/home/tonger/index.html`，这样是访问不到的，要想`url+/tonger/index.html` 需要改成下面这样，尝试了一下，两种都能成功。

```text
location /tonger/ {
root /home/;
index index.html;
}

// 或者

location /tonger/ {
alias /home/tonger/;
index index.html;
}
```



Nginx还需要好好学习一下！！！