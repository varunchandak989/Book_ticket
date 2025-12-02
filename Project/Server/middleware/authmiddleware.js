const jwt = require('jsonwebtoken');
const User = require("../models/user.model.js");

const isAuth = async (req, res, next) => {
    const token = req.cookies.jwtToken
    if (!token) {
        return res.status(401).json({ success: false, message: "Not authorized , no token" });
    }

    try {
        // Use the same env key as defined in .env (JSON_WEB_TOKEN)
        const decoded = jwt.verify(token, process.env.JSON_WEB_TOKEN)
        req.userId = decoded.userId
        const user = await User.findById(decoded.userId).select("-password");
        if (user) {
            req.user = user;
        }
        next()
    } catch (error) {
        return res.status(401).json({ success: false, message: "Not authorized , token validation failed" })
    }
}

module.exports = isAuth