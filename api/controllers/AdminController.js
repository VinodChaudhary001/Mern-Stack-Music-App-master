const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require("../models/AdminUser");
const bcrypt = require("bcrypt");
const multer  = require('multer');
const verify = require("./verifyToken");
const upload = multer();

const generateToken = (user) => {
  const payload = {
    userId: user._id,
    username: user.username,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Find user by username
    const user = await User.findOne({ username });
    if (!user)
      return res.status(401).json({ msg: "Incorrect Username or Password", status: false });

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ msg: "Incorrect Username or Password", status: false });

    // If username and password are correct, generate token and send response
    const token = generateToken(user);
    res.json({ status: true, user, token });
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
};



module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Check if the username already exists
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.status(400).json({ message: "Email already exists" });
    }


    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await User.create({ username, email, password: hashedPassword });

    // Omit password field from the response
    user.password = undefined;

    // Send response
    return res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    // Handle errors
    next(error);
  }
};

module.exports.logOut = (req, res, next) => {
  try {
    res.clearCookie('token').json('Logged out');
  } catch (ex) {
    next(ex);
  }
};

// module.exports.getAdminProfile = async (req, res, next) => {

//   try {
//     const adminProfile = await User.findOne(); // You need to implement this function

//     // Check if admin profile data is retrieved successfully
//     if (adminProfile) {
//       // Send the admin profile data as JSON response
//       res.json({ AdminProfile: adminProfile, successMsg: 'Admin profile retrieved successfully' });
//     } else {
//       // If admin profile data retrieval fails, send an error response
//       res.status(500).json({ errorMsg: 'Failed to retrieve admin profile' });
//     }
//   } catch (error) {
//     console.error('Error retrieving admin profile:', error);
//     res.status(500).json({ errorMsg: 'Error retrieving admin profile' }); // Return an error response
//   }
// };

// module.exports.getAllUsers = async (req, res, next) => {
//   try {
//     const users = await User.find({ _id: { $ne: req.params.id } }).select([
//       "email",
//       "username",
//       "avatarImage",
//       "_id",
//     ]);
//     return res.json(users);
//   } catch (ex) {
//     next(ex);
//   }
// };


// module.exports.setAvatar = async (req, res, next) => {
//   try {
//     const userId = req.params.id;
//     const avatarImage = req.body.image;
//     const userData = await User.findByIdAndUpdate(
//       userId,
//       {
//         isAvatarImageSet: true,
//         avatarImage,
//       },
//       { new: true }
//     );
//     return res.json({
//       isSet: userData.isAvatarImageSet,
//       image: userData.avatarImage,
//     });
//   } catch (ex) {
//     next(ex);
//   }
// };

