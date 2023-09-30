---
title: ch4 Go模版语法
date: "2023-08-01T00:00:00Z"
tags: [hugo]
categories: [hugo, web]
series: [Hugo实战指南]
---




### 使用Hugo模板语法对页面进行个性化

​	我们都知道， hugo持有一些变量来为网站进行渲染。我们在配置文件中所做的一切，其实就是在为hugo的变量赋值。hugo的变量简单地如下分类：

- hugo定义的变量。这些变量所有网站都用户，做的是网站级别的配置，如网站标题等
- 主题所定义的变量。这些变量由主题定义和使用，我们在配置文件中，使用 params 来定义这部分变量。
- 页面级别的变量。也属于主题所定义的变量，不过它比较常用，所以我们单独列出来作为一个分类。它表示页面所定义和赋值的变量，在当前页面的 HTML 文档中使用，由当前页面的 index.md 的前页赋值。

我们接下来了解一下这些变量。

#### Hugo变量

hugo变量由hugo定义，记录了网站通用的或者hugo所需要的信息。常用的hugo变量如下表：

| 变量 | 说明                                                         |
| :--- | ------------------------------------------------------------ |
| $    | 这个变量表示当前的上下文，根据使用位置不同表示不同的对象。在html文档中使用，$ 表示当前页面。 |
| site | 这个变量表示整个网站，我们可以通过site变量拿到网站的一些信息和实体。如：site.Pages, 表示网站的所有页面。site.Taxonomies，表示网站所有Taxonomy页面。site.Params，拿到网址的主题变量。 |
| hugo | 表示hugo本身，我们可以通过这个变量得到或设置hugo的信息。如：hugo.IsProduction， 用于设置当前环境是否为产品环境。hugo.Version 则可以拿到当前 hugo 的版本 |

我们来看一些具体的场景。

{{< highlight html  "linenos=table,hl_lines=5-6 ,linenostart=1" >}}
<head>
 <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0" />
 <link rel="stylesheet" href="./index.css">
 <meta name="description" content="{{$.Description}} ">
 <title>{{$.Title}}</title>
</head>
{{</ highlight >}}

