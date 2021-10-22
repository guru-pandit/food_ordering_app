const mealtypeController = require("../controllers").mealtype

module.exports = (app) => {
    // Get all mealtypes
    app.get("/mealtypes", mealtypeController.getAllMealtypes);
    // search mealtypes
    app.get("/searchmealtypes", mealtypeController.searchMealtypes);
}