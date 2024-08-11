const mongoose = require("mongoose");
const { User } = require("../../src/module/user/user.model/user.module");
const { secretKey } = require("../../config");
const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Invalid Authorization" });
        }
        
        const token = authHeader.substring("Bearer ".length).trim();
        console.log("token----------><", token);
        
        const decoded = jwt.verify(token, secretKey);
        console.log("decoded=========><", decoded);
        
        const userData = await User.findOne({ _id: decoded.id });
        console.log("userData---------><", userData);
        
        if (!userData) {
            return res.status(404).json({ error: "User not found" });
        }
        
        req.user = userData;
        next();
    } catch (error) {
        console.log("error-----------><", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

function errorHandle(error, status) {
    return {
        error: status || 500,
        msg: "Internal Server Error"
    };
}

module.exports = {
    errorHandle,
    authenticate
};
