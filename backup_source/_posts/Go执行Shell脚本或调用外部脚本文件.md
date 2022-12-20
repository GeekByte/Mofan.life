---
title: Go执行Shell脚本或调用外部脚本文件
categories:
  - 编程语言
  - Go
tags:
  - Go
date: 2021-07-28 22:54:40
---

在需要对文件进行操作的一些场景，比如文件合并，计算文件hash或大小，除了可以完全使用golang来处理，也可以借助外部shell或bash来完成。shell是应用程序和linux内核之间的接口程序，而bash可简单理解为shell的加强版，支持更多的命令；通过bash来完成运维相关的工作是比较常见的场景，设计到文件的处理更是常态。
因此大多数情况下，golang调用外部shell来处理文件也是合理的做法。以下是一个简单的例子，提供几个工具方法：计算文件sha1、大小、合并文件等。详细参考代码如下所示：

```go
package util

import (
	"fmt"
	"os/exec"
	"strconv"
	"strings"
	"regexp"
)

// 以下合并操作适用于linux平台

const (
	// 通过shell合并分块文件
	MERGE_FILE_CMD = `
	#!/bin/bash
	# 需要进行合并的分片所在的目录
	chunkDir=$1
	# 合并后的文件的完成路径(目录＋文件名)
	mergePath=$2
	
	echo "分块合并，输入目录: " $chunkDir
	
	if [ ! -f $mergePath ]; then
			echo "$mergePath not exist"
	else
			rm -f $mergePath
	fi
	
	for chunk in $(ls $chunkDir | sort -n)
	do
			cat $chunkDir/${chunk} >> ${mergePath}
	done
	
	echo "合并完成，输出：" mergePath
	`

	// 计算文件sha1值
	FILE_SHA1SUM_CMD = `
	#!/bin/bash
	sha1sum $1 | awk '{print $1}'
	`

	// 计算文件大小
	FILE_SIZE_CMD = `
	#!/bin/bash
	ls -l $1 | awk '{print $5}'
	`
)

// ComputeFileSizeByShell: 通过调用shell来计算文件大小
// @return  (string, error): (文件hash, 错误信息)
func ComputeFileSizeByShell(destPath string) (int, error) {
	cmdStr := strings.Replace(FILE_SIZE_CMD, "$1", destPath, 1)
	fSizeCmd := exec.Command("bash", "-c", cmdStr)
	if fSizeStr, err := fSizeCmd.Output(); err != nil {
		fmt.Println(err)
		return -1, err
	}  else {
		reg := regexp.MustCompile("\\s+")
		fSize, err := strconv.Atoi(reg.ReplaceAllString(string(fSizeStr), ""))
		if err != nil {
			fmt.Println(err)
			return -1, err
		}
		return fSize, nil
	}
}

// ComputeSha1ByShell: 通过调用shell来计算文件sha1
// @return  (string, error): (文件hash, 错误信息)
func ComputeSha1ByShell(destPath string) (string, error) {
	cmdStr := strings.Replace(FILE_SHA1SUM_CMD, "$1", destPath, 1)
	hashCmd := exec.Command("bash", "-c", cmdStr)
	if filehash, err := hashCmd.Output(); err != nil {
		fmt.Println(err)
		return "", err
	}  else {
		reg := regexp.MustCompile("\\s+")
		return reg.ReplaceAllString(string(filehash), ""), nil
	}
}

// MergeChuncksByShell: 通过调用shell来合并文件分块，分块文件名须有序 (如分块名分别为: 1, 2, 3, ...)
// @return bool: 合并成功将返回true, 否则返回false
func MergeChuncksByShell(chunkDir string, destPath string, fileSha1 string) bool {
	// 合并分块
	cmdStr := strings.Replace(MERGE_FILE_CMD, "$1", chunkDir, 1)
	cmdStr = strings.Replace(cmdStr, "$2", destPath, 1)
	mergeCmd := exec.Command("bash", "-c", cmdStr)
	if _, err := mergeCmd.Output(); err != nil {
		fmt.Println(err)
		return false
	} 

	// 计算合并后的文件hash
	if filehash, err := ComputeSha1ByShell(destPath); err != nil {
		fmt.Println(err)
		return false
	}  else	if string(filehash) != fileSha1 { // 判断文件hash是否符合给定值
		return false
	} else {
		fmt.Println("check sha1: "+destPath+ " " + filehash+" " + fileSha1)
	}
	
	return true
}
```

