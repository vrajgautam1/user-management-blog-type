const express = require("express");
const router = express.Router()
const uploadsMiddleware = require("../middlewares/uploadsMiddleware")
const uploadsController = require("../controllers/fileUploadsController")

router.post("/uploads", uploadsMiddleware, uploadsController.uploadFile)

module.exports = router