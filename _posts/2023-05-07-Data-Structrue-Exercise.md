---

layout:     post
title:      Data Structrue Exercise
subtitle:    "\"Exercise After Class\""
date:       2023-05-07
author:     Rorschach
catalog: true
mathJax: true
tags:
    - DataStructrue 



---

# 数据结构Exercise



## 第一章 绪论



**1.简述数据结构的主要研究内容 , 并说明数据的逻辑结构和数据的存储结构之间的关系**

答：数据结构研究的是计算机所处理的数据元素之间的关系（逻辑结构与物理结构）以及操作实现的算法。

逻辑结构：与计算机无关，指数据元素之间的逻辑关系

存储结构：数据结构在计算机中的表示（物理映像），具体实现



**2.设有三个函数 f, g, h 分别为 :** 
$$
f(n) = 100n³+n²+100
$$
$$
g(n) = 25n³+5000+n²
$$

$$
h(n) = n^{1.5} +5000n\log_2n
$$

判断下列关系式是否成立
$$
1.\ f(n)=O(g(n))\\
2.\ g(n)=O(f(n))\\
3.\ h(n)=O(n^{1.5})\\
4.\ h(n)=O(n\log_2n)
$$
答：
$$
O(f(n))=O(g(n))=f(n)=g(n)=n^3\\
h(n)=O(n^{1.5})
$$
故1，2，3正确，4错误
$$
补充： O(1)<O(\log n)<O(n)<O(n\log n)<O(n^2)<O(n^3)<O(2^n)<O(n!)<O(n^n)
$$



**3.设 n 为正整数 , 求下列程序片断的时间复杂性**

```c++
i = 1; k = 0;
while ( i < n ) 
{
	k = k + 10*i; 
    i++;
}
//时间复杂度为O(n)
```

```c++
i = 1; j = 0;
while ( i + j <= n )
{
	if ( i > j ) j++;
	else i++;
}
//时间复杂度为O(n)
```

```c++
x = n;
// n > 1
while ( x >= ( y + 1 ) * ( y + 1 ) )
	y++;
//时间复杂度为O(√n)
```

```c++
x = 91; y = 100;
while ( y > 0 )
{
	if ( x > 100 )
    { 
   		x = x-10; 
        y--;
    }
	else x++;
}
//时间复杂度O(1) or 1101
```



## 第二章 线性表



**1.比较顺序存储结构和链式存储结构的优缺点**

**顺序存储结构**

优点：

1.无需为表中元素之间的逻辑关系而增加额外的存储空间；2.可快速的存取表中任意位置的元素

缺点：

1.插入与删除操作需要移动大量元素；2.当线性表比较大时，难以确定存储空间的容量；3.易造成存储空间的碎片化

**链式存储结构**

优点：

插入、删除运算方便

缺点：

1.占用额外的空间存储元素之间的关系；2.链表不是一种随机存储结构，无法随机存储元素



**2.说明 a contiguous list( 顺序表 ) and an 数组 的区别和联系**

顺序表是在计算机内存中以数组的形式保存的线性表，是从逻辑角度说的，除了头和尾，每个元素都只有一个前驱元素和一个后继元素

数组是从物理存储的角度来说的，是一个更大的概念



**3.在一非递减有序线性表中 , 插入一个值为 X 的数据元素 , 使得插入后的线性表仍为非递减序列 . 要求分别用顺序表和单链表写出相应的实现算法**

```c++
//顺序表实现
void InsertSeqList(SeqList L, ElemType x)
{
    if(L.length>=MaxSize)		//表已满无法插入
        return;
    if(L.length==0)				//表为空,直接加到表头
    {
        L.elem[0] = x;
        L.length++;
        return;
    }
    while(i<L.length && L.elem[i] <= x)	//从表头开始比较,获取应插入的位置
        i++;
    if(i>=L.length)				//元素插入表尾
        L.elem[i]=x;
    else
    {
        for(j=L.length;j>=i;j--)
            L.elem[j]=L.elem[j-1];		//第i个元素之后的所有元素依次后移
        L.elem[j]=x;			//插入元素x
        L.length++;
    }
}

```

