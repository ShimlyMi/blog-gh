# 一、项目初始化

## 1. npm初始化

```
npm init -y
```

生成 `package.json` 文件，项目依赖文件

## 2. git初始化

```
git init
```

生成 `.git` 隐藏文件，git 的本地仓库

## 3. 创建 ReadMe文件

# 二、项目搭建

## 1. 安装KOA框架

```
npm install koa
```

## 2. 编写最基本的app

创建 `src/main.js`

```javascript
const Koa = require('koa');

const app = new Koa();

app.use((ctx, next) => {
    ctx.body = 'hello api';
})

app.listen(3300, () => {
    console.log('server is running on http://localhost:3300');
})
```

## 3. 测试

在终端 使用 `node src/main.js` 运行

![终端测试](E:\project\gitclone\api\pic\终端测试.jpg)

# 三、项目的基本优化

## 1. 自动重启服务

安装 `nodemon` 工具

```
npm i nodemon -D
```

编写  `package.json` 脚本

```json
"scripts": {
	"dev": "nodemon ./src/main.js",
	"test": "echo \"Error: no test specified\" && exit 1"
},
```

在终端执行 `nodemon ./src/main.js`

![nodemon终端测试](E:\project\gitclone\api\pic\nodemon终端测试.jpg)

## 2. 读取配置文件

安装 `dotenv`，读取根目录中的 `.env` 文件

```
npm i dotenv -S
```

创建 `.env` 文件

```
APP_PORT=8000
```

创建 `config/config.default.js`

```js
const dotenv = require("dotenv");

dotenv.config()

// console.log(process.env.APP_PORT)

module.exports = process.env
```

在 `main.js` 上去调用

```js
const Koa = require('koa');
//导入配置文件
const { APP_PORT } = require("./website/website.default")

const app = new Koa();

app.use((ctx, next) => {
    ctx.body = 'hello api';
})

app.listen(APP_PORT, () => {
    console.log(`server is running on http://localhost:${APP_PORT}`);
})
```

# 四、添加路由

路由就是根据不同的URL，调用不同的处理函数

## 1. 安装koa-router

```
npm i koa-router
```

步骤：

1. 导入包
2. 实例化对象
3. 编写路由
4. 注册中间件

## 2.  编写路由

创建 `src/route`  目录，编写 `user.route.js`

```js
const Router = require('koa-router')
// 编写一个前缀 用于区分
const router = new Router({ prefix: '/users' })

// GET /users/
router.get("/", (ctx, next) => {
    ctx.body = 'Users'
})
// 向外 暴露 路由接口
module.exports = router;
```

## 3. 改写 main.js

```js
const Koa = require('koa');

const { APP_PORT } = require("./website/website.default")
// 导入 user.route 文件
const userRouter = require("./router/user.route")

const app = new Koa();

app.use((ctx, next) => {
    ctx.body = 'hello api';
})
// 调用 函数
app.use(userRouter.routes())

app.listen(APP_PORT, () => {
    console.log(`server is running on http://localhost:${APP_PORT}`);
})
```

# 五、目录结构的优化

## 1. 把http服务和app业务拆分

创建 `src/app`，编写 `index.js`

```js
const Koa = require('koa');
const userRouter = require("../router/user.route")

const app = new Koa();

app.use(userRouter.routes())
// 向外暴露 app 接口
module.exports = app;
```

改写 `main.js`

```js
const { APP_PORT } = require("./website/website.default")
// 导入 app
const app = require("./app")

app.use((ctx, next) => {
    ctx.body = 'hello api';
})

app.listen(APP_PORT, () => {
    console.log(`server is running on http://localhost:${APP_PORT}`);
})
```



## 2. 将路由和控制器拆分

路由：解析URL，分发给控制器对应的方法

控制器：处理不同的业务

改写 `user.route.js`

```js
const Router = require('koa-router')

// 导入 UserController 对象
const { register, login } = require("../controller/user.controller")

const router = new Router({ prefix: '/users' })

// 注册接口
router.post("/register", register)

// 登录接口
router.post("/login", login)

module.exports = router;
```

创建控制器文件  `src/controller`，编写 `user.controller.js`

```js
/*
 * 用的是 ES6 的写法，用 类 编写 异步请求的函数 
 */

