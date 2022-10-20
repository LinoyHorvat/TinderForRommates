const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const minPasswordLength = 5;

// register new user

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  // check password length
  try {
    if (password.length < minPasswordLength) {
      return res.status(400).send({ message: "Password too short" });
    }
    // check existence of email
    const emailExists = await User.findOne({ email: email });
    if (emailExists) {
      return res
        .status(400)
        .send({ message: "An account with that email already exist" });
    }
    // generate password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    // add new user
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ user, token });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    !user && res.status(400).send("User not found");
    const validPassword = await bcrypt.compare(password, user.password);
    !validPassword && res.status(400).send("Invalid Credentials");

    // creating out json web token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    console.log(user);
    res.json({
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
        themePicture: user.themePicture,
      },
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};

module.exports = { registerUser, loginUser };
