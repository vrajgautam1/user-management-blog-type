const Joi = require("joi");

const signupSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),

  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),

  repeat_password: Joi.ref("password"),

  email: Joi.string().email(),

  role: Joi.string().valid("user", "admin"),
});

const deleteSchema = Joi.object({
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),

  repeat_password: Joi.ref("password"),
});

const signinSchema = Joi.object({
  email: Joi.string().email(),

  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),

});

module.exports = { signupSchema, signinSchema, deleteSchema };
