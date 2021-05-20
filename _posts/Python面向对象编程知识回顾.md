---
title: Python面向对象编程知识回顾
categories:
  - 编程语言
  - Python
tags:
  - Python
date: 2021-05-20 19:59:19
---

### 类与对象

#### 类的定义

```python
class Student(object): #object是被继承的类，类似Java，一切继承的起点
    def __init__(self, name, age):
        self.name = name
        self.__age = age # 似有变量
    def print_age(self):
        print('%d', self.age)
```

#### 对象的使用

和静态语言不同的是，运行时`Python`对象可以绑定任何数据

```python
a = Student('cui', 22)
b = Student('hu', 23)

a.phone = '123' #动态绑定数据
```

关于私有变量的访问问题：

```python
a.__age = 20 # 这种方式访问的不是原先的私有变量，而是新创建变量名为__age的公有变量
a._Student__age = 20 # 这是正确访问方法，但不要这么干，按规则办事
```

### 继承与多态

* 继承: 继承父类的所有方法，子类对象可以直接使用
* 多态: 子类可以根据需要修改父类方法，或者在其基础上拓展

### 读取对象信息

#### type()判断对象类型

```python
>>> type(123)
<class 'int'>
>>> type(None)
<type(None) 'NoneType'>
>>> type(abs)
<class 'builtin_function_or_method'>

# 比较
>>> type(123)==type(456)
True
>>> type(123)==int
True
>>> type('abc')==type('123')
True
>>> type('abc')==str
True
>>> type('abc')==type(123)
False

# 使用types模板中定义的常量
>>> type(fn)==types.FunctionType
True
>>> type(abs)==types.BuiltinFunctionType
True
>>> type(lambda x: x)==types.LambdaType
True
>>> type((x for x in range(10)))==types.GeneratorType
True
```

#### instance()判断对象类型

能用type()判断的都可以用instance()判断，instance()的优势点在与判断对象的继承关系上。

```python
# 有继承关系: object -> Animal -> Dog -> Husky
>>> a = Animal()
>>> d = Dog()
>>> h = Husky()

>>> isinstance(h, Husky)
True
>>> isinstance(h, Dog)
True
>>> isinstance(h, Animal)
True
>>> isinstance(d, Dog) and isinstance(d, Animal)
True
>>> isinstance(d, Husky)
False

# 判断对象是不是某类型中的一种
>>> isinstance([1, 2, 3], (list, tuple))
True
>>> isinstance((1, 2, 3), (list, tuple))
True
```

#### dir()获取对象的所有属性和方法

```python
>>> dir('ABC')
['__add__', '__class__',..., '__subclasshook__', 'capitalize', 'casefold',..., 'zfill']

>>> len('ABC') # len()封装了__len__()特殊方法
3
>>> 'ABC'.__len__() # 直接使用特殊方法
3

# 可以在对象中自定义特殊方法拿来用
>>> class MyDog(object):
...     def __len__(self):
...         return 100
...
>>> dog = MyDog()
>>> len(dog)
100
```

#### getattr()、setattr()、hasattr()

分别是获得属性(方法)、设置属性(方法)、有没有属性(方法)

```python
>>> hasattr(obj, 'x') # 有属性'x'吗？
True
>>> obj.x
9
>>> hasattr(obj, 'y') # 有属性'y'吗？
False
>>> setattr(obj, 'y', 19) # 设置一个属性'y'
>>> hasattr(obj, 'y') # 有属性'y'吗？
True
>>> getattr(obj, 'y') # 获取属性'y'
19
>>> obj.y # 获取属性'y'
19

# 如果试图获取不存在的属性，会抛出AttributeError的错误：
>>> getattr(obj, 'z') # 获取属性'z'
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
AttributeError: 'MyObject' object has no attribute 'z'

# 通过设置default参数避免
>>> getattr(obj, 'z', 404) # 获取属性'z'，如果不存在，返回默认值404
404

# 获得对象的方法，并赋给别的变量
>>> fn = getattr(obj, 'power') # 获取属性'power'并赋值到变量fn
>>> fn # fn指向obj.power
<bound method MyObject.power of <__main__.MyObject object at 0x10077a6a0>>
>>> fn() # 调用fn()与调用obj.power()是一样的
81
```

### 实例属性和类属性

实例属性和类属性相同时，会屏蔽类属性，使用`del`删除实例属性后，才能访问到类属性。

```python
>>> class Student(object):
...     name = 'Student'
...
>>> s = Student() # 创建实例s
>>> print(s.name) # 打印name属性，因为实例并没有name属性，所以会继续查找class的name属性
Student
>>> print(Student.name) # 打印类的name属性
Student
>>> s.name = 'Michael' # 给实例绑定name属性
>>> print(s.name) # 由于实例属性优先级比类属性高，因此，它会屏蔽掉类的name属性
Michael
>>> print(Student.name) # 但是类属性并未消失，用Student.name仍然可以访问
Student
>>> del s.name # 如果删除实例的name属性
>>> print(s.name) # 再次调用s.name，由于实例的name属性没有找到，类的name属性就显示出来了
Student
```

