---
title: Nginx常用配置清单
categories:
  - Nginx
tags:
  - Nginx
date: 2021-04-22 13:25:41
---

> Nginx是一款[轻量级](https://baike.baidu.com/item/轻量级/10002835)的[Web](https://baike.baidu.com/item/Web/150564) 服务器/[反向代理](https://baike.baidu.com/item/反向代理/7793488)服务器及[电子邮件](https://baike.baidu.com/item/电子邮件/111106)（IMAP/POP3）代理服务器，在BSD-like 协议下发行。其特点是占有内存少，[并发](https://baike.baidu.com/item/并发/11024806)能力强，事实上nginx的并发能力在同类型的网页服务器中表现较好。

### 端口监听

```tex
server {
  # Standard HTTP Protocol
  listen 80;

  # Standard HTTPS Protocol
  listen 443 ssl;

  # For http2
  listen 443 ssl http2;

  # Listen on 80 using IPv6
  listen [::]:80;

  # Listen only on using IPv6
  listen [::]:80 ipv6only=on;
}
```

### 访问日志

```tex
server {
  # Relative or full path to log file
  access_log /path/to/file.log;

  # Turn 'on' or 'off'
  access_log on;
}
```

### 域名

``` tex
server {
  # Listen to yourdomain.com
  server_name yourdomain.com;

  # Listen to multiple domains
  server_name yourdomain.com www.yourdomain.com;

  # Listen to all domains
  server_name *.yourdomain.com;

  # Listen to all top-level domains
  server_name yourdomain.*;

  # Listen to unspecified Hostnames (Listens to IP address itself)
  server_name "";

}
```

### 静态资源

```tex
server {
  listen 80;
  server_name www.yourdomain.com;

  location / {
      root   /home/nginx/web;
      index  index.html index.htm;
  }
  location /hello {
      root   /home/nginx/hello;
      index  index.html index.htm;
  }
}
```

### 重定向

```tex
server {
  listen 80;
  server_name www.yourdomain.com;
  return 301 http://yourdomain.com$request_uri;
}
```

```tex
server {
  listen 80;
  server_name www.yourdomain.com;

  location /redirect-url {
     return 301 http://otherdomain.com;
  }
}
```

利用重定向可以将 http 请求转成 https 请求。

```tex
server {
  listen 80;
  server_name www.yourdomain.com;

  location / {
     return 301 https://$server_name$request_uri;
  }
}
```

### 反向代理

```tex
server {
  listen 80;
  server_name yourdomain.com;

  location / {
     proxy_pass http://0.0.0.0:3000;
     # where 0.0.0.0:3000 is your application server (Ex: node.js) bound on 0.0.0.0 listening on port 3000
  }

}
```

### 负载均衡

```tex
upstream node_js {
  server 0.0.0.0:3000;
  server 0.0.0.0:4000;
  server 123.131.121.122;
}

server {
  listen 80;
  server_name yourdomain.com;

  location / {
     proxy_pass http://node_js;
  }
}
```

### SSL

```tex
server {
  listen 443 ssl;
  server_name yourdomain.com;

  ssl on;

  ssl_certificate /path/to/cert.pem;
  ssl_certificate_key /path/to/privatekey.pem;

  ssl_stapling on;
  ssl_stapling_verify on;
  ssl_trusted_certificate /path/to/fullchain.pem;

  ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
  ssl_session_timeout 1h;
  ssl_session_cache shared:SSL:50m;
  add_header Strict-Transport-Security max-age=15768000;
}

# Permanent Redirect for HTTP to HTTPS
server {
  listen 80;
  server_name yourdomain.com;
  return 301 https://$host$request_uri;
}
```

### 以root用户运行nginx

nginx 默认运行用户为 nobody，会导致没有权限访问 `/root` 等目录，进而导致访问存在在这里的静态文件出现403问题。
可以将 nginx 配置中的 `user nobody;` 改为 `user root;`。

#### 参考
- [Nginx Cheatsheet](https://vishnu.hashnode.dev/nginx-cheatsheet)
