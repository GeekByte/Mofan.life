---
title: Kubernetes常用命令
categories:
  - Kubernetes
tags:
  - Kubernetes
date: 2021-05-11 13:20:04
---



**获取所有的nodes**

```sh
kubectl get nodes
```

**查看cluster详情**

```sh
kubectl cluster-info
```

**获取帮助**

```sh
kubectl --help

kubectl get --help

kubectl get nodes --help
```

**部署应用**

要提供实例名称和 app 镜像

```sh
kubectl create deployment kubernetes-bootcamp --image=gcr.io/google-samples/kubernetes-bootcamp:v1
```

**列出部署的应用**

```
kubectl get deployments
```

