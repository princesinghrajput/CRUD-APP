const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors'); // Add this line
const connectDB = require('./config/db.js');
const cookieParser = require('cookie-parser');
const { notFound, errorHandler } = require('./middleware/errorMiddleware.js');
const authRoutes = require('./routes/authRoutes.js');
const nodemailer = require('nodemailer');
const config = require("./config/config.js")
const port = process.env.PORT || 8000;
const User = require("./models/authModel.js")
const jwt = require ('jsonwebtoken')
connectDB();
const bcrypt = require ('bcrypt')
const app = express();

// Use cors middleware
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/api/user', authRoutes);
// app.use('/api/forget-password ', authRoutes);
// app.use('/api/reset-password', authRoutes);

const usedTokens = new Set(); // Set to store used tokens

app.post('/api/forgot-password', (req, res) => {
  const { email } = req.body;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        return res.send({ Status: "User not existed" });
      } 

      // Generate a JWT for password reset
      const token = jwt.sign({ id: user._id }, "abc123", { expiresIn: '1h' });
      
      // Check if token already exists in usedTokens set
      if (usedTokens.has(token)) {
        return res.send({ Status: "Token already used" });
      }

      const resetLink = `http://localhost:3000/reset-password/${user._id}/${token}`;

      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: config.emailUser,
          pass: config.emailPassword
        }
      });
      
      var mailOptions = {
        from: config.emailUser,
        to: email,
        subject: 'Reset Password Link',
        text: resetLink
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          return res.send({ Status: "Error sending email" });
        } else {
          // Store the token in the temporary store
          usedTokens.add(token);
          return res.send({ Status: "Success" });
        }
      });
    })
    .catch(err => {
      console.error(err);
      return res.send({ Status: "Error finding user" });
    });
});




/*  Working Forgot Rest
app.post('/api/forgot-password', (req, res) => {
  console.log('sdfjksdflkjsdfksjdlfskdjlfjkl')
  const {email} = req.body;
  User.findOne({email: email})
  .then(user => {
      if(!user) {
          return res.send({Status: "User not existed"})
      } 
      const token = jwt.sign({id: user._id}, "abc123", {expiresIn: "1d"})
      var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: config.emailUser,
            pass: config.emailPassword
          }
        });
        
        var mailOptions = {
          from: config.emailUser,
          to: email,
          subject: 'Reset Password Link',
          text: `http://localhost:3000/reset-password/${user._id}/${token}`
        };
        
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            return res.send({Status: "Success"})
          }
        });
  })
})
*/
app.post('/api/reset-password/:id/:token', (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  // Check if the token has been used before
  if (usedTokens.has(token)) {
    return res.send({ Status: "Token already used" });
  }

  jwt.verify(token, "abc123", (err, decoded) => {
    if (err) {
      return res.json({ Status: "Error with token" });
    } else {
      bcrypt.hash(password, 10)
        .then(hash => {
          User.findByIdAndUpdate(id, { password: hash })
            .then(() => {
              // Generate a new token with shorter expiration time (1 day)
              const newToken = jwt.sign({ id }, "abc123", { expiresIn: '1d' });

              // Add the token to the usedTokens set to mark it as used
              usedTokens.add(token);

              return res.send({ Status: "Success", newToken });
            })
            .catch(err => {
              console.error(err);
              return res.send({ Status: "Error resetting password" });
            });
        })
        .catch(err => {
          console.error(err);
          return res.send({ Status: "Error hashing password" });
        });
    }
  });
});


app.use(notFound);
app.use(errorHandler);




app.listen(port, () => console.log(`Server started on port ${port}`));
