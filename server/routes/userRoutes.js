const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//require auth for all workout routes
// router.use(requireAuth)


router.get('/user', userController.getAllUsers);

router.get('/getUser/:id', userController.getUserById);

router.put('/updateUser/:id', userController.updateUser);

router.delete('/deleteUser/:id', userController.deleteUser);

router.post('/createUser', userController.createUser);

module.exports = router;
