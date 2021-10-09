---
title: HTML学习
categories:
  - null
tags:
  - null
date: 2021-10-09 15:07:08
---

## img 标签的 loading 属性

决定图片加载的时机，有两种值:

* eager 默认值，图片立即加载
* lazy 延迟加载图像，直到满足某些条件，比如图片出现在可视窗口中

## href 与 src 的区别

href 是 Hypertext Reference 的缩写，表示超文本引用。用来建立当前元素和文档之间的链接。常用的有：link、a。例如：

```html
<link href="reset.css" rel=”stylesheet“/>
```

浏览器会识别该文档为 css 文档，并行下载该文档，并且不会停止对当前文档的处理。这也是建议使用 link，而不采用 @import 加载 css 的原因。 src 是 source 的缩写，src 的内容是页面必不可少的一部分，是引入。src 指向的内容会嵌入到文档中当前标签所在的位置。常用的有：img、script、iframe。例如:

```html
<script src="script.js"></script>
```

当浏览器解析到该元素时，会暂停浏览器的渲染，直到该资源加载完毕。这也是将js脚本放在底部而不是头部得原因。

简而言之，src 用于替换当前元素；href 用于在当前文档和引用资源之间建立联系。

## `标签的id 与 class`

* class 属性可以多用 **class=" "** （引号里面可以填入多个class属性）

* id 属性只能单独设置 **id=" "**（只能填写一个，多个无效）

HTML属性一览表：[HTML 标签列表(字母排序) | 菜鸟教程](https://www.runoob.com/tags/html-reference.html)



标签`<hr>`用于定义水平线

HTML文本格式化 https://www.runoob.com/html/html-links.html



## 创建电子邮件链接发送内容

在进行邮件内容发送时，需要使用关键字：**mailto**

eg：

```html
<a href="mailto:hello@example.com?cc=hello@example.com&bcc=hello@example.com&subject=hello,world&body=world_hello" rel="nofollow">发送邮件</a>
```

> nofollow 是 HTML 页面中 a 标签的属性值。它的出现为网站管理员提供了一种方式，即告诉搜索引擎"不要追踪此网页上的链接"或"不要追踪此特定链接"。这个标签的意义是告诉搜索引擎这个链接不是经过作者信任的，所以这个链接不是一个信任票。

参数说明：

| 参数                    | 描述             |
| :---------------------- | :--------------- |
| mailto:*name@email.com* | 邮件接收地址     |
| cc=*name@email.com*     | 抄送地址         |
| bcc=*name@email.com*    | 密件抄送地址     |
| subject=*subject text*  | 邮件主题         |
| body=*body text*        | 邮件内容         |
| ?                       | 第一个参数分隔符 |
| &                       | 其他参数分隔符   |

> **抄送：**
>
> 英文名称：Carbon Copy，又简称为 CC。在网络术语中，抄送就是将邮件同时发送给收信人以外的人，用户所写的邮件抄送一份给别人，对方可以看见该用户的 E-mail。同收件人地址栏一样，不可以超过 1024 个字符。一般来说，使用"抄送"服务时，多人抄送的电子邮件地址使用 **;** 分隔。
>
> **密件抄送：**
>
> 英文名称：Blind Carbon Copy ，又称“盲抄送”，和抄送的唯一区别就是它能够让各个收件人无法查看到这封邮件同时还发送给了哪些人。密件抄送是个很实用的功能，假如一次向成百上千位收件人发送邮件，最好采用密件抄送方式，这样一来可以保护各个收件人的地址不被其他人轻易获得，二来可以使收件人节省下收取大量抄送的 E-mail 地址的时间。

## 定义页面在何处显示

使用 `<a> 的 target 属性`，用于告诉页面在何处显示，例如下面是让打开的URL在新标签页中显示

```html
<a href="http://www.runoob.com/" target="_blank" rel="noopener noreferrer">访问菜鸟教程!</a> 
```

另外`<a>`中`rel="noopener noreferrer"`的意思是不会打开其他的网站，因为恶意病毒可能会修改你的浏览器空白页地址。

