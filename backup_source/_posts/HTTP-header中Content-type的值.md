---
title: HTTP header中Content-type的值
categories:
  - 技术
tags:
  - 技术
date: 2021-07-30 10:11:02
---


HTTP header中的Content-type也称之为Media Types。

在返回体中，用于告诉客户端返回的数据类型，常见的类型比如JSON("Content-type":"application/json")

反之，在请求体中用于告诉服务端发送的数据类型。

在实际应用中，最好为传输的数据确定一个粒度最小的类型。比如在下载一个xxx.tar.gz文件时，我们可以使用"application/octet-stream"，这个用于表示传输的是二进制数据，但是范围表示的太大，这个类型定义在RFC 1341，但是目前已经被移除了。对于这种gzip文件，我们可以指定"application/gzip"。

下面是所有的Media Type类型，如果有需要可以查找具体的文件类型，粒度很细。

[Media Types](https://www.iana.org/assignments/media-types/media-types.xhtml)
[Content-Type - HTTP | MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type)
