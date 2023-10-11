---
title: 使用Spring-Data-JPA访问关系型数据库 
date: "2023-08-12T00:00:00Z"
tags: [spring]
categories: [java]
series: [Spring全家桶实战指南]
draft: false
---
## 文章概览

这篇文章以一个示例的方式向你演示如何使用Spring-JPA来访问数据库。

你将完成能够：

- 了解JPA，Hibernate，以及Spring-JPA
- 完成一个应用，它将在H2嵌入数据库中和MySQL中存储名为User的POJO。

## 阅读要求

- 大约30分钟的时间
- 你喜欢的IDE(推荐使用IDEA)
- Java17 或更高版本
- Java，[Spring]()，[Lombok](), [H2数据库]() 等基础知识

## Spring-JPA是什么

JPA（Java Persistence API）是一种操作数据库的标准，类似于JDBC是一种标准，而数据库提供的驱动则实现了这种JDBC标准。所有符合JPA标准的实现都可以用相同的方式。常见的JPA实现如[Hibernate ORM](https://hibernate.org/orm/), OpenJPA.

JPA主要有三部分组成：

- ORM(Object Relational Mapping): 即元数据映射，它能将PoJo对象映射到数据库表，以此代替SQL语句中的查询细节
- API：由框架实现的CRUD操作，由于 ORM 映射，JPA实现拥有足够的信息进行数据库操作，因而不需要我们手动编写SQL语句
- 查询语言：同样，由于 ORM 映射 对象元数据和表可以相互映射， 因此JPA实现可以提供一种面向对象的查询代替SQL语句，以此将应用程序与数据库解藕。

Spring不会重复造轮子，凭借Spring容器的强大功能，Spring可以轻易的集成诸如Hibernate这种优秀的JPA实现。Spring团队以 Spring-JPA 这个启动器，提供了JPA的功能，而启动器内部封装了JPA实现(如Hibernate)来提供JPA的功能。

## 初始化Spring项目

使用[网页Spring脚手架](https://spring.io)，或者IDEA内置的Spring脚手架，快速初始化SpringBoot项目。你可以在脚手架中直接勾选Spring-JPA，也可以初始化后在Maven依赖中添加：

```xml
<dependency>
 <groupId>org.springframework.boot</groupId>
 <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
```

刷新Maven，等待依赖下载完成。

## 定义POJO

```java
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
public class Customer {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;
    private String userName;
    private String userPassword;
}
```

@Entity: 注释当前类为JPA要持久化的POJO类

@Id： 映射当前属性为数据库主键

 @GeneratedValue(strategy= GenerationType.AUTO)：插入记录时使用自增策略。

## 简单CRUD操作

```java
//Spring启动类
 @Bean
    public CommandLineRunner demo(UserRepository userRepo){
        return  (args) ->{
            userRepo.save(new Customer(1L,"lisi", "123456"));
            userRepo.save(new Customer(2L,"wangwu", "abcdef"));
            userRepo.save(new Customer(3L,"zhangsan", "666666"));

            for (Customer user : userRepo.findAll()) {
                System.out.println(user);
            }
            System.out.println("========================");
            Optional<Customer> user = userRepo.findById(1L);
            System.out.println("The user whose id is 1 :::"+ user);

        };
    }
```

## 创建可执行的JAR文件

```shell
java -jar target/gs-accessing-data-jpa-0.1.0.jar
```

## 更进一步

### 默认映射的表名和列名

### 自定义数据库操作方法

### 使用 @NameQuery 进行查询

### 使用QueryName 进行查询

### 三种自定义查询方式总结

### 管理Domin对象

其他你可以使用的元数据注解

| 注释                                  | 标识处 | 作用                                                 | 例子 |
| ------------------------------------- | ------ | ---------------------------------------------------- | ---- |
| @Table()                              | 类     | 自定义数据表名称                                     |      |
| @OneToMany(cascade = CascadeType.ALL) | 属性   | 标识当前对象的记录与该属性表示的表记录为一对多的关系 |      |
| @ManyToMany()                         | 属性   | 标识当前对象的记录与该属性表示的表记录为多对多的关系 |      |

## Q&A

- Q: Spring-JPA不提供JPA实现，那Spring-JPA为什么具有JPA的功能呢？
- A: 正如前文提到的，Spring-JPA在内部集成了现有的JPA实现, 默认是Hibernate提供的JPA实现。你可以切换内部的JPA实现，例如我们使用EclipseLink来提供JPA实现,只需要将Spring-JPA的Maven依赖改为：

  ```xml
  <dependency>
       <groupId>org.springframework.boot</groupId>
       <artifactId>spring-boot-starter-data-jpa</artifactId>
       <exclusions>
           <exclusion>
               <groupId>org.hibernate</groupId>
               <artifactId>hibernate-core</artifactId>
           </exclusion>
       </exclusions>
  </dependency>
  <dependency>
       <groupId>org.eclipse.persistence</groupId>
       <artifactId>org.eclipse.persistence.jpa</artifactId>
       <version>2.7.6</version>
  </dependency>
  ```

  ---
- Q: 我在启动项目时遇到了这个错误：`org.hibernate.tool.schema.spi.CommandAcceptanceException: Error executing DDL "d`, 这是为什么呢？
- 这个错误表示Spring创建的DDL语句由语法错误，一般是因为你的类名与数据库的关键字冲突，例如user，order。请查阅你使用的数据库的文档，给POJO命名时避开这些关键字。

---

## 补充

### Spring数据库相关配置

### CRUDRepository接口到底干了什么

## 拓展阅读

- [Spring官方JPA指南](https://spring.io/guides/gs/accessing-data-jpa/)
- [Hibernate ORM](https://hibernate.org/orm/)
- [JPA_百度百科 (baidu.com)](https://baike.baidu.com/item/JPA/5660672)
- [ORM_百度百科 (baidu.com)](https://baike.baidu.com/item/ORM/3583252?fromModule=lemma_inlink)
- 

> 1. 用户目标：
>
> - 知晓如何使用Sring-JPA连接关系型数据库
> - 知晓关于JPA的知识
>
> 2. 用户画像
> 3. 初级Java程序员，想使用SpringBoot-JPA操作关系型数据库
> 4. 已经学习完Java，Maven，Spring-Context，SpringBoot的知识
> 5.
