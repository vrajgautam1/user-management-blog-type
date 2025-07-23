const express = require("express");
const router = express.Router()
const userRouter = require("./userRouter");
const loginSignup = require("./loginSignup")


router.use(loginSignup)
router.use(userRouter)


module.exports = router

