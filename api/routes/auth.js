const express = require('express');
const router = express.Router();
const adminController=require("../controllers/AdminController")

router.post('/register', adminController.register);
router.post('/login', adminController.login);
router.post('/logout', adminController.logOut); 
// router.get('/getAdminProfile', adminController.getAdminProfile);
  

// router.get('/users', adminController.getAllUsers);
// router.put('/users/:id/avatar', adminController.setAvatar);

module.exports = router;
