---
title: "RocketMQ 源码阅读笔记"
date: 2023-10-23T13:18:45+08:00
draft: false
---
## 一，架构理解





## 二，核心模块运行流程

### 2.1 NameServer 路由中心

核心流程：

1. **Broker** 每30 秒向 **名称服务器** 发送心跳， 提供自己的 **主题路由** 
2. **消费者和生产者** 每30 秒从名称服务器**拉取主题路由**
3. 名称服务器会**记录收到心跳的时间**。每10 秒扫描 **BrokerLiveInfo(Broker心跳信息)**， 将 120 秒未发送心跳的Broker剔除。



#### **2**.1.1 启动参数装配

#### 2.2.2 路由注册

核心类：

- NamesrvConfig ： 名称服务器的配置类
- NettyServerConfig ： Netty 的配置类
- CommandLine ： 命令行的封装类， 加载命令行配置
- Properties ： Java配置类， 加载properties配置文件
- MixALL : 工具类, 这里主要用到了`Mix.properties2Object` 方法



#### 2.2.3 路由剔除

#### 2.2.4 路由拉取(路由发现)





### 2.2 生产者和消息发送



### 2.3消息存储

### 2.4消息消费

### 2.5 ACL 权限控制

### 2.6 主从同步机制

### 2.7 消息轨道

### 2.8 主从切换

### 2.9 监控RocketMQ





## 三，实现细节

- 注册JVM钩子函数，优雅释放资源
- 先从JVM获取环境变量，如果未指定，则从主机获取环境变量

- MixALL.Properties2Object实现

  通过反射拿到所有**set方法**， set方法中取出属性名，尝试从properties中获取属性值，调用set 方法进行赋值 

  ```java
   public static void properties2Object(final Properties p, final Object object) {
          Method[] methods = object.getClass().getMethods();
          for (Method method : methods) {
              String mn = method.getName();
              if (mn.startsWith("set")) {
                  try {
                      String tmp = mn.substring(4);
                      String first = mn.substring(3, 4);
  
                      String key = first.toLowerCase() + tmp;
                      String property = p.getProperty(key);
                      if (property != null) {
                          Class<?>[] pt = method.getParameterTypes();
                          if (pt != null && pt.length > 0) {
                              String cn = pt[0].getSimpleName();
                              Object arg = null;
                              if (cn.equals("int") || cn.equals("Integer")) {
                                  arg = Integer.parseInt(property);
                              } else if (cn.equals("long") || cn.equals("Long")) {
                                  arg = Long.parseLong(property);
                              } else if (cn.equals("double") || cn.equals("Double")) {
                                  arg = Double.parseDouble(property);
                              } else if (cn.equals("boolean") || cn.equals("Boolean")) {
                                  arg = Boolean.parseBoolean(property);
                              } else if (cn.equals("float") || cn.equals("Float")) {
                                  arg = Float.parseFloat(property);
                              } else if (cn.equals("String")) {
                                  arg = property;
                              } else {
                                  continue;
                              }
                              method.invoke(object, arg);
                          }
                      }
                  } catch (Throwable ignored) {
                  }
              }
          }
      }
  ```

### CommandLine 实现

涉及到几个相关类：

- **CommandLineParser** ： 解析命令行到 CommandLine中。 **DefaultPaser**是这个接口的默认实现



- **Option** ：单个配置的封装类

```java
    private final String option; // option 的shortName
    private String longOption; // option 的 longName
    private String argName; 
    private String description;
    private boolean required; 
    private boolean optionalArg;
    private int argCount; 
    private Class<?> type;
    private List<String> values; // 被配置的属性值
    private char valuesep; 
```



- **Options**： 内部维护属性名到Option类的Map，属性名到OptionGroup的Map

Option类的 这三个属性保存该属性 可以接受的 和 要求的属性

```java
private final Map<String, Option> shortOpts = new LinkedHashMap();
private final Map<String, Option> longOpts = new LinkedHashMap();
private final List<Object> requiredOpts = new ArrayList();
```



- **OptionGroup**：内部维护属性名到Option类的Map

CommandLine 内部维护两个数据结构

```java
    private final List<String> args = new LinkedList();
    private final List<Option> options = new ArrayList();
```

options 表示 命令行所指定的配置，

NamesrvStartUp的工具方法向options注入 **-c 指定配置文件， -p 打印配置文件**的两个Option。

