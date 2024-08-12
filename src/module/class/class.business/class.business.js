const mongoose = require("mongoose");
const express = require("express");
const { Class } = require("../../../../src/module/class/class.model/class.model");


const createClass = async (body) => {
    const newClass = new Class(body);
    console.log("newClass-------><", newClass);
    if (!newClass) {
        throw "class is not create"
    };
    const saveClass = await newClass.save();
    return {
        msg: "create class sucess",
        result: saveClass
    };

};
module.exports = {
    createClass
}