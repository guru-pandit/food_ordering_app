const { Order, Menuitem, User, Restaurant } = require("../models");
const { v1 } = require("uuid")
const Razorpay = require("razorpay")

// Function to store the rder details
const placeOrder = async (req, res) => {
    try {
        let totalPrice = 0;
        let deliveryCharge = 60;

        let orderBody = {
            orderId: v1(),
            items: req.body.items,
            total: 0,
            userId: req.body.userId,
            restaurantId: req.body.restaurantId,
            transactionId: null,
            orderedAt: Date.now(),
            isDelivered: false
        }

        // Calculating total price
        await Promise.all(orderBody.items.map(async ({ menuitemId, quantity }) => {
            let menu = await Menuitem.findOne({ where: { id: menuitemId } });
            totalPrice += menu.price * quantity;
        }))

        // Assigning total price to the orderBody.total
        orderBody.total = totalPrice < 1000 ? totalPrice + deliveryCharge : totalPrice;
        // console.log("OrderBody:",orderBody);

        let order = await Order.create(orderBody);
        // console.log("SavedOrder:",order);
        // Checking order is created or not
        if (order !== null) {
            return res.status(200).json({ message: "Order placed", orderDetails: order });
        } else {
            return res.status(400).json({ error: "Order not placed" });
        }
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
        // console.log("Order:",order);
        // Checking order is exist or not
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
        // console.log("User:",user);
        // Checking user is exist or not
        if (user !== null) {
            return res.status(200).json({ user });
        } else {
            return res.status(400).json({ error: "No user found" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message || "Something went wrong" });
    }
}

// Function for payment gateway integration
const orderPayment = (req, res) => {
    let { totalPrice } = req.body;
    // console.log("TotalPrice: ", totalPrice);
    const instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEYID,
        key_secret: process.env.RAZORPAY_KEYSECRET,
    })
    // console.log("RazorpayInstance: ", instance);
    let options = {
        amount: totalPrice,
        currency: "INR"
    }

    instance.orders
        .create(options)
        .then((data) => {
            // res.status(200).json({ data });
            // console.log("Data: ",data);
        }).catch((err) => {
            res.status(500).json({ error: err.message || "Something went wrong" });
        });
}

module.exports = { placeOrder, getOrderByOrderId, getOrdersByUserId, orderPayment }