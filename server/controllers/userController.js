const userService = require('../services/userServices');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.json(error);
  }
};

exports.getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await userService.getUserById(id);
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
};

exports.updateUser = async (req, res) => {
  const id = req.params.id;
  const userData = req.body;
  try {
    const updatedUser = await userService.updateUser(id, userData);
    res.json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
};

exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await userService.deleteUser(id);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
};

exports.createUser = async (req, res) => {
  const userData = req.body;
  try {
    const newUser = await userService.createUser(userData);
    res.json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
};