```c++
//链表实现
void InsertSeqList(LinkedList L, ElemType x)
{
    p = (Node*)malloc(sizeof(Node));	//为插入元素分配空间
    p->data=x;
    p->next=NULL;
    if(L->next==NULL)			//链表为空
        L->next=p;
    else
    {
        q=L->next;
        while(q->data<=x && q->next)	//遍历找到插入的位置
            q=q->next;
        if(!q->next)			//插入表尾
            q->next=p;
        else					//将p插入q的后面
        {
            p->next = q->next;
            q->next = p;
        }
    }
}
```



**4.写一算法将不带头结点的单链表逆置 , 要求操作在原表上进行 . 假设该单链表由 head指针指向**

```c++
//不带头节点即第一个节点就是头节点
//思路：将单链表中的节点由前到后依次放到表头位置
Node *ReverseList(Node *head)		//输入链表头，返回逆置后的链表头
{
    if(head == NULL || head->next == NULL)	//链表为空或只有一个元素，返回自身
        return head;
    cur = head->next;				//将第一个节点独立出来
    head->next = NULL;
    while(cur)
    {
        nextNode = cur->next;		//nextNode为下一个要移动的节点
        cur->next = head;			
        head = cur;					//
        cur = nextNode;
    }
    return head;
}
```



**5.Josephu 问题 : 有 N(N >= 1) 个人围成一圈 , 从第 i(i <= N) 个人开始从 1 报数 , 数到 m(m >= 1) 时 ,此人出列 ; 下一人重新从 1 开始报数 , 再数到 m 时 , 又一人出列 , 直至所有人全部出列 .要求写一个算法实现按出列的先后次序得到一个新的序列 , 如 N=5, i =1, m=3 则新序列是 3 、 1 、 5 、 2 、 4.**

```c++
//最初的顺序存在数组a中 a = [1, 2, 3......, N]
//基本思路：构造循环链表，链表中实现查找和删除操作
void Josephu(int N, int i, int m)
{
    //建立不含头节点的循环链表
    head = p =(Node *)malloc(sizeof(Node));
    p->data = a[0];
    p->next = NULL;
    for(j=1;j<N;j++)		//先创建n个节点的单链表
    {
        new = (Node *)malloc(sizeof(Node));
        new->data = a[j];
        new->next = NULL;
        p->next = new;
        p = new;
    }
    p->next = head; 		//构成循环链表
    p = head;				//p指向循环链表的第一个元素节点
    if(i>1)
    {
        for(j=0;j<i-1;j++)	//将指针q指向第i个节点的前驱，p指向第i个节点
        {
            q = p;
            p = p->next;
        }
    }
    for(j=0;j<N-1;j++)		//N个节点中若只剩下一个节点时循环结束
    {
        count = 1;
        while(count<m)		//开始计数，找到第m个节点，p为将要出列的元素
        {
            count++;
            q=p;
            p=p->next;
        }
        printf(p->data);
        temp = p;			//循环链表中删除p
        p = p->next;
        q->next = p;
        free(tmp);
    }
    printf(p->data);		//只剩下最后一个元素，该元素出列
    free(p);
}
```





## 第三章 栈和队列

### 栈

**1.字符a, b, c, d依次通过一个栈, 按出栈的先后次序组成字符串, 至多可以组成多少个不同的字符串? 并分别写出它们**

卡特兰数
$$
C_n=\sum{C_{i-1}*C_{n-i}}=\frac{C^n_{2n}}{n+1}=\frac{(2n)!}{(n+1)!(n)!}\\
C_1=1\\
C_2=2\\
C_3=5\\
C_4=14\\
C_5=42
$$
一共14个

