const express = require("express");
const router = express.Router()
const userController = require("../controllers/userController")
const auth = require("../middlewares/jwtAuthMiddleware")
const checkrole = require("../middlewares/checkrole")

router.use(auth)

router.get("/viewProfile/:id", userController.viewProfile)
router.delete("/deleteProfile/:id", userController.deleteProfile)

router.get("/adminOnly", checkrole("admin"), userController.adminOnlyAccessible)

router.get("/userOnly", checkrole("user"), userController.userOnlyAccessible)

module.exports = router

