const User = require("../models").User;
const bcrypt = require("bcryptjs")
const { body } = require("express-validator");
const { validationResult } = require("express-validator");

// Validation of passpword
const validatePassword = body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,20}$/)
    .withMessage("password must have 8 to 20 characters that include at least 1 uppercase character, 1 lowercase character, 1 number, and 1 special character");

// Validation of email
const validateEmail = body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter valid email")
    .normalizeEmail()
    .toLowerCase();

// Valildtion of first name 
const validateFirstName = body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required");

// Valildtion of last name
const validateLastName = body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last name is required");

// Ccheck password and confirm password matching
// and bind encrypted password to the body
const checkConfirmPassword = async (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    let { password, confirmPassword } = req.body;
    let isPasswordMatched = password === confirmPassword;

    if (!isPasswordMatched) {
        res.status(400).json({ error: "Password and Confirm password are not match please try again" });
        return;
    } else {
        req.body.password = await bcrypt.hashSync(password, 8);
        next();
    }
};

// Checking email already exist or not
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

// Checking contact already exist or not
const checkDulicateContact = async (req, res, next) => {
    try {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let { contact } = req.body;
        let user = await User.findOne({ where: { contact } });
        if (user) {
            return res.status(400).send({ error: "User already exist" });
        }
        next();
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const validate = {
    validatePassword,
    validateEmail,
    validateFirstName,
    validateLastName,
    checkConfirmPassword,
    checkDulicateEmail,
    checkDulicateContact
};

module.exports = validate;
