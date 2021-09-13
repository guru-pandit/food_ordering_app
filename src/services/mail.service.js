const nodemailer = require("nodemailer");

const sendEmail = (mailOptions) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, //true for 465 port
        auth: {
            user: "namchavhan@gmail.com",
            pass: "Namchavhan25@",
        },
    });
    transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };
