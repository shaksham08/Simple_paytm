const express = require("express");

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.send("I am user");
});

module.exports = userRouter;
