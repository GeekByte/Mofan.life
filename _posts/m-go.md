---
title: Go面试题
categories:
  - 面试
  - Go相关
tags:
  - 面试
  - Go
date: 2021-03-09 21:27:27
---

## Go是什么？

Go(又称Golang)是Google开发的一种静态强类型、编译型、并发型,并具有垃圾回收功能的编程语言。

## 使用Go编程有什么好处？（为什么要选择Go）

- 编译快
- 运行速度快
- 自带垃圾回收
- 天生支持并发
- 静态语言，但又兼顾动态语言的优点，语法简单
- **大部分情况下，编写一个服务，你只需要：实现、编译、部署、运行**。高效快捷，足够敏捷

## Go适合用来做什么

- 有较高性能要求的并发服务后端
- 分布式系统，数据库代理器等
- 网络编程，这一块目前应用最广，包括Web应用、API应用、下载应用、
- 内存数据库，前一段时间google开发的groupcache，couchbase的部分组建
- 云平台，目前国外很多云平台在采用Go开发，CloudFoundy的部分组建，前VMare的技术总监自己出来搞的apcera云平台。

## Go支持类型继承吗？

go不支持继承,只支持嵌入和聚合(匿名字段称为嵌入,具名字段称为聚合)。golang通过嵌入,可以到达类似继承的效果,而且更为简洁。

## Go支持运营商超载吗？



## Go支持方法重载吗？

不支持。原因是Go的设计者们设计的核心原则是：让Go保持足够的简单。

## Go支持指针算术吗？

不支持。但是提供了`unsafe`包来实现指针运算的功能。

## Go是一个区分大小写的语言吗？

是。

## Go中变量的静态类型声明是什么？

所谓的**静态类型**（即 static type），就是变量声明的时候的类型。

```text
var age int   // int 是静态类型
var name string  // string 也是静态类型
```

## Go中变量的动态类型声明是什么？

所谓的 **动态类型**（即 concrete type，也叫具体类型）是 程序运行时系统才能看见的类型。

```text
var i interface{}   

i = 18  
i = "Go编程时光" 
```

## 你能在Go中的单个声明中声明多种类型的变量吗？

```go
// 一次性声明多个不同类型的变量
var n4, name, n5 = 100, "tom", 888
```

## 如何在Go中打印变量的类型？

* 使用反射
* 使用格式输出 `%T`

```go
package main
import (
    "fmt"
    "reflect"
)
func main() {
    var num float64 = 3.14
 
    // 方法1：
    println(reflect.TypeOf(num).Name())
 
    // 和方法1一样，可是省略后面的Name()
    fmt.Println(reflect.TypeOf(num))
 
    // 方法2：
    fmt.Printf(`%T`, num)
}
```

## 什么是指针？

指针也就是内存地址，指针变量是用来存放内存地址的变量，不同类型的指针变量所占用的存储单元长度是相同的，而存放数据的变量因数据的类型不同，所占用的存储空间长度也不同。

## break语句的目的是什么？

用break语句可以使流程跳出switch语句体，也可以用break语句在循环结构终止本层循环体，从而提前结束本层循环。

## continue语句的目的是什么？

continue语句的作用是跳过本次循环体中余下尚未执行的语句，立即进行下一次的循环条件判定，可以理解为仅结束本次循环。

## goto语句的目的是什么？

goto语句可以使程序在没有任何条件的情况下跳转到指定的位置，所以goto语句又被称为是无条件跳转语句。

## 解释'for'循环的语法

```go
for init; condition; post { }

// 类似C的while
for condition { }

// 类似C的for(;;;)
for { }
```

- init： 一般为赋值表达式，给控制变量赋初值；
- condition： 关系表达式或逻辑表达式，循环控制条件；
- post： 一般为赋值表达式，给控制变量增量或减量。

## 解释在Go中创建函数的语法

```go
func function_name( [parameter list] ) [return_types] {
   函数体
}
```

## 你能从函数中返回多个值吗？

```go
// 返回多个值
func swap(x, y string) (string, string) {
   return y, x
}
```

## 您可以将参数传递给方法的方式有多少？

* 值传递：值传递是指在调用函数时将实际参数复制一份传递到函数中，这样在函数中如果对参数进行修改，将不会影响到实际参数。
* 引用传递：引用传递是指在调用函数时将实际参数的地址传递到函数中，那么在函数中对参数所进行的修改，将影响到实际参数。

