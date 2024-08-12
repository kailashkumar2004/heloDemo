const express = require("express");
const route = express.Router();
const { wrapAsync } = require("../../../helpres/router.helpres");


const { createClass, allClass,
    getClassById, updateClassById,
    deleteClassById,searchWithClass
 } = require("../class.controller/class.controller");


route.post("/createClass", wrapAsync(createClass));
route.get("/allClass", wrapAsync(allClass));
route.get("/getClassById/:id", wrapAsync(getClassById));
route.put("/updateClassById/:id", wrapAsync(updateClassById));
route.delete("/deleteClassById/:id", wrapAsync(deleteClassById));
route.post("/searchWithClass", wrapAsync(searchWithClass));

module.exports = route;