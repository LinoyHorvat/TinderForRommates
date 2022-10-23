const mongoose = require("mongoose");
const validator = require("validator");

const RoomSchema = new mongoose.Schema({
  address: {
    type: "string",
    require: true,
  },
  price: {
    type: Number,
    min: 1,
  },
  // TODO: add pictures
  pictures: {
    type: String,
    default:
      "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
  },
  phone: {
    type: String,
    validate: {
      validator: (val) => {
        return validator.isMobilePhone(val);
      },
    },
  },
  Description: {
    type: String,
  },
});
module.exports = mongoose.model("Room", RoomSchema);
