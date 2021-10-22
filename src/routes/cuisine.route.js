const cuisineController = require("../controllers").cuisine

module.exports = (app) => {
    // Get all cuisines
    app.get("/cuisines", cuisineController.getAllCuisines);
    // serch cuisines
    app.get("/searchcuisines", cuisineController.searchCuisines);
}