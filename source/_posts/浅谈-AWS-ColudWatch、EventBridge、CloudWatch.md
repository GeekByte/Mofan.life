---
title: 浅谈 AWS ColudWatch、EventBridge、CloudWatch
categories:
  - 技术
tags:
  - 技术
date: 2022-06-29 14:58:51
---

最近在公司领了一项任务，通过 AWS 的 CloudWatch、EventBridge、CloudWatch 实现当服务内存占用较大时，自动重启服务。

## CloudWatch

CloudWatch 主要有两大功能，一个是作为日志中心，所有服务的日志都会输出到这里，通过日志组(log groups)的方式进行分类；另一个是指标监控中心，比如各个服务的 CPU使用情况 以及 内存占用情况 都可以在这里查看。

另外，通过对服务的指标进行监控，拓展出了报警功能，通过对监控的指标设置一定规则，可以在触发规则后发生报警，一条报警信息可以理解为一个 event，AWS 将些 event 再汇总到 EventBridge。

## EventBridge

EventBridge 主要有两个概念，一个是 Eventbus，可以理解为收集消息的一个容器，默认的 Eventbus 是 default，会将 AWS 上的所有 event 收集，也可以自定义 Eventbus，用于收集特定服务的 event；另一个概念是 rule，作用是从 Eventbus 中过滤特定规则的信息，然后将这些获取到的信息呈递到其他模块处理，比如 Lambda。

EventBridge 可以收集的 event 不仅来自 AWS 自身的服务，还可以通过 API 直接将信息发送到 EventBridge 的特定 Eventbus 上。

## Lambda

Lambda 主要作用是定义做什么的问题，一般在收到 EventBridge 呈递的消息时，会触发 定义的函数，然后完成要做的事情，比如重启服务。

Lambda 支持多种语言，区别仅在部署方式上有所不同。

Lambda 里的 函数如果有输出，AWS 会自动在 CloudWatch 的 Log 里创建一个 logs group，命名一般是 aws/lambda/<函数名>，注意，该操作需要一定的权限，需要确保执行 函数的role 具有将日志发送到 CloudWatch 的权限。



文档参考：

* [Amazon CloudWatch](https://docs.amazonaws.cn/en_us/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html)
* [Amazon EventBridge](https://docs.amazonaws.cn/en_us/eventbridge/latest/userguide/eb-what-is.html)
* [AWS Lambda](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html)
* [SDK: aws-lambda-go](https://github.com/aws/aws-lambda-go)
* [SDK: aws-sdk-go-v2](https://github.com/aws/aws-sdk-go-v2)
