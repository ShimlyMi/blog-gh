/*
 Navicat Premium Data Transfer

 Source Server         : 本地数据库
 Source Server Type    : MySQL
 Source Server Version : 80029
 Source Host           : localhost:3306
 Source Schema         : mina

 Target Server Type    : MySQL
 Target Server Version : 80029
 File Encoding         : 65001

 Date: 08/08/2024 18:20:32
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for mi_album
-- ----------------------------
DROP TABLE IF EXISTS `mi_album`;
CREATE TABLE `mi_album`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `album_name` varchar(26) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '相册名称',
  `album_cover` varchar(555) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '相册封面',
  `description` varchar(55) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '相册描述信息',
  `createAt` datetime(0) NULL DEFAULT NULL,
  `updateAt` datetime(0) NULL DEFAULT NULL,
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  `deletedAt` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mi_album
-- ----------------------------
INSERT INTO `mi_album` VALUES (1, '测试相册', 'http://127.0.0.1:8888/ac1a6e61b9373c26e5f1cf700', '测试相册上传以及图片上传和回收站的情况', NULL, NULL, '2024-03-19 07:23:49', '2024-03-19 07:23:49', NULL);
INSERT INTO `mi_album` VALUES (2, '测试相册2', 'http://127.0.0.1:8888/2a009a474d38ba09d252e1d00', '测试多个相册的排列', NULL, NULL, '2024-03-20 02:28:03', '2024-03-20 02:28:03', NULL);
INSERT INTO `mi_album` VALUES (3, '测试相册3', 'http://127.0.0.1:8888/f56d6e7a0657cee8354612701', '前端上传图片失败，报500，再次测试添加图片', NULL, NULL, '2024-04-15 09:20:03', '2024-04-15 09:20:03', NULL);

-- ----------------------------
-- Table structure for mi_article
-- ----------------------------
DROP TABLE IF EXISTS `mi_article`;
CREATE TABLE `mi_article`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `article_title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '文章标题 不能为空',
  `author_id` int(0) NOT NULL DEFAULT 1 COMMENT '文章作者 不能为空',
  `category_id` int(0) NOT NULL COMMENT '分类ID 不能为空',
  `article_description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '文章描述 不能为空',
  `article_content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '文章内容',
  `article_cover` varchar(1234) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT 'http://localhost:8888/b4e81e8116e5aaf762af3e101.jpg' COMMENT '文章缩略图',
  `is_top` int(0) NULL DEFAULT 2 COMMENT '文章置顶 1 置顶 2 取消置顶',
  `status` int(0) NULL DEFAULT 1 COMMENT '文章状态 1 公开 2 私密 3 草稿箱',
  `article_types` int(0) NULL DEFAULT 1 COMMENT '文章类型 1 原创 2 转载 ',
  `origin_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '原文链接 是转载或翻译的情况下提供',
  `view_times` int(0) NULL DEFAULT 0 COMMENT '文章访问次数',
  `thumbs_up_times` int(0) NULL DEFAULT 0 COMMENT '文章点赞次数',
  `reading_duration` double NULL DEFAULT 0 COMMENT '文章阅读时长',
  `createdAt` datetime(0) NULL DEFAULT NULL,
  `updatedAt` datetime(0) NULL DEFAULT NULL,
  `deletedAt` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mi_article
-- ----------------------------
INSERT INTO `mi_article` VALUES (1, '博客的第一篇文章', 2, 1, '博客首发文章', '## 终于实现了属于自己的博客网站\n![](http://127.0.0.1:8888/7af2f9f985af304240c492d00)\n其实，一直都想做一个自己的博客网站，以前读书的时候很天真的以为博客很简单，当开始写的时候却毫无头绪，无从下手，写了几个html的页面，却不知道怎么让大家看到，不知道做一个博客网站需要具备拿一些知识，以致于后面就闲置了。后来工作了，学到的东西更多了，我又对博客跃跃欲试，开始尝试着去搭建。事实上这个博客呢，其实也参考了其他很多大佬们的网站，看了他们布局和页面的一些功能，再加上自己的想法就成了现在这个样子了。当然，这个博客还有很多的不足，还有待改进，但是能做出来，我认为我已经很棒啦~\n## 说说自己的心得\n我认为，首先自己得对要搭建的博客有一个规划，有大概的一个草图，大概需要用到的基础框架和语言，有了基础的想法，就可以开干了。\n我是先写了后端，在此我得说一句，我是一个前端工程师，在做博客之前没有关于后端的任何知识，所以我在写后端的时候会遇到很多的困难，我的后端不是用**JAVA**语言写的，有人告诉我可以用**KOA**写，于是我就去找了教程，补了有关KOA的知识，随后就开始着手写后端了。后端完成了一些基础功能，就开始写后台了，后台写完了一些基础的功能之后，就开始重点写博客了。\n关于博客的设计，我一开始没什么想法的，不知道应该怎么去做这个博客，最后选择了较为简单的布局，选择了糖果色系，总体下来还算满意吧。当然，博客的功能还会更新，布局也可能会更改或者添加一些东西，我会继续努力的，坚持这一片属于自己的天地。', 'http://127.0.0.1:8888/7af2f9f985af304240c492d01', 2, 1, 1, NULL, 3, 0, 0, '2024-08-05 00:00:00', '2024-08-08 03:25:55', NULL);
INSERT INTO `mi_article` VALUES (2, '简单记录一下后端搭建过程', 2, 1, '记录一下博客后端搭建的过程', '## 一、项目初始化\n#### 1. 初始化 package.json 文件\n```\n// 生成一个 package.json 文件\nnpm init -y \n```\n#### 2. 创建 .git 文件\n```\n// 注意，若本来就有 .git 文件的话，要先删掉，再创建\ngit init\n```\n#### 3. 创建 README.md 文件\n具体可以去百度查找一下 命令怎么创建，由于我的电脑系统是windows的，我是用的 Git Bash Here 创建的\n```\ntouch README.md\n```\n## 二、 项目搭建\n#### 1. 安装 koa\n```\nnpm install koa\n```\n#### 2. 编写最基本的app\n创建 `src/main.js` 文件\n```js\nconst Koa = require(\'koa\');\n\nconst app = new Koa();\n\napp.use((ctx, next) => {\n    ctx.body = \'hello api\';\n})\n\napp.listen(3300, () => {\n    console.log(\'server is running on http://localhost:3300\');\n    // 3300 是端口号，端口号不要有冲突就行\n})\n```\n#### 3. 自动重启服务\n```\nnpm i nodemon -D\n```\n编写  `package.json` 脚本\n\n```json\n\"scripts\": {\n	\"dev\": \"nodemon ./src/main.js\",\n	\"test\": \"echo \\\"Error: no test specified\\\" && exit 1\"\n},\n```\n在终端执行\n```\n nodemon ./src/main.js\n```\n#### 4. 读取配置文件\n安装 `dotenv`，读取根目录中的 `.env` 文件\n\n```\nnpm i dotenv -S\n```\n\n创建 `.env` 文件\n\n```\nAPP_PORT=8000\n```\n\n创建 `config/config.default.js`\n\n```js\nconst dotenv = require(\"dotenv\");\n\ndotenv.config()\n\n// console.log(process.env.APP_PORT)\n\nmodule.exports = process.env\n```\n\n在 `main.js` 上去调用\n\n```js\nconst { APP_PORT } = require(\"./config/config.default\")\n// 导入 app\nconst app = require(\"./app\")\n\napp.listen(APP_PORT, () => {\n    console.log(`server is running on http://localhost:${APP_PORT}`);\n})\n```\n## 三、添加路由\n路由就是根据不同的URL，调用不同的处理函数\n#### 1. 安装 koa-router\n```\nnpm i koa-router\n\n// 步骤：\n// 1. 导入包\n// 2. 实例化对象\n// 3. 编写路由\n// 4. 注册中间件\n```\n#### 2. 编写路由\n创建 `src/route`  目录，编写 `user.route.js`\n```js\nconst Router = require(\'koa-router\')\n// 编写一个前缀 用于区分\nconst router = new Router({ prefix: \'/users\' })\n\n// GET /users/\nrouter.get(\"/\", (ctx, next) => {\n    ctx.body = \'Users\'\n})\n// 向外 暴露 路由接口\nmodule.exports = router;\n```\n#### 3. 路由自动加载\n创建路由文件 `src/router/index.js`\n```javascript\nconst fs = require(\'fs\');\n\nconst Router = require(\'koa-router\');\nconst router = new Router();\n\nfs.readdirSync(__dirname).forEach(file => {\n    // console.log(file)\n    /** 判断文件名是否为 index.js  */\n    if (file !== \'index.js\') {\n        /** 不是 访问 当前目录下的所有文件 */\n        let r = require(\"./\" + file);\n        /** 加载路由 */\n        router.use(r.routes());\n    }\n})\n\nmodule.exports = router;\n\n```\n## 四、目录结构优化\n#### 1. 拆分 http服务 和 app 业务\n创建 `src/app`，编写 `index.js`\n```js\nconst Koa = require(\'koa\');\nconst router = require(\"../router\")\n\nconst app = new Koa();\n/** router.allowedMethods() 是判断 http */\napp.use(router.routes()).use(router.allowedMethods())\n// 向外暴露 app 接口\nmodule.exports = app;\n```\n#### 2. 拆分 路由器 和 控制器\n**路由：解析URL，分发给控制器对应的方法**\n在 `router` 文件夹 创建相对应模块的路由文件 `xx.route.js` \n```js\nconst Router = require(\'koa-router\');\n\n// 导入 对应的控制器 对象\nconst { xxx, xxx } = require(\"../controller/xx.controller.js\");\n\nconst router = new Router({ prefix: \'/xx\' })\n\n// xx业务接口\nrouter.post(\"/xx\", xxx);\n\nmodule.exports = router;\n```\n**控制器：处理不同的业务**\n在 `controller` 文件夹 创建相对应模块的控制器文件 `xx.controller.js` \n```js\n/*\n * 用的是 ES6 的写法，用 类 编写 异步请求的函数 \n */\nconst { xxx, xxx } = require(\"../service/xxx.service\")\nclass XxxController {\n    async xxx(ctx, next) {\n        执行语句\n    }\n\n    async xxx(ctx, next) {\n        执行语句\n    }\n}\n\n// 用对象的形式 对外暴露\nmodule.exports = new XxxController();\n```\n#### 3. 拆分服务层\n在 `service` 文件夹下 创建相对应的**service**文件,然后在控制器文件中引入\n```js\nclass XxxService {\n    async createUser(user_name, password) {\n        // todo: 写入数据库\n        return \"写入数据库成功\"\n    }\n}\n\nmodule.exports = new XxxService()\n```\n#### 4. 注册中间件\n**安装 koa-body**\n```\nnpm i koa-body\n```\n在 `app/index.js` 下引入\n```js\nconst { koaBody } = require(\'koa-body\');\nconst parameter = require(\'koa-parameter\');\n\napp.use(parameter(app))\n```\n5. \n## 五、数据库\n##### 1. 安装 sequelize 和 mysql\nsequelize ORM 数据库工具\nORM：对象关系映射，其主要作用是在编程中，把面向对象的概念跟数据库中表的概念对应起来。\n**Sequelize 支持的 MySQL 版本 最低 5.7版本**\n- 数据表映射(对应)一个类\n- 数据表中的数据行(记录)对应一个队形\n- 数据表字段队形对象的属性\n- 数据表的操作对应对象的方法\n```\nnpm i mysql2  sequelize\n```\n#### 2. 连接数据库\n现在本地数据库创建一个数据库。目前在用 Navicat，使用UTF-8\n在 `src/db` ，编写 `seq.js`\n```js\nconst { Sequelize } = require(\"sequelize\")\n// 导入 配置文件里的 MYSQL 配置\nconst {\n    MYSQL_HOST,\n    MYSQL_POST,\n    MYSQL_USER,\n    MYSQL_PWD,\n    MYSQL_DB\n} = require(\"../website/website.default\")\n\n// 实例化对象\nconst seq = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PWD, {\n    host: MYSQL_HOST,\n\n    dialect: \'mysql\',\n})\n\n// 测试链接\nseq.authenticate().then(() => {\n    console.log(\"数据库连接成功\");\n}).catch((err) => {\n    console.log(\"数据库连接失败\", err);\n})\n\nmodule.exports = seq\n```\n#### 3. 修改 .env 文件\n```\nAPP_PORT = 8000\n\n// 配置 mysql\n\nMYSQL_HOST = localhost\nMYSQL_POST = 3306\nMYSQL_USER = root\nMYSQL_PWD = root\nMYSQL_DB = mgsc\n```\n#### 4. 创建模型\n创建 `src/model/user.model.js`,编写完之后 直接在终端 node 一下就好了\n```js\n// 	使用的是 seq.define 方法\nconst { Sequelize, DataTypes } = require(\"sequelize\")\n// 导入 seq\nconst seq = require(\"../db/seq\")\n\n// 创建模型 (所对应的数据表 mg_Users)\n    const Xxx = seq.define(\'xx_xxx\', {\n    // 编写表的字段\n    /*\n     * id 会被 sequelize 自动创建\n     */\n    字段: {\n        type: DataTypes.STRING, // 数据类型\n        allowNull: false, // 是否允许空值\n        unique: true, // 唯一值\n        defaultValue: \"\", // 默认值\n        comment: \"备注\",\n    }\n})\n\n// 强制同步数据库\nXxx.sync({ force: true })\n// console.log(\"User模型同步成功\");\n\nmodule.exports = Xxx\n```\n## 六、统一错误处理\n#### 1. 编写错误码文件\n创建 `errorType/err.type.js` 文件\n```javascript\nconst ERRORCODE = {\n    USER: \'10001\', // 用户错误码 -> 用户已存在、密码不一致....\n    AUTH: \'10002\', // 用户权限不足码 -> 没有管理员权限\n    TOKEN: \'10003\', // 用户登录过期、 无效token\n    FILE: \'10004\', // 文件格式\n    UPLOAD: \'10005\', // 上传\n    CONFIG: \'10006\', // 网站设置详情\n    STATISTIC: \"100008\", // 网站统计信息\n    ARTICLE: \'10009\', // 文章 -> 文章参数格式错误、发布文章失败、修改文章失败...\n    ALBUM: \'100010\', // 相册\n    CATEGORY: \'10011\', // 分类\n    PHOTO: \'10012\', // 图片 -> 上传图片失败\n    TALK: \'10013\', // 说说\n    COMMENT: \'10014\', // 评论\n    MESSAGE: \'10015\', // 留言板\n    NOTIFY: \'10016\', // 消息推送\n    LIKE: \'10017\', // 点赞\n    TAG: \'10018\', // 标签\n    TIPS: \'11111\', // 提示\n\n}\n/**\n * 公共返回结果方法\n * @param {*} message 提示信息\n * @param {*} result 结果\n * @returns\n */\nfunction result(message, result) {\n    return { code: 0, message, result }\n}\n\n/**\n * 公共返回提示方法\n * @param {*} message 提示信息\n * @param {*} result 结果\n * @returns\n */\nfunction tipsResult(message) {\n    return { code: 0, message }\n}\n\n/**\n * 公共抛出错误方法\n * @param {*} code 错误码\n * @param {*} message 错误信息\n * @returns\n */\nfunction throwError(code, message) {\n    return { code, message }\n}\n\nmodule.exports = {\n    ERRORCODE,\n    result,\n    throwError,\n    tipsResult\n}\n```\n#### 2. 统一处理文件\n```js\nmodule.exports = (err, ctx) => {\n    let status = 200\n    switch (err.code) {\n        case \'10001\':\n            status = 400\n            break;\n        case \'10002\':\n            status = 409\n            break;\n        default:\n            status = 500\n            break;\n    }\n    ctx.status = status\n    ctx.body = err\n}\n```\n在 `app.js` 文件中引入\n```js\nconst errorHandle = require(\"./errorHandle\");\n/* 监听 app.on */\napp.on(\"error\", errorHandle);\n```\n', 'http://127.0.0.1:8888/b884e828ce0b4d7fe16cdc001', 2, 2, 1, NULL, 1, 0, 0, '2024-08-06 00:00:00', '2024-08-08 02:05:27', NULL);

