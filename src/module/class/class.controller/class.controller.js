const { createClass, allClass, getClassById,
    updateClassById,deleteClassById,searchWithClass
    
 } = require("../class.business/class.business");


exports.createClass = async (req) => await createClass(req.body);
exports.allClass = async (req) => await allClass(req.query);
exports.getClassById = async (req) => await getClassById(req.params.id);
exports.updateClassById = async (req) => await updateClassById(req.body, req.params.id);
exports.deleteClassById = async (req) => await deleteClassById(req.params.id);
exports.searchWithClass = async (req) => await searchWithClass(req.body);