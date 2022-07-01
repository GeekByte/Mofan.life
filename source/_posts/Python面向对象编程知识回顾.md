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

### 限制实例绑定的属性: \__slots__

Python允许再运行过程中给实例绑定属性和方法，但是，有时需要限制实例绑定的属性，就需要用到\__slots__

```python
class Student(object):
    pass

# 给实例绑定属性
>>> s = Student()
>>> s.name = 'Michael' # 动态给实例绑定一个属性
>>> print(s.name)
Michael

# 实例绑定方法
>>> def set_age(self, age): # 定义一个函数作为实例方法
...     self.age = age
>>> from types import MethodType
>>> s.set_age = MethodType(set_age, s) # 给实例绑定一个方法
>>> s.set_age(25) # 调用实例方法
>>> s.age # 测试结果
25
```

限制实例绑定属性

```python
class Student(object):
    __slots__ = ('name', 'age') # 用tuple定义允许绑定的属性名称
    
>>> s = Student() # 创建新的实例
>>> s.name = 'Michael' # 绑定属性'name'
>>> s.age = 25 # 绑定属性'age'
>>> s.score = 99 # 绑定属性'score'
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
AttributeError: 'Student' object has no attribute 'score'
```

对于类之间的继承关系，`__slots_`只作用于类的第一级子类实例，对于子类的实例不起作用，如果需要限制子类实例绑定的属性，需要在子类中单独定义`__slots__`，子类实例限制绑定的属性为子类和父类限制绑定属性的`并集`。

### 把类方法当作类属性使用: @properly

通过实例直接对类的属性进行修改很方便但是没有参数检查，要想实现参数检查就需要在类中编写对属性进行操作的方法，但又出现一个问题，当实例操作属性时，通过调用方法的形式没有直接使用类属性的方法简洁，于是为了结合两者的优点，`@properly`装饰器出现了。

```python
class Student(object):

    @property # 直接加@property类似get方法
    def score(self):
        return self._score

    @score.setter # @property.setter类似set方法
    def score(self, value):
        if not isinstance(value, int):
            raise ValueError('score must be an integer!')
        if value < 0 or value > 100:
            raise ValueError('score must between 0 ~ 100!')
        self._score = value
        
# 实际使用
>>> s = Student()
>>> s.score = 60 # OK，实际转化为s.set_score(60)
>>> s.score # OK，实际转化为s.get_score()
60
>>> s.score = 9999 # 参数检查起作用了
Traceback (most recent call last):
  ...
ValueError: score must between 0 ~ 100!
```

**注意：**类属性名称不能和方法名称相同，因为调用实例属性时会被当作方法使用，调用方法时又被当作属性使用，造成无限递归，最终导致栈溢出报错`RecursionError`。

### 枚举类

```python
# 直接使用Enum类实现
from enum import Enum

# 枚举默认从1开始
Month = Enum('Month', ('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'))

for name, member in Month.__members__.items():
    print(name, '=>', member, ',', member.value)

# 打印结果
Jan => Month.Jan , 1
Feb => Month.Feb , 2
Mar => Month.Mar , 3
....


# 自定义枚举类，用于需要控制枚举起点、枚举类型等场景
from enum import Enum, unique

@unique # @unique装饰器可以帮助我们检查枚举中有没有重复值
class Weekday(Enum):
    Sun = 0 # Sun的value被设定为0
    Mon = 1
    Tue = 2
    Wed = 3
    Thu = 4
    Fri = 5
    Sat = 6

```

对于枚举类型的访问方式：

```python
>>> day1 = Weekday.Mon
>>> print(day1)
Weekday.Mon

>>> print(Weekday['Tue'])
Weekday.Tue

>>> print(Weekday.Tue.value)
2
>>> print(day1 == Weekday.Mon)
True

>>> print(Weekday(1))
Weekday.Mon
>>> print(day1 == Weekday(1))
True

>>> Weekday(7)
Traceback (most recent call last):
  ...
ValueError: 7 is not a valid Weekday
    
>>> for name, member in Weekday.__members__.items():
...     print(name, '=>', member)
...
Sun => Weekday.Sun
Mon => Weekday.Mon
Tue => Weekday.Tue
Wed => Weekday.Wed
Thu => Weekday.Thu
Fri => Weekday.Fri
Sat => Weekday.Sat
```

