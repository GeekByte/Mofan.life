---
title: Go的数据类型interface
categories:
  - Lang
  - Go
tags:
  - Go
date: 2021-04-21 07:17:07
---

> 参考：[research!rsc: Go Data Structures: Interfaces](https://research.swtch.com/interfaces)
>
> [怎么理解go的interface](https://blog.csdn.net/yihuliunian/article/details/104784523)
>
> [golang interface](https://blog.csdn.net/justaipanda/article/details/43155949)

## 概念补充

`Go`的`interface`是由两种类型来实现的：`iface`和 `eface`

`iface`指的是接口中申明有方法（至少1个），`eface`表示接口中没有申明方法

后面会讲到这两个到底是什么，所以这里需要先不用关心。

## 深入理解

下面是一个简单的Demo，Binary实现了fmt.Stringer接口，我们调用`ToString()`方法，会调用接口的`String()`方法。

```go
type Binary uint64

// 实现String方法，实现fmt.Stringer接口
func (i Binary) String() string {
	return strconv.FormatUint(uint64(i), 10)
}

func main() {
	b := Binary(200)
    // var b Binary = Binary(200)
	ToString(b)// 02
}
func ToString(value interface{}) string {
	newValue, ok := value.(fmt.Stringer)
	if ok {
		return newValue.String()
	}
	panic("The value  is not implement fmt.Stringer func")
}
```

大致的执行流程图下所示：

//01 执行的是，在内存中开辟一块内存，存放200这个值

![1](https://www.cmdbyte.com/2021/02/%E6%88%AA%E5%B1%8F2021-04-21%2007.22.44.png)

// 02 调用ToString方法，首先方法传递过程中需要隐式将b转换成interface{}类型，实际上做的就是以下：

![2](https://www.cmdbyte.com/2021/02/%E6%88%AA%E5%B1%8F2021-04-21%2007.23.38.png)

首先大家可能会关心，我就没见过这个结构，你是不是骗人的，其实有这个结构体，是在`runtime/runtime2.go` 中

```
type eface struct {
	_type *_type // 类型
	data  unsafe.Pointer //值
}
复制代码
```

那么如何转换的呢？

`type` 指得是 Binary的类型，包含了Binary类型的所有信息（后面会介绍到）

`data` 指向的真实数据，由于我们传递的不是指针，所以这种情况下其实是做了一次内存拷贝(**所以也就是尽可能的别使用interface{}**)，data其实存的是拷贝的数据，如果换做是指针，其实也是拷贝了一份指针地址(这也就是reflect.Elem方法的作用)

>  以下这几段代码全部来自于 `runtime/iface.go`

```
// 关于 unsafe.Pointer，unsafe包学习的时候介绍过
func convT2E(t *_type, elem unsafe.Pointer) (e eface) {
	if raceenabled {
		raceReadObjectPC(t, elem, getcallerpc(), funcPC(convT2E))
	}
	if msanenabled {
		msanread(elem, t.size)
	}
  // 首先会分配一块内存，内存大小为类型t的大小,下面这段话是mallocgc的介绍
  // Allocate an object of size bytes.
  // Small objects are allocated from the per-P cache's free lists.
  // Large objects (> 32 kB) are allocated straight from the heap.
	x := mallocgc(t.size, t, true)
	// TODO: We allocate a zeroed object only to overwrite it with actual data.
	// Figure out how to avoid zeroing. Also below in convT2Eslice, convT2I, convT2Islice.
  // 将elem拷贝到x 
	typedmemmove(t, x, elem)
  // eface 的类型为t，值为x
	e._type = t
	e.data = x
	return
}
复制代码
```

//3 其次就是到了断言的部分，那么断言到底执行了什么呢？

```
// inter 指的是fmt.Stringer接口类型信息
// e 就是我们上面的的interface{} 的真实类型eface
func assertE2I2(inter *interfacetype, e eface) (r iface, b bool) {
	t := e._type
	if t == nil {
		return
	}
  // 获取tab，其实大家有可能不太理解
	tab := getitab(inter, t, true)
	if tab == nil {
		return
	}
	r.tab = tab
	r.data = e.data
	b = true
	return
}
复制代码
```

那么这里就需要理解什么是 `iface`

```
type iface struct {
	tab  *itab//table
	data unsafe.Pointer //值
}
复制代码
```

`tab` 又是什么？

>  tab的意思是table的意思，关于table的概念，大家可以去找找资料
>
>  具有方法的语言通常属于以下两种阵营之一：为所有方法调用静态地准备表（如在C ++和Java中），或在每次调用时进行方法查找（如在Smalltalk及其许多模仿程序中，包括JavaScript和Python）以及添加奇特的缓存以提高调用效率。Go位于两者的中间：它具有方法表，但在运行时对其进行计算。

```
type itab struct {
	inter *interfacetype// 接口类型,这里就是Stringer
	_type *_type// 值类型,	这里就是Binary
	hash  uint32 // copy of _type.hash. Used for type switches.
	_     [4]byte
	fun   [1]uintptr // variable sized. fun[0]==0 means _type does not implement inter.
}
复制代码
```

其实上面这段代码的流程如下：

data就是 eface.data

`tab`其实就是 : `inter` 指的是接口类型(也就是fmt.Stringer接口)，`type`是Binary类型，`fun[0]`是(Binary)String方法 ，其他几个先不用care

![image-20200619132703793](https://static.studygolang.com/200620/7560d94fd55ff8286bf552e69f43464b.png)

//4 `newValue.String()`到底做了啥，其实根据上面我们很容易知道，无法就是`newValue.tab.fun[0].(newValue.data)` ，所以就是这么简单。

## 总结

1、go的 interface{} 转换过程中至少做一次内存拷贝，所以传递指针是最好的选择。

```
type User struct {
	Name string
	Age  int
}

func main() {
  var empty interface{} = User{} //这里会拷贝一次，将user转换成interface{}，所以函数传递过程中也别直接使用结构体传递
}
复制代码
```

正确写法

```
func main() {
	var empty interface{} = &User{}
}
复制代码
```

2、有人会问到字符串传递是否内存拷贝，回答否，因为字符串底层是一个`byte[]` 数组，他的结构组成是

```
type StringHeader struct {
	Data uintptr //数据，是一个二进制数组
	Len  int// 长度
}
复制代码
```

所以64位计算机，字符串的长度是128位，占用16个字节

3、减少使用`interface{}` ，因为会有不必要的开销，其次Golang本身是一个强类型语言，静态语言，申明式是最好的方式。

4、`interface{}`是反射的核心，后期我会讲解反射