const mongoose = require("mongoose");
const classSchema = new mongoose.Schema({
    className: {
        type: String,
        trim: true
    },
    roleNu: {
        type: Number,
        trim: true
    },
    secation: {
        type: String,
        trim: true
    },
    roleCode: {
        type: String,
        trim: true
    },
    roomNu: {
        type: Number,
        trim: true
    },
    registionNu: {
        type: String,
        trim: true
    }
}, {
    timestamps: true,
    versionKey: false
});
const Class = mongoose.model("Class", classSchema);
module.exports = { Class };