分别为

**dcba**

**cbad cbda cdba**

**bacd cadc bcad bcda bdca**

**abcd abdc acbd acdb adcb**



**2.若栈的数据元素存放在一维数组S[1..Max]中, 栈顶指示top的初值为0, 若top<Max, 写出将数据素x入栈的算法关键语句.**

```c++
top = top+1;
S[top]=x;
```



**3.画出计算表达式 (3+3)/2×5-6 时操作数栈和操作符栈的变化情况**

略



**4.利用栈的基本运算写出求解下列问题的算法(回文游戏): read one line of input and write it backward.**

```c++
//回文游戏，入栈+出栈
void ReverseRead()
{
    StackElem item;
    Stack stack;
    InitialStack(stack);		//初始化栈为空栈
    while((item = getchar()) != '\n')
    {
        Push(item, stack);
    }
    while(!StackEmpty(stack))
    {
        item = Pop(stack);
        putchar(item);
    }
    putchar('\n');
}
```



**5.Euclid’s algorithm: The greatest common divisor(GCD) of two positive integers is the largest integer that divides both of them. E.g.GCD(216,192)=24.**

1) **Write a recursive function GCD(x,y:integer): if y=0,then the GCD of x and y**
   **is x; otherwise the GCD of x and y is the same as the GCD of y and x%y.**
2) **Rewrite the function in iterative form.**

```c++
//欧几里得最大公约数算法
//递归算法
int GCD(int x, int y)
{
    if(y==0) returnx;
    else return GCD(y, x%y);
}
```

```C++
//迭代算法
int GCD(int x, int y)
{
    if(y==0) return x;
    while(y)
    {
        temp = x%y;
        x = y;
        y = temp;
    }
    return x;
}
```



### 队列

**1.Write the C function QueueSize( ) for a linked queue that returns the number of items in it.**

```C++
//返回链式队列中元素个数
int QueueSize(Queue *q)
{
    if(QueueEmpty(q)) return 0;
    p = q->front->next;		//p为队列第二个元素此时
    n=1;
    while(p != q->rear)
    {
        n++;
        p = p->next;
    }
    return n;
}
```



**2.数组Q[1..n]表示一个循环队列, 设f的值为队列中第一个元素的位置, r的值为队列中实际队尾的位置加1, 并假定队列中最多只有n-1个元素, 则计算队列中元素个数的公式是什么?**
$$
(r-f+n)\mod n
$$



**3.设栈 S = (1,2,3,4,5,6,7),其中7为栈顶元素.写出调用algo(&S)后栈的状态.**

```C++
void algo(Stack *S)
{ 	int i=0;
	Queue Q; 
	Stack T;
	InitialQueue(&Q);
 	InitialStack(&T);
	while (!StackEmpty(S))
    {
		if ( ( i = !i ) != 0 ) Push(&T, Pop(&S)); 
        else EnQueue(&Q, Pop(&S));
    }
	while (!QueueEmpty(Q)) Push(&S, DeQueue(&Q));
	while (!StackEmpty(T)) Push(&S, Pop(&T)); 
}
```

答案：(6, 4, 2, 1, 3, 5, 7)



**4.假设有一循环队列中只设rear和queuelen来分别指示队尾元素的位置和队列中实际元素的个数. 试给出判断此循环队列的队空、队满条件, 并写出相应的入队和出队算法.**

```C++
//循环队列的定义
typedef char QueueElem;
typedef struct queue{
    int queuelen;
    int rear;
    QueueElem elem[MaxQueue];
}Queue;

//队空的条件：q->queuelen == 0
//队满的条件：q->queuelen == MaxQueue
```

