const UserModel = require('../models/User');

exports.getAllUsers = async () => {
  try {
    return await UserModel.find();
  } catch (error) {
    throw error;
  }
};

exports.getUserById = async (id) => {
  try {
    return await UserModel.findById(id);
  } catch (error) {
    throw error;
  }
};

exports.updateUser = async (id, userData) => {
  try {
    return await UserModel.findByIdAndUpdate(id, userData, { new: true });
  } catch (error) {
    throw error;
  }
};

exports.deleteUser = async (id) => {
  try {
    return await UserModel.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
};

exports.createUser = async (userData) => {
  try {
    return await UserModel.create(userData);
  } catch (error) {
    throw error;
  }
};
