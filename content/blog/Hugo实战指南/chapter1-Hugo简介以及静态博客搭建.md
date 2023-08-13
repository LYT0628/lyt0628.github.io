---
title: chapter1 | Hugo简介以及静态博客搭建
date: "2023-08-01T00:00:00Z"
tags: [hugo]
categories: [hugo, web]
series: [Hugo实战指南]
---



### 导入

​		我们都上过互联网, 访问过不同的网页, 像是 淘宝, 京东 之类. 这些网站, 为了提供服务, 需要服务器在云端为它们提供支持, 执行业务, 最后将数据和HTML文档组合在一起返回给浏览器, 这就是最后显示在我们面前的网页. 与此不同的方式是将数据和HTML文档直接放到一起, 托管到第三方平台, 在请求时将数据渲染进页面, 形成了完整的网页, 这种方式被称为Jamstack.

​		Jamstack由于不需要服务器和数据库, 维护网页就变成相当简单了. Hugo是在这种理念指导下出现的一种静态网页生成器, 它可以以简单的方式生成网页, 给不懂编程的人有了拥有自己网页的可能性. 静态网页生成器有很多, 但是Hugo社区最活跃, 文档最详细, 国内使用者也不少, 我们选用Hugo作为搭建自己网站的方式再合适不过了.