```c++
//入队
void EnQueue(QueueElem x, Queue *q)
{
    if(q->queuelen == MaxQueue)
        printf("队满，无法入队");
    else
    {
        q->queuelen++;
        q->rear = (q->rear+1)%MaxQueue;
        q->elem[q-rear]=x;
    }
}

//出队
QueueElem DeQueue(Queue *q)
{
    if(q->queuelen == 0)
        printf("队空，无法出队");
    else
    {
        q->queuelen--;
        f = (q->rear - q->queuelen + MaxQueue)%MaxQueue;	//获得队首元素
        return q->elem[f]
    }
}
```



## 第四章 字符串



**1.利用 C/C++ 中有关串操作的函数写一算法 : void StringDelete (char *s, int i, int m)删去串 s 中从位置 i 开始的连续 m 个字符 . 若 i >=strlen (s), 则没有字符被删除 ; 若i+m >= strlen (s), 则将 s 中从位置 i 开始直至末尾的字符均删去**

```c++
void StringDelete(char *s, int i, int m)
{
    char *p;
    if(i<0 || i>=strlen(s) || m=0)
        return;
    if(i+m >= strlen(s))
        s[i]='\0';		//删除从位置i开始直至末尾的所有字符
    else
    {
        p = &s[i+m]; 	//p是第i+m个字符开始的子字符串
        s[i] = '\0';
        strcat(s,p);	//拼接函数
    }
}
```



**2.若 S 和 T 是用结点大小为 1 的单链表存储的两个串 , 设计一个算法找出 S 中第一个不在 T中出现的字符**

```C++
//单链表的定义
typedef struct node{
    char ch;
    struct node *next;
}Node, *LinkedString;

int Found(char c, LinkedString str)		//判断字符c在串str中是否出现
{
    while(str && c != str->ch)
        str = str->next;
    if(str)
        return 1;
    else
        return 0;
}

char FirstNoneOccurrence(LinkedString S, LinkedString T)
{
    while(S)
    {
        if(Found(S->ch, T))
            S = S->next;
        else
            return S->ch;
    }
    return -1;			//S要么是空串要么S中所有字符都在T中出现
}
```



**3.说明在改进的模式匹配算法 (KMP)中 , next 数组的作用 ? 并求模式“ABCABDABEABCABDABF“的相应的 next[j].**

答：在模式匹配过程中，当模式串中的某个位置j上的字符和正文串某个位置i上的字符失配时，使用模式串当中的第next[j]个字符去和正文串这个失配的第i个字符继续进行下一趟的匹配

```c++
//KMP算法的本质是寻找字串的最长前后缀
//获取next数组算法
void getNext(const string& p, int next[])
{
    int len = (int)p.size();
    next[0] = -1;
    int k = -1;
    int j = 0;
    while(j < len-1)
    {
        if(k==-1 || p[j]=p[k])
        {
            ++j;
            ++k;
            next[j] = k;
        }
        else
        {
            k = next[k];
        }
    }
}
```

next[] = -1 0 0 0 1 2 0 1 2 0 1 2 3 4 5 6 7 8



**4.设正文 t=“ abcaabbabcabaacbacba ”, 模式 p=“ abcabaa ”.**

1) **计算模式 p 的 next 函数值**

2) **不写算法 , 只写出利用 KMP 算法进行模式匹配时每一趟的匹配过程**

答：

next[] = -1 0 0 0 1 2 1 1

| a    | b    | c    | a    | a    | b    | b    | a    | b    | c    | a    | b    | a    | a    | c    | b    | a    | c    | b    | a    |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| a    | b    | c    | a    | *b*  |      |      |      |      |      |      |      |      |      |      |      |      |      |      |      |
|      |      |      | a    | *b*  |      |      |      |      |      |      |      |      |      |      |      |      |      |      |      |
|      |      |      |      | a    | b    | *c*  |      |      |      |      |      |      |      |      |      |      |      |      |      |
|      |      |      |      |      |      | *a*  |      |      |      |      |      |      |      |      |      |      |      |      |      |
|      |      |      |      |      |      |      | a    | b    | c    | a    | b    | a    | a    |      |      |      |      |      |      |



