const orderController = require("../controllers").order;

module.exports = (app) => {
    // Place order
    app.post("/api/v1/order", orderController.placeOrder);
    // Get order by order id
    app.get("/api/v1/order/:orderId", orderController.getOrderByOrderId);
    // Get orders by user id
    app.get("/api/v1/userOrders/:userId", orderController.getOrdersByUserId);
    // payment
    app.post("/api/v1/payment/order", orderController.orderPayment);
}