​		如果你迫不及待想看一看最后的效果, 你可以先到我的Hugo 网站一睹为快: [摸鱼天尊| lyt0628 的博客](https://lyt0628.github.io/).

### 目录

1. 使用Hugo+Github搭建静态网页

2. 个性化网页配置

3. 发布和组织内容



### 一, 使用Hugo+Github搭建静态网页

#### 1.1 准备搭建工具

#### 1.2 下载Hugo并在本地运行

#### 1.3 将网站托管到云端

#### 1.4 访问网站



### 二, 个性化网页配置





### 三, 发布和组织内容

#### 3.1 标记语言介绍

#### 3.2 Markdown

#### 3.3 YAML



### 小结



















1. 指南适用条件

   - **本指南在Windows下仅在可以参考**, 其中使用到的Scoop是Windows下的包管理工具
   - 本**指南需要你可以稳定访问到 https://github.com** , 如果访问不到, 可以下载fastgithub(获取使用方式见文末), 或者自行使用魔法
   - **本指南没有任何编程门槛**, 只要将命令 copy到命令行中, 回车即可运行, 请确保按顺序, 完整地运行了每个命令
   - 本指南采用**先操作后教学的编写方法**, 将操作和讲解分离, 可以使得教程的门槛更低

   - 说明: 指南中有一些拓展内容, 提供一些额外的信息, 不感兴趣可以跳过

   

2. 编写本指南的原因

   关于Hugo等静态网站生成工具, 国内入门级的教程已经很多了, 但**高级配置还是很欠缺**, 在一些大佬的博客可以看到一些, 但是骚操作太多了, 我看不太懂. 本指南分为两个阶段, 

   1. 第一个阶段是**不需要编程基础也能完成的**部分, 力图将这部分内容讲到极限. 主要是一些**模板化的知识**, 只要按指南就一定可以完成.
   2. 第二个阶段是需要编程基础才能够完成的部分, 这部分内容**需要一些前端基础**. 主要是一些**高级个性化和主题开发的一些知识** , 我之前在百度上搜找不到优质的资源, 

   对于大佬, 可能想自己学习,不需要我这个教程, 所以**我把《Hugo in action》 这本书放到文末**, 我只有英文版的电子书, 自取.

3. 指南目录 | learning map
   - 

4. 拓展: Jamstack和Hugo介绍



## 一  环境准备

### 1. 下载Windows包管理工具: Scoop

> 如果Scoop下载出现问题无法解决, 可以到官网下载其他的依赖, 这部分内容见文末尾

- **右键桌面打开命令行, 依次执行**

  > 命令行:![cmd](https://gitee.com/lyt0628/blog-img/raw/master/Hugo-Course/cmd.png)

  ```cmd
  Set-ExecutionPolicy RemoteSigned -Scope CurrentUser 
  ```

  ```cmd
  irm get.scoop.sh | iex
  ```

  如果显示`Scoop install successfully`的字样表示下载成功

  - 注意: 如果下载失败, 一般是网络问题,请持续尝试直到成功, 注意 :

    - 确保你已经打开fastgithub, 并且运行时右上角上下行流量不为0

      ![fastgithub流量显示](https://gitee.com/lyt0628/blog-img/raw/master/Hugo-Course/fastgithub.png)

    - 在稳定的网络下重新执行上面的命令

  - 拓展:Scoop是Windows下的包管理工具, 你可以简单的认为它是一个通过命令行下载管理软件的工具. 更多信息关注scoop官网:[Scoop | Windows包管理工具](https://scoop.sh/)

- **使用Scoop下载依赖**

  ```cmd
  scoop install git go nodejs hugo-extended
  ```

  如果没有红色的报错, 并且**显示绿色的success的字样说明下载成功**

- **最后再确认一遍环境**

  执行命令:

  ```cmd
  hugo version
  ```

  如果**有 hugo版本信息出现,表示成功**,如下图

  ![hugo-version](https://gitee.com/lyt0628/blog-img/raw/master/Hugo-Course/hugo-version.png)

  - 同样的, 如果这里报错, 解决方式同上
  - 拓展:使用Hugo我们需要三个软件
    - git: 版本控制工具, 我们用它来下载Hugo需要的一些资源
    - nodejs和go: Hugo 需要在这两个语言的环境下运行
    - hugo本身: 一般**下载的是带 -extended 的拓展版本**

  

## 二 新建网站,设置主题

- 新建网站文件夹

​	在桌面右键打开命令行, 运行命令

```cmd
hugo new site blog --format YAML
```

​	发现桌面多出了一个叫做blog的文件夹, 这就是新建网站的工作区.

- 进入blog文件夹, 看到有一个themes文件夹, 进入themes文件夹
- 右键打开命令行,执行

```cmd
git clone https://github.com/hugoinaction/Eclectic.git
```

发现多了一个叫做Eclectic的主题文件夹

> 注意: **请保证Eclectic文件夹不为空, 也不是只有一个.git文件夹**. 如果出现这种情况, 请重新执行`git clone https://github.com/hugoinaction/Eclectic.git`命令, 如果无法下载成功请看文末:zip下载主题文件  

- 设置配置文件,

  回到blog文件夹中, 用记事本打开名为hugo.yml的文件, **用下面的文本覆盖hugo,yml内容**

  ```yaml
  baseURL: http://example.org/
  languageCode: en-us
  title: Acme Corporation
  theme: Eclectic
  Author:
      facebook: "heeps://facebook.com/example"
      twitter: "heeps://twitter.com/example"
      email: "contact@example.com"
      name: "Acme Corporation"
      location: NewYork
      phone: (999)999-999
      hours: "Mon-Fri: 9:00AM - 6:00PM, ET"
  
  menu:
      main:
          - identifier: about
            name: About
            url: /about
            weight: 100
          - identifier: contact
            name: Contact
            url: /contact
            weight: 200
  params:
      color: "#4f46e5"
      copyright: "XXXXXXX XXX:XXXXXX Acme Corporation"
      footer:
          - title: About
            content: >
              Acme Corporation XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
              XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx
              XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx				
          - title: Recent Blog Posts
            recents: blog
            recentCount: 7
          - title: Contact Us
            contact: true
  ```

  

  **本阶段完成, 下面开始运行网页了**

## 三 本地运行网站

- 在blog文件夹下, 右键打开命令行, 运行命令

  ```cmd
  hugo server 
  ```

  命令行显示应如下:

  ![](https://gitee.com/lyt0628/blog-img/raw/master/Hugo-Course/serve.png)

打开浏览器,



在最上方的url输入栏中输入

```url
localhost:1313
```

![url](https://gitee.com/lyt0628/blog-img/raw/master/Hugo-Course/url.png)

你将会看到下面显示的网页

![Hugo网页](https://gitee.com/lyt0628/blog-img/raw/master/Hugo-Course/page-init.png)



## 四 将网站发布到GitHubPage

- 添加github工作流

  - 在blog文件夹下新建名为 .github 的文件夹

  - 进入.github文件夹, 再新建名为workflows的文件夹

  - workflows文件夹中新建名为 hugo.yml 的文件

    将下面的文本复制到hugo.yml文件中

    > 确保你打开了后缀名查看, 如果不会请看文末: 打开后缀名查看

    ```yaml
    # Sample workflow for building and deploying a Hugo site to GitHub Pages
    name: Deploy Hugo site to Pages
    
    on:
      # Runs on pushes targeting the default branch
      push:
        branches:
          - master
    
      # Allows you to run this workflow manually from the Actions tab
      workflow_dispatch:
    
    # Sets permissions of the GITHUB_TOKEN to allow deployment to GitHub Pages
    permissions:
      contents: read
      pages: write
      id-token: write
    
    # Allow only one concurrent deployment, skipping runs queued between the run in-progress and latest queued.
    # However, do NOT cancel in-progress runs as we want to allow these production deployments to complete.
    concurrency:
      group: "pages"
      cancel-in-progress: false
    
    # Default to bash
    defaults:
      run:
        shell: bash
    
    jobs:
      # Build job
      build:
        runs-on: ubuntu-latest
        env:
          HUGO_VERSION: 0.115.4
        steps:
          - name: Install Hugo CLI
            run: |
              wget -O ${{ runner.temp }}/hugo.deb https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_linux-amd64.deb \
              && sudo dpkg -i ${{ runner.temp }}/hugo.deb          
          - name: Install Dart Sass
            run: sudo snap install dart-sass
          - name: Checkout
            uses: actions/checkout@v3
            with:
              submodules: recursive
              fetch-depth: 0
          - name: Setup Pages
            id: pages
            uses: actions/configure-pages@v3
          - name: Install Node.js dependencies
            run: "[[ -f package-lock.json || -f npm-shrinkwrap.json ]] && npm ci || true"
          - name: Build with Hugo
            env:
              # For maximum backward compatibility with Hugo modules
              HUGO_ENVIRONMENT: production
              HUGO_ENV: production
            run: |
              hugo \
                --gc \
                --minify \
                --baseURL "${{ steps.pages.outputs.base_url }}/"          
          - name: Upload artifact
            uses: actions/upload-pages-artifact@v1
            with:
              path: ./public
    
      # Deployment job
      deploy:
        environment:
          name: github-pages
          url: ${{ steps.deployment.outputs.page_url }}
        runs-on: ubuntu-latest
        needs: build
        steps:
          - name: Deploy to GitHub Pages
            id: deployment
            uses: actions/deploy-pages@v2
    ```

    >  后面不需要改动blog文件夹了, 我在这放一个参考用的blog文件夹: [blog.zip](.\blog.zip) 

- 上传到github仓库

> 这里认为你已经拥有了github的账号, 如果没有, 请看文末:创建github账号



---



- 附: fastgithub安装包

-  附: 直接下载的方式准备环境
-  附: zip下载Eclectic主题文件
-  附: 打开后缀名查看
-  附: 创建github账号

  

- PS: 本文参考《Hugo in action》, 可以在我的Gitee仓库中找到电子版: [摸鱼天尊 | yt0628 的 gitee仓库book-share](https://gitee.com/lyt0628/ebook-share), 如果对你有帮助的话务必给个star.