class UserController {
    async register(ctx, next) {
        ctx.body = '用户注册成功'
    }

    async login(ctx, next) {
        ctx.body = '用户登录成功'
    }
}

// 用对象的形式 对外暴露
module.exports = new UserController();
```

# 六、解析Body

## 1. 安装 koa-body

```
npm i koa-body
```

## 2. 注册中间件

改写 `app/index.js`

```js
const Koa = require('koa');
// 注册中间件，要在所有路由请求之前
const { koaBody } = require("koa-body")

const userRouter = require("../router/user.route")


const app = new Koa();

app.use(koaBody())
app.use(userRouter.routes())


module.exports = app;
```

## 3. 解析 请求数据

改写`user.controller.js` 文件

```js
const { createUser } = require("../service/user.service")

class UserController {
    async register(ctx, next) {
        // 1. 获取数据
        // console.log(ctx.request.body);
        const { user_name, password } = ctx.request.body
        // 2. 操作数据库
        const res = await createUser(user_name, password)
        console.log(res);
        // 3. 返回数据
        ctx.body = ctx.request.body
    }

    async login(ctx, next) {
        ctx.body = '用户登录成功'
    }
}


module.exports = new UserController();
```

## 4. 拆分service

主要是用于数据库的处理，创建 `src/service` ， 编写 `user.service.js`

```js
class UserService {
    async createUser(user_name, password) {
        // todo: 写入数据库
        return "写入数据库成功"
    }
}

module.exports = new UserService()
```

# 七、数据库操作

sequelize ORM 数据库工具

ORM：对象关系映射，其主要作用是在编程中，把面向对象的概念跟数据库中表的概念对应起来。

- 数据表映射(对应)一个类
- 数据表中的数据行(记录)对应一个队形
- 数据表字段队形对象的属性
- 数据表的操作对应对象的方法

## 1. 安装 sequelize和mysql

```
npm i mysql2 sequelize
```

**Sequelize 支持的 MySQL 版本 最低 5.7版本**

## 2. 连接数据库

现在本地数据库创建一个数据库。目前在用 Navicat，使用UTF-8

在 `src/db` ，编写 `seq.js`

```js
const { Sequelize } = require("sequelize")
// 导入 配置文件里的 MYSQL 配置
const {
    MYSQL_HOST,
    MYSQL_POST,
    MYSQL_USER,
    MYSQL_PWD,
    MYSQL_DB
} = require("../website/website.default")

// 实例化对象
const seq = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PWD, {
    host: MYSQL_HOST,

    dialect: 'mysql',
})

// 测试链接
seq.authenticate().then(() => {
    console.log("数据库连接成功");
}).catch((err) => {
    console.log("数据库连接失败", err);
})

module.exports = seq
```

## 3. 修改 .env 文件

```
APP_PORT = 8000

// 配置 mysql

MYSQL_HOST = localhost
MYSQL_POST = 3306
MYSQL_USER = root
MYSQL_PWD = root
MYSQL_DB = mgsc
```

## 4. 创建模型

创建 `src/model/user.model.js`

```js
// 	使用的是 seq.define 方法
const { Sequelize, DataTypes } = require("sequelize")
// 导入 seq
const seq = require("../db/seq")

// 创建模型 (所对应的数据表 mg_Users)
const User = seq.define('mg_User', {
    // 编写表的字段
    /*
     * id 会被 sequelize 自动创建
     */
  // 用户名
    user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: "用户名,唯一",
    },
    password: {
        type: DataTypes.CHAR(64),
        allowNull: false,
        comment: "密码",
    },
    is_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
        comment: "是否为管理员,0:不是管理员(默认),1:是管理员",
    }
})

// 强制同步数据库
User.sync({ force: true })
// console.log("User模型同步成功");

module.exports = User
```

更改`user.service.js`

```js
const User = require("../model/user.model")


class UserService {
    async createUser(user_name, password) {
        // todo: 写入数据库
        // return "写入数据库成功"

        // 键值对的名字一样时可以简写，即 只写一个
        // await 返回的是成功的值
        // 注意postman 发送请求 必须选择 JSON
        const res = await User.create({ user_name, password })
            // console.log(res);
        return res.dataValues
    }
}

