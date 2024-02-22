---
title: Kubernetes常用命令
categories:
  - Kubernetes
tags:
  - Kubernetes
date: 2021-05-11 13:20:04
---

**查看集群信息**

```sh
kubectl cluster-info
```

**获取集群中所有节点**

```sh
kubectl get nodes
```

**获取帮助**

```sh
kubectl --help

kubectl get --help

kubectl get nodes --help
```

**部署应用**

要提供实例名称和 app 镜像地址

```sh
kubectl create deployment kubernetes-bootcamp --image=gcr.io/google-samples/kubernetes-bootcamp:v1
```

**列出部署的应用**

```
kubectl get deployments
```

**获取Pod中容器的信息**

```shell
kubectl describe pods
```

> Pod的定义：一组一个或多个容器，同时定义其使用的资源

> describe命令还可用于*node, pods, deployments.

**获取Pod日志**

```shell
kubectl logs $POD_NAME
```

**在Pod中运行命令**(单条命令)

```shell
kubectl exec $POD_NAME -- env
```

**与Pod通过bash交互**

```shell
kubectl exec -ti $POD_NAME -- bash
```

