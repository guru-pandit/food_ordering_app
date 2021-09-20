const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, //true for 465 port
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    },
});

const sendVerificationMail = (req, user, token) => {
    let userFullName = user.firstName + " " + user.lastName
    let mailOptions = {
        from: `"Verify your email address" ${process.env.EMAIL}`,
        to: user.email,
        subject: "Please verify email",
        html: `<h2>${userFullName} Thanks for registering...</h2>
              <h4>please verify your email to proceed..</h4>
              <a href="http://${req.headers.host}/api/v1/verifyUser?token=${token.token}">Verify here</a>`,
    };
    transporter.sendMail(mailOptions)

}

module.exports = { sendVerificationMail };
