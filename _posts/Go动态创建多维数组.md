---
title: Go动态创建多维数组
categories:
  - Go
  - 数组
tags:
  - Go
  - 数组
date: 2021-03-01 18:38:31
---

```go
package main

func main() {
	n, m, x := 3, 3, 3
    
	//创建二维数组
    two := make([][]int, n)
	for i := range two {
		two[i] = make([]int, m)
	}

	//创建三维数组
	three := make([][][]int, n)
	for i := range three {
		three[i] = make([][]int, m)
		for j := range three[i] {
			three[i][j] = make([]int, x)
		}
	}
}
```

