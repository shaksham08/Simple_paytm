const express = require("express");
const { authMiddleware } = require("../middlewares");
const { Account, User } = require("../db");
const Zod = require("zod");
const { default: mongoose } = require("mongoose");

const accountRouter = express.Router();

const accountTransferSchema = Zod.object({
  to: Zod.string().min(3).max(30),
  amount: Zod.number().min(1),
});

accountRouter.get("/balance", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const account = await Account.findOne({ userId });
  const balance = account?.balance;
  res.json({
    balance,
  });
});

accountRouter.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  // Start the transaction
  session.startTransaction();
  const userId = req.userId;
  const response = accountTransferSchema.safeParse(req.body);

  if (!response.success) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Incorrect Input",
    });
  }

  const { to, amount } = req.body;

  const accountToSend = await User.findById(to).session(session);
  if (!accountToSend) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Invalid account",
    });
  }

  const account = await Account.findOne({ userId }).session(session);
  if (account.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Insufficient balance",
    });
  }

  await Account.updateOne(
    {
      userId: req.userId,
    },
    {
      $inc: {
        balance: -amount,
      },
    }
  ).session(session);

  await Account.updateOne(
    {
      userId: to,
    },
    {
      $inc: {
        balance: amount,
      },
    }
  ).session(session);

  // Commit the transaction
  await session.commitTransaction();

  res.json({
    message: "Transfer successful",
  });
});

module.exports = accountRouter;
