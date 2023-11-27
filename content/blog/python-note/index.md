---
title: "Python笔记"
date: 2023-10-30T18:22:16+08:00
description: Python笔记
draft: false
---
## 并发

#### 多进程

```python
import _multiprocessing as mp

def say():
    print("hello")
def say(word):
    print("hello" + word)
  
if '__name__' == '__main__':
    p1 = mp.Process(target=say)
    p2 = mp.Process(target=say,"world")
  
    p1.start()
    p2.start()
```

**_multiprocessing** 是python用于处理进程的模块，核心是Process方法。其函数声明为：

```python
Process(name,target,*args,**kwargs);
```

name 是进程名，target是目标函数，args是列表参数，kwargs是字典参数，因此我们可以以列表或字典的方式传递任意参数。

`start`方法启动进程，默认情况下，主进程会等待子进程运行结束后再退出。我们设置**子进程守护主进程**可以取消该默认行为。

```python
cp.daemon(True);
```

在主进程中，我们可以使用下面方法强制结束进程：

```python
cp.terminate()
```

#### 多线程

```python
import threading

def say():
    print("hello")
  
  
if '__name__' == '__main__':
    ct = threading.Thread(target=say)

    ct.start()
```

参数方面线程和进程一致，这边不在赘述。

和进程一样，主线程默认等待子线程任务完成后退出，我们来看如何取消这个行为：

```python
# 方式一
ct = threading。Thread(target=say, daemon=True)

# 方式二
ct.setDaemon(True)
```

同样是设置**子线程守护主线程**。

#### 同步

##### 互斥锁

```python
# 拿到锁对象
mutex = threading.Lock()

# 申请锁
mutext.qcquire()

    # .... 读写操作

# 释放锁
mutext.relaease()
```

##### join同步

```python
ct1.start()

# 主进程等待子进程
pt.join()

ct2.start()
```

两个子进程同步执行

## 网络编程

### 服务端

```python
import socket

ss = socket.socket(socket.AF_INET, socket_STREAM)
ss.setsocketOpt(socket.SOL_socket,
               socket.RESUSEADDR)

ss.bind("localhost",8080)
ss.listen(128)
s, ip_port = ss.accept()

r = s.recv(1024)
print(r.decode("utf-8"))

s.send("hello".encode("utf-8"))

s.close()
ss.clode()
```

**socket.AF_INET** 表示协议族，这个指的是IPv4.

**socket_STREAM**, 基于流的socket， 指的是TCP连接

**socket.SOL_socket**， 指定配置的级别，这里指定socekt配置（不太懂）

**socket.RESUSEADDR**， 设置端口复用， 即一次socket完成后，立即可以使用该端口而不需等待。详见：游双《高性能服务器编程》。

recv的参数指的是读取的字节长度。

### 客户端

```python
import socket

s = socket.socket(socket.AF_INET,socket.___)
s.connet("localhost", 8080)
s.send("hello".encode("utf-8"))

r= s.recv(1024)
print( r.decode("utf-8") )

s.close()
```

## 闭包和装饰器

### 闭包

```python
def foo():
    var = "hello"
    def bar():
        print(nonlocal var)
    return bar
```

以上形式即为闭包，内部函数使用外层函数变量，形成局部作用于，这能使得var 这个函数中的变量不被自动回收。

nonlocal，声明使用外层函数的变量，而不是内层函数新定义的变量。

### 函数装饰器

一种特殊的闭包如下：

```python
def foo(fn):
    def bar(*args, **kwargs):
        fn(*args, **kwargs)
    return bar
```

- foo 接受一个callable参数，
- bar内部调用callable
- 返回内部函数

我们使用如下方法使用

```python
def say(word):
    print("hello" + word)

qux = foo(say)
qux()
```

这起到了类似代理的作用，python为这提供了一个语法糖。

```python

@foo
def say(word):
	print("hello" + word)

```

这就是函数装饰器，效果同上。

我们可以使用一种特殊的形式给foo传递参数

```python
def wrapper(*args, **kwargs)
    def foo(fn):
        print(*args, **kwargs)
        def bar(*args, **kwargs):
            fn(*args, **kwargs)
        return bar
    return foo
```

使用方式如下

```python
@foo("really")
def say(word):
	print("hello" + word)

```

这很合理，**( )** 表示立即执行，执行完wrapper后返回foo，与@就形成了我们之前使用的装饰器了。

### 类装饰器

```python
### 

class decorator(object):
	def __init__(self, fn):
        self._fn = fn
    def __call__(self,*args, **kwargs):
        r= fn()
    	return r
  
```

**callable** 对象可以作为装饰器使用， 这是理所当然的。

```python

class decorator(object):
	def __init__(self, *args, **kwargs):
        self._args = args
        self._kwargs = kwargs
    def __call__(self,fn)
    	def foo(*args, **kwargs):
            r =  fn(*args, **kwargs)
        	return r
        return foo
```

和函数装饰器的逻辑是一致的。

### 内置装饰器

```python
@property #将函数当做参数一样使用，一般作为setter使用

@属性名.setter # 在调用 foo = prop 时候被自动调用，其实就是setter方法
def set_prop(self, new_prop):
    self.prop = new_prop
```

这是两块很香的语法糖。

还可以这么写

```python
# self.__prop
prop = property(get_prop, set_prop)
```

## with语句和上下文管理器

我们经常这么使用with语句

```python
with open(file) as f:
    print( f.read())
```

它相当于

```python
try:
	f = open(file， “r”)
	print(f.read())
catch:
	f.close()
```

with open(file) as f 帮我们**管理了上下文**

open其实就是一个上下文管理器，我们使用上下文管理器封装一下open

```python
class File(object):
    def __init__(filename， mod):
        self._filename = filename
        self._mod = mod
    # 管理上文
    def __enter__():
        self._file = open(self._filename, self._mod)
    	return self._file
    def __exit__():
		self._file.close()
      
```

只要实现了 `__enter__` 和 `__exit__` 方法，这个类就成了上下文管理器，这其实是一种代理的语法糖。

## 生成器

逐个的生成数据，以减小内存压力

**推导式形式**

```python
g = ( i*2 for i in range(5) )
# 迭代器方式访问数据， 跳出请使用异常
print(next(g))

for d in g:
    print(d)
```

**函数形式**

```python
def linear(n,d):
    var = 1
    for i in range(n):
        yield var
        var = var +n
```

打印等差数列。`yield var` 表示暂时退出， 返回var ，在进入时从下一行代码继续执行。

效果等同于

```python
g = (i*d + 1 for i in range(n))
```

## 正则表达式
