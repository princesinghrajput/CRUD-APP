const express = require('express');
const authController = require('../controllers/authController.js');
const authMiddleware = require('../middleware/authMiddleware.js');

const router = express.Router();
router.post('/', authController.registerUser);
router.post('/auth', authController.authUser);
router.post('/logout', authController.logoutUser);
router
  .route('/profile')
  .get(authMiddleware.protect, authController.getUserProfile)
  .put(authMiddleware.protect, authController.updateUserProfile);


// router.post('/forgot-password', authController.forget_password)
// router.get('/reset-password/:id?:token', authController.reset_password);
module.exports = router;