-- ----------------------------
-- Table structure for mi_article_copy1
-- ----------------------------
DROP TABLE IF EXISTS `mi_article_copy1`;
CREATE TABLE `mi_article_copy1`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `article_title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '文章标题 不能为空',
  `author_id` int(0) NOT NULL DEFAULT 1 COMMENT '文章作者 不能为空',
  `category_id` int(0) NOT NULL COMMENT '分类ID 不能为空',
  `article_description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '文章描述 不能为空',
  `article_content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '文章内容',
  `article_cover` varchar(1234) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT 'http://localhost:8888/b4e81e8116e5aaf762af3e101.jpg' COMMENT '文章缩略图',
  `is_top` int(0) NULL DEFAULT 2 COMMENT '文章置顶 1 置顶 2 取消置顶',
  `status` int(0) NULL DEFAULT 1 COMMENT '文章状态 1 公开 2 私密 3 草稿箱',
  `article_types` int(0) NULL DEFAULT 1 COMMENT '文章类型 1 原创 2 转载 ',
  `origin_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '原文链接 是转载或翻译的情况下提供',
  `view_times` int(0) NULL DEFAULT 0 COMMENT '文章访问次数',
  `thumbs_up_times` int(0) NULL DEFAULT 0 COMMENT '文章点赞次数',
  `reading_duration` double NULL DEFAULT 0 COMMENT '文章阅读时长',
  `createdAt` datetime(0) NULL DEFAULT NULL,
  `updatedAt` datetime(0) NULL DEFAULT NULL,
  `deletedAt` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mi_article_copy1
-- ----------------------------
INSERT INTO `mi_article_copy1` VALUES (1, '测试更改文章1', 2, 1, '测试上传封面', '测试图片是否上传成功', 'http://127.0.0.1:8888/f29353b3a7831ac90463f9c00', 2, 1, 1, NULL, 12, 0, 0, '2024-06-18 02:00:09', '2024-07-22 02:10:54', NULL);
INSERT INTO `mi_article_copy1` VALUES (2, '发布文章', 2, 2, '测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版', '测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版', 'http://127.0.0.1:8888/1c2db593a006eef1d036d9700', 2, 1, 1, NULL, 2, 0, 0, '2024-07-02 08:50:43', '2024-07-22 02:11:32', NULL);
INSERT INTO `mi_article_copy1` VALUES (3, '发布文章3', 2, 1, '测试排版测试排版测试排版5', '测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版', 'http://127.0.0.1:8888/1c2db593a006eef1d036d9701', 2, 1, 1, NULL, 2, 0, 0, '2024-07-02 08:51:47', '2024-07-22 02:11:30', NULL);
INSERT INTO `mi_article_copy1` VALUES (4, '文章排版4', 2, 1, '排版4', '测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版', 'http://127.0.0.1:8888/1c2db593a006eef1d036d9702', 2, 1, 1, NULL, 2, 0, 0, '2024-07-02 08:53:36', '2024-07-22 02:11:29', NULL);
INSERT INTO `mi_article_copy1` VALUES (5, '排版5', 2, 2, '文章排版5', '测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版', 'http://127.0.0.1:8888/1c2db593a006eef1d036d9703', 2, 1, 1, NULL, 2, 0, 0, '2024-07-02 08:54:37', '2024-07-22 02:11:28', NULL);
INSERT INTO `mi_article_copy1` VALUES (6, '文章排版6', 2, 2, '排版6', '测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版测试排版', 'http://127.0.0.1:8888/1c2db593a006eef1d036d9704', 2, 1, 1, NULL, 8, 0, 0, '2024-07-02 08:55:50', '2024-07-31 02:17:45', NULL);
INSERT INTO `mi_article_copy1` VALUES (7, '测试文章标题长度在前台的显示111111', 2, 1, '测试文章标题长度在前台的显示111111测试文章标题长度在前台的显示111111测试文章标题长度在前台的显示111111测试文章标题长度在前台的显示111111', '测试文章标题长度在前台的显示111111测试文章标题长度在前台的显示111111测试文章标题长度在前台的显示111111测试文章标题长度在前台的显示111111测试文章标题长度在前台的显示111111测试文章标题长度在前台的显示111111测试文章标题长度在前台的显示111111测试文章标题长度在前台的显示111111测试文章标题长度在前台的显示111111测试文章标题长度在前台的显示111111测试文章标题长度在前台的显示111111测试文章标题长度在前台的显示111111测试文章标题长度在前台的显示111111测试文章标题长度在前台的显示111111测试文章标题长度在前台的显示111111测试文章标题长度在前台的显示111111测试文章标题长度在前台的显示111111', 'http://127.0.0.1:8888/4ec95e2f66a387882a9fdeb00', 2, 2, 1, NULL, 0, 0, 0, '2024-07-03 07:35:43', '2024-07-03 07:50:49', NULL);
INSERT INTO `mi_article_copy1` VALUES (8, '更新测试文章标题长度显示', 2, 1, '测试文章标题长度显示14个字测试文章标题长度显示14个字测试文章标题长度显示14个字测试文章标题长度显示14个字', '测试文章标题长度显示14个字测试文章标题长度显示14个字测试文章标题长度显示14个字测试文章标题长度显示14个字测试文章标题长度显示14个字测试文章标题长度显示14个字测试文章标题长度显示14个字测试文章标题长度显示14个字测试文章标题长度显示14个字测试文章标题长度显示14个字\n```node\n测试代码\n```\n', 'http://127.0.0.1:8888/4ec95e2f66a387882a9fdeb01', 2, 1, 1, NULL, 57, 0, 0, '2024-07-03 07:51:51', '2024-07-31 02:17:51', NULL);

-- ----------------------------
-- Table structure for mi_article_tag
-- ----------------------------
DROP TABLE IF EXISTS `mi_article_tag`;
CREATE TABLE `mi_article_tag`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `article_id` int(0) NULL DEFAULT NULL COMMENT '文章id',
  `tag_id` int(0) NULL DEFAULT NULL COMMENT '标签id',
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  `deletedAt` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mi_article_tag
-- ----------------------------
INSERT INTO `mi_article_tag` VALUES (1, 2, 1, '2024-08-08 02:05:27', '2024-08-08 02:05:27', NULL);
INSERT INTO `mi_article_tag` VALUES (2, 1, 1, '2024-08-08 02:05:35', '2024-08-08 02:05:35', NULL);

-- ----------------------------
-- Table structure for mi_article_tag_copy1
-- ----------------------------
DROP TABLE IF EXISTS `mi_article_tag_copy1`;
CREATE TABLE `mi_article_tag_copy1`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `article_id` int(0) NULL DEFAULT NULL COMMENT '文章id',
  `tag_id` int(0) NULL DEFAULT NULL COMMENT '标签id',
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  `deletedAt` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mi_article_tag_copy1
-- ----------------------------
INSERT INTO `mi_article_tag_copy1` VALUES (1, 1, 1, '2024-06-18 02:00:09', '2024-06-18 02:00:09', NULL);
INSERT INTO `mi_article_tag_copy1` VALUES (2, 1, 1, '2024-06-19 02:54:52', '2024-06-19 02:54:52', NULL);
INSERT INTO `mi_article_tag_copy1` VALUES (3, 1, 2, '2024-06-19 02:54:52', '2024-06-19 02:54:52', NULL);
INSERT INTO `mi_article_tag_copy1` VALUES (4, 2, 1, '2024-07-02 08:50:43', '2024-07-02 08:50:43', NULL);
INSERT INTO `mi_article_tag_copy1` VALUES (5, 3, 1, '2024-07-02 08:51:47', '2024-07-02 08:51:47', NULL);
INSERT INTO `mi_article_tag_copy1` VALUES (6, 1, 2, '2024-07-02 08:52:11', '2024-07-02 08:52:11', NULL);
INSERT INTO `mi_article_tag_copy1` VALUES (7, 4, 1, '2024-07-02 08:53:36', '2024-07-02 08:53:36', NULL);
INSERT INTO `mi_article_tag_copy1` VALUES (8, 5, 2, '2024-07-02 08:54:37', '2024-07-02 08:54:37', NULL);
INSERT INTO `mi_article_tag_copy1` VALUES (9, 6, 2, '2024-07-02 08:55:50', '2024-07-02 08:55:50', NULL);
INSERT INTO `mi_article_tag_copy1` VALUES (10, 7, 1, '2024-07-03 07:35:43', '2024-07-03 07:35:43', NULL);
INSERT INTO `mi_article_tag_copy1` VALUES (11, 8, 1, '2024-07-03 07:51:51', '2024-07-03 07:51:51', NULL);
INSERT INTO `mi_article_tag_copy1` VALUES (12, 8, 1, '2024-07-19 02:47:20', '2024-07-19 02:47:20', NULL);
INSERT INTO `mi_article_tag_copy1` VALUES (13, 1, 1, '2024-08-05 08:47:40', '2024-08-05 08:47:40', NULL);
INSERT INTO `mi_article_tag_copy1` VALUES (14, 2, 1, '2024-08-06 07:50:37', '2024-08-06 07:50:37', NULL);
INSERT INTO `mi_article_tag_copy1` VALUES (15, 2, 1, '2024-08-07 03:46:27', '2024-08-07 03:46:27', NULL);
INSERT INTO `mi_article_tag_copy1` VALUES (16, 2, 1, '2024-08-07 03:46:27', '2024-08-07 03:46:27', NULL);

