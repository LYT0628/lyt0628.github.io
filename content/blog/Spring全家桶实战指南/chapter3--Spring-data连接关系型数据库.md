---
title: chapter3 | Spring-data连接关系型数据库
date: "2023-08-12T00:00:00Z"
tags: [spring]
categories: [java]
series: [Spring全家桶实战指南]
draft: false
---

### 导入

Spring-dada为 我们提供了三种连接关系型数据库的方式, 分别是

- Spring-jdbcTemplate
- Spring-Data-jdbc
- Spring-Data-JPA

### Spring-jdbcTemplate

### 二, Spring-Data-jdbc

#### 2.1 编写DAO接口

​		data-jdbc比起jdbcTemplate为我们做的事情更多, 类似于MyBatis, 我们只需要定义好DAO层的接口即可, 相应地, data-jdbc会为我们完成具体的实现类

​		在使用之前, 照例, 我们先导入Maven依赖:

```xml
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jdbc</artifactId>
            <version>3.1.2</version>
        </dependency>
```

​		如上, 版本请换成你使用的Spring-boot版本

​		我们所需完成的工作只有定义接口而已, 如下

```java
public interface IngredientRepository extends CrudRepository<Ingredient, String> {
}
```

​		我们定义的接口需要基础CrudRepository这个接口, 尖括号左边填上你需要储存的数据, 右边填上数据表中主键的数据类型, 这里我们使用字符串.

​		CrudRepository是spring-data通用的接口, 它在其中为我们定义好很多数据库操作的实现. 所以, 即便不书写SQL语句, 我们也可以实现大部分的数据库操作

​		Ctrl+左键 点击CrudRepository接口, 跳转内部, 你会看到如下的几个API:

```java
public interface CrudRepository<T, ID> extends Repository<T, ID> {
    <S extends T> S save(S entity);//保存对象到数据库

    <S extends T> Iterable<S> saveAll(Iterable<S> entities);//批量保存对象到数据库

    Optional<T> findById(ID id);//根据Id查找对象

    boolean existsById(ID id);//根据Id判断对象是否存在

    Iterable<T> findAll();//查询所有记录

    Iterable<T> findAllById(Iterable<ID> ids);//根据Id查找记录

    long count();//查询数据表中记录的数量

    void deleteById(ID id);//根据Id删除记录

    void delete(T entity);//根据对象删除记录

    void deleteAllById(Iterable<? extends ID> ids);//根据Id批量删除记录
    
    void deleteAll(Iterable<? extends T> entities);//根据对象批量删除记录

    void deleteAll();//删库跑路
}

```

​		这些API我们可以直接使用, 记住目前为止我们所需要做的工作仅仅只有 定义一个继承CrudRepository的接口而已, 这个接口有两个泛型, 左边填上需要持久化的数据类型, 右边填上主键的数据类型.

#### 2.2 实体类注解进行数据表映射

​		仔细看这个实体类:

```java


@Table
@Data
@AllArgsConstructor
@NoArgsConstructor(access= AccessLevel.PRIVATE, force=true)
public class Ingredient implements Persistable<String> {
  @Id
  private  String id;

  private  String name;

  private  Type type;
  
  public enum Type {
    WRAP, PROTEIN, VEGGIES, CHEESE, SAUCE
  }
```

​		除了Lombok的注解外, 你可以看到多了两个注解 @Table 和 @Id, 就如同字面意思, @Table声明, 当前实体类将要被储存到数据库中, @Id则声明了 id 是 数据库表的主键





#### 2.3 构造器注入DAO对象

​		看如下代码:

```java
    private final IngredientRepository ingredientRepository;
    @Autowired
    public DesignTacoController(IngredientRepository ingredientRepository) {
        this.ingredientRepository = ingredientRepository;
    }
```

​		我们声明了一个DAO对象, 在上面我们让他继承了CrudRepository接口, 这表明Spring-Data会为我们生成实体类, 在这我们使用构造器注入, 使用语法如上: 将对象写进构造器参数, 添加@Autowired主键到构造器上即可.

​		你可能会疑惑为什么不用@Autowired注解变量进行注入呢? 如果你尝试这么做, 你会发现Spring给出了提醒: 不推荐域注入. 所以我们采用官方推荐的方式进行注入.

```java
var ingredients = ingredientRepository.findAll();
```

​		代码中, 我们就可以直接使用前面提到的API进行数据库操作了.





### Spring-Data-JPA

