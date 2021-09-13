const menuitemController = require("../controllers").menuitem
const { uploadImage } = require("../services/upload.service")

module.exports = (app) => {
    app.post("/api/v1/images/:id", uploadImage.array("images", 5), menuitemController.uploadImages);
}