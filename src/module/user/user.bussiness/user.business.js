const mongoose = require("mongoose");
const express = require("express");
const { User } = require("../../../../src/module/user/user.model/user.module");
const { secretKey } = require("../../../../config");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {authenticate } = require("../../../middleware/usermiddleware");

const createUser = async (body) => {
    try {
        const existingUser = await User.findOne({ email: body.email });
        console.log("existingUser------------><", existingUser);
        if (existingUser) {
            return {
                msg: "email allready create"
            };
        };
        const saveUser = new User(body);
        console.log("saveUser-------->><<", saveUser);
        if (!saveUser) {
            return {
                msg: 'user are not saved'
            };
        };
        const response = await saveUser.save();
        return {
            msg: "user sucessfully create",
            result: response
        };
    } catch (error) {
        console.log("error-----------><", error);
        throw "internal server error"
    };
};
const register = async (body) => {
    try {
        const existingUser = await User.findOne({ email: body.email });
        console.log("existingUser---------><", existingUser);
        if (existingUser) {
            return {
                msg: "email allready register"
            };
        };
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(body.password, saltRounds);
        body.password = hashedPassword;

        const saveUser = new User(body);
        console.log("saveUser---------><", saveUser);
        if (!saveUser) {
            return {
                msg: "user are not saved"
            };
        };
        const response = await saveUser.save();
        return {
            msg: "okk sucessfully register user",
            result: response
        };
    } catch (error) {
        console.log("error----------><", error);
        throw "error message"
    };
};
const login = async (body) => {
    try {
        const { email, password } = body;
        const existingUser = await User.findOne({ email: body.email });
        console.log("existingUser---------><", existingUser);
        if (!existingUser) {
            return {
                msg: "invalited email find"
            };
        };
        const isPasswordMath = await bcrypt.compare(password, existingUser.password);
        console.log("isPasswordMath============><", isPasswordMath);
        if (!isPasswordMath) {
            return {
                msg: "invalited password find"
            };
        };
        const token = jwt.sign({ id: existingUser._id.toString() }, secretKey);

        return {
            msg: "login sucess",
            user: existingUser,
            token
        };
    } catch (error) {
        console.log("error-----------><", error);
        throw "error message"
    };
};
const getUserByToken = async (user) => {
    try {
        const getUser = await User.findOne({ _id: user });
        console.log("getUser-----------><", getUser);
        if (!getUser) {
            return {
                msg: "user are not geted"
            };
        };
        return {
            msg: "okk sucess",
            result: getUser
        };
    } catch (error) {
        console.log("error----------><", error);
        throw "error message"
    };
};
const updateUserByToken = async (body, user) => {
    try {
        const updateUser = await User.findByIdAndUpdate(user, { $set: body }, { new: true });
        console.log("updateUser--------->>", updateUser);
        if (!updateUser) {
                throw  "user are not update"  
        };
        return {
            msg: "updateUser sucess",
            result: updateUser
        };
    } catch (error) {
        console.log("error------------><", error);
        throw "error message"
    };
};
const deleteUserByToken = async (user) => {
    try {
        const deleteUser = await User.findByIdAndDelete(user);
        console.log("deleteUser---------><", deleteUser);
        if (!deleteUser) {
            throw "user are not deleted"
        };
        return {
            msg: "user sucessfully deleted",
            result: deleteUser
        };
    } catch (error) {
        console.log("error-----------><", error);
        throw "error message"
    };
};
const resetPassword = async (body, user) => {

        const { email, oldPassword, newPassword, confirmPassword } = body;
        if (!email || !oldPassword || !newPassword || !confirmPassword) {
            throw "all filed is required"
        };
        const usres = await User.findOne({ email: body.email });
        console.log("usres============><", usres);
        if (!usres) {
            throw "invalited email find"
        };
        const isPasswordMath = await bcrypt.compare(oldPassword, usres.password);
        console.log("isPasswordMath--------><", isPasswordMath);
        if (!isPasswordMath) {
            throw "invalited password find"
        };
        if (newPassword !== confirmPassword) {
            throw "miss match password find"
        };
        usres.password = await bcrypt.hash(newPassword,10);
        await usres.save();

        return {
            msg: "okk sucessfully password reset",
            result: usres
        };
};
const updatePassword = async (body, user) => {
    try {
        const { newPassword } = body;

        // Hash the new password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        // Update the user's password
        const updatedUser = await User.findByIdAndUpdate(
            user,
            { $set: { password: hashedPassword } },
            { new: true }
        );

        console.log("updatedUser----------><", updatedUser);

        if (!updatedUser) {
            throw new Error("Password was not updated");
        }

        return {
            msg: "Password has been updated successfully",
            result: updatedUser
        };
    } catch (error) {
        console.error("Error updating password:", error);
        throw new Error("Failed to update password");
    }
};
const allUser = async () => {
    const alluser = await User.find();
    console.log("alluser---------><", alluser);
    if (!alluser) {
        throw "alluser data are not recived"
    };
    return {
        msg: "okk sucess all user data recived",
        count: alluser.length,
        result: alluser
    };
};
const getUserById = async (id) => {
    const getUser = await User.findById(id);
    console.log("getUser-------><", getUser);
    if (!getUser) {
        throw "user are not geted"
    };
    return {
        msg: "okk sucess",
        result: getUser
    };
};
const updateUserById = async (id, body) => {
    const updateUser = await User.findByIdAndUpdate(id, { $set: body }, { new: true });
    console.log("updateUser---------><", updateUser);
    if (!updateUser) {
        throw "user are not update"
    };
    return {
        msg: "user update sucess",
        result: updateUser
    };
};
const deleteUserById = async (id) => {
    const deleteUser = await User.findByIdAndDelete(id);
    console.log("deleteUser----------><", deleteUser);
    if (!deleteUser) {
        throw "user are not deleted"
    };
    return {
        msg: "user deleted sucess",
        result: deleteUser
    };
};
module.exports = {
    createUser, register, login, getUserByToken,
    updateUserByToken, deleteUserByToken, resetPassword,
    updatePassword, allUser, getUserById, updateUserById,
    deleteUserById
}