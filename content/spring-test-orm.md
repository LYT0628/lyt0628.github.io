
## 文章概览

Spring提供一些便捷的工具，可以帮助我们进行SptingBoot项目中数据库相关工作的开发，提高我们的效率，包括H2嵌入式数据库，CommandLineRunner，SQL自动加载机制。


## 阅读要求

* 大约15分钟
* 你喜欢的IDE
* spring，spring-test, 连接池 等前置知识

## H2嵌入式数据库

H2 database 是一个Spring内置的数据库，无需我们管理，它会在SpringBoot启动时自动启动，能够使我们在测试时无需管理数据库，加快我们项目的开发速度。

要使用H2数据库，只需简单导入Maven依赖一颗。

```xml
<dependency>
    <groupId>com.h2database</groupId>
    <artifactId>h2</artifactId>
    <scope>runtime</scope>
</dependency>
```

编写Spring配置

```xml
# H2
spring:
  datasource:
    driver-class-name: org.h2.Driver
    url: jdbc:h2:mem:sbipdb
    username: root
    password: 123456
  h2:
    console:
      enabled: true
```


测试导入

```java
@Test
  void dataSource() throws SQLException {
      assert dataSource.getClass().getName()
              .equals("com.zaxxer.hikari.HikariDataSource");
      assert dataSource.getConnection().getMetaData().getDatabaseProductName()
              .equals("H2");
  }
```


## CommandLineRunner


## 自动SQL加载初始化数据库

Spring提供一种机制，能够使SQL文件在SpringBoot项目启动的时候自动执行一些SQL文件以达到初始化数据库的效果。我们所需要做的

## 更进一步

### 配置数据源


```xml
<dependency>
 <groupId>org.springframework.boot</groupId>
 <artifactId>spring-boot-starter-data-jpa</artifactId>
 <exclusions>
 <exclusion> 
 <groupId>com.zaxxer</groupId>

 <artifactId>HikariCP</artifactId>
 </exclusion>
 </exclusions> 
</dependency>
<dependency> 
 <groupId>org.apache.tomcat</groupId>
 <artifactId>tomcat-jdbc</artifactId>
</dependency> 
```

spring探测数据源的方式



## Q&A

[HikariCP](https://github.com/brettwooldridge/HikariCP)
