const orderController = require("../controllers").order;
const {isLoggedIn} = require("../middlewares/auth");

module.exports = (app) => {
    // Place order
    app.post("/api/v1/order", orderController.placeOrder); 
    //update order
    app.post("/api/v1/updateorder/:orderId", orderController.updateOrder);
    // Get order by order id
    app.get("/api/v1/order/:orderId", orderController.getOrderByOrderId);   
    // Get orders by user id
    app.get("/api/v1/userOrders/:userId", orderController.getOrdersByUserId);
    // payment
    app.post("/api/v1/payment/order", orderController.orderPayment);
    //checkout
    app.get("/api/v1/payment/checkout", orderController.checkoutPayment)
    //callback
    app.post("/api/v1/isordercomplete", orderController.checkSuccessOrFailure)
    //success
    // app.get("/api/v1/paymentsuccess", orderController.paymentSuccess);
    //failure
    // app.get("/api/v1/paymentfailure", orderController.paymentFailure);
    //to update delivery address
    app.post("/api/v1/updateaddress/:orderId", orderController.updateAddress) 
}