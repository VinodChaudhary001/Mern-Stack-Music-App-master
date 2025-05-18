const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
  
  // avatarImage: {
  //   type: String,
  //   required: true
  // }
  
});

module.exports = mongoose.model("AdminUser", UserSchema, "adminuser");

