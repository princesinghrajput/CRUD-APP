const Auth = require("../models/authModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../config/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  console.log(req.body);

  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    console.log("Zinda hu bhai");
    return res.status(400).json({ error: "Please enter all fields" });
  }

  try {
    const userExists = await Auth.findOne({ email });

    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    const user = await Auth.create({
      name,
      email,
      password,
      pic,
    });

    if (user) {
      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
        token: generateToken(user._id),
      });
    } else {
      return res.status(400).json({ error: "Failed to create the user" });
    }
  } catch (error) {
    console.error("Registration Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log("Login Attempt:", email);

  try {
    const user = await Auth.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
        token: generateToken(user._id),
      });
    } else {
      return res.status(401).json({ error: "Invalid Email or Password" });
    }
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = { registerUser, authUser };
