---
title: 'Golang interface{}转struct的两种方法'
categories:
  - 编程语言
  - Go
tags:
  - Go
date: 2021-03-28 22:42:10
---

### 使用断言，做强制转换

```go
	p, ok := (Value).(user)
	if ok {
		fmt.Println("id:" + p.Id)
		fmt.Println("name:" + p.Name)
	} else {
		fmt.Println("can not convert")
	}
```

### JSON序列化

```go
	resByre,resByteErr:=json.Marshal(ResponseData)
	if resByteErr != nil {
		c.Data(utils.ErrorResult("读取信息失败" + resByteErr.Error()))
		return
	}
	var newData MnConfig
	jsonRes:=json.Unmarshal(resByre,&newData)
	if jsonRes != nil {
		c.Data(utils.ErrorResult("读取信息失败" + jsonRes.Error()))
		return
	}
```

示例：

```go
package main
 
import (
	"encoding/json"
	"fmt"
)
 
type user struct {
	Id int `json:"id"`
	Name string `json:"name"`
}
 
 
func main() {
 
	newUser:=user{
		Id:   1,
		Name: "Mofan",
	}
 
	var newInterface1 interface{}
 
	//第一种使用interface
	newInterface1=newUser
	fmt.Printf("使用interface: %v\n",newInterface1.(user))
 
	//第二种使用json
	var newInterface2 interface{}
	newInterface2=newUser
	resByre, resByteErr := json.Marshal(newInterface2)
	if resByteErr != nil {
		fmt.Printf("%v\n",resByteErr)
		return
	}
	var newData user
	jsonRes := json.Unmarshal(resByre, &newData)
	if jsonRes != nil {
		fmt.Printf("%v\n",jsonRes)
		return
	}
	fmt.Printf("使用 json: %v\n",newData)
 
}
```

输出：

```text
使用interface: {1 Mofan}
使用 json: {1 Mofan}
```

