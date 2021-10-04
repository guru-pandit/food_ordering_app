module.exports = (app) => {
    require("./user.route")(app);
    require("./menuitem.route")(app);
    require("./order.route")(app);
    require("./restaurant.route")(app);
    require("./location.route")(app);
    require("./cuisine.route")(app);
    require("./mealtype.route")(app);
}