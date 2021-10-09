---
title: HTML学习
categories:
  - null
tags:
  - null
date: 2021-10-09 15:07:08
---

*1、img 标签的 loading 属性*

决定图片加载的时机，有两种值:

* eager 默认值，图片立即加载
* lazy 延迟加载图像，直到满足某些条件，比如图片出现在可视窗口中

*2、href 与 src 的区别*

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

*3、`标签的id 与 class`*

* class 属性可以多用 **class=" "** （引号里面可以填入多个class属性）

* id 属性只能单独设置 **id=" "**（只能填写一个，多个无效）

HTML属性一览表：[HTML 标签列表(字母排序) | 菜鸟教程](https://www.runoob.com/tags/html-reference.html)

*4、标签`<hr>`用于定义水平线*

