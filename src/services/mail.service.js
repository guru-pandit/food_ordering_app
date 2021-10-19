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
              <a href="http://${req.headers.host}/api/v1/verifyUser?token=${token.token}&userId=${user.id}">Verify here</a>`,
    };
    transporter.sendMail(mailOptions)

}

const passwordResetMail = (req, user, passToken) => {
    let userFullName = user.firstName + " " + user.lastName
    let mailOptions = {
        from: `Verify your email address ${process.env.EMAIL}`,
        to: user.email,
        subject: "change your password",
        html: `<h2>${userFullName} change your password here ...<h2>
        <a href="${req.protocol}://${req.headers.host}/api/v1/verifyUserToken?passToken=${passToken.token}&userId=${user.id}">Click Here </a>`
    };
    transporter.sendMail(mailOptions)
}

module.exports = { sendVerificationMail, passwordResetMail };
