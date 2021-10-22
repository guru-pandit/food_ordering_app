const orderController = require("../controllers").order;
const { isLoggedIn } = require("../middlewares/auth");

module.exports = (app) => {
    // Place order
    app.post("/createOrder", orderController.createOrder);
    // Place order
    app.post("/order", orderController.placeOrder);
    //update order
    app.post("/updateorder/:orderId", orderController.updateOrder);
    // Get order by order id
    app.get("/order/:orderId", orderController.getOrderByOrderId);
    // Get orders by user id
    app.get("/userOrders/:userId", orderController.getOrdersByUserId);
    // payment
    app.post("/payment/order", orderController.orderPayment);
    //checkout
    app.get("/payment/checkout", orderController.checkoutPayment);
    //callback
    app.post("/isordercomplete", orderController.checkSuccessOrFailure);
    //success
    // app.get("/api/v1/paymentsuccess", orderController.paymentSuccess);
    //failure
    // app.get("/api/v1/paymentfailure", orderController.paymentFailure);
    //to update delivery address
    app.post("/updateaddress/:orderId", orderController.updateAddress);
}