const { Order, Menuitem, User, Restaurant } = require("../models");
const { v1 } = require("uuid")
const Razorpay = require("razorpay")
const request = require('request');
const crypto = require("crypto");

// Function to store the rder details
const placeOrder = async (req, res) => {
    try {
        let totalPrice = 0;
        let deliveryCharge = 40;
console.log(req.body)
        let orderBody = {
            orderId: v1(),
            items: req.body.items,
            total: 0,
            gst: 0,
            userId: req.query.userId,
            restaurantId: req.query.restaurantId,
            transactionId: null,
            orderedAt: Date.now(),
            isDelivered: false
        }
        // console.log(orderBody)
        // Calculating total price
        await Promise.all(orderBody.items.map(async ({ menuitemId, quantity }) => {
            let menu = await Menuitem.findOne({ where: { id: menuitemId } });
            totalPrice += menu.price * quantity;
        }))
        
        let GST = totalPrice * 5 / 100;
    
        let finalPrize = totalPrice + GST;

        //assigning GST to the orderBody.gst
        orderBody.gst = GST;

        // Assigning total price to the orderBody.total
        orderBody.total = finalPrize < 1000 ? finalPrize + deliveryCharge : finalPrize;
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
            where: { orderId },
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
const orderPayment = async(req, res) => {
    // let { totalPrice } = req.body;
    // console.log("TotalPrice: ", totalPrice);
    const instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEYID, 
        key_secret: process.env.RAZORPAY_KEYSECRET,
    })
    // console.log("RazorpayInstance: ", instance);
    let options = {
        amount: "50000",
        currency: "INR"
    }

    instance.orders
        .create(options)
        .then((data) => {
             res.status(200).json({ data });
            //  console.log("Data: ",data); 
            
        }).catch((err) => {
            res.status(500).json({ error: err.message || "Something went wrong" });
        });
}

const checkoutPayment = async(req,res) => {
    res.render('paymentCheckout.hbs');
}

const checkSuccessOrFailure = (req,res)=> {
    const instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEYID, 
        key_secret: process.env.RAZORPAY_KEYSECRET,
    })
    console.log(req.body)
    instance.payments.fetch(req.body.razorpay_payment_id).then((paymentDocument)=>{
        console.log(paymentDocument)
        if(paymentDocument.status === 'captured'){
            res.status(201).json({
                    message: "Payment Successful",
                    redirectUrl: "http://localhost:8080/api/v1/paymentsuccess"
                    })
        }else{
            res.status(201).json({
                    message: "Payment Failed",
                    redirectUrl: "http://localhost:8080/api/v1/paymentfailure"
                    })
        }
    })

//     let body=req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;

//     var expectedSignature = crypto.createHmac('sha256', 'Wok5mJv2F0pa5HKLeXZfUr9r')
//                                   .update(body.toString())
//                                   .digest('hex');
//                                   console.log("sig received " ,req.body.razorpay_signature);
//                                   console.log("sig generated " ,expectedSignature);
// console.log(expectedSignature === req.body.razorpay_signature);

//         if(expectedSignature === req.body.razorpay_signature){
//             //res.status(301).redirect('http://localhost:8080/api/v1/paymentsuccess')
//             res.status(201).json({
//                 message: "Order registered",
//                 redirectUrl: "http://localhost:8080/api/v1/paymentsuccess"
//                })
//         }else{
//             //res.status(301).redirect('http://localhost:8080/api/v1/paymentfailure')
//             res.status(201).json({
//                 message: "Order registered",
//                 redirectUrl: "http://localhost:8080/api/v1/paymentfailure"
//                })
//         }


}
const paymentSuccess = async(req,res) => {
        res.render('paymentSuccess.hbs')
}

const paymentFailure = async(req,res) => {
    res.render('paymentFailure.hbs')
}

module.exports = { placeOrder,
     getOrderByOrderId,
     getOrdersByUserId, 
     orderPayment, 
     checkoutPayment, 
     checkSuccessOrFailure,
     paymentSuccess,
     paymentFailure
    }