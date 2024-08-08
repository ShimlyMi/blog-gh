const jwt = require("jsonwebtoken")
const {JWT_SECRET} = require("../config/config.default");
// class AuthController {
//     async decryptToken (token) {
//         const user = jwt.verify(token, JWT_SECRET);
//         return user;
//     }
// }
//
// module.exports = new AuthController();

 const decryptToken = (token) => {
    const user = jwt.verify(token, JWT_SECRET);
    return user;
}

module.exports = {
    decryptToken
}
