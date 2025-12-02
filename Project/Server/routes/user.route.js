const express = require("express");
const User = require("../models/user.model.js");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const isAuth = require("../middleware/authmiddleware.js");

const userRouter = express.Router(); // Route

// Sign up Route
userRouter.post("/register", async (req, res) => {
  try {
    // check if the user already exits
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.send({
        success: false,
        message: "User Already Exists with the Email",
      });
    }

    const allowedRoles = ["user", "partner"];
    if (!req.body.role || !allowedRoles.includes(req.body.role)) {
      req.body.role = "user";
    }

    // hash the password
    const salt = await bcrypt.genSalt(10)
    const hashPwd = bcrypt.hashSync(req.body.password, salt)
    req.body.password = hashPwd

    const newUser = await User(req.body);
    await newUser.save();

    res.send({
      success: true,
      message: "User Registered Successfully",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || "Registration failed" });
  }
});

// Login Api
userRouter.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
      res.send({
        success: false,
        message: "User does not exist"
      })
    }

    const validpassword = await bcrypt.compare(req.body.password, user.password);
    if (!validpassword) {
      res.send({
        success: false,
        message: "Wrong Password, please try again"
      })
    }

    const token = jwt.sign({ userId: user._id }, process.env.JSON_WEB_TOKEN, { expiresIn: '10d' });
    res.cookie('jwtToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    })

    res.send({
      success: true,
      message: "You've successfully logged in!",
      user: { 
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    });

  } catch (error) {
    res.status(500).json({
      success:false,
      message: "Server Error!" 
    })
  }
})

userRouter.get('/curren-user', isAuth, async (req, res) => {
  try {
    const verifiedUser = await User.findById(req.userId).select("-password");
    if (!verifiedUser) {
      return res.status(404).json({ 
        success: false,
        message: "User not found" 
      });
    }
    // Return consistent user data structure
    res.json({
      _id: verifiedUser._id,
      name: verifiedUser.name,
      email: verifiedUser.email,
      role: verifiedUser.role,
    });
  } catch (error) {
    return res.status(500).json({ 
      success: false,
      message: "Server error" 
    });
  } 
})

//logout route
userRouter.post("/logout", isAuth, async (req, res) => {
  try {
    res.clearCookie('jwtToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
    res.send({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: "Error logging out" 
    });
  }
});

module.exports = userRouter