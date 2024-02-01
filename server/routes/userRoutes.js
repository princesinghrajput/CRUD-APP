const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const requireAuth = require('../middleware/requireAuth')

//require auth for all workout routes
// router.use(requireAuth)


router.get('/user',requireAuth, userController.getAllUsers);

router.get('/getUser/:id',requireAuth, userController.getUserById);

router.put('/updateUser/:id',requireAuth, userController.updateUser);

router.delete('/deleteUser/:id',requireAuth, userController.deleteUser);

router.post('/createUser', userController.createUser);

module.exports = router;
