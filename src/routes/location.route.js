const locationController = require("../controllers").location

module.exports = (app) => {
    // Get all location
    app.get("/locations", locationController.getAllLocations);
}