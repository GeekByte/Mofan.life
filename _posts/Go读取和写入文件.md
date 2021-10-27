---
title: Go读取和写入文件
categories:
  - 编程语言
  - Go
tags:
  - Go
date: 2021-07-19 17:32:25
---





## 读取指定目录下的文件列表

如果仅仅是想获取一个目录下面的文件和文件夹的列表,有两个比较简单的方法

* 利用ioutil的ReadDir方法

	```go
	package main
	 
	import (
	    "fmt"
	    "io/ioutil"
	)
	 
	func main() {
	    files, _ := ioutil.ReadDir("./")
	    for _, f := range files {
	            fmt.Println(f.Name())
	    }
	}
	```

* 利用filepath的Glob方法

	filepath的walk会递归获取所有的文件

	```Go
	package main    
	 
	import (
	    "fmt"
	    "path/filepath"
	)
	 
	func main() {
	    files, _ := filepath.Glob("*")
	    fmt.Println(files) // contains a list of all files in the current directory
	}
	```

