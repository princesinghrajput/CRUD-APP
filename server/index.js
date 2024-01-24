const express = require ('express')
const mongoose = require ('mongoose')
const cors = require('cors')

const UserModel=require("./models/Users")

const app= express()
app.use(cors())
app.use(express.json())


mongoose.connect("mongodb://localhost:27017/crud")

//write api

app.get("/", (req, res)=>{
    UserModel.find()
  .then(users=>res.json(users))
  .catch(err=>res.json(err))
})

app.get("/getUser/:id", (req, res)=>{
    const id=req.params.id;
    UserModel.findById(id)
  .then(users=>res.json(users))
  .catch(err=>console.log(err))
})

app.put('/updateUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate(id, { name: req.body.name, email: req.body.email, age: req.body.age })
      .then(updatedUser => res.json(updatedUser))
      .catch(err => console.log(err));
  });
  


  app.delete('/deleteUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete({_id: id})
        .then(result => res.json(result))
        .catch(err => console.log(err));
});

app.post("/createUser", (req, res)=>{
    UserModel.create(req.body)
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
})

app.listen(8000,()=>{
    console.log('Server is running on port 8000')
})