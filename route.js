const User = require("./src/module/user/user.router/user.router");
const Class=require("./src/module/class/class.router/class.router")

module.exports = [
    {
        path: "/api/User",
        handler:User
    }, {
        path: "/api/Class",
        handler:Class
    }
]