module.exports = new UserService()

/*
 * 遇到了一个问题，在 postman 发送数据 的时候，会报错
 *  SequelizeValidationError: notNull Violation: mg_user.user_name cannot be null,
  notNull Violation: mg_user.password cannot be null
 * 这个时候 要检查一下，postman 发送的数据是不是JSON 
 */
```

![postman数据请求](E:\project\gitclone\api\pic\postman数据请求.jpg)

# 八、添加用户入库

所有数据库的操作都在 Service 层完成, Service 调用 Model 完成数据库操作

改写 `src/service/user.service.js`

```js
const User = require("../model/user.model")
class UserService {
    async createUser(user_name, password) {
        // todo: 写入数据库
        // return "写入数据库成功"

        // 键值对的名字一样时可以简写，即 只写一个
        // await 返回的是成功的值
        // 注意postman 发送请求 必须选择 JSON
        const res = await User.create({ user_name, password })
            // console.log(res);
        return res.dataValues
    }
}

module.exports = new UserService()
```

改写 `src/controller/user.controller.js`

```js
const { createUser, getUserInfo } = require("../service/user.service")
    // const { userFormatError } = require("../constant/err.type")

class UserController {
    async register(ctx, next) {
        // 1. 获取数据
        // console.log(ctx.request.body);
        const { user_name, password } = ctx.request.body
        // 2. 操作数据库
        const res = await createUser(user_name, password);
        // 3. 返回数据
        ctx.body = {
            code: 0,
            message: '用户注册成功',
            result: {
                id: res.id,
                user_name: res.user_name,
            }
        };

        // console.log(res);

    }

    async login(ctx, next) {
        ctx.body = '用户登录成功'
    }
}


module.exports = new UserController();
```

# 九、错误处理

## 1. 简单错误处理

在控制器中, 对不同的错误进行处理, 返回不同的提示错误提示, 提高代码质量

改写 `src/controller/user.controller.js`

```js
const { createUser, getUserInfo } = require("../service/user.service")
    // const { userFormatError } = require("../constant/err.type")

class UserController {
    async register(ctx, next) {
        // 1. 获取数据
        // console.log(ctx.request.body);
        const { user_name, password } = ctx.request.body

        /**判断错误 */
        // 合法性
        if (!user_name || !password) {
            console.error("用户名或密码为空")
            ctx.status = 400;
            ctx.body = {
                code: '10001',
                message: '用户名或密码为空',
                result: ''
            }
            return
        }

        // 合理性
        if (getUserInfo({ user_name })) {
            console.error("用户已经存在")
            ctx.status = 409
            ctx.body = {
                code: '10002',
                message: '用户已经存在',
                result: ''
            }

        }

        // 2. 操作数据库
        const res = await createUser(user_name, password);
        // 3. 返回数据
        ctx.body = {
            code: 0,
            message: '用户注册成功',
            result: {
                id: res.id,
                user_name: res.user_name,
            }
        };

        // console.log(res);

    }

    async login(ctx, next) {
        ctx.body = '用户登录成功'
    }
}


module.exports = new UserController();
```

在 service 中封装函数

```js
const User = require("../model/user.model")


class UserService {
    async createUser(user_name, password) {
        // 键值对的名字一样时可以简写，即 只写一个
        // await 返回的是成功的值
        // 注意postman 发送请求 必须选择 JSON
        const res = await User.create({ user_name, password })
        // console.log(res);
        return res.dataValues
    };

    // 查询用户信息
    async getUserInfo({id, user_name, password, is_admin}) {
        const whereOpt = {};
        /*
         * 判断 id user_name password id_admin 是否存在
         * assign 是拷贝
         */
        id && Object.assign(whereOpt, { id });
        user_name && Object.assign(whereOpt, { user_name });
        password && Object.assign(whereOpt, { password });
        is_admin && Object.assign(whereOpt, { is_admin });

        // 查询数据记录
        const res = await User.findOne({
            attributes:['id', 'user_name', 'password', 'is_admin'],
            where: whereOpt,
        });
        return res ? res.dataValues : null;
    }
}

