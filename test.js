// TODO: delete this
// fix css responsive
// do my apartment functionality
// delete
const validator = require("validator");
const validation = (val) => {
  return validator.equals(val, "male") || validator.equals(val, "female");
};
// console.log(validation("m"));
console.log(validator.isAlpha("linoy horvat"));
