1 - after research i found out that multer is the best option. i can use fs.writeStream but it works after the files have been uploaded and by that time its too late.

2 - multer works for ram and ssd storage.
3 - multer is designed especially for express.
4 - busboy is good for 1gb files as well as for cloud storage as well as for anything else apart from express. more on that when i start working on real projects.

5 - i divided the tasks in multiple phases

phase - 1 : normal uploads - path.join(__dirname, "..", "uploads")
1.2 : multiple file uploads
// limits { files: 5, fileSize: 5 * 1024 * 1024 } //give the washing machine example 
// .array("files", 5) — without this, upload won’t be considered a function

1.3 : handling errors for multiple files

js
Copy
Edit
outerFunction(req, res) {
  uploadFunction(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_COUNT") {
        log("cant exceed more than 5 files");
      } else if (err.code === "LIMIT_FILE_SIZE") {
        log("file size cant be more than 5mb");
      } else {
        log("multer error:", err.message);
      }
    } else if (err instanceof Error) {
      log("custom error:", err.message);
    } else {
      log("unknown server error");
    }
  });
}
1.4 : defining file size and type

limits: { files: 5, fileSize: 5 * 1024 * 1024 }

fileFilter(req, file, cb):

Allowed types = [".pdf"]

If extension not in list → cb(new Error("Only pdf files are allowed"))

This error will be caught as a normal Error in the upload callback

phase - 2 : binding images to the user. - pending

the model contains
id, userid, originalname, filename, url, path, size

userid is a foreigkey, its value will come from users table therefore we must use a property called
references: {
    model: modelname
    key: column name
}

then there's associations - uploads.associate = (models)=>{
  Uploads.belongsTo(models.users, {
    foreignKey: "userId",
    onDelete: "CASCADE
  })
}

users.associate = (models)=>{
  Users.hasMany(models.uploads, {
    foreignKey: "userId",
    onDelete: "CASCADE"
      })
}

sequelize-cli looks for the config file in the root folder. keep the config folder in the root folder. 