module.exports = new UserService()
```



## 2. 拆分中间件

添加编写中间件文件 `src/middleware/user.middleware.js`

```js
const { getUserInfo } = require("../service/user.service")
// 引入 错误类型文件
const { userFormatError, userAlreadyExited, userRegisterError } = require("../constant/err.type")

// 用户验证器
const userValidator = async (ctx,next) => {
    const { user_name,password } = ctx.request.body;
    /* 判断错误 合法性 */
    if (!user_name || !password) {
        console.error("用户名或密码为空", ctx.request.body)
        ctx.app.emit('error', userFormatError, ctx);
        return
    }
    await next()
}

const verifyUser = async (ctx,next) => {
    const  { user_name } = ctx.request.body;
    // 因为 getUserInfo 是异步请求，所以有两种方式可以
    /* 第一种：直接加 await */
    // if (await getUserInfo({ user_name })) {
    //     console.error("用户已经存在", ctx.request.body)
    //     ctx.app.this.$emit('error', userAlreadyExited, ctx);
    //     return
    // }
    /* 第二种 用 try-catch 去判断 用户信息(这种会更好一些) */
    console.log(user_name);
    try {
        const res = await getUserInfo({user_name});
        if (res) {
            console.log("用户名已存在", ctx.request.body);
            ctx.app.emit('error', userAlreadyExited, ctx);
            return;
        }
    } catch (err) {
        console.error("获取用户信息错误", err);
        ctx.app.emit('error', userRegisterError, ctx);
        return;
    }
    await next();
}

module.exports = {
    userValidator,
    verifyUser
}
```

改写路由：`src/router/user.route.js`

```js
const Router = require('koa-router')

// 导入 register 对象
const { userValidator, verifyUser } = require("../middleware/user.middleware")
const { register, login } = require("../controller/user.controller")

const router = new Router({ prefix: '/users' })

// 注册接口
/* 先判断用户名或密码是否为空，在判断用户名是否存在，然后才是进行注册 */
router.post("/register", userValidator, verifyUser, register)

// 登录接口
router.post("/login", login)

module.exports = router;
```



## 3. 统一错误处理

在 错误处理的地方 用 **ctx.app.$emit()** 方法 提交错误

在 App 中 要用 **app.on()** 方法 来接收

编写统一错误类型文件 `src/constant/err.type.js`

```js
module.exports = {
    userFormatError: {
        code: '10001',
        message: '用户名或密码为空',
        result: ''
    },
    userAlreadyExited: {
        code: '10002',
        message: '用户已经存在',
        result: ''
    },
    userRegisterError: {
        code: '10003',
        message: '用户注册错误',
        result: ''
    },
    userDoesNotExist: {
        code: '10004',
        message: '用户不存在',
        result: ''
    },
    userLoginError: {
        code: '10005',
        message: '用户登录失败',
        result: ''
    },
    invalidPassword: {
        code: '10006',
        message: '密码不匹配',
        result: ''
    },
    tokenExpiredError: {
        code: '10101',
        message: 'token已过期',
        result: ''
    },
    invalidToken: {
        code: '10102',
        message: '无效的token',
        result: ''
    },
    hasNotAdminPermission: {
        code: '10103',
        message: '没有管理员权限',
        result: ''
    },
    fileUploadError: {
        code: '10201',
        message: '商品图片上传失败',
        result: ''
    },
    unSupportedFileType: {
        code: '10202',
        message: '不支持文件格式',
        result: ''
    },
    goodsFormatError: {
        code: '10203',
        message: '商品参数格式错误',
        result: ''
    },
    publishGoodsError: {
        code: '10204',
        message: '商品发布失败',
        result: '',
    },
    invalidGoods: {
        code: '10205',
        message: '无效商品',
        result: '',
    },
    cartFormatError: {
        code: '10301',
        message: '购物车数据格式错误',
        result: '',
    },
    addressFormatError: {
        code: '10401',
        message: '地址数据格式错误',
        result: '',
    },
    orderFormatError: {
        code: '10501',
        message: '订单数据格式错误',
        result: '',
    },

}
```

编写 错误处理函数 `src/app/errorHandle.js`

```js
module.exports = (err, ctx) => {
    let status = 200
    switch (err.code) {
        case '10001':
            status = 400
            break;
        case '10002':
            status = 409
            break;
        default:
            status = 500
            break;
    }
    ctx.status = status
    ctx.body = err
}
```

改写 `src/app/index.js`

```js
const Koa = require('koa');
const { koaBody } = require("koa-body")

