const express = require("express");
const router = express.Router()
const userController = require("../controllers/userController")
const auth = require("../middlewares/jwtAuthMiddleware")
const checkrole = require("../middlewares/checkrole")

router.post("/signup", userController.signup)
// router.post("/signin")

router.use(auth)
router.get("/viewProfile", userController.viewProfile)
router.delete("/deleteProfile", userController.deleteProfile)

router.use(checkrole("admin"))
router.get("/adminOnly", userController.adminOnlyAccessible)

router.use(checkrole("user"))
router.get("/userOnly", userController.userOnlyAccessible)

module.exports = router

