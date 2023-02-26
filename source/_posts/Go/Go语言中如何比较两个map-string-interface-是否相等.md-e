---
title: 'Go语言中如何比较两个map[string]interface{}是否相等'
categories:
  - 编程语言
  - Go
tags:
  - Go
date: 2021-03-12 22:58:53
---

* Map是无序的

* Go语言中两个`interface{}` 是无法直接比较是否相等。因为类型不确定，任何类型的数据都可以被塞到interface{}中。

### 比较两个map[string]interface{}是否相等：

首先，我们可以将它们转化为 json 字符串来比较，但是因为Map是无序的，所以转化的json字符串不一定会一模一样。（当然，你也可以用反射来做，但是代码量多，麻烦。）

所以我们可以将其转化成顺序一样的 slice ，然后再转化未 json 。 这样就确保的json可以一样了。

代码如下：

```go
func CompareTwoMapInterface(data1 map[string]interface{}, 
						data2 map[string]interface{}) bool {
	keySlice := make([]string, 0)
	dataSlice1 := make([]interface{}, 0)
	dataSlice2 := make([]interface{}, 0)
	for key, value := range data1 {
		keySlice = append(keySlice, key)
		dataSlice1 = append(dataSlice1, value)
	}
	for _, key := range keySlice {
		if data, ok := data2[key]; ok {
			dataSlice2 = append(dataSlice2, data)
		} else {
			return false
		}
	}
	dataStr1, _ := json.Marshal(dataSlice1)
	dataStr2, _ := json.Marshal(dataSlice2)

	return string(dataStr1) == string(dataStr2)
}
```

