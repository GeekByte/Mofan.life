---
title: 如何自动删除Kubernetes的CronJob创建的Job
categories:
  - Kubernetes
tags:
  - Kubernetes
date: 2021-08-12 19:49:16
---

kubernetes的文档里说，Job完成后不会删除创建的Pod， 保留这些 Pod 使得你可以查看已完成的 Pod 的日志输出，以便检查错误、警告 或者其它诊断性输出。但如果想在它完成后自动删除如何操作呢？

首先要知道，由Job创建的Pod会在Job删除后级联删除。

### 方法一：

通过限制历史记录数量或者禁用历史记录，让CronJob产生的Job到达一定数量后自动删除旧的，或者干脆Job完成（成功或者失败）后直接删除。

> The `.spec.successfulJobsHistoryLimit` and `.spec.failedJobsHistoryLimit` fields are optional. These fields specify how many completed and failed jobs should be kept. By default, they are set to 3 and 1 respectively. Setting a limit to `0` corresponds to keeping none of the corresponding kind of jobs after they finish.

把 limit 设置为 0 的例子如下：

```yaml
apiVersion: batch/v1beta1
kind: CronJob
metadata:
  name: hello
spec:
  schedule: "*/1 * * * *"
  successfulJobsHistoryLimit: 0
  failedJobsHistoryLimit: 0
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: hello
            image: busybox
            args:
            - /bin/sh
            - -c
            - date; echo Hello from the Kubernetes cluster
          restartPolicy: OnFailure
```

### 方法二（不推荐）：

官方文档提供了一种方法，通过TTL机制，但是你需要在特性门中开启这一特性，否则这项设置不生效，相关特性门的开启需要由管理员在指定的kubernetes组件上开启。

开启方式可参考文档：[Feature Gates | Kubernetes](https://v1-20.docs.kubernetes.io/docs/reference/command-line-tools-reference/feature-gates/)

设置TT L的例子如下：

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: pi-with-ttl
spec:
  ttlSecondsAfterFinished: 100
  template:
    spec:
      containers:
      - name: pi
        image: perl
        command: ["perl",  "-Mbignum=bpi", "-wle", "print bpi(2000)"]
      restartPolicy: Never
```

`ttlSecondsAfterFinished`字段指定多长时间后删除Job，单位是秒。
