---
title: "Java Note Vol1 Stream"
date: 2023-10-17T21:20:02+08:00
draft: true
---

## 13.1 Lambda表达式

Java 中可以使用匿名类的方式实现动态代码回调。

```java
class A{
    private B b;
	interface B{
        public void doSomething(String str);
    }
    public void add(B b){
        this.b = b;
    }
    public void run(){
        
        b.doSomething("666");
    }
}
```

我们向A中注册回调

```java
a = new A();
a.add(new B(){
    @Override
    public void doSomething(String str){
        System.out.println(str + ">>>>");
    }
})
```

我们可以使用Lambda表达式修改这个复杂的代码

```java
a = new A();
a.add((str) -> {System.out.println(str + ">>>>")});
```

像上面的 B接口， 只拥有一个方法的接口称之为**函数式接口** ，函数式接口的实现都可以用Lambda表达式简写。

Lambda表达式有不同的写法：

- 没有参数且没有返回值

  ```java
  () ->{System.out.println("Is is a String");}
  ```

- 单个参数没有返回值

  ```java
  str -> {System.out.println(str);}
  ```

- 返回值为简单表达式的结果

  ```java
  (x, y) -> { x+ y; }
  ```

- 提供类型

  ```java
  (long x, long y) -> { x+ y; }
  ```

  Java可以根据上下文自动推断出Lambda表达式参数的类型，一般情况下不需要手动添加。

Lambda表达式的参数不能修改，我们必须为它添加 final 修饰符，这充分体现了函数式的编程思想。



## 13.2 函数接口库

Java为我们提供了一组现成的函数接口。

| 接口              | 参数 | 返回值  | 说明                                                         |
| ----------------- | ---- | ------- | ------------------------------------------------------------ |
| Predicate<T>      | T    | boolean | 条件判断,比如：根据天气预报判断今天是晴天吗                  |
| Consumer<T>       | T    | void    | 传递一个值，不需要返回结果，比如: 输出一个字符串             |
| Function<T, R>    | T    | R       | 根据T进行一些操作，得到R并返回，比如：获取字符串的Base64编码 |
| Supplier<T>       | None | T       | 用于提供值，值的来源不需要调用者知道，比如工厂方法           |
| UnaryOperator<T>  | T    | T       | 进行不改变类型的操作，比如 逻辑非                            |
| BinaryOperator<T> | T,T  | T       | 封闭的二元操作，比如乘法                                     |





## 13.3 常用流操作

流是Java对于函数式编程的支持，我们看一下常用的流操作。

```java
userList.stream()
    	.filer(user -> user.age > 18)
    	.count();
```

上面这段代码统计了用户中成年的人数。流是惰性求值的，也就是说只要不使用，那么前面的操作都不会执行。像count()之类的使用操作会终结这个流操作，并进行前面的流操作。

Stream的静态方法 of  方法可以将一些可迭代对象转换成流, 

```java
Stream.of('a','b','c')
    	.collect(Collectors.toList());
```

collect是常见的终结操作，用于我们需要收集流的元素的时候，Collectors中实现了一些常见的收集操作，比如上面，我们将字符流收集为一个`List<char>`。

map方法用于对流元素的操作，比如我们将小写字符串转为大写

```java
Stream.of("a","b","v")
    .map(str - > str.toUpperCase())
    .collect(Collectors.toList());
```

filer 方法用于对流元素的过滤, 比如我们统计字符串 a 的个数，就是先过滤所有的a，在进行计数。

```java
Stream.of("a","b",,"a","c","b","c")
    .filer(str - > str.equals("a"))
    .count();
```

flatMap 方法用 Stream 替换值，然后将多个 Stream 连接成一个 Stream, 这尤其对元素为集合类型的迭代对象有效。

```java
Stream.of(Arrays.asList(1,2),Arrays.asList(3,4))
    	.flatMap(n - > n.stream())
    	.collect(Collectors.toList());
```

上面这段代码，用流来进行列表的拼接。

min，max方法用于筛选出可比较元素中的最值元素。

```java
userList.stream()
    .max(Comparator.comparing(user->user.getAge()))
    .get();
```

comparing方法返回一个根据基本类型进行比较的函数，这里用它实现对 int 的比较器。

reduce方法用于对一组值的二元操作迭代，并最终返回一个值。

```java
Stream.of(1,2,3)
    .reduce(0, (lv, rv)->{lv + rv;})
```

第一个参数表示这个二元操作的幺元值。





## 13.4 基本类型流

