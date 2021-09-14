// Controller Imports
const userController = require("../controllers").user;
const { body } = require("express-validator");
module.exports = (app) => {
    app.post(
        "/api/v1/register", [
        body("firstName").trim().notEmpty().withMessage("firstName is required"),
        body("lastName").trim().notEmpty().withMessage("lastName is required"),
        body("email").trim().isEmail().withMessage({
            message: "Not an email",
        }),
        body("password")
            .trim()

            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,20}$/
            )
            .withMessage("Password invalid"),
    ], userController.createUser
    );
    app.post(
        "/api/v1/login", userController.loginUser
    );
    app.get("/api/v1/user/:id", userController.getUsersById);
    app.delete("/api/v1/deleteUser/:id", userController.deleteUser);
    app.put("/api/v1/updateUser/:id", userController.UpdateUser);
    app.get("/api/v1/verifyUser", userController.verifyUser);
    app.get("/api/v1/getUserByAddress", userController.getUsersByAddress);




};

