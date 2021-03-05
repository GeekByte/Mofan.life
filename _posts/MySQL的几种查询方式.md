---
title: MySQL的几种查询方式
categories:
  - MySQL
tags:
  - MySQL
date: 2021-03-04 21:50:12
---

<details> 
    <summary>表结构</summary> 
	<pre>
	创建语句
	<code>
CREATE TABLE `students`
(
    `id`       INT(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '编码',
    `class_id` INT(11)      DEFAULT NULL COMMENT '班级编码',
    `name`     VARCHAR(128) DEFAULT NULL COMMENT '姓名',
    `gender`   VARCHAR(5)   DEFAULT NULL COMMENT '性别',
    `score`    INT(5)       DEFAULT NULL COMMENT '分数',
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 1
  DEFAULT CHARSET = utf8mb4 COMMENT = '学生';
INSERT INTO students (class_id, name, gender, score) VALUE
    (1, '小明', 'M', 90), (1, '小红', 'F', 95), (1, '小军', 'M', 88), (1, '小米', 'F', 73),
    (2, '小白', 'F', 81), (2, '小兵', 'M', 55), (2, '小林', 'M', 85),
    (3, '小新', 'F', 91), (3, '小王', 'M', 89), (3, '小丽', 'F', 85);CREATE TABLE `classes`
(
    `id`   INT(11) UNSIGNED NOT NULL COMMENT '编码',
    `name` VARCHAR(128) DEFAULT NULL COMMENT '班级',
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4 COMMENT '班级';
INSERT INTO classes (id, name)
VALUES (1, '一班'),
       (2, '二班'),
       (3, '三班'),
       (4, '四班');
	</code>
	</pre>

	<pre>
	students 表
	+----+----------+--------+--------+-------+
| id | class_id | name   | gender | score |
+----+----------+--------+--------+-------+
|  1 |        1 | 小明   | M      |    90 |
|  2 |        1 | 小红   | F      |    95 |
|  3 |        1 | 小军   | M      |    88 |
|  4 |        1 | 小米   | F      |    73 |
|  5 |        2 | 小白   | F      |    81 |
|  6 |        2 | 小兵   | M      |    55 |
|  7 |        2 | 小林   | M      |    85 |
|  8 |        3 | 小新   | F      |    91 |
|  9 |        3 | 小王   | M      |    89 |
| 10 |        3 | 小丽   | F      |    85 |
+----+----------+--------+--------+-------+
	</pre>
    <pre>
    classes 表
    +----+--------+
| id | name   |
+----+--------+
|  1 | 一班   |
|  2 | 二班   |
|  3 | 三班   |
|  4 | 四班   |
+----+--------+
    </pre>
</details>



