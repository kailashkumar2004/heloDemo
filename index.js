const mongoose = require("mongoose");
const express = require("express");
const db = require("./src/db/database");
const route = require("./route");
const PORT = 5000;
const app = express();
const jwt = require("jsonwebtoken");
const {authenticate } = require("./src/middleware/usermiddleware");
const bodyParser = require("body-parser");




app.get("/", (req, res) => {
    res.send("Helo Duniya")
});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
route.map(route => {
    app.use(route.path, route.handler)
});
app.listen(PORT, () => {
    console.log(`server is runing on PORT ${PORT}`)
});