const express = require("express");
const { authMiddleware } = require("../middlewares");
const { Account } = require("../db");

const accountRouter = express.Router();

accountRouter.get("/balance", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const account = await Account.findOne({ userId });
  const balance = account?.balance;
  res.json({
    balance,
  });
});

module.exports = accountRouter;
