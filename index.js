const express = require("express");
const app = express();
const mainRouter = require("./src/routers/index");
const path = require("path")
const { Sequelize } = require("sequelize");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "/uploads")))

app.use(mainRouter);

const port = process.env.PORT || 3000;
app.listen(port, (err) => {
  if (!err) {
    console.log("server is running on port", port);
  }
});
