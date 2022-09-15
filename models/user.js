const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleSchemaValidationErrors } = require("../helpers");

const emailRegexp = /^[\w.]+@[\w]+.[\w]+$/;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      match: emailRegexp,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
      minlength: 6,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    avatarURL: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true },
);

userSchema.post("save", handleSchemaValidationErrors);

const registerSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .pattern(emailRegexp)
    .required(),
  password: Joi.string().min(6).required(),
  repeat_password: Joi.ref("password"),
});

const loginSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .pattern(emailRegexp)
    .required(),
  password: Joi.string().min(6).required(),
});

const schemas = {
  registerSchema,
  loginSchema,
};

const User = model("user", userSchema);

module.exports = { User, schemas };
