---
title: 哈夫曼树(Huffman Tree)构建过程
categories:
  - 数据结构
tags:
  - 数据结构
date: 2021-09-22 17:56:39
---

**注意：哈夫曼树并不唯一，但带权路径长度一定是相同的。**

### 构建描述

对哈夫曼树的构造可以分一下几步，需要多做几个实验，才可以熟练的掌握。

假设有n个权值，则构造出的哈夫曼树有n个叶子结点。 n个权值分别设为 w1、w2、…、wn，则哈夫曼树的构造规则为：

(1) 将w1、w2、…，wn看成是有n 棵树的森林(每棵树仅有一个结点)；

(2) 在森林中选出两个根结点的权值最小的树合并，作为一棵新树的左、右子树，且新树的根结点权值为其左、右子树根结点权值之和；

(3)从森林中删除选取的两棵树，并将新树加入森林；

(4)重复(2)、(3)步，直到森林中只剩一棵树为止，该树即为所求得的哈夫曼树。

### 图文表述

（1）8个结点的权值大小如下：

![](https://www.cmdbyte.com/2021/20131121141853312)

（2）从19，21，2，3，6，7，10，32中选择两个权小结点。选中2，3。同时算出这两个结点的和5。

![](https://www.cmdbyte.com/2021/20131121141926625)

（3）从19，21，6，7，10，32，5中选出两个权小结点。选中5，6。同时计算出它们的和11。

![](https://www.cmdbyte.com/2021/20131121142020546)

（4）从19，21，7，10，32，11中选出两个权小结点。选中7，10。同时计算出它们的和17。
（BTW：这时选出的两个数字都不是已经构造好的二叉树里面的结点，所以要另外开一棵二叉树；或者说，如果两个数的和正好是下一步的两个最小数的其中的一个，那么这个树直接往上生长就可以了，如果这两个数的和比较大，不是下一步的两个最小数的其中一个，那么就并列生长。）

![](https://www.cmdbyte.com/2021/20131121142406359)

（5）从19，21，32，11，17中选出两个权小结点。选中11，17。同时计算出它们的和28。

![](https://www.cmdbyte.com/2021/20131121142711156)

（6）从19，21，32，28中选出两个权小结点。选中19，21。同时计算出它们的和40。另起一颗二叉树。

![](https://www.cmdbyte.com/2021/20131121142858562)

（7）从32，28， 40中选出两个权小结点。选中28，32。同时计算出它们的和60。

![](https://www.cmdbyte.com/2021/20131121143220250)

（8）从 40， 60中选出两个权小结点。选中40，60。同时计算出它们的和100。 好了，此时哈夫曼树已经构建好了。

![](https://www.cmdbyte.com/2021/20131121143025218)

### 代码

①、编写哈夫曼树中每个节点结构；

②、构造哈夫曼树的算法；

③、编写一个存放每个节点哈夫曼编码的类型；

④、编写哈夫曼树求对应的哈夫曼编码的算法；

⑤、编写主函数。

代码如下：

```cpp
#include<stdio.h>
#include<stdlib.h>
#include<malloc.h>
#include<iostream>
//①：
typedef struct {
	char data;
	float weight;
	int parent;
	int lchild;
	int rchild;
}
HTNode;
//②：
void CreateHT(HTNode ht[],int n) {
	int i,j,k,lnode,rnode;
	float min1,min2;
	for (i=0;i<2*n-1;i++)	  	
	      ht[i].parent=ht[i].lchild=ht[i].rchild=-1;
	for (i=n;i<2*n-1;i++) {
		min1=min2=32767;
		lnode=rnode=-1;
		for (k=0;k<=i-1;k++)
			  if (ht[k].parent==-1) {
			if (ht[k].weight<min1) {
				min2=min1;
				rnode=lnode;
				min1=ht[k].weight;
				lnode=k;
			} else if (ht[k].weight<min2) {
				min2=ht[k].weight;
				rnode=k;
			}
		}
		ht[lnode].parent=i;
		ht[rnode].parent=i;
		ht[i].weight=ht[lnode].weight+ht[rnode].weight;
		ht[i].lchild=lnode;
		ht[i].rchild=rnode;
	}
}
//③：
typedef struct {
	char cd[N];
	int start;
}
HCode;
//④：
void CreateHCode(HTNode ht[],HCode hcd[],int n) {
	int i,f,c;
	HCode hc;
	for (i=0;i<n;i++) {
		hc.start=n;
		c=i;
		f=ht[i].parent;
		while (f!=-1) {
			if (ht[f].lchild==c)	
				      hc.cd[hc.start--]='0'; else	  		
				      hc.cd[hc.start--]='1';
			c=f;
			f=ht[f].parent;
		}
		hc.start++;
		hcd[i]=hc;
	}
}
```



