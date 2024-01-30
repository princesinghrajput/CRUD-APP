const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//adding authfunctionality
// router.post('/register', authController.registerUser)
// router.route('/').post(registerUser)
// router.post('/login', authUser)

router.get('/user', userController.getAllUsers);
router.get('/getUser/:id', userController.getUserById);
router.put('/updateUser/:id', userController.updateUser);
router.delete('/deleteUser/:id', userController.deleteUser);
router.post('/createUser', userController.createUser);

module.exports = router;
