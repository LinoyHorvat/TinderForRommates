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
    validator: (val) => {
      return validator.isAge(val);
    },
  },
  // TODO: need to fix gender validation
  gender: {
    type: String,
    validator: (val) => {
      console.log(validator.equals(val, "male"));
      return validator.equals(val, "male");
      // return validator.equals(val, "male") || validator.equals(val, "female");
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
