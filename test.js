// TODO: delete this
// delete
const validator = require("validator");
const validation = (val) => {
  return validator.equals(val, "male") || validator.equals(val, "female");
};
// console.log(validation("m"));
console.log(validator.isAlpha("linoy horvat"));
