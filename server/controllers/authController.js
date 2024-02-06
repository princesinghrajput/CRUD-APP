const asyncHandler = require('express-async-handler');
const User = require('../models/authModel.js');
const generateToken = require('../utils/generateToken.js');

const nodemailer=require('nodemailer');
const randomstring = require('randomstring'); 
const config = require('../config/config.js');

// const sendResetPasswordMail = async (name, email ,token ) =>{
//   try {
//   const transporter=   nodemailer.createTransport({
//       host: 'smtp.gmail.com',
//       port:587,
//       secure:false,
//       requireTLS:true,
//       auth:{
//         user:config.emailUser,
//         pass:config.emailPassword
//       }


//     });
//     const mailOptions = {
//       from: config.emailUser,
//       to: email,
//       subject: 'Reset Password',
//       html: `<p>Hii ${name}, Please copy the link and <a href="http://127.0.0.1:3000/reset-password/${token}">reset your password</a></p>`,

//     };
    

//     transporter.sendMail(mailOptions, function(error, infor){
//       if(error){
//         console.log(error);
//       }else{
//         console.log('Mail has been sent:- ', infor.response);
//       }
//     })
//   } catch (error) {
//     res.status(400).send({Success:false, msg:error.message});
//   }
// }

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const securePassword = async(password)=>{
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
  } catch (error) {
    res.status(400).send(error.message);
  }
}

// const forget_password = async (req, res) => {
//   try {
//     const email = req.body.email;
//     const userData = await User.findOne({ email });

//     if (userData) {
//       const resetToken = randomstring.generate();
//       const data = await User.updateOne({ email: email }, { $set: { token: resetToken } });
//       sendResetPasswordMail(userData.name, email, resetToken);
//       res.status(200).send({ success: true, msg: "Please Check your inbox of mail and reset your password" });
//     } else {
//       res.status(200).send({ success: true, msg: "This Email does not exist" });
//     }
//   } catch (error) {
//     res.status(400).send({ success: false, msg: error.message });
//   }
// }

// const reset_password= async(req, res)=>{
//   try {
//     //validate token
//     const token = req.query.token;
//    const tokenData= await User.findOne({ token: token})
//     if (tokenData) {
//       const password = req.body.password;
//       const newPassword = await securePassword(password);
//    const userData = await User.findByIdAndUpdate ({_id: tokenData._id}, {$set:{password: newPassword, token:''}}, {new: true})
//       res.status(200).send({ success: true, msg: "User password has been reset", data:userData });
//     } else {
//       res.status(200).send({ success: false, msg: "This Link has been Expired!" });
//     }
//   } catch (error) {
//     res.status(400).send({ success: false, msg: error.message });

//   }
// }

// const reset_password = async (req, res) => {
//   try {
//     const token = req.query.token;
//     const tokenData = await User.findOne({ token });

//     if (tokenData) {
//       const password = req.body.password;
//       const newPasswordHash = await securePassword(password);

//       const userData = await User.findByIdAndUpdate(
//         { _id: tokenData._id },
//         { $set: { password: newPasswordHash, token: '' } },
//         { new: true }
//       );

//       res.status(200).send({ success: true, msg: 'User password has been reset', data: userData });
//     } else {
//       res.status(200).send({ success: false, msg: 'This Link has been Expired!' });
//     }
//   } catch (error) {
//     res.status(400).send({ success: false, msg: error.message });
//   }
// };


module.exports = {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
 
};