-- ----------------------------
-- Table structure for mi_blog_config
-- ----------------------------
DROP TABLE IF EXISTS `mi_blog_config`;
CREATE TABLE `mi_blog_config`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `blog_name` varchar(55) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT '米娜的小屋' COMMENT '博客名称',
  `blog_avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT 'http://localhost:8888/9bafc3b3e3c6cd84226181100.jpg' COMMENT '博客头像',
  `avatar_bg` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT 'http://localhost:8888/06e6fc4151a89ec4b9b6d9f00.jpg' COMMENT '博客头像背景图',
  `personality_signature` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '个性签名',
  `blog_notice` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '博客公告',
  `qq_link` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT 'QQ链接',
  `we_chat_link` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '微信链接',
  `github_link` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT 'github链接',
  `git_ee_link` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT 'git_ee链接',
  `view_time` int(0) NULL DEFAULT 0 COMMENT '博客访问次数',
  `createdAt` datetime(0) NULL DEFAULT NULL,
  `updatedAt` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mi_blog_config
-- ----------------------------
INSERT INTO `mi_blog_config` VALUES (1, '米娜的小屋', 'http://127.0.0.1:8888/d534c7552f7a63793b1e00001', 'http://127.0.0.1:8888/f56d6e7a0657cee8354612700', '不要让自己太累，多给自己一些娱乐的空间。', '世界上那么多人，没有十全十美，月有阴晴圆缺，接受自己的缺点，并把缺点变优点，何尝不是一种美。不要在意别人的眼光，不需要活成别人口中的样子，能够做自己，并让自己变得更加优秀，就已经很棒啦~', '', '', '', '', 0, '2024-03-29 08:46:06', '2024-05-27 06:47:57');

-- ----------------------------
-- Table structure for mi_category
-- ----------------------------
DROP TABLE IF EXISTS `mi_category`;
CREATE TABLE `mi_category`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(55) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '分类名称 唯一',
  `createdAt` datetime(0) NULL DEFAULT NULL,
  `updatedAt` datetime(0) NULL DEFAULT NULL,
  `deletedAt` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `category_name`(`category_name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mi_category
-- ----------------------------
INSERT INTO `mi_category` VALUES (1, '随手笔记', '2024-08-05 06:42:11', '2024-08-05 06:42:11', NULL);

-- ----------------------------
-- Table structure for mi_comment
-- ----------------------------
DROP TABLE IF EXISTS `mi_comment`;
CREATE TABLE `mi_comment`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `parent_id` int(0) NULL DEFAULT NULL COMMENT '评论的父级id',
  `type` int(0) NULL DEFAULT NULL COMMENT '评论类型 1 文章 2 说说 3 留言 ...',
  `for_id` int(0) NULL DEFAULT NULL COMMENT '评论的对象id 例如文章id 说说id 留言id',
  `from_id` int(0) NULL DEFAULT NULL COMMENT '评论人的id',
  `from_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '评论人的名字',
  `from_avatar` varchar(555) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '评论人的头像',
  `to_id` int(0) NULL DEFAULT NULL COMMENT '被回复的人的id',
  `to_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '被回复的人的名字',
  `to_avatar` varchar(555) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '被回复的人的头像',
  `thumbs_up` int(0) NULL DEFAULT 0 COMMENT '评论点赞数',
  `createdAt` datetime(0) NULL DEFAULT NULL,
  `updatedAt` datetime(0) NULL DEFAULT NULL,
  `content` varchar(555) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '评论内容',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mi_comment
-- ----------------------------
INSERT INTO `mi_comment` VALUES (1, NULL, 2, 19, 2, '米娜', 'http://127.0.0.1:8888/f26c1788bbd361d2161a85b00', NULL, NULL, NULL, 0, '2024-04-01 03:33:30', '2024-04-01 03:33:30', '再想想怎么弄');
INSERT INTO `mi_comment` VALUES (2, NULL, 2, 19, 2, '米娜', 'http://127.0.0.1:8888/f26c1788bbd361d2161a85b00', NULL, NULL, NULL, 0, '2024-04-01 03:36:16', '2024-04-01 03:36:16', '测试评论');
INSERT INTO `mi_comment` VALUES (3, NULL, 2, 20, 7, '星星v44d2xvf', 'http://localhost:8848/src/assets/avatar.jpg', NULL, NULL, NULL, 0, '2024-04-03 01:55:50', '2024-04-03 01:55:50', '测试评论成功');
INSERT INTO `mi_comment` VALUES (4, NULL, 2, 21, 7, '星星v44d2xvf', 'http://127.0.0.1:8888/b211b5e11aae0c61acb80cf00', NULL, NULL, NULL, 0, '2024-05-10 08:58:47', '2024-05-10 08:58:47', '多个评论');
INSERT INTO `mi_comment` VALUES (5, NULL, 2, 22, 7, '星星v44d2xvf', 'http://127.0.0.1:8888/b211b5e11aae0c61acb80cf00', NULL, NULL, NULL, 0, '2024-05-10 08:58:54', '2024-05-10 08:58:54', '这个是为什么呢');
INSERT INTO `mi_comment` VALUES (6, NULL, 2, 23, 7, '星星v44d2xvf', 'http://127.0.0.1:8888/b211b5e11aae0c61acb80cf00', NULL, NULL, NULL, 0, '2024-05-10 08:59:02', '2024-05-10 08:59:02', '就很奇怪啊');

-- ----------------------------
-- Table structure for mi_like
-- ----------------------------
DROP TABLE IF EXISTS `mi_like`;
CREATE TABLE `mi_like`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `type` int(0) NULL DEFAULT NULL COMMENT '点赞类型 1 文章 2 说说 3 留言 4 评论',
  `for_id` int(0) NULL DEFAULT NULL COMMENT '点赞的id 文章id 说说id 留言id',
  `user_id` int(0) NULL DEFAULT NULL COMMENT '点赞用户id',
  `createdAt` datetime(0) NULL DEFAULT NULL,
  `updatedAt` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 29 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mi_like
-- ----------------------------
INSERT INTO `mi_like` VALUES (1, 2, 19, 2, '2024-04-03 02:06:07', '2024-04-03 02:06:07');
INSERT INTO `mi_like` VALUES (2, 2, 19, 2, '2024-04-03 02:47:24', '2024-04-03 02:47:24');
INSERT INTO `mi_like` VALUES (3, 2, 22, 2, '2024-04-07 08:27:50', '2024-04-07 08:27:50');
INSERT INTO `mi_like` VALUES (4, 2, 28, 2, '2024-04-07 08:27:53', '2024-04-07 08:27:53');
INSERT INTO `mi_like` VALUES (13, 3, 1, 2, '2024-04-15 07:02:58', '2024-04-15 07:02:58');
INSERT INTO `mi_like` VALUES (14, 2, 31, 7, '2024-04-24 07:48:04', '2024-04-24 07:48:04');
INSERT INTO `mi_like` VALUES (15, 2, 30, 7, '2024-04-24 07:48:06', '2024-04-24 07:48:06');
INSERT INTO `mi_like` VALUES (16, 2, 29, 7, '2024-04-24 07:48:09', '2024-04-24 07:48:09');
INSERT INTO `mi_like` VALUES (17, 2, 28, 7, '2024-04-24 07:48:11', '2024-04-24 07:48:11');
INSERT INTO `mi_like` VALUES (18, 2, 27, 7, '2024-04-24 07:48:12', '2024-04-24 07:48:12');
INSERT INTO `mi_like` VALUES (19, 2, 26, 7, '2024-04-24 07:48:14', '2024-04-24 07:48:14');
INSERT INTO `mi_like` VALUES (20, 2, 25, 7, '2024-04-24 07:48:16', '2024-04-24 07:48:16');
INSERT INTO `mi_like` VALUES (21, 2, 24, 7, '2024-04-24 07:48:18', '2024-04-24 07:48:18');
INSERT INTO `mi_like` VALUES (22, 2, 23, 7, '2024-04-24 07:48:20', '2024-04-24 07:48:20');
INSERT INTO `mi_like` VALUES (23, 2, 22, 7, '2024-04-24 07:48:21', '2024-04-24 07:48:21');
INSERT INTO `mi_like` VALUES (24, 2, 21, 7, '2024-04-24 07:48:23', '2024-04-24 07:48:23');
INSERT INTO `mi_like` VALUES (25, 2, 20, 7, '2024-04-24 07:48:24', '2024-04-24 07:48:24');
INSERT INTO `mi_like` VALUES (26, 2, 19, 7, '2024-04-24 07:48:27', '2024-04-24 07:48:27');
INSERT INTO `mi_like` VALUES (27, 2, 19, 2, '2024-05-10 09:01:06', '2024-05-10 09:01:06');
INSERT INTO `mi_like` VALUES (28, 2, 22, 2, '2024-05-24 06:18:51', '2024-05-24 06:18:51');