## 将参数传递给函数的默认方式是什么？

值传递。

## Go中的函数作为值是什么意思？

函数定义后可作为另外一个函数的实参数传入。

```go
func main(){
   /* 声明函数变量 */
   getSquareRoot := func(x float64) float64 {
      return math.Sqrt(x)
   }

   /* 使用函数 */
   fmt.Println(getSquareRoot(9))

}
```

## Go中的方法是什么？

Go 语言中同时有函数和方法。**一个方法就是一个包含了接受者的函数**，接受者可以是命名类型或者结构体类型的一个值或者是一个指针。所有给定类型的方法属于该类型的方法集

## Go中变量的默认值



解释Printf（）函数的用途。

## 什么是左值和右值？

* 左值：通俗一点就是可以放在赋值号左边的叫左值 就是可以被赋值的。是一个地址

	左值一般是是一个变量可以被赋值的变量。（const变量是一个例外只能做右值）

* 右值：可以放在赋值号右边的 就是可以给其他变量赋值的，它可以是一个变量也可以是一个常量也可以是一个表达式。

实际和形式参数之间有什么区别？

变量声明和变量定义有什么区别？

解释模块化编程。

什么是令牌？

## 哪个关键字用于执行无条件分支？

goto关键字。

### Go中高效的洗牌算法

使用go自带的rand.Perm()函,将一个切片里的数据随机打散重排。

#### rand.Perm的实现算法

这是采用随机交换的算法，随着i从0到n循环，先生成随机数j := r.Intn(i +1)，然后交换m[i] = m[j]，m[j] = i，每次将数组里的随机位置与当前最大值（i）进行交换（原来的值放入最后）。这个时间复杂度是O(n)，是很快的算法。

```go
func Perm(nint) []int {return globalRand.Perm(n) }

func (r *Rand)Perm(nint) []int {
	m :=make([]int, n)
	for i :=0; i < n; i++ {
		m[i] = m[j]
		m[j] = i
	}
	return m
}
```



## Go中的零指针是什么？

空指针。当一个指针被定义后没有分配到任何变量时，它的值为 nil。

指针上的指针是什么？

Go的结构是什么？

如何在Go中定义一个结构？

Go中的切片是什么？

如何在Go中定义切片？

如何获取切片中存在的元素数？

### Go中slice的len（）和cap（）函数有什么区别？



如何获得切片的子切片？

### Go的范围(range)是什么？

Go中的range关键字用于for循环中迭代数组(array)、切片(slice)、通道(channel)、集合(map)的元素。



Go中的地图是什么？

如何在Go中创建地图？

如何从Go中删除地图中的条目？

什么是Go中的类型转换？

Go中的接口是什么？

Go程序能链接C/C++程序吗

### 为什么Go没有泛型

* 泛型困境使我们必须在开发效率、编译速度和运行速度三者中选择两个；
* 目前社区中的 Go 语言方案都是有缺陷的，而 Go 团队认为泛型的支持不够紧急；

### 为什么用CSP思想构建并发

因为Go的并发是基于goroutine的，goroutine的通信基于channel，并发意味着对资源的争夺，go采用的是用通信的方式共享内存，在并发设计上为channel为关注点，而不是通信的实体，所以，适合CSP。（CSP【Communicating Sequential Process，通信顺序模型】）

### 为什么没有goroutine ID

以前有获取goroutine id的函数，后来删除了，原因是担心人们使用goroutineid构建协程私有存储，这样很容易导致协程资源一直被占用，无法正常被gc回收。

### restful熟悉吗？都有哪些请求方法，分别代表什么意思？

* GET
* PUT
* POST
* DELET

手写循环队列

进程虚拟空间分布，全局变量放哪里？

c++ 和 go对比

怎么理解云计算

go使用踩过什么坑

go命令，go get，go tool，go test，go vet

go什么情况下会发生内存泄漏？

go为什么高并发好？

go的分布式

谈谈go的未来



## Go slice和array的区别



## GMP模型，该模型有什么好处



## string 从 "abc" 到 "abcd"，如何分配内存的



## 看过unsafe包吗



## 说一下string和[]byte的高效转换



## 协程和线程的区别



## GC流程

扫描-标记-清除

## Java和Golang有什么区别



## Go编译速度快的主要原因

* 使用了import的引用管理方式
* 没有模板的编译负担
* 1.5版本后的自举编译器优化
* 更少的关键字







## [基础语法](https://geektutu.com/post/qa-golang-1.html)

