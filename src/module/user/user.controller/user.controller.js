const { createUser, register, login, getUserByToken, updateUserByToken,
    deleteUserByToken, resetPassword, updatePassword, allUser,
    getUserById, updateUserById,
    deleteUserById, serachTokenWithUser,
    searchWithUser,searchWithFirstName
 } = require("../user.bussiness/user.business");


exports.createUser = async (req) => await createUser(req.body);
exports.register = async (req) => await register(req.body);
exports.login = async (req) => await login(req.body);
exports.getUserByToken = async (req) => await getUserByToken(req.user);
exports.updateUserByToken = async (req) => await updateUserByToken(req.body, req.user);
exports.deleteUserByToken = async (req) => await deleteUserByToken(req.user);
exports.resetPassword = async (req) => await resetPassword(req.body, req.user);
exports.updatePassword = async (req) => await updatePassword(req.body, req.user);
exports.allUser = async (req) => await allUser(req.query);
exports.getUserById = async (req) => await getUserById(req.params.id);
exports.updateUserById = async (req) => await updateUserById(req.params.id, req.body);
exports.deleteUserById = async (req) => await deleteUserById(req.params.id);
exports.serachTokenWithUser = async (req) => await serachTokenWithUser(req.body, req.user);
exports.searchWithUser = async (req) => await searchWithUser(req.body);
exports.searchWithFirstName = async (req) => await searchWithFirstName(req.body);