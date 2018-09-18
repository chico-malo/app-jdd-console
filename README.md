# jdd-webapp

#### 项目介绍
商户服务前端项目-聚兜兜

#### 架构说明
```
├── /cashier-app/     # app源码目录
├── /cashier-webapp/  # web源码目录
├── /common/          # app、web公用资源目录
├── /react-native/    # 平台配置
├── .editorconfig     # 统一代码风格
├── .gitattributes    # 设置git二进制文件
└── .gitignore        # git忽视文件
```



#### 快速开始

```
克隆项目文件:
git clone https://onegit.app/shangfudata/jdd/webapp.git

先进入common目录安装依赖：
cd common
yarn install

开发：
cd cashier-webapp
yarn install
yarn run dll
yarn start
打开 http://localhost:3000 #端口在tools/server.js 中port = 3000修改

```

