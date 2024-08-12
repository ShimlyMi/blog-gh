
const Router = require("koa-router");
const router = new Router({ prefix: "/statistic" });
const { homeStatistic } = require("../controller/statistic.controller");

router.get("/", homeStatistic);

module.exports = router;
