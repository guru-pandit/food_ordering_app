const mealtypeController = require("../controllers").mealtype

module.exports = (app) => {
    // Get all mealtypes
    app.get("/api/v1/mealtypes", mealtypeController.getAllMealtypes);
    // search mealtypes
    app.get("/api/v1/searchmealtypes", mealtypeController.searchMealtypes);
}