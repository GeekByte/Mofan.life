---
title: PostgreSQL数据类型varchar与text的区别
categories:
  - 数据库
  - PostgreSQL
tags:
  - PostgreSQL
date: 2021-04-15 23:01:39
---

有兴趣的可以读一下官方文档：[PostgreSQL: Documentation: 8.0: Character Types](https://www.postgresql.org/docs/8.0/datatype-character.html)

下面是它们各自的描述：

| 名字         | 描述             |
| :----------- | :--------------- |
| `varchar(n)` | 变长，有长度限制 |
| `char(n)`    | 定长，不足补空白 |
| `text`       | 变长，无长度限制 |

`char`没什么好说的，它是定长的，如果你指定了长度为10，实际存入字符长度为5，那么会用空格在后面补齐，但是在比较的时候，又会自动把空格去掉。

`text`与`varchar`，不会自动添加空格，但是它们中包含的空格会在比较时计算在内。

`text`与`varchar`二者是没有区别的，在引擎盖下它是全部`varlena`（[可变长度数组](http://www.varlena.com/varlena.php)）。

另外如果有兴趣，也可以查看Depesz的这篇文章：[CHAR(x) vs. VARCHAR(x) vs. VARCHAR vs. TEXT](https://www.depesz.com/2010/03/02/charx-vs-varcharx-vs-varchar-vs-text/)，这里对它们做了详细的测试，以显示所有4种数据类型的插入和选择的性能是相似的。它还详细介绍了在需要时限制长度的其他方法。基于函数的约束或域提供了即时增加长度约束的优点，并且基于减少字符串长度约束很少，depesz得出结论，其中一个通常是长度限制的最佳选择。

关于这次测试的几个注意点：

> - char（n） - 处理短于`n`（填充它们`n`）的值时占用太多空间，并且由于添加尾随空格可能导致细微错误，此外更改限制也有问题
> - varchar（n） - 更改实时环境中的限制是有问题的（在更改表时需要独占锁定）
> - varchar - 就像文本一样
> - **文本 - 对我来说是胜利者** - 超过（n）数据类型，因为它没有问题，而且超过varchar - 因为它有不同的名称

