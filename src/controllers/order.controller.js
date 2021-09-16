const { Order, Menuitem } = require("../models");

// Function to store the rder details
const placeOrder = async (req, res) => {
    try {
        let totalPrice = 0;

        let orderBody = {
            items: req.body.items,
            total: 0,
            userId: req.body.userId,
            restaurantId: req.body.restaurantId,
            isDelivered: false
        }

        await Promise.all(orderBody.items.map(async ({ menuitemId, quantity }) => {
            let menu = await Menuitem.findOne({ where: { id: menuitemId } });
            totalPrice += menu.price * quantity;
        }))

        orderBody.total = totalPrice
        // console.log(orderBody);

        let order = await Order.create(orderBody);
        if (order !== null) {
            return res.status(200).json({ message: "Order placed", orderDetails: order });
        } else {
            return res.status(400).json({ error: "Order not placed" });
        }
        // console.log(order);

    } catch (err) {
        res.status(500).json({ error: err.message || "Something went wrong" });
    }
}

module.exports = { placeOrder }