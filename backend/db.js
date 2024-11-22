const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://shaksham08:AK6gnML4TN8oRCWV@cluster0.wyxt8.mongodb.net/paytm_db"
);

// AK6gnML4TN8oRCWV

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
});

const User = mongoose.model("User", userSchema);

const accountsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  balance: {
    type: Number,
    required: true,
  },
});

const Account = mongoose.model("Account", accountsSchema);

module.exports = {
  User,
  Account,
};
