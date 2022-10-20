const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: "../../" });

const mongo_uri = process.env.MONGO_URL;

mongoose.connect(process.env.MONGO_URL, () => {
  console.log("connected to db");
});
