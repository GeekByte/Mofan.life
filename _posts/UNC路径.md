---
title: UNC路径
categories:
  - 技术
tags:
  - 技术
date: 2021-03-24 23:05:47
---

UNC（Universal Naming Convention）：通用命名规则，也称通用命名规范、通用命名约定。

UNC为网络（主要指局域网）上资源的完整Windows名称。

UNC路径格式：`\\servername\sharename`，其中`servername`是服务器名。`sharename`是共享资源的名称。

这些地址以两个反斜线 (`\\`) 开头，并提供服务器名、共享名和完整的文件路径。例如，`“file:\server\share\path\project file.mpp”`是绝对 UNC 地址。

虽然UNC路径为Win系统所创，有的时候在代码中，还是能看到使用`forward slash的`UNC样式：`//servername/dirname/file`。

