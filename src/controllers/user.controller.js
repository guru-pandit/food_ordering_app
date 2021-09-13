const db = require("../models");
const { User, Token } = require("../models");
const bcrypt = require("bcryptjs"); //bcrypt password
const { validationResult } = require("express-validator");
const crypto = require("crypto");
const { sendEmail } = require("../services/mail.service");

const createUser = async (req, res) => {
    try {
        let errors = validationResult(req); // expressvalidator
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() }); //
        }

        // for data get
        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            countryCode: req.body.countryCode,
            contact: req.body.contact,
            password: req.body.password,
            gender: req.body.gender,
            image: req.body.image,
            address: req.body.address,
            country: req.body.country,
            state: req.body.state,
            city: req.body.city,
        };
        const info = await User.findOne({ where: { email: user.email } }); //await means handling async request
        if (info) {
            res.send("email already exist");
        } else {
            let hashedPassword = await bcrypt.hash(user.password, 8); // 8 round to encrypt password
            user.password = hashedPassword; //save in database

            const data = await User.create(user); // create new user
            // console.log(data.id)
            if (data) {
                let currentDate = new Date()
                // console.log(currentDate)
                const token = {
                    token: crypto.randomBytes(64).toString("hex"),
                    userId: data.id,
                    expiredAt: new Date(currentDate.getTime() + 30 * 60000)
                }

                let mailOptions = {
                    from: `"Varify your email address" ${process.env.EMAIL}`,
                    to: user.email,
                    subject: "Please varify email",
                    html: `<h2>${user.firstName} Thanks for registering...</h2>
              <h4>please verify your email to proceed..</h4>
              <a href="http://${req.headers.host}/api/V1/verifyUser?token=${token.token}">Varify here</a>`,
                };
                sendEmail(mailOptions);

                //console.log(token)
                await Token.create(token)

                return res.status(200).json({
                    message: " User register succesfull",
                    user: data,
                });
            } else {
                return res.status(400).json({
                    message: " User register unsuccesfull",
                });
            }
        }
    } catch (err) {
        console.log(err);
    }
};
const verifyUser = async (req, res) => {
    let { token } = req.query
    let tokenData = await Token.findOne({ where: { token: token } })
    //console.log(tokenData)
    let currentDate = new Date()
    if (tokenData.expiredAt < currentDate) {
        res.status(400).json({ message: "Token expired" })
    } else {

        let user = await User.findOne({ where: { id: tokenData.userId } })

        user.isVerified = true
        user.save()
        console.log(user)
    }

}

// for login

const loginUser = async (req, res) => {


    try {
        const { email, password } = req.body;

        const data = await User.findOne({ where: { email } });

        if (!data) {
            return res.status(400).json({ error: "user does not exist" });
        } else {
            let isPassMatched = await bcrypt.compareSync(
                password,
                data.dataValues.password
            );
            if (isPassMatched) {
                return res.status(200).json({ message: "user login succesfull" });
            } else {
                return res.status(500).json({ error: "user login unsuccesfull" });
            }
        }

    } catch (err) {
        console.log(err);
    }
};

const getUsersById = async (req, res) => {
    console.log(req.params); //parameters
    let { id } = req.params;
    let info = await User.findOne({

        where: { id: id },

    });
    if (info) {
        res.status(200).json({ data: info });
    } else {
        res.status(400).json({ error: "user not found" });
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const data = await User.findOne({ where: { id: userId } });
        if (data) {
            data.isDeleted = true;
            const deleteuser = data.save();
            if (deleteuser) {
                return res
                    .status(200)
                    .json({ message: "user was deleted successfully!" });
            } else {
                return res.status(500).json({ error: "Cannot delete user" });
            }
        }
    } catch (err) {
        console.log(err);
    }
};


const UpdateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const data = await User.update(req.body, { where: { id: userId } });

        if (data) {

            return res
                .status(200)
                .json({ message: "user was updatad successfully!" });
        } else {
            return res.status(500).json({ error: "Cannot update user" });
        }
    }
    catch (err) {
        console.log(err);
    }
};

module.exports = { createUser, verifyUser, loginUser, getUsersById, deleteUser, UpdateUser }