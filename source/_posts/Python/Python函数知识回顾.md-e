---
title: Python函数知识回顾
categories:
  - 编程语言
  - Python
tags:
  - Python
date: 2021-05-14 00:49:02
---

### 常用内置函数

```python
# 求绝对值
abs(-1) #1
# 最大值与最小值
max(1, 2, 3) #3
min(1, 2, 3) #1

#类型转换
int('123')
int(13.14)
float('520.1314')
str(1.14)
bool(1) #True 注意True与False大小写
bool('') #False
```

### 函数定义

一个函数可以是空函数，使用`pass`占位符

函数内可以有参数检查`not isinstance()`

函数可以返回多个值

```python
def loss(a, b):
    if not isinstance(a, (int, float)):  # 参数类型检查
        print(a + "不是数字")
    else:
        print(b)
    if not isinstance(b, (int,)):  # 注意第二个参数是一个tuple，单个值要有,
        return  # 等价于 return None
    return a, a+b, b  # 返回多个值
```

### 函数参数

#### 位置参数

```python
power(x)
power(x, y)
```

#### 默认参数

```python
def power(x, y=1, z=2):
    pass

power(0)
power(0, y=2) # 与默认参数值不符，需要带上默认参数名
power(0, z=3, y=3) #传入顺序可以不同，但要指定参数名
```

**关于默认参数的坑:**

```python
def add_end(L=[]):
    L.append("END")
    return L

add_end() # [ "END" ]
add_end() # [ "END", "END" ]

# 原因：Python函数在定义的时候，默认参数L的值就被计算出来了，即[]，因为默认参数L也是一个变量，它指向对象[]，每次调用该函数，如果改变了L的内容，则下次调用时，默认参数的内容就变了，不再是函数定义时的[]了。

# 定义默认参数要牢记一点：默认参数必须指向不变对象！
# 正确的定义方式：
def add_end(L=None):
    if L is None:
        L = []
    L.append('END')
    return L
# 这样定义，无论调用多少次都没有问题.
```

#### 可变参数

可变参数允许你传入0个或任意个参数，这些可变参数在函数调用时自动组装为一个`tuple`。

函数定义时在参数前面加`*`

```python
def calc(*num):
    sum = 0
    for i in num:
        sum = sum + i * i
    return sum

# 调用
calc()
calc(0, 1, 2)

# 调用时传入一个list或者tuple, 只需要在待传入变量前加上*即可
nums = [0, 1, 2]
calc(*nums)
```

#### 关键字参数

而关键字参数允许你传入0个或任意个含参数名的参数，这些关键字参数在函数内部自动组装为一个`dict`。

函数定义时在参数前加`**`

```python
def person(name, age, **kw):
    print('name:', name, 'age:', age, 'other:', kw)
```

**调用**

```text
>>> person('Michael', 30)
name: Michael age: 30 other: {}
>>> person('Bob', 35, city='Beijing')
name: Bob age: 35 other: {'city': 'Beijing'}
>>> person('Adam', 45, gender='M', job='Engineer')
name: Adam age: 45 other: {'gender': 'M', 'job': 'Engineer'}    

直接传入一个dict变量，在变量前加**
extra = {'city': 'Beijing', 'job': 'Engineer'}
person('Jack', 24, **extra)
```

注意它们采用的是值传递，即**函数参数是传入变量的拷贝**。

#### 命名关键字参数

对于关键字参数，你可以传入任意多个`key-value`值，但有时候只想传入确定的`key`值，就需要命名关键字参数。

```python
def person(name, age, *, city, job):
    print(name, age, city, job)

# 如果函数定义中已经有了可变参数，后面的命名关键字参数不再需要*分隔符
def person(name, age, *args, city, job):
    print(name, age, args, city, job)
    
# 带缺省值的命名关键字参数
def person(name, age, *, city='Beijing', job):
    print(name, age, city, job)
```

#### 函数参数总结

在Python函数定义中，可以有多种参数类型，但是**参数定义的顺序必须是：必选参数、默认参数、可变参数、命名关键字参数和关键字参数。**因为在函数调用的时候，Python解释器自动按照参数位置和参数名把对应的参数传进去。

在实际使用中，不要同时使用太多的组合，否则函数接口的可理解性很差。

