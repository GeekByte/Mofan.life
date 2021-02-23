---
title: Mac下给Docker配置镜像加速地址
categories:
  - Docker
tags:
  - Docker
  - Mac
date: 2021-02-23 17:29:52
---

### 环境

> Mac OS Big Sur 11.0.1
>
> Docker Desktop 3.1.0(51484)

### 步骤

1. 点击顶栏 Docker 图标，点击 `Preferences...`；

2. 点击 `Docker Engine`，在代码区添加如下代码：

	```json
	  "registry-mirrors": [
	    "https://7bezldxe.mirror.aliyuncs.com/"
	  ]
	```

	添加后效果：

	```json
	{
	  "experimental": false,
	  "features": {
	    "buildkit": true
	  },
	  "registry-mirrors": [
	    "https://7bezldxe.mirror.aliyuncs.com/"
	  ]
	}
	```

3. 点击顶栏图标，点击 `Restart Docker`；

4. 检查，打开终端输入`docker info`命令，在输出信息中能找到如下信息即可完成。

	```json
	 Registry Mirrors:
	  https://7bezldxe.mirror.aliyuncs.com/
	```
<br>
### 其他国内镜像加速地址

```text
https://registry.docker-cn.com
http://hub-mirror.c.163.com
https://3laho3y3.mirror.aliyuncs.com
http://f1361db2.m.daocloud.io
https://mirror.ccs.tencentyun.com
```

