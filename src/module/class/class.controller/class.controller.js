const { createClass } = require("../class.business/class.business");


exports.createClass = async (req) => await createClass(req.body);