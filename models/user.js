const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String,
    unique: true,
    lowercase: true,
  },
  hash: String,
  salt: String,
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
