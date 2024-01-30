const Auth = require("../models/authModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../config/generateToken");

const registerUser = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { name, email, password, pic } = req.body;

    if (!name || !email || !password) {
        console.log("Zinda hu bhai");

        res.status(400).json({ error: "Please enter all fields" });
        return;
    }

    const userExists = await Auth.findOne({ email });
    if (userExists) {
        res.status(400).json({ error: "User already exists" });
        return;
    }

    const user = await Auth.create({
        name,
        email,
        password,
        pic,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
        });
    } else {
        res.status(400).json({ error: "Failed to create the user" });
    }
});


const authUser = asyncHandler(async(req, res)=>{
    const {email, password} = req.body;

    const user = await Auth.findOne({email});
    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
        })

    }
    else{
        res.status(401);
        throw new Error("Invalid Email or Password");
    }
})
module.exports = { registerUser, authUser };
