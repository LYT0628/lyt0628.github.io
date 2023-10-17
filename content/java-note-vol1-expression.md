---
title: "ch3 语句"
date: 2023-10-17T20:58:04+08:00
draft: true
---
## 3.1 运算符

二元运算

```java
int a = 1  + 2
int b = 2;
int c = 1;
a = b - c; // 1


```

二元运算简写



位运算



自增自减







## 3.2 流程控制

if 语句用于条件分支

```java
int a = 0;
if(a > 2){
	a = 1;
}
```

上面语句由于 a<2， 值为false， 条件不满足， `a = 1 ；`语句不执行。

```java
int a = 0;
if(a > 2){
	a = 1;
}else{
    System.out.println(a)
}
```

输出 1 ， 条件不满足，默认执行else 语句

if-else 语句可以级联表示多个分支

```java
int a = 0;
if(a > 2){
	a = 1;
}else if(a >3){
    a = 2;
}
else{
    System.out.println(a)
}
```

这段代码还是输出 1 ，因为前面的if 条件都不满足

---



for 语句 用于循环。

```java
for(int a,)
```





while 语句



do-while 语句



## 3.3块级作用域

Java 不带； 的 ｛｝表示一个块，块有自己的作用于，块内部定义的变量无法被外部访问。

```java
{
 int a =0;
}
System.out.println(a); // 错误， 块内部定义的变量无法被外部访问
```

流程控制语句中的`{}`都表示一个块， 具有块级作用域。特别注意 for循环中的`()`也在块级作用域中。



