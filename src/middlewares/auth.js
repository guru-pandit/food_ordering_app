const User = require("../models").User;
const jwt = require('jsonwebtoken');

const isLoggedIn = async (req, res, next) => {
    try {
        if (req.user) {
            console.log(req.user);
            next();
        } else {
            res.redirect("/api/v1/login");
        }
    } catch (err) {
        res.status(500).json({ error: err.message || "Something went wrong" });
    }
}

module.exports = { isLoggedIn };