## 第五章 数组和广义表

### 数组

**1.在一个大小为 n 的整型数组中 , 找出最大值最小值需要比较的次数是多少**

思路：

当n为奇数时，初始化第一个元素为Max和Min

当n为偶数时，将前两个元素较大者和较小者分别初始化为Max和Min

对于其余元素，成对的选择它们进行比较，较大者与Max比较，较小者与Min比较，比较后更新Max和Min的值

故每两个元素进行3次比较

当n为奇数，次数为 3(n-1)/2

当n为偶数，次数为 3n/2 - 2

```C++
//算法实现
struct pair {int Max, int Min};
struct pair getMinMax(int arr[], int n)
{
    struct pair maxmin;
    if(n%2 == 0)
    {
        if(arr[0] > arr[1])
        {
        	maxmin.Max = arr[0];
            maxmin.Min = arr[1];
        }
        else
        {
            maxmin.Max = arr[1];
            maxmin.Min = arr[0];
        }
        int i = 2;			//设置起始位置为2
    }
    else
    {
        maxmin.Max = arr[0];
        maxmin.Min = arr[0];
        int i = 1;
    }
    while(i<n-1)
    {
        if(arr[i]>arr[i+1])
        {
            if(arr[i]>maxmin.Max)
                maxmin.Max = arr[i];
            if(arr[i+1]<maxmin.Min)
                maxmin.Min = arr[i+1];
            i += 2;
        }
        else
        {
           	if(arr[i+1]>maxmin.Max)
                maxmin.Max = arr[i+1];
            if(arr[i]<maxmin.Min)
                maxmin.Min = arr[i];
            i += 2;
        }
    }
    return maxmin;
}
```





**2.编写如下在十字链表中查找元素的算法 : 若已知 i 、 j, 查找 a ij ; 或已知 x 的值 ,查找它在第几行列 . 若找不到 , 则给出相应的提示信息**

```c++
//已知i,j 查找aij
void Query_CrossLinked(CrossList *SM, int i, int j)
{
    p = SM->hm->down;		//p指向第一个行列表头节点
    k = 1;
    while(p!=SM->hm && k<i)	//p指向第i个行列表头节点
    {
        p = p->down;
        k++;
    }
    if(p == SM->hm)
    {
        printf("该行列处的数据元素不存在");
        exit();
    }
    q = p->right;			//q指向第i行的第一个非零元素节点
    while(q!=p && q->col<j)
        q = q->right;
    if(q->col == j)
        printf(q->data);
    else
        printf("该行列处的数据元素不存在");
}

//已知x，查找x的位置
//思路：从上至下，从左至右遍历
void Query_CrossLinked(CrossList *SM, ElemType x)
{
    found = 0;				//标识是否找到
    p = SM->hm->down;
    while(p!=SM->hm)
    {
        q = p->right;
        while(q!=p)
        {
            if(q->data==x)
            {
                printf(q->row,q->col);
                found = 1;
                q = p;
            }
            else
                q = q->right;
        }
    if(found)
     	p = SM->hm;
   	else
        p = p->down;
    }
	if(!found)
        printf("该元素不存在");
}
```



## 第六章 树和二叉树



**1.Give the order of visiting the vertices of each of the following binarytrees under (a)preorder (b)inorder (c) postorder traversal.**

