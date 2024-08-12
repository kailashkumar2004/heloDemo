const mongoose = require("mongoose");
const express = require("express");
const { Class } = require("../../../../src/module/class/class.model/class.model");


const createClass = async (body) => {
    const newClass = new Class(body);
    console.log("newClass=========><", newClass);
    if (!newClass) {
        throw "class is not create"
    };
    const saveClass = await newClass.save();
    return {
        msg: "class sucessfully create",
        result: saveClass
    };
};
const allClass = async (query) => {
    const { page = 1 } = query;
    const limit = 4;
    const skip=(page-1)*limit
    const allclass = await Class.find().limit(limit).skip(skip).sort({createdAt:-1});
    console.log("allclass==========><", allclass);
    if (!allclass) {
        throw "allclass data is not find"
    };
    return {
        msg: "okk sucess",
        count: allclass.length,
        result: allclass
    };
};
const getClassById = async (id) => {
    const getClass = await Class.findById(id);
    console.log("getClass-------><", getClass);
    if (!getClass) {
        throw "class are not geted"
    };
    return {
        msg: "class recived sucess",
        result: getClass
    };
};
const updateClassById = async (body, id) => {
    const updateClass = await Class.findByIdAndUpdate(id, { $set: body }, { new: true });
    console.log("updateClass-----------------><", updateClass);
    if (!updateClass) {
        throw "class are not update"
    };
    return {
        msg: "class update sucess",
        result: updateClass
    };
};
const deleteClassById = async (id) => {
    const deleteClass = await Class.findByIdAndDelete(id);
    console.log("deleteClass-------><", deleteClass);
    if (!deleteClass) {
        throw "class are not deleted"
    };
    return {
        msg: "class deleted sucess",
        result: deleteClass
    };
};
const searchWithClass = async (body) => {
    const searchClass = await Class.find(body);
    console.log("searchClass-----------><", searchClass);
    if (!searchClass) {
        throw "class are not recived"
    };
    return {
        msg: "okk recived class",
        count: searchClass.length,
        result: searchClass
    };
};
module.exports = {
    createClass, allClass, getClassById,
    updateClassById,deleteClassById,searchWithClass
}