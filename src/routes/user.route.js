// Controller Imports
const userController = require("../controllers").user;
<<<<<<< HEAD
const { body } = require("express-validator");
const { checkDulicateEmail, checkConfirmPassword } = require("../middelwares/validate")
=======
//const { body } = require("express-validator");
const { checkDulicateEmail, checkConfirmPassword } = require("../middlewares/validate")
>>>>>>> 7b762116ca42de8d5d67a9bef2443becf4b6decb
module.exports = (app) => {
    app.post("/api/v1/register", [body("firstName").trim().isString().notEmpty().withMessage("Name is required").isLength({ min: 3 })
        .withMessage('wrong firstname length'),
    body("lastName").trim().notEmpty().withMessage("Name is required").isLength({ min: 3 })
        .withMessage('wrong lastname length'),
    body("email").trim().isLength({ min: 1 }).withMessage("Email must be specified.").isEmail().withMessage({
        message: "Not an email",
    }),
    body("password")
        .trim()

        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,20}$/
        )
        .withMessage("Password must be contain one capital letter,one special charecter ,Number and Should be minimum 8 character long  "), checkDulicateEmail, checkConfirmPassword], userController.createUser);

    app.post("/api/v1/login", [body("email").trim().isEmail().withMessage({
        message: "Not an email",
    }),
    body("password")
        .trim()

        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,20}$/
        )
        .withMessage("Password must be contain one capital letter,one special charecter ,Number and Should be minimum 8 character long  ")], userController.loginUser);
    app.get("/api/v1/dashboard", userController.dashboard);
    //app.get("/api/v1/logout", userController.logOut);
    app.get("/api/v1/user/:id", userController.getUsersById);
    app.delete("/api/v1/deleteUser/:id", userController.deleteUser);
    app.put("/api/v1/updateUser/:id", userController.UpdateUser);
    app.get("/api/v1/verifyUser", userController.verifyUser);
    app.get("/api/v1/getUserByAddress", userController.getUsersByAddress);
    app.patch("/api/v1/userPartialUpdate/:id", userController.userPartialUpdate);

    // Send password reset link
    // app.post("/api/v1/resetPassword/:userId", userController.sendPasswordResetLink);
    // password reset
    // app.post("/api/v1/resetPassword", userController.resetPassword);
    app.get("/api/v1/register", userController.getRegisterPage)
    app.get("/api/v1/login", userController.getLoginPage)
    app.post("/api/v1/forgetPassword", [body("email").trim().isEmail().withMessage({
        message: "Not an email",
    })], userController.forgetPassword);
    app.post("/api/v1/resetPassword/:userId", [body("password")
        .trim()

        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,20}$/
        )
        .withMessage("Password must be contain one capital letter,one special charecter ,Number and Should be minimum 8 character long  "), checkConfirmPassword], userController.resetPassword);


    // app.post("/api/v1/resetPassword/:id", userController.resetPassword);
    app.get("/api/v1/verifyUserToken", userController.verifyUserToken);
};

