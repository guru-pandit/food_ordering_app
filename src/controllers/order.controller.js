const { Order, Menuitem, User, Restaurant } = require("../models");

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

// Function to get order details by order id
const getOrderByOrderId = async (req, res) => {
    try {
        let { orderId } = req.params;
        let order = await Order.findOne({
            where: { id: orderId },
            include: [
                {
                    model: User,
                },
                {
                    model: Restaurant
                }
            ]
        })
        // console.log(order);
        if (order !== null) {
            return res.status(200).json({ order });
        } else {
            return res.status(400).json({ error: "No order found" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message || "Something went wrong" });
    }
}

// Function to get orders by user id
const getOrdersByUserId = async (req, res) => {
    try {
        let { userId } = req.params;
        let user = await User.findOne({
            where: { id: userId },
            include: [
                {
                    model: Order,
                }
            ]
        })
        // console.log(order);
        if (user !== null) {
            return res.status(200).json({ user });
        } else {
            return res.status(400).json({ error: "No user found" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message || "Something went wrong" });
    }
}

module.exports = { placeOrder, getOrderByOrderId, getOrdersByUserId }