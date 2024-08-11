const User = require("./src/module/user/user.router/user.router");


module.exports = [
    {
        path: "/api/User",
        handler:User
    }
]