###  `=` 和 `:=` 的区别？

`=` 是赋值语句，可以定义全局变量；`:=`是声明类型（编译器帮你做的）并赋值，只能定义局部变量

 ### 指针的作用

* 提高执行效率：指针保存的是变量的地址，在传递变量时时引用传递，省去了值传递复制变量值的过程，提高了效率，特别是当变量体积比较大时，效率提升明显；

* 修改引用对象的值
* 方便判空操作：指针类型的零值是nil，其他类型的零值因类型不同，判空需要事先知道其类型，指针则不需要

* 判断值是否改变：当一个复杂类型的值被传递多次后，保存的名称和容器可能改变，但只要使用指针就行对比，就能知道是否是原来的值。

### Go 允许多个返回值吗？

可以。官方建议：最好命名返回值，因为不命名返回值，虽然使得代码更加简洁了，但是会造成生成的文档可读性差。

###  Go 有异常类型吗？

有，error，panic，recover

### 什么是协程（Goroutine）

Goroutines 是在 Golang 中执行并发任务的方式。它们仅存在于 Go 运行时的虚拟空间中而不存在于 OS 中，右 Go 调度器来管理它们的生命周期，Go Runtime为实现对go routine的调度需要维护一个GMP模型。

### 如何高效地拼接字符串

使用`bytes.Buffer`来组装字符串，不要用"+"，不需要遍历，只需要将添加的字符串放在缓存末尾即可

```go
package main

import (
    "bytes"
    "fmt"
)

func main() {
    var buffer bytes.Buffer
    for i := 0; i < 1000; i++ {
        buffer.WriteString("a")
    }
    fmt.Println(buffer.String())
}
```

### 什么是 rune 类型

int32的别名，几乎在所有方面等同于int32，它用来区分字符值和整数值。

> ```go
> package main
> 
> import (
>     "fmt"
>     "unicode/utf8"
> )
> 
> func main() {
> 
>     var str = "hello 你好"
> 
>     //golang中string底层是通过byte数组实现的，座椅直接求len 实际是在按字节长度计算  所以一个汉字占3个字节算了3个长度
>     fmt.Println("len(str):", len(str)) // len(str):12
>     
>     //以下两种都可以得到str的字符串长度
>     
>     //golang中的unicode/utf8包提供了用utf-8获取长度的方法
>     fmt.Println("RuneCountInString:", utf8.RuneCountInString(str)) // RuneCountInString: 8
> 
>     //通过rune类型处理unicode字符
>     fmt.Println("rune:", len([]rune(str))) // rune: 8
> }
> ```
>
> 
>
> golang中string底层是通过byte数组实现的。中文字符在unicode下占2个字节，在utf-8编码下占3个字节，而golang默认编码正好是utf-8。
>
> 
>
> golang中还有一个 byte 数据类型与 rune 相似，它们都是用来表示字符类型的变量类型。它们的不同在于：
>
> - byte 等同于int8，常用来处理ascii字符
> - rune 等同于int32,常用来处理unicode或utf-8字符

### 如何判断 map 中是否包含某个 key ?

在根据 key 取 map 中值的时候，会返回两个值，如果存在，第一个值为 value 值，第二个为 bool 值，为true；如果不存在，则返回一个值nil，第二个值 false，只需要判断第二个值的真假就能知道map知否含有某个key。 

### Go 支持默认参数或可选参数吗？

不支持，但支持可变参数

### defer 的执行顺序

按照后进先出的方式执行

### 如何交换 2 个变量的值？

* 借助多城赋值的特性
* 使用临时变量



### Go 语言 tag 的用处？

* 指导json.Marshal/Unmarshal
* 对struct字段进行验证

