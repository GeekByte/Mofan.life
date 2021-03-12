---
title: gob踩坑记录
categories:
  - Go
tags:
  - Go
date: 2021-03-12 18:30:56
---

今天在写多个参数的RPC请求调用demo时，遇到了这样一个问题:

```text
panic: gob: type main.Cuboid has no exported fields
```

在网上一查，竟然犯了一个低级错误。Go语言包内变量、函数等对外可见性是根据首字母是否大写实现的，我结构体里的参数因为要传给别的进程使用，所以应该首字母大写，让其对外可见。

源程序：

rpc_server.go

```go
package main

import (
	"net"
	"net/http"
	"net/rpc"
	"time"
)

type MathUtils struct {

}
// ---------这里有问题 start -------------
type Cuboid struct {
	length float32
	width float32
}

func (m *MathUtils) CuboidArea(req Cuboid, resp *float32) error {
	*resp = req.length * req.width
	return nil
}
// -----------------end------------------
// 上面的字段改成 length -> Length, width -> Width
func main() {
	err := rpc.Register(new(MathUtils))
	if err != nil {
		panic(err.Error())
	}

	rpc.HandleHTTP()

	listen, err := net.Listen("tcp", "127.0.0.1:8081")
	if err != nil {
		panic(err.Error())
	}

	http.Serve(listen, nil)

	time.Sleep(10 * time.Second)
}
```

rpc_client.go

```go
package main

import (
	"fmt"
	"net/rpc"
)
// -------------有问题 start --------------
type Cuboid struct {
	length float32
	width float32
}
// --------------end---------------------
// 修改：length -> Length, width -> Width
func main() {
	client, err := rpc.DialHTTP("tcp", "127.0.0.1:8081")
	if err != nil {
		panic(err.Error())
	}
	var resp float32
	req := Cuboid{ 3.30,  22.37}
	err = client.Call("MathUtils.CuboidArea", req, &resp)
	if err != nil {
		// 未修改前，此处报错：panic: gob: type main.Cuboid has no exported fields
		panic(err.Error())
	}
	fmt.Println(resp)
}
```

