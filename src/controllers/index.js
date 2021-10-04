const user = require("./user.controller");
const menuitem = require("./menuitem.controller");
const order = require("./order.controller");
const restaurant = require("./restaurant.controller")
const location = require("./location.controller")
const mealtype = require("./mealtype.controller")
const cuisine = require("./cuisine.controller")

module.exports = { user, menuitem, order, restaurant, location, mealtype, cuisine }

