const { Router } = require("express");
const getData = require("./random.service");
const checkUserMiddleware = require("../middleware/checkUser.middleware");
const randomRouter = Router();

randomRouter.get("/", checkUserMiddleware, getData);

module.exports = randomRouter;
