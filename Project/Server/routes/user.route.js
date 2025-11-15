const express = require("express");
const User = require("../models/user.model.js");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const isAuth = require("../middleware/middleware.js");

const userRouter = express.Router(); // Route

// Sign up Route
userRouter.post("/register", async (req, res) => {
  try {
    // check if the user already exits
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      res.send({
        success: false,
        message: "User Already Exists with the Email",
      });
    }

    // hash the password
    const salt = await bcrypt.genSalt(10)
    const hashPwd = bcrypt.hashSync(req.body.password , salt)
    req.body.password = hashPwd

    const newUser = await User(req.body);
    await newUser.save();

    res.send({
      success: true,
      message: "User Registered Successfully",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// Login Api
userRouter.post('/login',async(req,res)=>{
  try{
    const user = await User.findOne({email: req.body.email})
    if(!user){
      res.send({
        success: false,
        message: "User does not exist"
      })
    }

    const validpassword = await bcrypt.compare(req.body.password, user.password);
    if(!validpassword){
      res.send({
        success: false,
        message: "Wrong Password, please try again"
      })
    }
    
    const token = jwt.sign({userId: user._id}, process.env.JSON_WEB_TOKEN, {expiresIn: '10d'});
    res.cookie('jwtToken' , token , {
      httpOnly : true,
    })

    res.send({
      success: true,
      message: "You've successfully logged in!",
      user: user,
    });
    
  }catch(error){
    res.status(500).json({message: "Error while login in!"})
  }
})

userRouter.get('/curren-user',isAuth,async(req,res)=>{
  const userId = req.userId
  if(userId == undefined){
    return res.status(401).json({message: "not authorized, no token"})
  }
  try{
    const verifieduser = await User.findById(userId).select('-password')
    res.json(verifieduser)
  }catch(err){
    return res.status(500).json({message: "server error"})
  }
})

module.exports = userRouter