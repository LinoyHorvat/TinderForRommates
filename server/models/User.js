const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
  name: {
    type: "string",
    require: true,
    message: "Name is required",
    validate: {
      validator: (val) => {
        return validator.isAlpha(val);
      },
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (val) => {
        return validator.isEmail(val);
      },
    },
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  profilePicture: {
    type: String,
    default:
      "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
  },
  age: {
    type: Number,
    validator: function (val) {
      return validator.isAge(val);
    },
  },
  gender: {
    type: String,
    validate(value) {
      if (value != "male" && value != "female")
        throw new Error("must be either male or female");
    },
  },
  budget: {
    type: Number,
    validate(value) {
      if (value < 0) throw new Error("must be a positive integer");
    },
  },
  phone: {
    type: String,
    validate: {
      validator: (val) => {
        return validator.isMobilePhone(val);
      },
    },
  },
  description: {
    type: String,
  },
  myFavoritesProfiles: { type: Array, default: [] },
  myFavoritesApartments: { type: Array, default: [] },
});
module.exports = mongoose.model("User", UserSchema);
