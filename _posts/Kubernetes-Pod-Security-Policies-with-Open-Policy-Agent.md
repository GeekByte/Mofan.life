---
title: Kubernetes Pod Security Policies with Open Policy Agent
categories:
  - Kubernetes
tags:
  - Kubernetes
  - OPA
date: 2021-07-15 22:14:23
---

### 容器和安全简介
容器轻巧，轻便且易于管理。在同一主机上运行的容器没有单独的物理/虚拟机。换句话说，容器共享运行它们的主机的资源，硬件和OS内核。因此，具有适当的安全性变得非常重要，这些安全性涉及容器中可以运行哪些进程，这些进程具有哪些特权，容器是否将允许特权升级，使用了什么镜像等等。

Pod是Kubernetes应用程序的基本执行单元，是您创建或部署的Kubernetes对象模型中最小和最简单的单元。它是一个或多个具有共享存储/网络的容器的组，以及有关如何运行容器的规范。因此，在容器上实施安全策略时，我们将检查安全策略并将其应用于Pod规范。那么，这些策略如何执行？使用准入控制器。

### 什么是Admission Controllers?
准入控制器是kube-apiserver的一部分。在配置存储在集群设置（etcd）中之前，它们拦截对Kubernetes API服务器的请求。准入控制器可以是正在验证（用于验证传入请求的一个）或正在变异（用于修改传入请求的一个）或两者都在进行。请参阅[Kubernetes文档](https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/#what-does-each-admission-controller-do)以快速浏览各种准入控制器。

### Open Policy Agent 作为 admission controller
Open Policy Agent（OPA）是一种开放源代码的通用策略引擎，可以将策略编写为代码。 OPA提供了一种高级声明性语言-Rego-以策略作为代码。使用OPA，我们可以跨微服务，CI / CD管道，API网关等执行策略。 OPA最重要的用例之一是Kubernetes作为准入控制者的策略实施。

OPA作为准入控制器，您可以强制执行非root用户之类的策略，要求使用特定的资源标签，确保所有pod都指定了资源请求和限制等。基本上，OPA允许您使用Rego语言将任何自定义策略编写为代码。

这些策略以Rego编写并加载到OPA中，作为Kubernetes集群上的准入控制器运行。 OPA将根据Rego策略评估对Kubernetes API服务器的任何资源创建/更新/删除请求。如果请求满足所有策略，则允许该请求。但是，即使单个策略失败，请求也会被拒绝。

![opa-k8s](https://www.cmdbyte.com/2021/02/opa-k8s.png)

Pod Security Policy
Pod安全策略（PSP）是实现为准入控制器的集群级别资源。 PSP允许用户将安全要求转换为管理Pod规范的特定策略。首先，创建PodSecurityPolicy资源时，它什么也不做。为了使用它，必须通过允许“使用”动词来授权请求​​用户或目标pod的服务帐户使用该策略。您可以参考Kubernetes文档上的启用Pod安全策略。

注意，PSP准入控制器既充当验证角色，又充当变异准入控制器。对于某些参数，PSP准入控制器使用默认值来更改传入的请求。此外，顺序始终是先突变然后验证。
