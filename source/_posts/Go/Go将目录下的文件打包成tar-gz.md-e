---
title: Go将目录下的文件打包成tar.gz
categories:
  - 编程语言
  - Go
tags:
  - Go
date: 2021-07-19 17:39:50
---

这个代码是为了生成`Open Policy Agent` Bundle的压缩包的，根据传入的对象信息（可以理解为OPA的data.json）。

直接贴代码：

```go
//GenerateBundle 生成bundler.tar.gz
func GenerateBundle(data interface{}) error {
	path, fileName, tarballName := "./bundle/", "data.json", "bundle.tar.gz"

	b, _ := json.Marshal(data)
	os.Remove(path + fileName)
	file, err := os.Create(path + fileName)
	if err != nil {
		return err
	}
	defer file.Close()
	writer := bufio.NewWriter(file)
	_, err = writer.Write(b)
	if err != nil {
		log.Println(err)
		return err
	}
	writer.Flush()
    
    // 如果仅仅打包，从这里开始看

	// 读取目录下数据和规则文件
	files, err := ioutil.ReadDir(path)
	if err != nil {
		log.Println(err)
		return err
	}

	// 打包
	fw, err := os.Create(tarballName)
	if err != nil {
		return err
	}
	defer fw.Close()
	gw := gzip.NewWriter(fw)
	defer gw.Close()
	tw := tar.NewWriter(gw)
	defer tw.Close()

	for _, f := range files {
		hdr := &tar.Header{
			Name: f.Name(),
			Mode: 0600,
			Size: f.Size(),
		}
		if err = tw.WriteHeader(hdr); err != nil {
			log.Println(err)
			return err
		}

		pa := path + f.Name()
		tf, err := ioutil.ReadFile(pa)
		if err != nil {
			log.Println(err)
			return err
		}
		if _, err = tw.Write(tf); err != nil {
			log.Println(err)
			return err
		}
		tw.Flush()
	}

	return nil
}
```



参考：

[代码片段 - Golang 创建 .tar.gz 压缩包 - GoLove - 博客园](https://www.cnblogs.com/golove/p/3454630.html)

[Go语言压缩和解压缩tar.gz文件的方法_Golang_脚本之家](https://www.jb51.net/article/61287.htm)

