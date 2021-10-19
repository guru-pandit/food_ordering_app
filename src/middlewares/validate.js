const User = require("../models").User;
const bcrypt = require("bcryptjs")
const { validationResult } = require("express-validator");

const checkConfirmPassword = async (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    let { password, confirmPassword } = req.body;
    let isPasswordMatched = password === confirmPassword;

    if (!isPasswordMatched) {
        return res.status(400).json({ error: "Password and Confirm password are not match please try again" });
    }
    next();
};

const checkDulicateEmail = async (req, res, next) => {
    try {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let { email } = req.body;
        let user = await User.findOne({ where: { email } });
        if (user) {
            return res.status(400).send({ error: "User already exist" });
        }
        next();
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const validate = {
    checkConfirmPassword,
    checkDulicateEmail,
    // LogedIn

};

module.exports = validate;