-- ----------------------------
-- Table structure for mi_message
-- ----------------------------
DROP TABLE IF EXISTS `mi_message`;
CREATE TABLE `mi_message`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '留言内容',
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '用户头像',
  `status` int(0) NULL DEFAULT 1 COMMENT '留言状态 1 正常 2 表示异常',
  `user_id` int(0) NULL DEFAULT NULL COMMENT '留言用户的id',
  `nick_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '游客用户的昵称',
  `like_times` int(0) NULL DEFAULT 0 COMMENT '点赞次数',
  `createdAt` datetime(0) NULL DEFAULT NULL,
  `updatedAt` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 56 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mi_message
-- ----------------------------
INSERT INTO `mi_message` VALUES (1, '999', 'http://127.0.0.1:8888/d534c7552f7a63793b1e00001', 1, 0, '游客lhycq', 0, '2024-06-06 06:28:23', '2024-06-06 06:28:23');
INSERT INTO `mi_message` VALUES (2, 'gfhhj', 'http://127.0.0.1:8888/d534c7552f7a63793b1e00001', 1, 0, '游客g158q', 0, '2024-06-06 06:28:40', '2024-06-06 06:28:40');
INSERT INTO `mi_message` VALUES (3, 'afdf g', 'http://127.0.0.1:8888/d534c7552f7a63793b1e00001', 1, 0, '游客09g30', 0, '2024-06-06 06:28:44', '2024-06-06 06:28:44');
INSERT INTO `mi_message` VALUES (4, 'rt456 ', 'http://127.0.0.1:8888/d534c7552f7a63793b1e00001', 1, 0, '游客m6k90', 0, '2024-06-06 06:28:46', '2024-06-06 06:28:46');
INSERT INTO `mi_message` VALUES (5, 'sfd3wr tef', 'http://127.0.0.1:8888/d534c7552f7a63793b1e00001', 1, 0, '游客zv25s', 0, '2024-06-06 06:28:49', '2024-06-06 06:28:49');
INSERT INTO `mi_message` VALUES (6, 'adsd sfg ', 'http://127.0.0.1:8888/d534c7552f7a63793b1e00001', 1, 0, '游客t66md', 0, '2024-06-06 06:28:51', '2024-06-06 06:28:51');
INSERT INTO `mi_message` VALUES (7, '555555', 'http://127.0.0.1:8888/d534c7552f7a63793b1e00001', 1, 0, '游客920i8', 0, '2024-06-06 06:31:02', '2024-06-06 06:31:02');
INSERT INTO `mi_message` VALUES (8, '9999', 'http://127.0.0.1:8888/d534c7552f7a63793b1e00001', 1, 0, '游客k1833', 0, '2024-06-06 07:42:34', '2024-06-06 07:42:34');
INSERT INTO `mi_message` VALUES (9, '登陆测试', 'http://127.0.0.1:8888/f26c1788bbd361d2161a85b00', 1, 2, '米娜', 0, '2024-06-06 07:52:26', '2024-06-06 07:52:26');
INSERT INTO `mi_message` VALUES (10, '你好', 'http://127.0.0.1:8888/d534c7552f7a63793b1e00001', 1, 0, '游客36n2d', 0, '2024-06-26 07:58:08', '2024-06-26 07:58:08');
INSERT INTO `mi_message` VALUES (11, '测试发布留言成功', 'http://127.0.0.1:8888/d534c7552f7a63793b1e00001', 1, 0, '游客90q72', 0, '2024-06-26 07:58:22', '2024-06-26 07:58:22');
INSERT INTO `mi_message` VALUES (12, '实时追加成功', 'http://127.0.0.1:8888/d534c7552f7a63793b1e00001', 1, 0, '游客487o1', 0, '2024-06-26 07:58:35', '2024-06-26 07:58:35');
INSERT INTO `mi_message` VALUES (13, '头像显示成功', 'http://127.0.0.1:8888/d534c7552f7a63793b1e00001', 1, 0, '游客18ddr', 0, '2024-06-26 07:58:41', '2024-06-26 07:58:41');
INSERT INTO `mi_message` VALUES (14, '只有当下显示成功', 'http://127.0.0.1:8888/f26c1788bbd361d2161a85b00', 1, 2, '米娜', 0, '2024-06-26 07:59:27', '2024-06-26 07:59:27');
INSERT INTO `mi_message` VALUES (15, '登录之后又不成功了', 'http://127.0.0.1:8888/f26c1788bbd361d2161a85b00', 1, 2, '米娜', 0, '2024-06-26 07:59:34', '2024-06-26 07:59:34');
INSERT INTO `mi_message` VALUES (16, '测试留言字数最多20个', 'http://127.0.0.1:8888/f26c1788bbd361d2161a85b00', 1, 2, '米娜', 0, '2024-06-26 08:00:10', '2024-06-26 08:00:10');
INSERT INTO `mi_message` VALUES (17, '我又来了', 'http://127.0.0.1:8888/d534c7552f7a63793b1e00001', 1, 0, '游客a5g83', 0, '2024-07-05 02:54:59', '2024-07-05 02:54:59');
INSERT INTO `mi_message` VALUES (18, '挺好挺好', 'http://127.0.0.1:8888/d534c7552f7a63793b1e00001', 1, 0, '游客2h925', 0, '2024-07-05 02:55:13', '2024-07-05 02:55:13');
INSERT INTO `mi_message` VALUES (19, '可惜了这个头像 在不登陆的情况如何处理', 'http://127.0.0.1:8888/f26c1788bbd361d2161a85b00', 1, 2, '米娜', 0, '2024-07-05 02:56:16', '2024-07-05 02:56:16');
INSERT INTO `mi_message` VALUES (20, '累了麻了  快把自己燃尽了', 'http://127.0.0.1:8888/f26c1788bbd361d2161a85b00', 1, 2, '米娜', 0, '2024-07-05 02:56:40', '2024-07-05 02:56:40');
INSERT INTO `mi_message` VALUES (21, '家人们 谁懂 啊', 'http://127.0.0.1:8888/f26c1788bbd361d2161a85b00', 1, 2, '米娜', 0, '2024-07-05 02:56:50', '2024-07-05 02:56:50');
INSERT INTO `mi_message` VALUES (22, '换一个凡人停放', 'http://127.0.0.1:8888/f26c1788bbd361d2161a85b00', 1, 2, '米娜', 0, '2024-07-05 03:48:16', '2024-07-05 03:48:16');
INSERT INTO `mi_message` VALUES (23, '第三个同款经理', 'http://127.0.0.1:8888/f26c1788bbd361d2161a85b00', 1, 2, '米娜', 0, '2024-07-05 03:48:29', '2024-07-05 03:48:29');
INSERT INTO `mi_message` VALUES (24, '色让人头疼给', 'http://127.0.0.1:8888/f26c1788bbd361d2161a85b00', 1, 2, '米娜', 0, '2024-07-05 03:48:40', '2024-07-05 03:48:40');
INSERT INTO `mi_message` VALUES (25, '二让人 让他他让他违法问题依然要', 'http://127.0.0.1:8888/f26c1788bbd361d2161a85b00', 1, 2, '米娜', 0, '2024-07-05 03:49:53', '2024-07-05 03:49:53');
INSERT INTO `mi_message` VALUES (26, '的风格和跟他说地方', 'http://127.0.0.1:8888/f26c1788bbd361d2161a85b00', 1, 2, '米娜', 0, '2024-07-05 03:49:57', '2024-07-05 03:49:57');
INSERT INTO `mi_message` VALUES (27, '收房东更有人投诉', 'http://127.0.0.1:8888/f26c1788bbd361d2161a85b00', 1, 2, '米娜', 0, '2024-07-05 03:50:01', '2024-07-05 03:50:01');
INSERT INTO `mi_message` VALUES (28, '士大夫入狱', 'http://127.0.0.1:8888/f26c1788bbd361d2161a85b00', 1, 2, '米娜', 0, '2024-07-05 03:50:05', '2024-07-05 03:50:05');
INSERT INTO `mi_message` VALUES (29, 'v成本估计有', 'http://127.0.0.1:8888/f26c1788bbd361d2161a85b00', 1, 2, '米娜', 0, '2024-07-05 03:50:09', '2024-07-05 03:50:09');
INSERT INTO `mi_message` VALUES (30, '就越讨厌潍坊市', 'http://127.0.0.1:8888/f26c1788bbd361d2161a85b00', 1, 2, '米娜', 0, '2024-07-05 03:50:12', '2024-07-05 03:50:12');
INSERT INTO `mi_message` VALUES (31, '还有他交通意外', 'http://127.0.0.1:8888/f26c1788bbd361d2161a85b00', 1, 2, '米娜', 0, '2024-07-05 03:50:17', '2024-07-05 03:50:17');
INSERT INTO `mi_message` VALUES (32, '饿啊是惹人厌', 'http://127.0.0.1:8888/f26c1788bbd361d2161a85b00', 1, 2, '米娜', 0, '2024-07-05 03:50:20', '2024-07-05 03:50:20');
INSERT INTO `mi_message` VALUES (33, ' 居民健康了', 'http://127.0.0.1:8888/f26c1788bbd361d2161a85b00', 1, 2, '米娜', 0, '2024-07-05 03:50:23', '2024-07-05 03:50:23');
INSERT INTO `mi_message` VALUES (34, '房地局佛日给你', 'http://127.0.0.1:8888/f26c1788bbd361d2161a85b00', 1, 2, '米娜', 0, '2024-07-05 03:50:25', '2024-07-05 03:50:25');
INSERT INTO `mi_message` VALUES (35, '开门炮佛山', 'http://127.0.0.1:8888/f26c1788bbd361d2161a85b00', 1, 2, '米娜', 0, '2024-07-05 03:50:27', '2024-07-05 03:50:27');
INSERT INTO `mi_message` VALUES (36, '欧佩克人民弓箭手', 'http://127.0.0.1:8888/f26c1788bbd361d2161a85b00', 1, 2, '米娜', 0, '2024-07-05 03:50:29', '2024-07-05 03:50:29');
INSERT INTO `mi_message` VALUES (37, '骂开了发票给彭萨科', 'http://127.0.0.1:8888/f26c1788bbd361d2161a85b00', 1, 2, '米娜', 0, '2024-07-05 03:50:31', '2024-07-05 03:50:31');
INSERT INTO `mi_message` VALUES (38, '没开封的李光洁', 'http://127.0.0.1:8888/f26c1788bbd361d2161a85b00', 1, 2, '米娜', 0, '2024-07-05 03:50:34', '2024-07-05 03:50:34');
INSERT INTO `mi_message` VALUES (39, '麻烦批手机店铺分配', 'http://127.0.0.1:8888/f26c1788bbd361d2161a85b00', 1, 2, '米娜', 0, '2024-07-05 03:50:36', '2024-07-05 03:50:36');
INSERT INTO `mi_message` VALUES (40, '没发票两三口二，两部分的', 'http://127.0.0.1:8888/f26c1788bbd361d2161a85b00', 1, 2, '米娜', 0, '2024-07-05 03:50:38', '2024-07-05 03:50:38');
INSERT INTO `mi_message` VALUES (41, '没看到房价噢批完金额', 'http://127.0.0.1:8888/f26c1788bbd361d2161a85b00', 1, 2, '米娜', 0, '2024-07-05 03:50:40', '2024-07-05 03:50:40');
INSERT INTO `mi_message` VALUES (42, '靠父母陪家人吗v吧', 'http://127.0.0.1:8888/f26c1788bbd361d2161a85b00', 1, 2, '米娜', 0, '2024-07-05 03:50:41', '2024-07-05 03:50:41');
INSERT INTO `mi_message` VALUES (43, '没覅哦配色i哦就喷手', 'http://127.0.0.1:8888/f26c1788bbd361d2161a85b00', 1, 2, '米娜', 0, '2024-07-05 03:50:43', '2024-07-05 03:50:43');
INSERT INTO `mi_message` VALUES (44, '灭佛培昆特派人面板', 'http://127.0.0.1:8888/f26c1788bbd361d2161a85b00', 1, 2, '米娜', 0, '2024-07-05 03:50:45', '2024-07-05 03:50:45');
INSERT INTO `mi_message` VALUES (45, '美国i哦怕软键盘慢跑每个时代', 'http://127.0.0.1:8888/f26c1788bbd361d2161a85b00', 1, 2, '米娜', 0, '2024-07-05 03:50:47', '2024-07-05 03:50:47');
INSERT INTO `mi_message` VALUES (46, '减肥哦批发价老师v', 'http://127.0.0.1:8888/f26c1788bbd361d2161a85b00', 1, 2, '米娜', 0, '2024-07-05 03:50:49', '2024-07-05 03:50:49');
INSERT INTO `mi_message` VALUES (47, '发你的发挥哦视频', 'http://127.0.0.1:8888/f26c1788bbd361d2161a85b00', 1, 2, '米娜', 0, '2024-07-05 03:51:36', '2024-07-05 03:51:36');
INSERT INTO `mi_message` VALUES (48, '偶滴放假哦', 'http://127.0.0.1:8888/f26c1788bbd361d2161a85b00', 1, 2, '米娜', 0, '2024-07-05 03:51:37', '2024-07-05 03:51:37');
INSERT INTO `mi_message` VALUES (49, '诺卡拉圣诞节评价', 'http://127.0.0.1:8888/f26c1788bbd361d2161a85b00', 1, 2, '米娜', 0, '2024-07-05 03:51:41', '2024-07-05 03:51:41');
INSERT INTO `mi_message` VALUES (50, '你覅使劲儿', 'http://127.0.0.1:8888/f26c1788bbd361d2161a85b00', 1, 2, '米娜', 0, '2024-07-05 03:51:43', '2024-07-05 03:51:43');
INSERT INTO `mi_message` VALUES (51, '叫偶分的皮肤平时附魔ih', 'http://127.0.0.1:8888/f26c1788bbd361d2161a85b00', 1, 2, '米娜', 0, '2024-07-05 03:51:47', '2024-07-05 03:51:47');
INSERT INTO `mi_message` VALUES (52, '分明是珀尔u', 'http://127.0.0.1:8888/f26c1788bbd361d2161a85b00', 1, 2, '米娜', 0, '2024-07-05 03:51:48', '2024-07-05 03:51:48');
INSERT INTO `mi_message` VALUES (53, '两节课大佛怕怕', 'http://127.0.0.1:8888/f26c1788bbd361d2161a85b00', 1, 2, '米娜', 0, '2024-07-05 03:51:50', '2024-07-05 03:51:50');
INSERT INTO `mi_message` VALUES (54, '的麻烦了', 'http://127.0.0.1:8888/f26c1788bbd361d2161a85b00', 1, 2, '米娜', 0, '2024-07-05 03:51:51', '2024-07-05 03:51:51');
INSERT INTO `mi_message` VALUES (55, '觉得怕', 'http://127.0.0.1:8888/f26c1788bbd361d2161a85b00', 1, 2, '米娜', 0, '2024-07-05 03:51:53', '2024-07-05 03:51:53');

-- ----------------------------
-- Table structure for mi_notify
-- ----------------------------
DROP TABLE IF EXISTS `mi_notify`;
CREATE TABLE `mi_notify`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `message` varchar(555) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '通知内容',
  `user_id` int(0) NULL DEFAULT NULL COMMENT '通知给谁',
  `type` int(0) NULL DEFAULT NULL COMMENT '通知类型 1 文章 2 说说 3 留言 4 友链',
  `isView` int(0) NULL DEFAULT 1 COMMENT '是否被查看 1 没有 2 已经查看',
  `createdAt` datetime(0) NULL DEFAULT NULL,
  `updatedAt` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 153 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mi_notify
-- ----------------------------
INSERT INTO `mi_notify` VALUES (1, '您的说说收到了来自于 星星v44d2xvf 的评论: 测试评论成功!', 2, 2, 2, '2024-04-03 01:55:50', '2024-05-10 09:00:41');
INSERT INTO `mi_notify` VALUES (2, '您收到了来自于 米娜 的留言: 测试留言!', 1, 3, 1, '2024-04-15 07:41:43', '2024-04-15 07:41:43');
INSERT INTO `mi_notify` VALUES (3, '您收到了来自于 游客yuc8p 的留言: 留个言，没图片!', 1, 3, 1, '2024-04-25 02:35:54', '2024-04-25 02:35:54');
INSERT INTO `mi_notify` VALUES (4, '您的说说收到了来自于 星星v44d2xvf 的评论: 多个评论!', 2, 2, 2, '2024-05-10 08:58:47', '2024-05-10 09:00:55');
INSERT INTO `mi_notify` VALUES (5, '您的说说收到了来自于 星星v44d2xvf 的评论: 这个是为什么呢!', 2, 2, 2, '2024-05-10 08:58:54', '2024-05-10 09:00:49');
INSERT INTO `mi_notify` VALUES (6, '您的说说收到了来自于 星星v44d2xvf 的评论: 就很奇怪啊!', 2, 2, 2, '2024-05-10 08:59:02', '2024-05-10 08:59:27');
INSERT INTO `mi_notify` VALUES (7, '您收到了来自于 游客dzr67 的留言: 停广告!', 1, 3, 1, '2024-05-16 08:51:28', '2024-05-16 08:51:28');
INSERT INTO `mi_notify` VALUES (8, '您收到了来自于 游客p76wu 的留言: 你好!', 1, 3, 1, '2024-05-16 09:02:02', '2024-05-16 09:02:02');
INSERT INTO `mi_notify` VALUES (9, '您收到了来自于 游客8b6g8 的留言: 背景图片真好看!', 1, 3, 1, '2024-05-17 08:08:37', '2024-05-17 08:08:37');
INSERT INTO `mi_notify` VALUES (10, '您收到了来自于 游客ve81p 的留言: 你好!', 1, 3, 1, '2024-05-20 01:46:38', '2024-05-20 01:46:38');
INSERT INTO `mi_notify` VALUES (11, '您收到了来自于 游客ih13c 的留言: 111!', 1, 3, 1, '2024-05-20 01:47:23', '2024-05-20 01:47:23');
INSERT INTO `mi_notify` VALUES (12, '您收到了来自于 游客l9cy5 的留言: !', 1, 3, 1, '2024-05-21 06:15:53', '2024-05-21 06:15:53');
INSERT INTO `mi_notify` VALUES (13, '您收到了来自于 游客630x0 的留言: !', 1, 3, 1, '2024-05-21 06:15:58', '2024-05-21 06:15:58');
INSERT INTO `mi_notify` VALUES (14, '您收到了来自于 游客9l45n 的留言: !', 1, 3, 1, '2024-05-21 07:08:53', '2024-05-21 07:08:53');
INSERT INTO `mi_notify` VALUES (15, '您收到了来自于 游客83nms 的留言: !', 1, 3, 1, '2024-05-21 08:59:25', '2024-05-21 08:59:25');
INSERT INTO `mi_notify` VALUES (16, '您收到了来自于 游客5f233 的留言: !', 1, 3, 1, '2024-05-21 09:05:40', '2024-05-21 09:05:40');
INSERT INTO `mi_notify` VALUES (17, '您收到了来自于 游客tw075 的留言: !', 1, 3, 1, '2024-05-21 09:06:00', '2024-05-21 09:06:00');
INSERT INTO `mi_notify` VALUES (18, '您收到了来自于 游客9kedi 的留言: 33!', 1, 3, 1, '2024-05-22 02:31:56', '2024-05-22 02:31:56');
INSERT INTO `mi_notify` VALUES (19, '您收到了来自于 游客1541a 的留言: 111!', 1, 3, 1, '2024-05-22 02:49:25', '2024-05-22 02:49:25');
INSERT INTO `mi_notify` VALUES (20, '您收到了来自于 游客c41og 的留言: 111!', 1, 3, 1, '2024-05-22 07:51:00', '2024-05-22 07:51:00');
INSERT INTO `mi_notify` VALUES (21, '您收到了来自于 游客k0xpx 的留言: 222!', 1, 3, 1, '2024-05-22 07:59:34', '2024-05-22 07:59:34');
INSERT INTO `mi_notify` VALUES (22, '您收到了来自于 游客21o23 的留言: 1!', 1, 3, 1, '2024-05-22 08:03:42', '2024-05-22 08:03:42');
INSERT INTO `mi_notify` VALUES (23, '您收到了来自于 游客52ag9 的留言: 8888!', 1, 3, 1, '2024-05-22 08:14:18', '2024-05-22 08:14:18');
INSERT INTO `mi_notify` VALUES (24, '您收到了来自于 游客86e40 的留言: 999!', 1, 3, 1, '2024-05-22 08:14:21', '2024-05-22 08:14:21');
INSERT INTO `mi_notify` VALUES (25, '您收到了来自于 游客v81tc 的留言: 1110!', 1, 3, 1, '2024-05-22 08:14:25', '2024-05-22 08:14:25');
INSERT INTO `mi_notify` VALUES (26, '您收到了来自于 游客30t12 的留言: 159!', 1, 3, 1, '2024-05-22 08:14:46', '2024-05-22 08:14:46');
INSERT INTO `mi_notify` VALUES (27, '您收到了来自于 游客o3s1b 的留言: 3969!', 1, 3, 1, '2024-05-22 08:14:49', '2024-05-22 08:14:49');
INSERT INTO `mi_notify` VALUES (28, '您收到了来自于 游客t48n6 的留言: 956!', 1, 3, 1, '2024-05-22 08:14:52', '2024-05-22 08:14:52');
INSERT INTO `mi_notify` VALUES (29, '您收到了来自于 游客0nuo2 的留言: 963!', 1, 3, 1, '2024-05-22 08:15:02', '2024-05-22 08:15:02');
INSERT INTO `mi_notify` VALUES (30, '您收到了来自于 游客4m6s9 的留言: 8555!', 1, 3, 1, '2024-05-22 08:22:21', '2024-05-22 08:22:21');
INSERT INTO `mi_notify` VALUES (31, '您收到了来自于 游客endon 的留言: 5555!', 1, 3, 1, '2024-05-23 02:21:32', '2024-05-23 02:21:32');
INSERT INTO `mi_notify` VALUES (32, '您收到了来自于 游客f8bl0 的留言: 测试发送!', 1, 3, 1, '2024-05-23 02:21:45', '2024-05-23 02:21:45');
INSERT INTO `mi_notify` VALUES (33, '您收到了来自于 游客12h9k 的留言: 测试发布!', 1, 3, 1, '2024-05-23 02:24:17', '2024-05-23 02:24:17');
INSERT INTO `mi_notify` VALUES (34, '您收到了来自于 游客e993p 的留言: 测试大部!', 1, 3, 1, '2024-05-23 02:25:50', '2024-05-23 02:25:50');
INSERT INTO `mi_notify` VALUES (35, '您收到了来自于  的留言: 测试发布!', 1, 3, 1, '2024-05-23 02:26:22', '2024-05-23 02:26:22');
INSERT INTO `mi_notify` VALUES (36, '您收到了来自于  的留言: 111!', 1, 3, 1, '2024-05-23 02:27:21', '2024-05-23 02:27:21');
INSERT INTO `mi_notify` VALUES (37, '您收到了来自于 游客do94p 的留言: 111!', 1, 3, 1, '2024-05-23 02:29:19', '2024-05-23 02:29:19');
INSERT INTO `mi_notify` VALUES (38, '您收到了来自于 游客989u7 的留言: 登陆后测试发布!', 1, 3, 1, '2024-05-23 02:33:58', '2024-05-23 02:33:58');
INSERT INTO `mi_notify` VALUES (39, '您收到了来自于 游客3kodm 的留言: 已登录!', 1, 3, 1, '2024-05-23 02:34:03', '2024-05-23 02:34:03');
INSERT INTO `mi_notify` VALUES (40, '您收到了来自于 游客0p110 的留言: 未登录!', 1, 3, 1, '2024-05-23 02:34:22', '2024-05-23 02:34:22');
INSERT INTO `mi_notify` VALUES (41, '您收到了来自于 游客gb1vc 的留言: 未登录发布!', 1, 3, 1, '2024-05-23 02:34:27', '2024-05-23 02:34:27');
INSERT INTO `mi_notify` VALUES (42, '您收到了来自于  的留言: 登录一下!', 1, 3, 1, '2024-05-23 02:40:37', '2024-05-23 02:40:37');
INSERT INTO `mi_notify` VALUES (43, '您收到了来自于  的留言: 在测试!', 1, 3, 1, '2024-05-23 02:47:38', '2024-05-23 02:47:38');
INSERT INTO `mi_notify` VALUES (44, '您收到了来自于 游客s6b8f 的留言: 游客留下!', 1, 3, 1, '2024-05-23 06:13:41', '2024-05-23 06:13:41');
INSERT INTO `mi_notify` VALUES (45, '您收到了来自于 米娜 的留言: 登录啦!', 1, 3, 1, '2024-05-23 06:15:52', '2024-05-23 06:15:52');
INSERT INTO `mi_notify` VALUES (46, '您收到了来自于 游客97667 的留言: 有测试!', 1, 3, 1, '2024-05-23 06:27:25', '2024-05-23 06:27:25');
INSERT INTO `mi_notify` VALUES (47, '您收到了来自于 游客77y53 的留言: 右侧是!', 1, 3, 1, '2024-05-23 06:27:55', '2024-05-23 06:27:55');
INSERT INTO `mi_notify` VALUES (48, '您收到了来自于 游客g3q0u 的留言: ppp!', 1, 3, 1, '2024-05-23 06:29:22', '2024-05-23 06:29:22');
INSERT INTO `mi_notify` VALUES (49, '您收到了来自于 游客s1d4e 的留言: 登陆测试!', 1, 3, 1, '2024-05-23 06:32:11', '2024-05-23 06:32:11');
INSERT INTO `mi_notify` VALUES (50, '您收到了来自于 游客h8z8t 的留言: 人人人!', 1, 3, 1, '2024-05-23 06:33:12', '2024-05-23 06:33:12');
INSERT INTO `mi_notify` VALUES (51, '您收到了来自于 游客z16o2 的留言: 1!', 1, 3, 1, '2024-05-27 01:59:51', '2024-05-27 01:59:51');
INSERT INTO `mi_notify` VALUES (52, '您收到了来自于 游客18930 的留言: 2!', 1, 3, 1, '2024-05-27 02:01:51', '2024-05-27 02:01:51');
INSERT INTO `mi_notify` VALUES (53, '您收到了来自于 游客u7iit 的留言: 测试!', 1, 3, 1, '2024-06-05 02:44:46', '2024-06-05 02:44:46');
INSERT INTO `mi_notify` VALUES (54, '您收到了来自于 游客04fqf 的留言: 测试2!', 1, 3, 1, '2024-06-05 02:44:52', '2024-06-05 02:44:52');
INSERT INTO `mi_notify` VALUES (55, '您收到了来自于 游客8d4au 的留言: 测试4!', 1, 3, 1, '2024-06-05 02:44:56', '2024-06-05 02:44:56');
INSERT INTO `mi_notify` VALUES (56, '您收到了来自于 游客xgq2g 的留言: 测试5!', 1, 3, 1, '2024-06-05 02:45:01', '2024-06-05 02:45:01');
INSERT INTO `mi_notify` VALUES (57, '您收到了来自于 游客cpq01 的留言: 不登陆测试!', 1, 3, 1, '2024-06-05 02:45:06', '2024-06-05 02:45:06');
INSERT INTO `mi_notify` VALUES (58, '您收到了来自于 游客z32ml 的留言: 登陆测试!', 1, 3, 1, '2024-06-05 02:45:22', '2024-06-05 02:45:22');
INSERT INTO `mi_notify` VALUES (59, '您收到了来自于 游客154fi 的留言: 测试!', 1, 3, 1, '2024-06-05 02:45:28', '2024-06-05 02:45:28');
INSERT INTO `mi_notify` VALUES (60, '您收到了来自于 游客5f0w0 的留言: 不登陆测试!', 1, 3, 1, '2024-06-05 02:45:35', '2024-06-05 02:45:35');
INSERT INTO `mi_notify` VALUES (61, '您收到了来自于 游客7kd3k 的留言: 登陆测试失败!', 1, 3, 1, '2024-06-05 02:48:48', '2024-06-05 02:48:48');
INSERT INTO `mi_notify` VALUES (62, '您收到了来自于 游客8guo3 的留言: 登录测试添加!', 1, 3, 1, '2024-06-05 02:51:22', '2024-06-05 02:51:22');
INSERT INTO `mi_notify` VALUES (63, '您收到了来自于 游客23hgf 的留言: 登陆测试添加23!', 1, 3, 1, '2024-06-05 02:51:53', '2024-06-05 02:51:53');
INSERT INTO `mi_notify` VALUES (64, '您收到了来自于 游客crdw1 的留言: 登录测试天界45!', 1, 3, 1, '2024-06-05 02:52:10', '2024-06-05 02:52:10');
INSERT INTO `mi_notify` VALUES (65, '您收到了来自于 游客133pq 的留言: 登陆测试555!', 1, 3, 1, '2024-06-05 03:44:00', '2024-06-05 03:44:00');
INSERT INTO `mi_notify` VALUES (66, '您收到了来自于 游客u89k9 的留言: 111!', 1, 3, 1, '2024-06-05 06:23:07', '2024-06-05 06:23:07');
INSERT INTO `mi_notify` VALUES (67, '您收到了来自于 游客b8577 的留言: 111122!', 1, 3, 1, '2024-06-05 06:25:11', '2024-06-05 06:25:11');
INSERT INTO `mi_notify` VALUES (68, '您收到了来自于 游客cna2g 的留言: 333!', 1, 3, 1, '2024-06-05 06:25:48', '2024-06-05 06:25:48');
INSERT INTO `mi_notify` VALUES (69, '您收到了来自于 游客5t2p2 的留言: 44444!', 1, 3, 1, '2024-06-05 06:26:15', '2024-06-05 06:26:15');
INSERT INTO `mi_notify` VALUES (70, '您收到了来自于 游客2k3fb 的留言: 6666!', 1, 3, 1, '2024-06-05 06:26:58', '2024-06-05 06:26:58');
INSERT INTO `mi_notify` VALUES (71, '您收到了来自于 游客3l487 的留言: 8888!', 1, 3, 1, '2024-06-05 06:27:12', '2024-06-05 06:27:12');
INSERT INTO `mi_notify` VALUES (72, '您收到了来自于 游客r4egr 的留言: 0000!', 1, 3, 1, '2024-06-05 06:27:43', '2024-06-05 06:27:43');
INSERT INTO `mi_notify` VALUES (73, '您收到了来自于 游客ix25k 的留言: 999!', 1, 3, 1, '2024-06-05 06:27:55', '2024-06-05 06:27:55');
INSERT INTO `mi_notify` VALUES (74, '您收到了来自于 游客g327p 的留言: 0000000!', 1, 3, 1, '2024-06-05 06:42:21', '2024-06-05 06:42:21');
INSERT INTO `mi_notify` VALUES (75, '您收到了来自于 游客n700q 的留言: 888!', 1, 3, 1, '2024-06-05 06:44:29', '2024-06-05 06:44:29');
INSERT INTO `mi_notify` VALUES (76, '您收到了来自于 游客57q26 的留言: undefined!', 1, 3, 1, '2024-06-06 03:12:18', '2024-06-06 03:12:18');
INSERT INTO `mi_notify` VALUES (77, '您收到了来自于 游客u1gk3 的留言: undefined!', 1, 3, 1, '2024-06-06 03:13:34', '2024-06-06 03:13:34');
INSERT INTO `mi_notify` VALUES (78, '您收到了来自于 游客g8524 的留言: undefined!', 1, 3, 1, '2024-06-06 03:15:17', '2024-06-06 03:15:17');
INSERT INTO `mi_notify` VALUES (79, '您收到了来自于 游客v8gi5 的留言: undefined!', 1, 3, 1, '2024-06-06 03:15:54', '2024-06-06 03:15:54');
INSERT INTO `mi_notify` VALUES (80, '您收到了来自于 游客5x177 的留言: undefined!', 1, 3, 1, '2024-06-06 03:18:05', '2024-06-06 03:18:05');
INSERT INTO `mi_notify` VALUES (81, '您收到了来自于 游客5d40z 的留言: undefined!', 1, 3, 1, '2024-06-06 03:18:05', '2024-06-06 03:18:05');
INSERT INTO `mi_notify` VALUES (82, '您收到了来自于 游客xen68 的留言: undefined!', 1, 3, 1, '2024-06-06 03:18:05', '2024-06-06 03:18:05');
INSERT INTO `mi_notify` VALUES (83, '您收到了来自于 游客k4orf 的留言: undefined!', 1, 3, 1, '2024-06-06 03:18:06', '2024-06-06 03:18:06');
INSERT INTO `mi_notify` VALUES (84, '您收到了来自于 游客g7324 的留言: undefined!', 1, 3, 1, '2024-06-06 03:18:07', '2024-06-06 03:18:07');
INSERT INTO `mi_notify` VALUES (85, '您收到了来自于 游客s0xk9 的留言: undefined!', 1, 3, 1, '2024-06-06 03:18:07', '2024-06-06 03:18:07');
INSERT INTO `mi_notify` VALUES (86, '您收到了来自于 游客75k0r 的留言: undefined!', 1, 3, 1, '2024-06-06 03:18:07', '2024-06-06 03:18:07');
INSERT INTO `mi_notify` VALUES (87, '您收到了来自于 游客rg5gw 的留言: undefined!', 1, 3, 1, '2024-06-06 03:18:07', '2024-06-06 03:18:07');
INSERT INTO `mi_notify` VALUES (88, '您收到了来自于 游客02g59 的留言: undefined!', 1, 3, 1, '2024-06-06 03:19:27', '2024-06-06 03:19:27');
INSERT INTO `mi_notify` VALUES (89, '您收到了来自于 游客4xe83 的留言: undefined!', 1, 3, 1, '2024-06-06 03:22:19', '2024-06-06 03:22:19');
INSERT INTO `mi_notify` VALUES (90, '您收到了来自于 游客6o5x5 的留言: undefined!', 1, 3, 1, '2024-06-06 03:22:23', '2024-06-06 03:22:23');
INSERT INTO `mi_notify` VALUES (91, '您收到了来自于 游客84745 的留言: undefined!', 1, 3, 1, '2024-06-06 03:22:26', '2024-06-06 03:22:26');
INSERT INTO `mi_notify` VALUES (92, '您收到了来自于 游客o52v4 的留言: 5555!', 1, 3, 1, '2024-06-06 03:52:27', '2024-06-06 03:52:27');
INSERT INTO `mi_notify` VALUES (93, '您收到了来自于 游客yks99 的留言: 5555!', 1, 3, 1, '2024-06-06 03:55:25', '2024-06-06 03:55:25');
INSERT INTO `mi_notify` VALUES (94, '您收到了来自于 游客k1e36 的留言: 888!', 1, 3, 1, '2024-06-06 06:21:30', '2024-06-06 06:21:30');
INSERT INTO `mi_notify` VALUES (95, '您收到了来自于 游客h5pw4 的留言: 656!', 1, 3, 1, '2024-06-06 06:22:16', '2024-06-06 06:22:16');
INSERT INTO `mi_notify` VALUES (96, '您收到了来自于 游客0nz79 的留言: 999!', 1, 3, 1, '2024-06-06 06:22:56', '2024-06-06 06:22:56');
INSERT INTO `mi_notify` VALUES (97, '您收到了来自于 游客4359g 的留言: 9999!', 1, 3, 1, '2024-06-06 06:27:00', '2024-06-06 06:27:00');
INSERT INTO `mi_notify` VALUES (98, '您收到了来自于 游客lhycq 的留言: 999!', 1, 3, 1, '2024-06-06 06:28:23', '2024-06-06 06:28:23');
INSERT INTO `mi_notify` VALUES (99, '您收到了来自于 游客g158q 的留言: gfhhj!', 1, 3, 1, '2024-06-06 06:28:40', '2024-06-06 06:28:40');
INSERT INTO `mi_notify` VALUES (100, '您收到了来自于 游客09g30 的留言: afdf g!', 1, 3, 1, '2024-06-06 06:28:44', '2024-06-06 06:28:44');
INSERT INTO `mi_notify` VALUES (101, '您收到了来自于 游客m6k90 的留言: rt456 !', 1, 3, 1, '2024-06-06 06:28:46', '2024-06-06 06:28:46');
INSERT INTO `mi_notify` VALUES (102, '您收到了来自于 游客zv25s 的留言: sfd3wr tef!', 1, 3, 1, '2024-06-06 06:28:49', '2024-06-06 06:28:49');
INSERT INTO `mi_notify` VALUES (103, '您收到了来自于 游客t66md 的留言: adsd sfg !', 1, 3, 1, '2024-06-06 06:28:51', '2024-06-06 06:28:51');
INSERT INTO `mi_notify` VALUES (104, '您收到了来自于 游客920i8 的留言: 555555!', 1, 3, 1, '2024-06-06 06:31:02', '2024-06-06 06:31:02');
INSERT INTO `mi_notify` VALUES (105, '您收到了来自于 游客k1833 的留言: 9999!', 1, 3, 1, '2024-06-06 07:42:34', '2024-06-06 07:42:34');
INSERT INTO `mi_notify` VALUES (106, '您收到了来自于 米娜 的留言: 登陆测试!', 1, 3, 1, '2024-06-06 07:52:26', '2024-06-06 07:52:26');
INSERT INTO `mi_notify` VALUES (107, '您收到了来自于 游客36n2d 的留言: 你好!', 1, 3, 1, '2024-06-26 07:58:08', '2024-06-26 07:58:08');
INSERT INTO `mi_notify` VALUES (108, '您收到了来自于 游客90q72 的留言: 测试发布留言成功!', 1, 3, 1, '2024-06-26 07:58:22', '2024-06-26 07:58:22');
INSERT INTO `mi_notify` VALUES (109, '您收到了来自于 游客487o1 的留言: 实时追加成功!', 1, 3, 1, '2024-06-26 07:58:35', '2024-06-26 07:58:35');
INSERT INTO `mi_notify` VALUES (110, '您收到了来自于 游客18ddr 的留言: 头像显示成功!', 1, 3, 1, '2024-06-26 07:58:41', '2024-06-26 07:58:41');
INSERT INTO `mi_notify` VALUES (111, '您收到了来自于 米娜 的留言: 只有当下显示成功!', 1, 3, 1, '2024-06-26 07:59:27', '2024-06-26 07:59:27');
INSERT INTO `mi_notify` VALUES (112, '您收到了来自于 米娜 的留言: 登录之后又不成功了!', 1, 3, 1, '2024-06-26 07:59:34', '2024-06-26 07:59:34');
INSERT INTO `mi_notify` VALUES (113, '您收到了来自于 米娜 的留言: 测试留言字数最多20个!', 1, 3, 1, '2024-06-26 08:00:10', '2024-06-26 08:00:10');
INSERT INTO `mi_notify` VALUES (114, '您收到了来自于 游客a5g83 的留言: 我又来了!', 1, 3, 1, '2024-07-05 02:54:59', '2024-07-05 02:54:59');
INSERT INTO `mi_notify` VALUES (115, '您收到了来自于 游客2h925 的留言: 挺好挺好!', 1, 3, 1, '2024-07-05 02:55:13', '2024-07-05 02:55:13');
INSERT INTO `mi_notify` VALUES (116, '您收到了来自于 米娜 的留言: 可惜了这个头像 在不登陆的情况如何处理!', 1, 3, 1, '2024-07-05 02:56:16', '2024-07-05 02:56:16');
INSERT INTO `mi_notify` VALUES (117, '您收到了来自于 米娜 的留言: 累了麻了  快把自己燃尽了!', 1, 3, 1, '2024-07-05 02:56:40', '2024-07-05 02:56:40');
INSERT INTO `mi_notify` VALUES (118, '您收到了来自于 米娜 的留言: 家人们 谁懂 啊!', 1, 3, 1, '2024-07-05 02:56:50', '2024-07-05 02:56:50');
INSERT INTO `mi_notify` VALUES (119, '您收到了来自于 米娜 的留言: 换一个凡人停放!', 1, 3, 1, '2024-07-05 03:48:16', '2024-07-05 03:48:16');
INSERT INTO `mi_notify` VALUES (120, '您收到了来自于 米娜 的留言: 第三个同款经理!', 1, 3, 1, '2024-07-05 03:48:29', '2024-07-05 03:48:29');
INSERT INTO `mi_notify` VALUES (121, '您收到了来自于 米娜 的留言: 色让人头疼给!', 1, 3, 1, '2024-07-05 03:48:40', '2024-07-05 03:48:40');
INSERT INTO `mi_notify` VALUES (122, '您收到了来自于 米娜 的留言: 二让人 让他他让他违法问题依然要!', 1, 3, 1, '2024-07-05 03:49:53', '2024-07-05 03:49:53');
INSERT INTO `mi_notify` VALUES (123, '您收到了来自于 米娜 的留言: 的风格和跟他说地方!', 1, 3, 1, '2024-07-05 03:49:57', '2024-07-05 03:49:57');
INSERT INTO `mi_notify` VALUES (124, '您收到了来自于 米娜 的留言: 收房东更有人投诉!', 1, 3, 1, '2024-07-05 03:50:01', '2024-07-05 03:50:01');
INSERT INTO `mi_notify` VALUES (125, '您收到了来自于 米娜 的留言: 士大夫入狱!', 1, 3, 1, '2024-07-05 03:50:05', '2024-07-05 03:50:05');
INSERT INTO `mi_notify` VALUES (126, '您收到了来自于 米娜 的留言: v成本估计有!', 1, 3, 1, '2024-07-05 03:50:09', '2024-07-05 03:50:09');
INSERT INTO `mi_notify` VALUES (127, '您收到了来自于 米娜 的留言: 就越讨厌潍坊市!', 1, 3, 1, '2024-07-05 03:50:12', '2024-07-05 03:50:12');
INSERT INTO `mi_notify` VALUES (128, '您收到了来自于 米娜 的留言: 还有他交通意外!', 1, 3, 1, '2024-07-05 03:50:17', '2024-07-05 03:50:17');
INSERT INTO `mi_notify` VALUES (129, '您收到了来自于 米娜 的留言: 饿啊是惹人厌!', 1, 3, 1, '2024-07-05 03:50:20', '2024-07-05 03:50:20');
INSERT INTO `mi_notify` VALUES (130, '您收到了来自于 米娜 的留言:  居民健康了!', 1, 3, 1, '2024-07-05 03:50:23', '2024-07-05 03:50:23');
INSERT INTO `mi_notify` VALUES (131, '您收到了来自于 米娜 的留言: 房地局佛日给你!', 1, 3, 1, '2024-07-05 03:50:25', '2024-07-05 03:50:25');
INSERT INTO `mi_notify` VALUES (132, '您收到了来自于 米娜 的留言: 开门炮佛山!', 1, 3, 1, '2024-07-05 03:50:27', '2024-07-05 03:50:27');
INSERT INTO `mi_notify` VALUES (133, '您收到了来自于 米娜 的留言: 欧佩克人民弓箭手!', 1, 3, 1, '2024-07-05 03:50:29', '2024-07-05 03:50:29');
INSERT INTO `mi_notify` VALUES (134, '您收到了来自于 米娜 的留言: 骂开了发票给彭萨科!', 1, 3, 1, '2024-07-05 03:50:31', '2024-07-05 03:50:31');
INSERT INTO `mi_notify` VALUES (135, '您收到了来自于 米娜 的留言: 没开封的李光洁!', 1, 3, 1, '2024-07-05 03:50:34', '2024-07-05 03:50:34');
INSERT INTO `mi_notify` VALUES (136, '您收到了来自于 米娜 的留言: 麻烦批手机店铺分配!', 1, 3, 1, '2024-07-05 03:50:36', '2024-07-05 03:50:36');
INSERT INTO `mi_notify` VALUES (137, '您收到了来自于 米娜 的留言: 没发票两三口二，两部分的!', 1, 3, 1, '2024-07-05 03:50:38', '2024-07-05 03:50:38');
INSERT INTO `mi_notify` VALUES (138, '您收到了来自于 米娜 的留言: 没看到房价噢批完金额!', 1, 3, 1, '2024-07-05 03:50:40', '2024-07-05 03:50:40');
INSERT INTO `mi_notify` VALUES (139, '您收到了来自于 米娜 的留言: 靠父母陪家人吗v吧!', 1, 3, 1, '2024-07-05 03:50:41', '2024-07-05 03:50:41');
INSERT INTO `mi_notify` VALUES (140, '您收到了来自于 米娜 的留言: 没覅哦配色i哦就喷手!', 1, 3, 1, '2024-07-05 03:50:43', '2024-07-05 03:50:43');
INSERT INTO `mi_notify` VALUES (141, '您收到了来自于 米娜 的留言: 灭佛培昆特派人面板!', 1, 3, 1, '2024-07-05 03:50:45', '2024-07-05 03:50:45');
INSERT INTO `mi_notify` VALUES (142, '您收到了来自于 米娜 的留言: 美国i哦怕软键盘慢跑每个时代!', 1, 3, 1, '2024-07-05 03:50:47', '2024-07-05 03:50:47');
INSERT INTO `mi_notify` VALUES (143, '您收到了来自于 米娜 的留言: 减肥哦批发价老师v!', 1, 3, 1, '2024-07-05 03:50:49', '2024-07-05 03:50:49');
INSERT INTO `mi_notify` VALUES (144, '您收到了来自于 米娜 的留言: 发你的发挥哦视频!', 1, 3, 1, '2024-07-05 03:51:36', '2024-07-05 03:51:36');
INSERT INTO `mi_notify` VALUES (145, '您收到了来自于 米娜 的留言: 偶滴放假哦!', 1, 3, 1, '2024-07-05 03:51:37', '2024-07-05 03:51:37');
INSERT INTO `mi_notify` VALUES (146, '您收到了来自于 米娜 的留言: 诺卡拉圣诞节评价!', 1, 3, 1, '2024-07-05 03:51:41', '2024-07-05 03:51:41');
INSERT INTO `mi_notify` VALUES (147, '您收到了来自于 米娜 的留言: 你覅使劲儿!', 1, 3, 1, '2024-07-05 03:51:43', '2024-07-05 03:51:43');
INSERT INTO `mi_notify` VALUES (148, '您收到了来自于 米娜 的留言: 叫偶分的皮肤平时附魔ih!', 1, 3, 1, '2024-07-05 03:51:47', '2024-07-05 03:51:47');
INSERT INTO `mi_notify` VALUES (149, '您收到了来自于 米娜 的留言: 分明是珀尔u!', 1, 3, 1, '2024-07-05 03:51:48', '2024-07-05 03:51:48');
INSERT INTO `mi_notify` VALUES (150, '您收到了来自于 米娜 的留言: 两节课大佛怕怕!', 1, 3, 1, '2024-07-05 03:51:50', '2024-07-05 03:51:50');
INSERT INTO `mi_notify` VALUES (151, '您收到了来自于 米娜 的留言: 的麻烦了!', 1, 3, 1, '2024-07-05 03:51:51', '2024-07-05 03:51:51');
INSERT INTO `mi_notify` VALUES (152, '您收到了来自于 米娜 的留言: 觉得怕!', 1, 3, 1, '2024-07-05 03:51:53', '2024-07-05 03:51:53');

-- ----------------------------
-- Table structure for mi_photo
-- ----------------------------
DROP TABLE IF EXISTS `mi_photo`;
CREATE TABLE `mi_photo`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `album_id` int(0) NULL DEFAULT NULL COMMENT '相册id 属于哪个相册',
  `url` varchar(555) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '图片地址',
  `status` int(0) NULL DEFAULT 1 COMMENT '状态 1 正常 2 回收站 3 彻底删除',
  `createAt` datetime(0) NULL DEFAULT NULL,
  `updateAt` datetime(0) NULL DEFAULT NULL,
  `createdAt` datetime(0) NOT NULL,
  `updatedAt` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 25 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mi_photo
-- ----------------------------
INSERT INTO `mi_photo` VALUES (3, 1, 'http://127.0.0.1:8888/ac1a6e61b9373c26e5f1cf703', 1, NULL, NULL, '2024-03-19 07:24:07', '2024-03-19 07:24:07');
INSERT INTO `mi_photo` VALUES (4, 1, 'http://127.0.0.1:8888/87af9b5290dc7a0f08c4fba01', 1, NULL, NULL, '2024-03-20 02:14:10', '2024-03-20 02:14:10');
INSERT INTO `mi_photo` VALUES (5, 1, 'http://127.0.0.1:8888/87af9b5290dc7a0f08c4fba00', 1, NULL, NULL, '2024-03-20 02:14:10', '2024-04-24 03:42:34');
INSERT INTO `mi_photo` VALUES (6, 2, 'http://127.0.0.1:8888/2a009a474d38ba09d252e1d03', 1, NULL, NULL, '2024-03-20 02:28:28', '2024-03-20 02:28:28');
INSERT INTO `mi_photo` VALUES (7, 2, 'http://127.0.0.1:8888/2a009a474d38ba09d252e1d01', 1, NULL, NULL, '2024-03-20 02:28:28', '2024-03-20 02:28:28');
INSERT INTO `mi_photo` VALUES (8, 2, 'http://127.0.0.1:8888/2a009a474d38ba09d252e1d05', 1, NULL, NULL, '2024-03-20 02:28:28', '2024-03-20 02:28:28');
INSERT INTO `mi_photo` VALUES (9, 2, 'http://127.0.0.1:8888/2a009a474d38ba09d252e1d04', 1, NULL, NULL, '2024-03-20 02:28:28', '2024-03-20 02:28:28');
INSERT INTO `mi_photo` VALUES (10, 2, 'http://127.0.0.1:8888/2a009a474d38ba09d252e1d02', 1, NULL, NULL, '2024-03-20 02:28:28', '2024-03-20 02:28:28');
INSERT INTO `mi_photo` VALUES (13, 3, 'http://127.0.0.1:8888/f56d6e7a0657cee8354612709', 1, NULL, NULL, '2024-04-15 09:21:39', '2024-04-15 09:21:39');
INSERT INTO `mi_photo` VALUES (14, 3, 'http://127.0.0.1:8888/f56d6e7a0657cee8354612703', 1, NULL, NULL, '2024-04-15 09:21:39', '2024-04-15 09:21:39');
INSERT INTO `mi_photo` VALUES (15, 3, 'http://127.0.0.1:8888/f56d6e7a0657cee835461270a', 1, NULL, NULL, '2024-04-15 09:21:39', '2024-04-15 09:21:39');
INSERT INTO `mi_photo` VALUES (16, 3, 'http://127.0.0.1:8888/f56d6e7a0657cee8354612708', 1, NULL, NULL, '2024-04-15 09:21:39', '2024-04-15 09:21:39');
INSERT INTO `mi_photo` VALUES (17, 3, 'http://127.0.0.1:8888/f56d6e7a0657cee8354612702', 1, NULL, NULL, '2024-04-15 09:21:39', '2024-04-15 09:21:39');
INSERT INTO `mi_photo` VALUES (18, 3, 'http://127.0.0.1:8888/f56d6e7a0657cee8354612704', 1, NULL, NULL, '2024-04-15 09:21:39', '2024-04-15 09:21:39');
INSERT INTO `mi_photo` VALUES (19, 3, 'http://127.0.0.1:8888/f56d6e7a0657cee8354612705', 1, NULL, NULL, '2024-04-15 09:21:39', '2024-04-15 09:21:39');
INSERT INTO `mi_photo` VALUES (20, 3, 'http://127.0.0.1:8888/f56d6e7a0657cee8354612706', 1, NULL, NULL, '2024-04-15 09:21:39', '2024-04-15 09:21:39');
INSERT INTO `mi_photo` VALUES (21, 3, 'http://127.0.0.1:8888/f56d6e7a0657cee8354612707', 1, NULL, NULL, '2024-04-15 09:21:39', '2024-04-15 09:21:39');
INSERT INTO `mi_photo` VALUES (22, 3, 'http://127.0.0.1:8888/f56d6e7a0657cee835461270b', 1, NULL, NULL, '2024-04-15 09:21:52', '2024-04-15 09:21:52');
INSERT INTO `mi_photo` VALUES (23, 3, 'http://127.0.0.1:8888/f56d6e7a0657cee835461270c', 1, NULL, NULL, '2024-04-15 09:21:52', '2024-04-15 09:21:52');
INSERT INTO `mi_photo` VALUES (24, 3, 'http://127.0.0.1:8888/f56d6e7a0657cee835461270d', 1, NULL, NULL, '2024-04-15 09:21:52', '2024-04-15 09:21:52');

-- ----------------------------
-- Table structure for mi_tag
-- ----------------------------
DROP TABLE IF EXISTS `mi_tag`;
CREATE TABLE `mi_tag`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `tag_name` varchar(55) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '标签名称 唯一',
  `createdAt` datetime(0) NULL DEFAULT NULL,
  `updatedAt` datetime(0) NULL DEFAULT NULL,
  `deletedAt` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `tag_name`(`tag_name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mi_tag
