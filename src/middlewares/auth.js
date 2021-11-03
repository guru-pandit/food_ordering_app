const User = require("../models").User;
const jwt = require('jsonwebtoken');

const isLoggedIn = async (req, res, next) => {
    try {
        console.log("Auth(access-token): ", req.cookies["access-token"])
        if (req.cookies["access-token"]) {
            jwt.verify(req.cookies["access-token"], process.env.SECRET_KEY, function (err, decoded) {
                if (err) throw err

                // console.log("Auth(Decoded value):", decoded);
                console.log("Auth(session-users):", req.session.users);

                if (req.session.users?.includes(decoded.id)) {
                    User.findOne({ where: { id: decoded.id } }).then((user) => {
                        req.loggedInUser = user;
                        next();
                    })
                } else {
                    // res.status(400).redirect("/login");
                    res.status(400).json({ error: "Please login to continue..." });
                    return;
                }
            });
        } else {
            // res.status(400).redirect("/login");
            res.status(400).json({ error: "Please login to continue..." });
            return;
        }
    } catch (err) {
        res.status(500).json({ error: err.message || "Something went wrong" });
    }
}

module.exports = { isLoggedIn };
