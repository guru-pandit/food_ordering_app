const orderController = require("../controllers").order;

module.exports = (app) => {
    app.post("/api/v1/order", orderController.placeOrder);
}