![image-20230507160703602](https://raw.githubusercontent.com/Rorschachqaq/Rorschachqaq.github.io/master/img/202305072020165.png)



（1）先序：12345	中序：24534	后序：54321

（2）先序：12345	中序：13542	后序：54321

（3）先序：12357864	中序：17583624	后序：78563421

（4）先序：124735689	中序：472153869	后序：742589631



**2.Write a function void CopyTree (Tree *root, Tree *newroot) that will make a copy of a linked binary tree.**

```C++
//树的复制
//递归实现
BTNode *CopyTree(BTNode *root, BTNode *newroot)
{
    if(!root)
        newroot = NULL;
    else
    {
        newroot = (BTNode *)malloc(sizeof(BTNode));
        newroot->data = root->data;
        CopyTree(root->lchild, newroot->lchild);
        CopyTree(root->rchild, newroot->rchild);
    }
    return newroot;
}

```



**3.Write a function that will interchange all left and right subtrees in alinked binary tree.**

![image-20230507161826138](https://raw.githubusercontent.com/Rorschachqaq/Rorschachqaq.github.io/master/img/202305072021074.png)

```C++
//颠倒左右子树
void interchange(BTNode *root)
{
    p = root;
    if(p)
    {
        if(p->lchild || p->rchild)
        {
            Swap(p->lchild, p->rchild);
            interchange(p->lchild);
            interchange(p->rchild);
        }
    }
}
```





**4.Write a function to perform a double order traversal of a binary tree, meaning that at each node of the tree, the function first visits the node, then traverses its left subtree(in double order ), then visits the node again, then traverses its right subtree(in double order)**

二叉树的双序遍历

双序遍历是指对于二叉树的每一个结点来说,先访问这个结点,再按双序遍历它的左子树,然后再一次访问这个结点,接下来按双序遍历它的右子树

![image-20230507162402190](https://raw.githubusercontent.com/Rorschachqaq/Rorschachqaq.github.io/master/img/202305072021801.png)

双序遍历结果：E B C C B D A A G G D F F E 

```C++
//递归实现
void double_order(BTNode *root)
{
    p = root;
    if(p)
    {
        Visit(p->data);
        double_order(p->lchild);
        Visit(p->data);
        double_order(p->rchild);
    }
}
```



**5.Write a function that will return the width of a linked binary tree, that is, the maximum number of nodes on the same level.**

```C++
//求树的宽度
//先求某一深度的宽度
int getWidth(BTNode *root, int level)
{
    if(root == NULL) return 0;
    if(level == 1) return 1;
    else if(level>1)
        return getWidth(root->lchild, level-1)+getWidth(root->rchild, level-1);
}

//再求最大宽度
int getMaxWidth(BTNode *root)
{
    int maxWidth = 0;
    h = depth(root);
    for(int i=1; i<=h; i++)
    {
        if(width>maxWidth)
            maxWidth = width;
    }
    return maxWidth;
}
```



**6.Draw the threadedtree of the following binary tree in 1)preorder 2)inorder 3)postorder**