-- ----------------------------
INSERT INTO `mi_tag` VALUES (1, '个人随记', '2024-08-05 06:41:42', '2024-08-05 06:41:42', NULL);

-- ----------------------------
-- Table structure for mi_talk
-- ----------------------------
DROP TABLE IF EXISTS `mi_talk`;
CREATE TABLE `mi_talk`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '说说内容',
  `user_id` int(0) NULL DEFAULT NULL COMMENT '发布说说的用户id',
  `status` int(0) NULL DEFAULT 1 COMMENT '说说状态 1 公开 2 私密 3 回收站',
  `is_top` int(0) NULL DEFAULT 2 COMMENT '是否置顶 1 置顶 2 不置顶',
  `like_times` int(0) NULL DEFAULT 0 COMMENT '点赞次数',
  `createdAt` datetime(0) NULL DEFAULT NULL,
  `updatedAt` datetime(0) NULL DEFAULT NULL,
  `deletedAt` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 34 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mi_talk
-- ----------------------------
INSERT INTO `mi_talk` VALUES (1, '测试发表', 1, 3, 2, 0, '2024-03-12 02:27:44', '2024-03-12 06:27:13', '2024-03-13 02:55:51');
INSERT INTO `mi_talk` VALUES (2, '测试发表2', 2, 3, 2, 0, '2024-03-12 02:51:32', '2024-03-12 06:27:11', '2024-03-13 02:55:54');
INSERT INTO `mi_talk` VALUES (3, '1111', 2, 3, 2, 0, '2024-03-12 02:51:55', '2024-03-12 06:27:07', '2024-03-13 02:55:57');
INSERT INTO `mi_talk` VALUES (4, '111', 2, 3, 2, 0, '2024-03-12 02:53:04', '2024-03-12 06:27:03', '2024-03-13 02:55:59');
INSERT INTO `mi_talk` VALUES (5, '111', 2, 3, 2, 0, '2024-03-12 03:00:18', '2024-03-12 06:26:51', '2024-03-13 02:56:02');
INSERT INTO `mi_talk` VALUES (6, '1111', 2, 3, 2, 0, '2024-03-12 03:00:58', '2024-03-12 06:26:56', '2024-03-13 02:56:05');
INSERT INTO `mi_talk` VALUES (7, 'ghfgdr', 2, 3, 2, 0, '2024-03-12 06:13:35', '2024-03-12 06:27:00', '2024-03-13 02:56:07');
INSERT INTO `mi_talk` VALUES (8, '', 2, 3, 2, 0, '2024-03-12 06:26:32', '2024-03-12 06:26:48', '2024-03-13 02:56:10');
INSERT INTO `mi_talk` VALUES (9, 'ytgggg', 2, 3, 2, 0, '2024-03-12 06:27:24', '2024-03-13 02:55:44', '2024-03-13 02:56:12');
INSERT INTO `mi_talk` VALUES (10, '古典风格', 0, 3, 2, 0, '2024-03-12 07:58:29', '2024-03-13 02:56:16', '2024-03-13 02:56:38');
INSERT INTO `mi_talk` VALUES (11, '和分发给', 0, 3, 2, 0, '2024-03-12 08:00:12', '2024-03-13 02:56:19', '2024-03-13 02:56:40');
INSERT INTO `mi_talk` VALUES (12, 'gchng', 0, 3, 2, 0, '2024-03-12 08:31:57', '2024-03-13 02:56:21', '2024-03-13 02:56:42');
INSERT INTO `mi_talk` VALUES (13, 'hgnmghjm', 0, 3, 2, 0, '2024-03-12 08:35:27', '2024-03-13 02:56:23', '2024-03-13 02:56:44');
INSERT INTO `mi_talk` VALUES (14, 'kulkj', 0, 3, 2, 0, '2024-03-12 08:39:44', '2024-03-13 02:56:25', '2024-03-13 02:56:47');
INSERT INTO `mi_talk` VALUES (15, 'fghdgh', 0, 3, 2, 0, '2024-03-12 08:42:37', '2024-03-13 02:56:28', '2024-03-13 02:56:49');
INSERT INTO `mi_talk` VALUES (16, 'fdsfgsd', 0, 3, 2, 0, '2024-03-12 08:44:19', '2024-03-13 02:56:59', '2024-03-13 02:57:02');
INSERT INTO `mi_talk` VALUES (17, 'hdfhh', 0, 3, 2, 0, '2024-03-12 08:49:46', '2024-03-13 02:56:32', '2024-03-13 02:56:53');
INSERT INTO `mi_talk` VALUES (18, 'gfgfd', 0, 3, 2, 0, '2024-03-12 08:52:17', '2024-03-13 02:56:34', '2024-03-13 02:56:55');
INSERT INTO `mi_talk` VALUES (19, '图片回显不了', 2, 1, 2, 5, '2024-03-13 02:49:11', '2024-08-05 09:18:31', NULL);
INSERT INTO `mi_talk` VALUES (20, '可以上传', 2, 1, 2, 1, '2024-03-13 02:50:43', '2024-04-24 07:48:24', NULL);
INSERT INTO `mi_talk` VALUES (21, '只能显示用户名，不能显示昵称？', 2, 3, 1, 1, '2024-03-13 03:58:28', '2024-04-24 07:48:23', NULL);
INSERT INTO `mi_talk` VALUES (22, '只能显示用户名，不能显示昵称', 2, 1, 2, 3, '2024-03-13 03:59:58', '2024-05-24 06:18:51', NULL);
INSERT INTO `mi_talk` VALUES (23, '能显示昵称和头像，但是只能是当前登录人的', 2, 1, 2, 2, '2024-03-14 06:35:31', '2024-05-17 07:38:43', NULL);
INSERT INTO `mi_talk` VALUES (24, '很奇怪，好像说说昵称的显示不是当前登录人了', 2, 1, 1, 1, '2024-03-14 06:50:19', '2024-06-25 02:40:01', NULL);
INSERT INTO `mi_talk` VALUES (25, '现在是 时间显示有点问题', 2, 1, 2, 1, '2024-03-14 06:51:10', '2024-04-24 07:48:15', NULL);
INSERT INTO `mi_talk` VALUES (26, '发布有点问题，不是success， 而是 info', 2, 1, 2, 1, '2024-03-14 06:53:12', '2024-04-24 07:48:14', NULL);
INSERT INTO `mi_talk` VALUES (27, '再测试一次发布说说', 2, 1, 2, 1, '2024-03-14 06:54:40', '2024-04-24 07:48:12', NULL);
INSERT INTO `mi_talk` VALUES (28, '发布说说正常', 2, 1, 2, 2, '2024-03-14 08:16:40', '2024-04-24 07:48:10', NULL);
INSERT INTO `mi_talk` VALUES (29, '发现了一些小bug，基本上都是自己粗心写错了，导致各种问题的出现，好在细心检查之后，成功解决了！', 2, 1, 2, 1, '2024-04-07 08:29:31', '2024-04-24 07:48:08', NULL);
INSERT INTO `mi_talk` VALUES (30, '出现一个新问题，置顶的说说没有置顶，只是修改了数据', 2, 1, 2, 2, '2024-04-07 08:31:36', '2024-05-17 07:43:11', NULL);
INSERT INTO `mi_talk` VALUES (31, '前台留言模块上传图片不了，报500错误了', 2, 1, 2, 1, '2024-04-24 07:47:50', '2024-04-24 07:48:04', NULL);
INSERT INTO `mi_talk` VALUES (32, '测试图片发布', 2, 1, 2, 0, '2024-06-17 06:29:24', '2024-06-17 06:29:24', NULL);
INSERT INTO `mi_talk` VALUES (33, '后台管理差不多完善基础功能了，加油，冲呀~', 2, 1, 1, 0, '2024-06-26 07:07:56', '2024-06-26 07:07:56', NULL);

