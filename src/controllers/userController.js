const {
  signinSchema,
  signupSchema,
  deleteSchema,
} = require("../validations/userValidation");
const db = require("../models");
const { where } = require("sequelize");
const User = db.Users;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

require("dotenv").config();
const secret = process.env.JWT_SECRET;

module.exports.signup = async (req, res) => {
  //data validation - using joi
  const { error } = signupSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.message });
  }
  
  try {
    //build logic
    const { name, email, password } = req.body;

    // 1 - check existing user using their email
    const userExists = await User.findOne({
      where: { email: email },
    });
    if (userExists) {
      return res.status(400).json({ error: "user already exists" });
    }

    // 2 - insert the user in the table in database after encrytping the password
    const encryptedPassword = await bcrypt.hash(password, 2);
    const newuser = await User.create({
      name: name,
      email: email,
      password: encryptedPassword,
    });

    //3 - Allow registered users to log in immediately after successful signup.
    const token = jwt.sign({ email: email, role: newuser.role }, secret, {
      expiresIn: "1h",
    });

    //4 - final response
    return res.status(201).json({
      success: "user created successfully",
      token: token,
      user: newuser,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ error: error.message });
  }
};

module.exports.signin = async (req, res) => {
  try {
    //0 - joi input validation
    const { error } = signinSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    //1 - extract email and password from req.body
    let { email, password } = req.body;
    password = password.trim();

    //2 - check if the user exists
    const userFound = await User.findOne({
      where: { email: email },
    });

    if (!userFound) {
      return res
        .status(400)
        .json({ error: "user with this email does not exist" });
    }

    //3 - check the password
    const passwordCorrect = await bcrypt.compare(password, userFound.password);

    if (!passwordCorrect) {
      return res.status(400).json({ error: "password is incorrect" });
    }

    //4 - jwt token generation
    const token = jwt.sign(
      { email: userFound.email, role: userFound.email },
      secret,
      { expiresIn: "1h" }
    );

    //5 - send the response
    return res.status(200).json({ token: token, success: "signin successful" });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ error: error.message });
  }
};

module.exports.userOnlyAccessible = (req, res) => {
  return res.status(200).json({
    success: "we are currently successfully able to access user only data",
  });
};

module.exports.adminOnlyAccessible = (req, res) => {
  return res.status(200).json({
    success: "we are currently successfully able to access admin only data",
  });
};

module.exports.viewProfile = async (req, res) => {
  const { id } = req.params; //we can do it in different ways. i chose this for no specific reason

  //1 - check if the user exists.
  const userExists = await User.findOne({
    where: { id: id },
  });

  if (!userExists) {
    return res.status(400).json({ error: "user does not exist" });
  }

  //2 - return the user
  return res
    .status(200)
    .json({ success: "viewing user data", data: userExists });
};

module.exports.deleteProfile = async (req, res) => {
  const { error } = deleteSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  const { id } = req.params; //we can do it in different ways. i chose this for no specific reason

  //1 - check if the user exists.
  const userDeleted = await User.destroy({
    where: { id: id },
  });

  if (!userDeleted) {
    return res.status(400).json({ error: "user does not exist" });
  }

  return res.status(200).json({ success: "user Deleted", data: userDeleted });
};