![image-20230507163502513](https://raw.githubusercontent.com/Rorschachqaq/Rorschachqaq.github.io/master/img/202305072021144.png)

![image-20230507163559461](https://raw.githubusercontent.com/Rorschachqaq/Rorschachqaq.github.io/master/img/202305072021166.png)





**7.Write a function to insert a new node on the right of one (pointer p points to it) in a inorder threaded binary tree.**

```C++
//写一算法插入新节点到中序线索二叉树
/*线索二叉树中插入一个元素时必须要调整相关的线索，比如，新节点作为叶子节点插入，必须使其左右线索分别指向中序前驱节点和中序后继节点；又比如，若新节点的父节点的左或右指针域在插入操作之前是一个线索，那么插入操作之后将是一个指向新节点的连接Link*/
//线索二叉树的存储表示

typedef enum PointerTag{Link, Thread}; 	//Link==0:指针;Thread==1:线索

typedef struct BiThrNode{
    TElemType data;
    struct BiThrNode *lchild, *rchild;
    PointerTag LTag, RTag;
}BiThrNode, *BiThrTree;

void InsertBiThrTree(BiThrNode *p, BiThrNode *newnode)
{
    newnode->Ltag = 1;			//处理新节点的两个左域
    newnode->lchild = p;		//新节点lchild域指向该节点的前驱
    newnode->RTag = p->RTag;	//处理新节点的两个右域
    newnode->rchild = p->rchild;//若p的右子树为空，则p的后继就是新节点的后继；
    							//若p的右子树不空，则该右孩子节点就是新节点的右孩子
    if(!(p->RTag))				//若p节点有右孩子节点，插入新节点要修改p节点后继的前驱节点
    {
        q = p->rchild;			//找p的后继节点，是p节点的右子树上的最左尾节点
        while(!(q->LTag))
            q = p->lchild;
        q->lchild = newnode;	//将新节点作为p节点的后继节点的前驱节点
    }
    p->rchild = newnode;		//修改p节点的两个右域
    p->RTag = 0;				//插入新节点，且p节点右指针一定指向新节点的Link
}

```







**8.设有下列二叉排序树 (binary search tree):**

略

结论：

在非空排序二叉树中删除节点不一定是叶子节点，但插入节点一定是叶子节点

同一组关键字可能构造出不同的排序二叉树，有序关键字形成的排序二叉树退化为表





**9.将算法 9.6 改成 recursive version.**

```C++
//算法9.6 二叉排序树插入元素的算法
//当二叉排序树T中不存在关键字等于e.key的数据元素时，插入e并返回TRUE,否则返回FALSE
Status InsertBST(BiTree &T, ElemType e)
{
    if(!Search(T, e.key, NULL, p))			//查找不成功
    {
        s = (BiTree)malloc(sizeof(BiTree));
        s->data = e;
        s->lchild = s->rchild = NULL;
        if(!p)								//树为空
            T = s;
        else if LT(e.key, p->data.key)
            p->lchild = s;					//被插入节点s为左孩子
        else 
            p->rchild = s;					//被插入节点s为右孩子
        return TRUE;   
    }
    else
        return FALSE;						//树中存在和关键字相同的节点，不再插入
}


//递归实现
BiTree *InsertBST(BiTree *root, ElemType e)
{
    if(!root)
    {
        root = newroot;
        root->lchild = root->rchild = NULL;
    }
    else
    {
        p = root;
        while(p)
        {
            q = p;
            if(LT(newnode->data,p->data))
                p = p->lchild;
            else
                p = p->rchild;
        }
        if(LT(newnode->data,p->data))
            q->lchild = newnode;
        else
            q->rchild = newnode;
    }
    return root;
}
```





**10.编写算法实现以下要求 : How many keys in a BST < target**

```C++
int NumCount(BTNode *root, KeyType targrt)
{
    if(root==NULL)
        return 0;
    if(root->data == target)
        return Size(root->lchild);		//根节点的值等于目标值，所有左子树都比目标值小
    else if(root->data > target)
        return NumCount(root->lchild);
    else
        return 1 + Size(root->lchild) + NumCount(root->rchild);
    		//当目标值大于根节点的值，则1个根节点+左子树上所有值节点+右子树符合要i求的节点
}
```





**11.假设通信电文使用的字符集为 {a, b, c, d, e, f}, 各字符在电文中出现的频率分别为{34, 5, 12, 23, 8, 18}, 利用构造 Huffman 树写出每个字符对应编码设 lchild<rchild).**

a:11	b:1010	c:100	d:01	e:1011	f:00



**12.已知某电文中共出现了 10 种不同的字母 A~J , 它们的出现频率分别是 8 、 5 、3、 2 、 7 、 23 、 9 、 11 、 2 、 30 , 现对这段电文用三进制 即码字由 0 、 1 、 2组成 ), 问电文编码的总长度是多少 并画出相应的示意图**

3叉哈夫曼树

需要增加额外的0概率的占位符,以确保每次都能将n个权重最小的节点放在一起

![image-20230507185314001](https://raw.githubusercontent.com/Rorschachqaq/Rorschachqaq.github.io/master/img/202305072021677.png)
$$
L = 4*(2+2) + 3*(3+5) + 2*(8+7+9+23+11) + 1*30 = 186
$$

