// Controller Imports
const userController = require("../controllers").user;
const { body } = require("express-validator");
const { checkDulicateEmail, checkConfirmPassword, checkDulicateContact, validatePassword, validateEmail, validateFirstName, validateLastName } = require("../middlewares/validate")
const { isLoggedIn } = require("../middlewares/auth")
const { uploadImage } = require("../services/upload.service")
const passport = require("passport");


module.exports = (app) => {
    // Register using email
    app.get("/register", userController.getRegisterPage)
    app.post("/register", [
        validateFirstName,
        validateLastName,
        validateEmail,
        checkDulicateEmail,
        checkDulicateContact
    ], userController.createUser);

    // Rendering login page and logout route
    app.get("/login", userController.getLoginPage)
    app.get("/logout", isLoggedIn, userController.logoutUser);

    // Local auth with passport
    app.post("/local/login", passport.authenticate('local', { successRedirect: "/local/success", failureRedirect: "/local/failure" }));
    app.get("/local/success", userController.localAuthSuccess);
    app.get("/local/failure", userController.localAuthFailure);

    // Google auth with passport
    app.get("/google/login", passport.authenticate('google', { scope: ['email', 'profile'] }));
    app.get("/google/callback", passport.authenticate('google', { successRedirect: "/google/success", failureRedirect: "/google/failure" }));
    app.get("/google/success", userController.googleAuthSuccess);
    app.get("/google/failure", userController.googleAuthFailure);

    // facebook auth with passport
    app.get("/facebook/login", passport.authenticate('facebook', { scope: ['email', 'public_profile'] }));
    app.get("/facebook/callback", passport.authenticate('facebook', { successRedirect: "/facebook/success", failureRedirect: "/facebook/failure" }));
    app.get("/facebook/success", userController.facebookAuthSuccess);
    app.get("/facebook/failure", userController.facebookAuthFailure);

    //to login with mobile and otp
    app.post("/loginwithotp", userController.loginWithOtp)
    app.post("/verifymobileotp", userController.verifyMobileOtp)

    // Upload profile image
    app.post("/profileImage/:userId", uploadImage.single("image"), userController.addImage)

    // Get user by their ID
    app.get("/user/:id", userController.getUsersById);

    // Verify user
    app.get("/verifyUser", userController.verifyUser);

    // Set Password
    app.post("/setPassword/:userId", [
        validatePassword,
        checkConfirmPassword
    ], userController.setPassword);

    // Forget password
    app.post("/forgetPassword", [
        validateEmail
    ], userController.forgetPassword);
    app.get("/verifyPasswordToken", userController.verifyPasswordToken);

    // Render profile page
    app.get("/profile", userController.getProfilePage);

    // app.get("/api/v1/dashboard", userController.dashboard);
    app.delete("/api/v1/deleteUser/:id", userController.deleteUser);
    app.put("/api/v1/updateUser/:id", userController.UpdateUser);
    app.get("/api/v1/getUserByAddress", userController.getUsersByAddress);
    app.patch("/api/v1/userPartialUpdate/:id", userController.userPartialUpdate);

    //to update delivery address
    app.post("/api/v1/updatedeliveryaddress/:userId", userController.updateUserInfo)
};

