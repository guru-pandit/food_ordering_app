const locationController = require("../controllers").location

module.exports = (app) => {
    // Get all location
    app.get("/api/v1/locations", locationController.getAllLocations);
}