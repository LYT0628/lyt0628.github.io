---
title: chapter2 | thymeleaf 和 输入校验 
date: "2023-08-12T00:00:00Z"
tags: [spring]
categories: [java]
series: [Spring全家桶实战指南]
draft: false
---





### data-validation

#### 2.1导入依赖并注解校验规则

​		spring-Validation为我们提供了通过注解实现数据校验的方式,这显然比if-else更容易维护和方便

我们先导入spring-data-validation的Maven依赖:

```xml
       <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>
```

​		来到实体类:

```java

@Data
public class TacoOrder  implements Serializable {

  private static final long serialVersionUID = 1L;

  private Long id;


  //非空注解
  @NotBlank(message="Zip code is required")
  private String deliveryZip;

  //validation 预置的注解, 可以检验银行卡
  @CreditCardNumber(message="Not a valid credit card number")
  private String ccNumber;

  //使用 正则表达式
  @Pattern(regexp="^(0[1-9]|1[0-2])([\\/])([2-9][0-9])$",
           message="Must be formatted MM/YY")
  private String ccExpiration;

  //数字 长度为3
  @Digits(integer=3, fraction=0, message="Invalid CVV")
  private String ccCVV;
  private Date createdAt = new Date();

}
```

​		在上面, 我们看到了四种注解:

-  @NotBlank(message="Zip code is required")

  >声明变量不能为空, 并且给出一段错误信息

-   @Digits(integer=3, fraction=0, message="Invalid CVV")

  > 声明数字的长度应当为三, 给出一段错误信息

-   @Pattern(regexp="^(0[1-9]|1[0-2])([\\/])([2-9][0-9])$",message="Must be formatted MM/YY")

  > 声明使用正则表达式进行校验判断, 检验格式是否为 MM/YY

-   @CreditCardNumber(message="Not a valid credit card number")

  > 使用data-validation内置的注解, 这个例子为我们检验变量是否符合银行卡的格式

#### 2.2 参数注入时使用校验

```java
  @PostMapping
  public String processOrder(@Valid TacoOrder order, Errors errors,
                             SessionStatus sessionStatus) {
    if (errors.hasErrors()) {
      return "orderForm";
    }

    sessionStatus.setComplete();
    return "redirect:/";
  }
```

​		上面的代码有两个地方需要我们注意:

- @Valid TacoOrder order

  > 通过 @Valid 注解, 声明启用这个实体类中我们声明的校验规则

-  Errors errors

  > 这个自动注入的Errors 对象保存我们webapp发生的一些异常, 这里表示校验是否出现异常, 即校验没有通过

- errors.hasErrors()

  > 通过errors对象判断校验是否通过