-- ----------------------------
-- Table structure for mi_talk_photo
-- ----------------------------
DROP TABLE IF EXISTS `mi_talk_photo`;
CREATE TABLE `mi_talk_photo`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `talk_id` int(0) NULL DEFAULT NULL COMMENT '说说的id',
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '图片地址',
  `createdAt` datetime(0) NULL DEFAULT NULL,
  `updatedAt` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 31 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mi_talk_photo
-- ----------------------------
INSERT INTO `mi_talk_photo` VALUES (14, 20, 'http://127.0.0.1:8888/70ac61235268a6a05b30e6701', '2024-03-13 02:50:43', '2024-03-13 02:50:43');
INSERT INTO `mi_talk_photo` VALUES (15, 21, 'http://127.0.0.1:8888/70ac61235268a6a05b30e6702', '2024-03-13 03:58:28', '2024-03-13 03:58:28');
INSERT INTO `mi_talk_photo` VALUES (16, 22, 'http://127.0.0.1:8888/70ac61235268a6a05b30e6703', '2024-03-13 03:59:58', '2024-03-13 03:59:58');
INSERT INTO `mi_talk_photo` VALUES (17, 23, 'http://127.0.0.1:8888/97ab8f4949c2d54076e5e2400', '2024-03-14 06:35:31', '2024-03-14 06:35:31');
INSERT INTO `mi_talk_photo` VALUES (18, 24, 'http://127.0.0.1:8888/0fb9b1d04e76997bbcacb2f00', '2024-03-14 06:50:19', '2024-03-14 06:50:19');
INSERT INTO `mi_talk_photo` VALUES (19, 25, 'http://127.0.0.1:8888/0fb9b1d04e76997bbcacb2f01', '2024-03-14 06:51:10', '2024-03-14 06:51:10');
INSERT INTO `mi_talk_photo` VALUES (20, 26, 'http://127.0.0.1:8888/0fb9b1d04e76997bbcacb2f02', '2024-03-14 06:53:12', '2024-03-14 06:53:12');
INSERT INTO `mi_talk_photo` VALUES (21, 27, 'http://127.0.0.1:8888/0fb9b1d04e76997bbcacb2f03', '2024-03-14 06:54:40', '2024-03-14 06:54:40');
INSERT INTO `mi_talk_photo` VALUES (22, 27, 'http://127.0.0.1:8888/0fb9b1d04e76997bbcacb2f04', '2024-03-14 06:54:40', '2024-03-14 06:54:40');
INSERT INTO `mi_talk_photo` VALUES (24, 19, 'http://127.0.0.1:8888/9f792e15b0a5e6377968e5104', '2024-03-14 07:16:08', '2024-03-14 07:16:08');
INSERT INTO `mi_talk_photo` VALUES (25, 28, 'http://127.0.0.1:8888/9f792e15b0a5e6377968e5105', '2024-03-14 08:16:40', '2024-03-14 08:16:40');
INSERT INTO `mi_talk_photo` VALUES (26, 29, 'http://127.0.0.1:8888/4f545ae5fb670ce350d7b6d00', '2024-04-07 08:29:31', '2024-04-07 08:29:31');
INSERT INTO `mi_talk_photo` VALUES (27, 30, 'http://127.0.0.1:8888/4f545ae5fb670ce350d7b6d01', '2024-04-07 08:31:36', '2024-04-07 08:31:36');
INSERT INTO `mi_talk_photo` VALUES (28, 31, 'http://127.0.0.1:8888/b211b5e11aae0c61acb80cf03', '2024-04-24 07:47:50', '2024-04-24 07:47:50');
INSERT INTO `mi_talk_photo` VALUES (29, 32, 'http://127.0.0.1:8888/805e8728ded452ecfbea41500', '2024-06-17 06:29:24', '2024-06-17 06:29:24');
INSERT INTO `mi_talk_photo` VALUES (30, 33, 'http://127.0.0.1:8888/6b6ed31805b043f5d78eff000', '2024-06-26 07:07:56', '2024-06-26 07:07:56');

