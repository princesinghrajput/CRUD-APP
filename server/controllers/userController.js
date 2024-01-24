const UserModel = require('../models/User');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    res.json(error);
  }
};

exports.getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await UserModel.findById(id);
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
};

exports.updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
};

exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await UserModel.findByIdAndDelete(id);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
};

exports.createUser = async (req, res) => {
  try {
    const newUser = await UserModel.create(req.body);
    res.json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
};