[Go tag](https://www.jianshu.com/p/c7d5c1c8a2d8)

[Go解析tag是用reflect实现](Golang解析标签主要通过反射实现)

### 如何判断 2 个字符串切片（slice) 是相等的？

* 牺牲性能：使用 reflect.DeepEqual(a,b)，他可以深度比较两个对象及其它们内部包含的元素是否相等，适用于任何类型的slice
* 牺牲普适性：手写判断规则，只适用于已知类型的slice

### 字符串打印时，`%v` 、`%+v`、`%#v` 的区别

\1. **%v   只输出所有的值**

\2. **%+v 先输出字段类型，再输出该字段的值**

\3. **%#v 先输出结构体名字值，再输出结构体（字段类型+字段的值）**

### Go 语言中如何表示枚举值(enums)？

Go 语言没有 `enum` 关键字，但可以通过使用 `const` & `iota` 可以实现枚举的能力。

### 为什么要使用枚举？

Stackoverflow 上有个问题 [What are enums and why are they useful?](https://link.zhihu.com/?target=https%3A//stackoverflow.com/questions/4709175/what-are-enums-and-why-are-they-useful) 中的回答很具备说服力。

> 当一个变量（尤其是一个方法的参数）仅能取自一个很小的选择集合中时，就应该使用枚举。例如类型常量（合同状态： "permanent", "temp", "apprentice"）或者标记（“执行中”、“延后执行”）等。
> 当使用枚举去替代整数时，运行时会去检查传入的参数是否是合法参数（是否在定义的枚举集合当中），避免错误的传入了一个不可用的常量。

###  空 struct{} 的用途

- 空结构体的特点
	- 不占用内存
	- 地址不变
- 空结构体作用
	- 建议用于传递信号的通道，因为不占用内存

[空结构体的作用](https://www.cnblogs.com/MyUniverse/p/11595043.html)

## [实现原理](https://geektutu.com/post/qa-golang-2.html)

### init() 函数是什么时候执行的？

`main`包下的init()函数是在main执行前执行，其他包的init函数实在包被import后执行，如果一个文件有多个init()函数，将按照声明顺序依次执行。

### Go 语言的局部变量分配在栈上还是堆上？

分两种情况，一种是局部变量生命周期随它的作用域生命周期相同，那么分配在栈上，如果该变量能够逃离它原先的作用域，那么会分配在栈上，这也是由Go的编译器在对局部变量进行逃逸分析后的分配结果。

### 2 个 interface 可以比较吗 ？

可以比较。分两种情况，一种都是nil可以比较，另外一种，动态类型和动态值相等。

###  2 个 nil 可能不相等吗？

可能。nil是无类型的，但是值为nil的变量是有类型的，它们在比较的时候会因为类型不同而导致不同。

### 简述 Go 语言GC(垃圾回收)的工作原理

在内存堆中存储着有一系列的对象，这些对象可能会与其他对象有关联（references between these objects） a tracing garbage collector 会在某一个时间点上停止原本正在运行的程序，之后它会扫描 runtim e已经知道的的 object 集合（already known set of objects），通常它们是存在于 stack 中的全局变量以及各种对象。gc 会对这些对象进行标记，将这些对象的状态标记为可达，从中找出所有的，从当前的这些对象可以达到其他地方的对象的 reference，并且将这些对象也标记为可达的对象，这个步骤被称为 mark phase，即**标记阶段**，这一步的主要目的是用于获取这些对象的状态信息。

一旦将所有的这些对象都扫描完，gc 就会获取到所有的无法 reach 的对象（状态为 unreachable 的对象），并且将它们回收，这一步称为 sweep phase，即是**清扫阶段**。

gc 仅仅搜集那些未被标记为可达（reachable）的对象。如果 gc 没有识别出一个 reference，最后有可能会将一个仍然在使用的对象给回收掉，就引起了程序运行错误。

可以看到主要的三个步骤：扫描，回收，清扫。

### 函数返回局部变量的指针是否安全？

安全，因为GC会捕获这个变量，等他生命周期结束清除掉。

### 非接口非接口的任意类型 T() 都能够调用 `*T` 的方法吗？反过来呢？

## [并发编程](https://geektutu.com/post/qa-golang-3.html)

### 无缓冲的 channel 和有缓冲的 channel 的区别？

它们的区别就是一个是同步的，一个是非同步的。无缓冲的channle发送者必须等接受者接收完毕才能继续发送，否则就一直等待，这在一定程度上可以确保发送的数据一定能被接受者接收。无缓冲的发送者只管发送，不需要考虑接受者是否收到了，只有到缓冲区满了，才会阻塞。

### 什么是协程泄露(Goroutine Leak)？

“goroutine leak,是go协程泄漏,什么是go协程泄漏,通俗来说,开启了一个goroutine,用完后,我们要正确让其结束。如果它没用了,还没结束,那就是goroutine leak。”

### 协程泄漏产生原因

- goroutine由于channel的读/写端退出而一直阻塞，导致goroutine一直占用资源，而无法退出
- goroutine进入死循环中，导致资源一直无法释放

 ### Go 可以限制运行时操作系统线程的数量吗？

GOMAXPROCS变量限制