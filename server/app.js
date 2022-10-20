const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const axios = require("axios");
//
require("dotenv").config();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
require("./db/mongoose");
const publicPath = path.join(__dirname, "../client/build");
app.use(express.static(publicPath));

// routes
const userRoute = require("./routes/user");
const roomRoute = require("./routes/room");
const authenticationsRoutes = require("./routes/authentications");

app.use("/api/users", userRoute);
app.use("/api/rooms", roomRoute);
app.use("/api/users", authenticationsRoutes);

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
