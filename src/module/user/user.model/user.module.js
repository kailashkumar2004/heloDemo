const mongoose = require("mongoose");
const express = require("express");
const { secretKey } = require("../../../../config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const addreshSchema = new mongoose.Schema({
    village: {
        type: String,
        trim:true
    },
    post: {
        type: String,
        trim:true
    },
    polliceStand: {
        type: String,
        trim:true
    },
    block: {
        type: String,
        trim:true
    },
    distik: {
        type: String,
        trim:true
    },
    pinCode: {
        type: String,
        trim:true
    },
    state: {
        type: String,
        trim:true
    },
    countery: {
        type: String,
        trim:true
    }
}, {
    timestamps: true,
    versionKey: false,
    _id:false
})
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        trim: true
    },
    addresh: addreshSchema,
    date: {
        type: Date,
        trim: true
    },
    phoneNu: {
        type: Number,
        trim: true
    },
    class: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class"
    },
    time: {
        type: String,
        trim: true
    },

}, {
    timestamps: true,
    versionKey: false
});
userSchema.statics.findByToken = async function (token) {
    try {
        const decodedToken = jwt.verify(token, secretKey);
        console.log("decodedToken========>>", decodedToken);
        if (!decodedToken) throw "token is not find";
        const user = await this.findByToken(decodedToken.id);
        console.log("user--------><", user);
        if (!user) throw "user not find";
        return user();
    } catch (error) {
        console.log("error--------------><", error);
        throw "error message"
    };
};
userSchema.methods.comparePassword = async function (interedPassword) {
    return bcrypt.compare(interedPassword, this.password)
};
const User = mongoose.model("User", userSchema);
module.exports = { User };