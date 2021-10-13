const User = require("../models").User;
const jwt = require('jsonwebtoken');

const isLoggedIn = async (req, res, next) => {
    try {
        let token = req.cookies["access-token"]
        // console.log(token)

        // verify a token
        jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
            if (err) throw err;
            // console.log(decoded)
            // check email in session array
            // console.log(req.session.users)
            let checkEmail = req.session.users !== "undefined" ? req.session.users?.includes(decoded.email) : false
            if (checkEmail) {
                // req.loggedIn = true;
                // req.email = decoded.email;
                next()
            } else {
                // req.loggedIn = false;
                res.redirect("/api/v1/login")
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message || "Something went wrong" });
    }
}

module.exports = { isLoggedIn };
