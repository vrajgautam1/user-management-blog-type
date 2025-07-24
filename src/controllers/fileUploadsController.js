const path = require("path");
const db = require("../models");
const Uploads = db.uploads;

module.exports.uploadFile = async (req, res) => {
  try {
    if (!req.files) {
      return res.status(400).json({ error: "no file uploaded" });
    }

    const userId = req.user.id;

    // console.log("Uploads typeof:", typeof Uploads); // should be 'function'
    // console.log("Uploads keys:", Object.keys(Uploads)); // should include 'create'

    let uploadsPromisesArray = req.files.map((file) => {
      return Uploads.create({
        userId: userId,
        filename: file.filename,
        originalName: file.originalname,
        size: file.size,
        path: file.path,
      });
    });

    await Promise.all(uploadsPromisesArray);

    console.log("file upload successful");
    return res.status(200).json({ success: "file upload successful" });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json();
  }
};
