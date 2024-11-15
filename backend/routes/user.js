const express = require("express");
const Zod = require("zod");
const { User } = require("../db");
var jwt = require("jsonwebtoken");
const { JWT_SECRET, SALT_ROUNDS } = require("../config");
const bcrypt = require("bcrypt");

const userRouter = express.Router();

const userSignUpSchema = Zod.object({
  userName: Zod.string().min(3).max(30),
  password: Zod.string().min(6),
  firstName: Zod.string().max(50),
  lastName: Zod.string().max(50),
});

const userSignInSchema = Zod.object({
  userName: Zod.string().min(3).max(30),
  password: Zod.string().min(6),
});

userRouter.post("/signup", async (req, res) => {
  const response = userSignUpSchema.safeParse(req.body);
  if (!response.success) {
    return res.status(400).json({
      message: "Username already exist / Incorrect inputs",
    });
  }

  const userDetails = await User.findOne({ userName: req.body.userName });

  if (userDetails) {
    return res.status(400).json({
      message: "Username already exist",
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      ...req.body,
      password: hashedPassword,
    });

    const savedUser = await user.save();
    const userId = savedUser._id;

    const token = jwt.sign(
      {
        userId,
      },
      JWT_SECRET
    );
    return res.status(201).json({
      message: "User created successfully",
      token: token,
    });
  } catch (error) {
    console.error("Error saving user:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

userRouter.post("/signin", async (req, res) => {
  const response = userSignInSchema.safeParse(req.body);
  if (!response.success) {
    return res.status(400).json({
      message: "Incorrect input",
    });
  }

  const { userName, password } = req.body;

  const userDetails = await User.findOne({ userName });

  if (!userDetails) {
    return res.status(400).json({
      message: "User not found",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, userDetails.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Incorrect Password",
    });
  }

  const userId = userDetails._id;
  const token = jwt.sign({ userId }, JWT_SECRET);

  return res.status(200).json({
    message: "User logged in successfully",
    token,
  });
});

module.exports = userRouter;