```java
    public static Options buildCommandlineOptions(final Options options) {
        # shortName, LongName, hasArgs, Description
        Option opt = new Option("c", "configFile", true, "Name server config properties file");
        opt.setRequired(false);
        options.addOption(opt);

        opt = new Option("p", "printConfigItem", false, "Print all config items");
        opt.setRequired(false);
        options.addOption(opt);
        return options;
    }
```

ServerUtil的工具方法向options注入 **-h 打印帮助文档， -n 指定名称服务器地址**的两个Option。

```java
    public static Options buildCommandlineOptions(final Options options) {
        Option opt = new Option("h", "help", false, "Print help");
        opt.setRequired(false);
        options.addOption(opt);

        opt =
            new Option("n", "namesrvAddr", true,
                "Name server address list, eg: '192.168.0.1:9876;192.168.0.2:9876'");
        opt.setRequired(false);
        options.addOption(opt);

        return options;
    }
```

DefaultParser 的parse方法， 将命令行配置注入options

```java
    public CommandLine parse(Options options, String[] arguments, Properties properties, boolean stopAtNonOption) throws ParseException {
        this.cmd = new CommandLine();
        // 遍历 参数列表
        if (arguments != null) {
            String[] var9 = arguments;
            int var10 = arguments.length;

            for(int var7 = 0; var7 < var10; ++var7) {
                String argument = var9[var7];
                // 处理参数
                this.handleToken(argument);
            }
        }
		
        // 后置的必要性检查
        this.checkRequiredArgs();
        this.handleProperties(properties);
        this.checkRequiredOptions();
        return this.cmd;
    }
```

对于每一参数的解析流程

```java
    private void handleToken(String token) throws ParseException {
        this.currentToken = token;
        // 这行if 用于解析属性值， 此前 需要参数的token被保存在 currentOption ，我们为他装配现在的参数值
         if (this.currentOption != null && this.currentOption.acceptsArg() && this.isArgument(token)) {
            this.currentOption.addValueForProcessing(this.stripLeadingAndTrailingQuotesDefaultOn(token));
        // 处理LongName参数
         } if (token.startsWith("--")) {
            this.handleLongOption(token);
        // 处理shortName 参数
        } else if (token.startsWith("-") && !"-".equals(token)) {
            this.handleShortAndLongOption(token);
        } else {
            this.handleUnknownToken(token);
        }

        if (this.currentOption != null && !this.currentOption.acceptsArg()) {
            this.currentOption = null;
        }
		// option.acceptsArg 方法，表示该配置是否需要参数， 不需要的话直接释放
    }
```

**addValueForProcessing** 封装了下面这个方法

```java
    private void processValue(String value) {
        // 如果命令的值拥有分隔符的话，留下最后一个值给末尾的add 添加
        if (this.hasValueSeparator()) {
            char sep = this.getValueSeparator();

            for(int index = value.indexOf(sep); index != -1 && this.values.size() != this.argCount - 1; index = value.indexOf(sep)) {
                this.add(value.substring(0, index));
                value = value.substring(index + 1);
            }
        }
		//加入 option 的 values
        this.add(value);
    }
```

处理LongName参数的代码, ps: 61的ASCII码为`=`

```java
    private void handleLongOption(String token) throws ParseException {
        if (token.indexOf(61) == -1) {
            this.handleLongOptionWithoutEqual(token);
        } else {
            this.handleLongOptionWithEqual(token);
        }
    }
```

如果没有等于号的话

```java
    private void handleLongOptionWithoutEqual(String token) throws ParseException {
        // 检查 解析的 options 是否拥有当前的token，命令行中只应该出现options中出现的配置
        List<String> matchingOpts = this.getMatchingLongOptions(token);
        if (matchingOpts.isEmpty()) {
            this.handleUnknownToken(this.currentToken);
        } else {
            // 保护性措施， 不用管
            if (matchingOpts.size() > 1 && !this.options.hasLongOption(token)) {
                throw new AmbiguousOptionException(token, matchingOpts);
            }
			// 
            String key = this.options.hasLongOption(token) ? token : (String)matchingOpts.get(0);
            this.handleOption(this.options.getOption(key));
        }

    }
```

















## 四，涉及的Java类库

-

## 五， RocketMQ最佳实践

 