const errorHandler = require("./errotHandler")
const userRouter = require("../router/user.route")


const app = new Koa();

app.use(koaBody())
app.use(userRouter.routes())
/* 用 app.on 监听 */
app.on("error", errorHandler)

module.exports = app;
```

有可能会有出现 用户注册失败 ，改写`src/controller/user.controller.js`

```js
const { createUser } = require("../service/user.service")
const { userRegisterError } = require("../constant/err.type")

class UserController {
    async register(ctx, next) {
        // 1. 获取数据
        // console.log(ctx.request.body);
        const { user_name, password } = ctx.request.body
        /* 用 try-catch 判断 */
        // 2. 操作数据库
        try {
            const res = await createUser(user_name, password);
            // 3. 返回数据
            ctx.body = {
                code: 0,
                message: '用户注册成功',
                result: {
                    id: res.id,
                    user_name: res.user_name,
                }
            };
        } catch (err) {
            console.log(err);
            ctx.app.emit('userRegisterError', userRegisterError, ctx);
        }

        // console.log(res);

    }
}


module.exports = new UserController();
```

# 十、加密处理

在将密码保存到数据库之前，要对密码进行加密处理

## 1. 安装 bcryptjs

```
npm i bcryptjs

```

## 2. 密码加密

改写中间件 `src/middleware/user.middleware.js`

```js
// 加密文件
const bcrypt  = require("bcryptjs")
// 密码加密处理
// 密码加密处理
const crpytPassword = async (ctx, next) => {
    // 获取密码
    const  { password } = ctx.request.body;
    // 加盐
    const salt = bcrypt.genSaltSync(10);
    // 哈希加密
    const hash = bcrypt.hashSync(password, salt);
    // 让 用户的密码 加密 为 哈希值 存入数据库
    ctx.request.body.password = hash;

    await next();
}
module.exports = {
    crpytPassword
}
```

使用中间件 `src/router/user.route.js`

```js
const Router = require('koa-router')

// 导入 UserController 对象
const { userValidator, verifyUser, crpytPassword } = require("../middleware/user.middleware")
const { register, login } = require("../controller/user.controller")

const router = new Router({ prefix: '/users' })

// 注册接口
router.post("/register", userValidator, verifyUser, crpytPassword, register)

// 登录接口
router.post("/login", login)

module.exports = router;
```

# 十一、登录验证

编写登录验证的 中间件 `src/middleware/user.middleware.js`

```js
// 导入 登录验证的 两个 错误
/* 用户不存在和密码不匹配 */
const { userLoginError,
invalidPassword,} = require("../constant/err.type")

// 验证登录
const verifyLogin = async (ctx,next) => {
    // 1. 判断用户是否存在
    const { user_name, password } = ctx.request.body;
    try {
        const res = await getUserInfo({ user_name })
        if (!res) {
            console.log("当前用户不存在",ctx.request.body);
            ctx.app.emit('error', userDoesNotExist, ctx);
            return ;
        }
        // 2. 判断密码是否匹配
        if (!bcrypt.compareSync(password, res.password)) {
            ctx.app.emit('error',invalidPassword, ctx);
            return ;
        }
    } catch (err) {
        console.error("用户登录失败", err);
        return ctx.app.emit('error', userLoginError, ctx);
    }
    
    await  next();
}


module.exports = {
    verifyLogin,
}
```

在路由中使用

```js
 const { userValidator, verifyUser, crpytPassword, verifyLogin } = require("../middleware/user.middleware")

// 登录接口
router.post("/login", userValidator,verifyLogin, login)
```



# 十二、 用户认证

登录成功后，给用户颁发一个令牌，用户在每次请求的时候都会带着这个令牌，用于识别

用的是JWT 拿到 用户的 token：jsonwebtoken

- header: 头部
- payload: 载荷
- signature: 签名

## 1. 安装 jsonwebtoken

```
npm install jsonwebtoken
```

## 2. 用户颁发令牌

在 `user.controller.js` 获取 用户 token

```js
// 导入 JWT
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require("../website/website.default")

