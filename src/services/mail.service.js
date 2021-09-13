const nodemailer = require("nodemailer");

const sendEmail = (mailOptions) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, //true for 465 port
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS
        },
    });
    transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };
