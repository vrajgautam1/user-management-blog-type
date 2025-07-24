const express = require("express");
const router = express.Router()
const loginSignup = require("./loginSignup")
const uploads = require("./uploads")
const userRouter = require("./userRouter");

router.use(loginSignup)
router.use(userRouter)
router.use(uploads)


module.exports = router