async login(ctx, next) {
        const { user_name } = ctx.request.body;
        // 1. 获取用户信息(在 token 的 payload 中 记录 id, user_name, is_admin)
        try {
            // 从 返回结果 剔除掉 password ，把剩下的结果 放在 res 中
            const { password, ...res } = await getUserInfo({ user_name });
            ctx.body = {
                code: 0,
                message: '用户登录成功',
                result: {
                    /* 调用 jwt.sign() 方法生成 JWT 字符串
                    * 第一个参数：用户信息对象
                    * 第二个参数：加密的密钥
                    * 第三个参数：配置对象，配置token有效期
                    * */
                    token: jwt.sign(res,JWT_SECRET,{ expiresIn: '1d' })
                }
            }

        } catch (err) {
            console.error("用户登录失败",err);
        }
    }
}
```

在 .env 文件中 编写 token 密钥

```
#配置 token 密钥
JWT_SECRET=yezi
```

# 十三、修改密码
## 1.  编写中间件
创建 `src/middleware/auth.middleware.js` 文件
```javascript
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../website/website.default");
const { tokenExpiredError,invalidToken} = require("../constant/err.type")
const auth = async (ctx,next) => {
    /** 将 authorization 从 headers里面 去解构出来 */
    const { authorization } = ctx.request.headers;
    /** 拿到 token 并去掉 token前面的 “Bearer ” */
    const token = authorization.replace("Bearer ","");
    // console.log(token);

    try {
        /** user 包含了 payload 的信息(id,user_name,is_admin) */
        const user = jwt.verify(token,JWT_SECRET);
        ctx.state.user = user;
        return ;
    } catch (err) {
        switch (err.name) {
            case "TokenExpiredError":
                console.error("token 已过期",err)
                return ctx.app.emit("tokenExpiredError",tokenExpiredError,ctx)
            case "JsonWebTokenError":
                console.error("token无效",err)
                return ctx.app.emit("jsonWebTokenError",invalidToken,ctx)
        }
    }
    await next();
};


module.exports = {
    auth,
}

```

## 2. 在 路由使用
`src/router/user.router.js`
```javascript
const { auth } = require("../middleware/auth.middleware");

// 修改密码接口
router.patch("/", auth, (ctx,next) => {
    ctx.body = "修改密码成功"
})

```
# 十四、 路由自动加载
创建 `src/router/goods.route.js` 文件
```javascript
const Router = require('koa-router');

const {upload} = require("../controller/goods.controller")

const router = new Router({ prefix: '/goods' });

router.post('/upload',upload);

module.exports = router;

```
创建文件 `src/controller/goods.controller.js`
```javascript
class GoodsController {
    async upload(ctx,next)  {
        ctx.body = '商品图片上传成功';
    }
}

module.exports = new GoodsController();

```
创建路由文件 `src/router/index.js`
```javascript
const fs = require('fs');

const Router = require('koa-router');
const router = new Router();

fs.readdirSync(__dirname).forEach(file => {
    // console.log(file)
    /** 判断文件名是否为 index.js  */
    if (file !== 'index.js') {
        /** 不是 访问 当前目录下的所有文件 */
        let r = require("./" + file);
        /** 加载路由 */
        router.use(r.routes());
    }
})

module.exports = router;

```
修改 `app/index.js`
```javascript
const Koa = require('koa');
// 注册中间件，要在所有路由请求之前
const { koaBody } = require("koa-body");

const errorHandle = require("./errorHandle")

const router = require("../router")

const app = new Koa();
app.use(koaBody());
/** router.allowedMethods() 是判断 http */
app.use(router.routes()).use(router.allowedMethods())


/* 监听 app.on */
app.on("error",errorHandle);
// 向外暴露 app 接口
module.exports = app;

```
当拥有一个空的数据库，可以先这么创建一条默认的数据
```javascript
const [ detail, created ] = await  Config.findOrCreate({
    where: { blog_name: "米娜的小屋" },
    defaults: {
        personality_signature: "这个人很懒，什么也没写~"
    }
})
if (created) {
    console.log("detail.个性签名",detail.personality_signature)
}
console.log("detail.blog_name",detail.blog_name)
console.log("detail.个性签名",detail.personality_signature)
console.log("是否是刚刚创建的",created)

```