-- ----------------------------
-- Table structure for mi_users
-- ----------------------------
DROP TABLE IF EXISTS `mi_users`;
CREATE TABLE `mi_users`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '用户ID 唯一',
  `user_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户名,唯一',
  `password` char(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '密码',
  `role` int(0) NOT NULL DEFAULT 2 COMMENT '用户角色 1 管理员 2 普通用户',
  `nick_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT '' COMMENT '用户昵称',
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT 'http://localhost:8888/11d9bb8bf54125a26464b5c00.jpg' COMMENT '用户头像',
  `createdAt` datetime(0) NULL DEFAULT NULL,
  `updatedAt` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `user_name`(`user_name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mi_users
-- ----------------------------
INSERT INTO `mi_users` VALUES (1, 'admin', '$2a$10$Dba033ranLrFueWOVLOY3.2Uc0yrvxA7EJkF6D3nZfd37rVpfMYla', 1, '超级管理员', 'http://127.0.0.1:8888/665d7417ccaa2b7287f6da700', '2024-02-26 06:53:17', '2024-04-25 02:03:33');
INSERT INTO `mi_users` VALUES (2, 'mina', '$2a$10$QYdxSYuYeBvehVSx1Gb/COxP6.pYpMQuF4D9nA3zG3YgS74kKaI/e', 1, '米娜', 'http://127.0.0.1:8888/f26c1788bbd361d2161a85b00', '2024-02-26 06:55:51', '2024-03-22 02:51:40');
INSERT INTO `mi_users` VALUES (3, 'popular', '$2a$10$IHiQpeGh9TSgQFrYwiFJcOaejRd6TVtD1HvQzC52VGTf8P82Zwxu6', 2, '普通用户', 'http://127.0.0.1:8888/b211b5e11aae0c61acb80cf00', '2024-03-13 06:04:01', '2024-03-21 06:20:08');
INSERT INTO `mi_users` VALUES (4, 'test', '$2a$10$pSvEKKNXjE3ekbzJXQOAA.IUZV3tdxIsfon6dR8.erg8eRE5Swdy2', 2, '测试用户', 'http://127.0.0.1:8888/b211b5e11aae0c61acb80cf00', '2024-03-14 02:01:48', '2024-03-14 02:01:48');
INSERT INTO `mi_users` VALUES (5, 'test2', '$2a$10$Lu1zH9xQqDoX73f/Vzkrue0JZGAPldaqUU3xOewCQef0WfQf1/A.q', 2, '测试用户2', 'http://127.0.0.1:8888/b211b5e11aae0c61acb80cf00', '2024-03-14 02:04:09', '2024-03-14 02:04:09');
INSERT INTO `mi_users` VALUES (6, 'hhhhhh', '$2a$10$biQXEKLW6az7Xz0uhcCV3uA2iNfd745WRfAO8VW.1xCrtk8uiUbsG', 2, '星星w5wiiaqh', 'http://127.0.0.1:8888/b211b5e11aae0c61acb80cf00', '2024-03-21 03:38:18', '2024-03-21 03:38:21');
INSERT INTO `mi_users` VALUES (7, 'cheshiming', '$2a$10$2Uz61LslyvlKD0AGkBWEDuvwhhVj//7V/ZJR0vTskyVvt11jrlB96', 2, '星星v44d2xvf', 'http://127.0.0.1:8888/b211b5e11aae0c61acb80cf00', '2024-03-27 06:18:17', '2024-04-24 02:22:28');

SET FOREIGN_KEY_CHECKS = 1;
