---
title: Python基础知识回顾
categories:
  - Lang
  - Python
tags:
  - Python
date: 2021-05-12 21:50:40
---

## 数据类型和变量

### 整数

* 对于很大的数比如`10000000`，为了方便阅读可以写成`100_00_00_0`，解释器仍可以原数值解析
* 整数运算永远精确，包括整数的除法运算

### 浮点数

* 科学计数法，eg：`1.234e10`, `1.234e-9`
* 浮点数在运算上会有四舍五入的误差

**注意：**

* Python中整数和浮点数没有大小限制，如果超过一定范围直接表示为`inf`(无穷大)
* 整数和浮点数的精确性问题是由于他们在计算机内部的存储方式不同造成的。

### 字符串

* 可以用`''`或者`""`表示

* 转义字符`\`

* 代码分行写

	```python
	print('''Hello,
	Mofan''')
	
	# 或者在分行语句前加上个r
	print(r'''Hello,
	Baitong''')
	```

#### 字符串编码

`Python3`默认使用`Unicode`编码

字符与整数的转化：`ord()`函数将字符转化成整数，`chr()`函数将整数转化成字符

`Python`对比特类型数据表示：在`b''`或`b""`，eg：`x = b'Mofan'`

使用`encode()`方法将`Unicode`表示的`str`转成`bytes`，反之用`decode()`，eg：

```pyton
'ABC'.endcode('ascii')
'ABC'.decode('ascii')

'ABC'.encode('utf-8')
'ABC'.decode('utf-8')

'ABC'.encode('gb2312)
'ABC'.decode('gb2312')
```

`len()`方法：计算`str`的字符数；计算`bytes`的字节数

一个`Python`文件开头通常有这两行，第一行在`Linux/OS X`中指定解释器(`Windows`系统会忽略)，第二行指定文本编码格式

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
```

### 布尔值

* `True` 与 `False`，注意大小写
* `not`运算 eg: ```not True == False```

### 空值

用`None`表示

### 变量命名规则

变量名必须是大小写英文、数字和`_`的组合，且不能用数字开头

### 格式化

有三种格式化方法；使用占位符；`format()`；`f-string`

```Python
# 占位符
'Hello, %s' % 'world'
'Hello, world'

# format():用{0},{1}这种顺序依次占位 
'Hello, {0}, 成绩提升了 {1:.1f}%'.format('小明', 17.125)
'Hello, 小明, 成绩提升了 17.1%'

# f-string：用{}包围变量名称
r = 2.5
s = 3.14 * r ** 2
print(f'The area of a circle with radius {r} is {s:.2f}')
The area of a circle with radius 2.5 is 19.62
```

### list

`list`是一种有序的集合，可以随时添加和删除其中的元素。

```Python
x = ['a', 'b', 'c']
len(x) # 3
x[0] # 'a'
x[-1] # 'c'
x.append('d') # x=['a', 'b', 'c', 'd']
x.insert(2, 'x') # x = ['a', 'b', 'x', 'c', 'd'],注意list从0开始
x.pop() # x=['a', 'b', 'x', 'c']
x.pop(2) # x=['a', 'b', 'c']

# 嵌套，可以理解为多维数组
p = ['x', 'y']
x.append(p) # x=['a', 'b', 'c', ['x', 'y']]
x[3][1] # 'x'
```

### tuple

元组，特性与`list`类似，但是初始化后不能改变，这里的不能改变指的是Tuple的内存指向不能变

```Python
t = (1, 2)
#单个元素定义 ','不能省略
t = (1,)
# Tuple中可以包含List，适用于对List的所有操作
t = (1, 2, [3, 4])
```

**注意：**`tuple`与`list`的声明区别，`()`与`[]`。

### dict



### set



## 条件判断

```Python
s = input("Plase input a number: ") # 注意input()读取的数据是str，不能直接和int比较
x = int(s)
if x > 2021:
    print("Mofan")
elif x < 2021:
    print("Baitong")
else:
    print("Hello, World!")
```

## 循环

```python
# for
a = [1, 2, 3]
for x in a:
    print(x)
    if x == 3:
        break
    elif x == 2:
        continue
    else:
        print("are you ok?")

# while
x = 1
while x < 10:
    x = x + 1
    if x > 5:
        break
```

