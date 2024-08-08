const { APP_PORT } = require("./config/config.default")
// 导入 app
const app = require("./app")

app.listen(APP_PORT, () => {
    console.log(`server is running on http://localhost:${APP_PORT}`);
})