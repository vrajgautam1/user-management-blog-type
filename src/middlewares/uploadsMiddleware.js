const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "uploads/"));
  },

  filename: function (req, file, cb) {
    console.log(file);
    cb(null, Date.now() + "-" + path.basename(file.originalname));
  },
});

function fileFilter(req, file, cb) {
  const allowedTypes = [".pdf", ".jpg", ".jpeg", ".png"];
  const ext = path.extname(file.originalname).toLowerCase();
  if (!allowedTypes.includes(ext)) {
    return cb(new Error("Only pdf files are allowed"));
  }
  cb(null, true); // allow file
}

//Use .array(fieldname, maxCount)
const upload = multer({
  storage: storage,
  limits: {
    files: 5,
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter,
}).array("files", 5);

function uploadsMiddleware(req, res, next) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_COUNT") {
        return res.status(400).json({ error: "cant upload more than 5 files" });
      }

      if (err.code === "LIMIT_FILE_SIZE") {
        return res
          .status(400)
          .json({ error: "file size cant be more than 5mb" });
      }

      return res.status(400).json({ error: err.message });
    }else if(err instanceof Error){
      return res.status(400).json({error: err.message})
    } 
    else {
      return res
        .status(500)
        .json({ error: "Something went wrong during upload." });
    }
    next();
  });
}

module.exports = uploadsMiddleware;
