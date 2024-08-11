const express = require("express");
const route = express.Router();
const { wrapAsync } = require("../../../helpres/router.helpres");
const {authenticate} = require("../../../middleware/usermiddleware");


const { createUser, register, login, getUserByToken,
    updateUserByToken, deleteUserByToken,
    resetPassword, updatePassword, allUser,
    getUserById,updateUserById,deleteUserById} = require("../user.controller/user.controller");





route.post("/createUser", wrapAsync(createUser));
route.post("/register", wrapAsync(register));
route.post("/login", wrapAsync(login));
route.get("/getUserByToken", authenticate, wrapAsync(getUserByToken));
route.put("/updateUserByToken", authenticate, wrapAsync(updateUserByToken));
route.delete("/deleteUserByToken", authenticate, wrapAsync(deleteUserByToken));
route.put("/resetPassword", authenticate, wrapAsync(resetPassword));
route.put("/updatePassword", authenticate, wrapAsync(updatePassword));
route.get("/allUser", wrapAsync(allUser));
route.get("/getUserById/:id", wrapAsync(getUserById));
route.put("/updateUserById/:id", wrapAsync(updateUserById));
route.delete("/deleteUserById/:id", wrapAsync(deleteUserById));
module.exports = route;