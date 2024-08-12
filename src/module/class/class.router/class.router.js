const express = require("express");
const route = express.Router();
const { wrapAsync } = require("../../../helpres/router.helpres");


const { createClass } = require("../class.controller/class.controller");


route.post("/createClass", wrapAsync(createClass));




module.exports = route;