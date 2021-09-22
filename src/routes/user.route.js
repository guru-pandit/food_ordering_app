// Controller Imports
const userController = require("../controllers").user;
//const { body } = require("express-validator");
const { checkDulicateEmail, checkConfirmPassword } = require("../middelwares/validate")
module.exports = (app) => {
    app.post("/api/v1/register", [checkDulicateEmail, checkConfirmPassword], userController.createUser);
    app.post("/api/v1/login", userController.loginUser);
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
};

