--
title: Github Actions
categories:
  - Tools
  - CI/CD
tags:
  - Tools
  - CI/CD
  - GitHub
date: 2021-07-24 21:53:37
---


### 简介
大家知道，持续集成由很多操作组成，比如抓取代码、运行测试、登录远程服务器，发布到第三方服务等等。GitHub 把这些操作就称为 actions。

很多操作在不同项目里面是类似的，完全可以共享。GitHub 注意到了这一点，想出了一个很妙的点子，允许开发者把每个操作写成独立的脚本文件，存放到代码仓库，使得其他开发者可以引用。

如果你需要某个 action，不必自己写复杂的脚本，直接引用他人写好的 action 即可，整个持续集成过程，就变成了一个 actions 的组合。这就是 GitHub Actions 最特别的地方。

GitHub 做了一个官方市场，可以搜索到他人提交的 actions。另外，还有一个 awesome actions 的仓库，也可以找到不少 action。

上面说了，每个 action 就是一个独立脚本，因此可以做成代码仓库，使用userName/repoName的语法引用 action。比如，actions/setup-node就表示github.com/actions/setup-node这个仓库，它代表一个 action，作用是安装 Node.js。事实上，GitHub 官方的 actions 都放在 github.com/actions 里面。

既然 actions 是代码仓库，当然就有版本的概念，用户可以引用某个具体版本的 action。下面都是合法的 action 引用，用的就是 Git 的指针概念，详见官方文档。

### 基本概念

GitHub Actions 的配置文件叫做 workflow 文件，存放在代码仓库的.github/workflows目录。

workflow 文件采用 YAML 格式，文件名可以任意取，但是后缀名统一为.yml，比如foo.yml。一个库可以有多个 workflow 文件。GitHub 只要发现.github/workflows目录里面有.yml文件，就会自动运行该文件。

workflow 文件的配置字段非常多，详见官方文档。下面是一些基本字段。

（1）name

name字段是 workflow 的名称。如果省略该字段，默认为当前 workflow 的文件名。
```text
name: GitHub Actions Demo
```

（2）on

on字段指定触发 workflow 的条件，通常是某些事件。


on: push
上面代码指定，push事件触发 workflow。

on字段也可以是事件的数组。
```yaml
on: [push, pull_request]
```
上面代码指定，push事件或pull_request事件都可以触发 workflow。

完整的事件列表，请查看官方文档。除了代码库事件，GitHub Actions 也支持外部事件触发，或者定时运行。

（3）on.<push|pull_request>.<tags|branches>

指定触发事件时，可以限定分支或标签。

```yaml 
on:
  push:
    branches:
      - master
```
上面代码指定，只有master分支发生push事件时，才会触发 workflow。

（4）jobs.<job_id>.name

workflow 文件的主体是jobs字段，表示要执行的一项或多项任务。

jobs字段里面，需要写出每一项任务的job_id，具体名称自定义。job_id里面的name字段是任务的说明。

```yaml 
jobs:
  my_first_job:
    name: My first job
  my_second_job:
    name: My second job
``` 
上面代码的jobs字段包含两项任务，job_id分别是my_first_job和my_second_job。

（5）jobs.<job_id>.needs

needs字段指定当前任务的依赖关系，即运行顺序。

```yaml 
jobs:
  job1:
  job2:
    needs: job1
  job3:
    needs: [job1, job2]
```
上面代码中，job1必须先于job2完成，而job3等待job1和job2的完成才能运行。因此，这个 workflow 的运行顺序依次为：job1、job2、job3。

（6）jobs.<job_id>.runs-on

runs-on字段指定运行所需要的虚拟机环境。它是必填字段。目前可用的虚拟机如下。
```yaml 
ubuntu-latest，ubuntu-18.04或ubuntu-16.04
windows-latest，windows-2019或windows-2016
macOS-latest或macOS-10.14
```
下面代码指定虚拟机环境为ubuntu-18.04。
```yaml             
runs-on: ubuntu-18.04
（7）jobs.<job_id>.steps
```

steps字段指定每个 Job 的运行步骤，可以包含一个或多个步骤。每个步骤都可以指定以下三个字段。
```yaml
jobs.<job_id>.steps.name：步骤名称。
jobs.<job_id>.steps.run：该步骤运行的命令或者 action。
jobs.<job_id>.steps.env：该步骤所需的环境变量。
```
下面是一个完整的 workflow 文件的范例。

```yaml
name: Greeting from Mona
on: push

jobs:
  my-job:
    name: My Job
    runs-on: ubuntu-latest
    steps:
    - name: Print a greeting
      env:
        MY_VAR: Hi there! My name is
        FIRST_NAME: Mona
        MIDDLE_NAME: The
        LAST_NAME: Octocat
      run: |
        echo $MY_VAR $FIRST_NAME $MIDDLE_NAME $LAST_NAME.
```
上面代码中，steps字段只包括一个步骤。该步骤先注入四个环境变量，然后执行一条 Bash 命令。


