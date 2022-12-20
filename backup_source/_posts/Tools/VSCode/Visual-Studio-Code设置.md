---
title: Visual Studio Code设置
categories:
  - Tools
  - VSCode
tags:
  - VSCode
date: 2021-11-01 20:44:30
---

最近一段时间由于涉及到有关ROS的开发，没有在自己电脑上搭建环境，在公司一台Linux机器上搭建了环境，需要的时候可以远程开发，刚开始考虑用Vim，但是感觉Vim的提示有点少，前期需要提示才能避免犯错，于是选择VS Code进行开发，之前一直听这个东西插件很丰富，但一直没有认真用过，也就打开个文档啥的用用，不得不说，Visual Studio Code打开文档方面挺快的，尤其是比较大的文档，电脑风扇也比较安静，对比Sublime Text好很多，我用Sublime Text时电脑风扇狂转。。。

废话不多说了，把我在配置过程中用到的配置简单分享下，现在处于回顾阶段，可能有些忘记了，欢迎补充👏👏

### 调整左侧目录树父子层级的缩进大小：

> vs code 左侧的目录树是按照像素点缩进的，然后会发现它们视觉上挨得很近，越是分辨率高的电脑越为明显。

打开设置（Settings）项，找到Workbench->Appearance节点，找到里面的tree: Indent一项，设置里面的数值，单位是像素，一般设置到原数值的2～3倍看着舒服一些。

### 关闭右侧小地图
去设置(Settings)，在 Text Editor 找到 MiniMap，取消勾选 Enabled。


