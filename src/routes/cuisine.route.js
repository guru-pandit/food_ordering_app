const cuisineController = require("../controllers").cuisine

module.exports = (app) => {
    // Get all cuisines
    app.get("/api/v1/cuisines", cuisineController.getAllCuisines);
    // serch cuisines
    app.get("/api/v1/searchcuisines", cuisineController.searchCuisines);
}