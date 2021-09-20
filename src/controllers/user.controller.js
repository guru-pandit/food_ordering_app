const db = require("../models");
const { User, Token } = require("../models");//models destructure 
const bcrypt = require("bcryptjs"); //bcrypt password
const { validationResult } = require("express-validator");//for validations
const crypto = require("crypto");//convert token into hexabytes
const { sendVerificationMail } = require("../services/mail.service");//import service file
const jwt = require('jsonwebtoken');



const Op = db.Sequelize.Op;

//create user
const createUser = async (req, res) => {
    try {
        let errors = validationResult(req); // expressvalidator
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() }); //
        }

        // for data get
        const userBody = {
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
        const data = await User.create(user); // create new user
        if (data) {
            let currentDate = new Date()//get current date
            const token = {
                token: crypto.randomBytes(64).toString("hex"),//convert token into random bytes
                userId: data.id,//take user id
                expiredAt: new Date(currentDate.getTime() + 30 * 60000)//expired token after 30 min
            }

            sendVerificationMail(req, user, token);

            await Token.create(token)//create token here
            return res.status(200).json({
                message: " User register succesfull",
                user: data,
            });
        } else {
            return res.status(400).json({
                message: " User register unsuccesfull",
            });
        }

    } catch (err) {
        // console.log(err);
        res.status(500).json({ error: err.message || "Something went wrong" });
    }
};

//verifyUser here
const verifyUser = async (req, res) => {
    //to take query parameter from url
    let { token } = req.query
    let tokenData = await Token.findOne({ where: { token: token } })
    let currentDate = new Date()

    // to check token expired or not
    //if token expired is less than current date then it will expired
    if (tokenData.expiredAt < currentDate) {
        res.status(400).json({ message: "Token expired" })
    } else {
        let user = await User.findOne({ where: { id: tokenData.userId } })
        user.isVerified = true
        user.save()
        // console.log(user)
        res.status(400).json({ message: "user Verified" })
    }
}

// for login user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;//take email and password
        const data = await User.findOne({ where: { email } }); //find email
        if (!data) {
            return res.status(400).json({ error: "user does not exist" });//if not data found then return user does not exist
        } else {
            let isPassMatched = await bcrypt.compareSync(
                password,
                data.password
            );
            if (isPassMatched) {
                let token = jwt.sign(
                    { id: data.id, email: data.email },
                    process.env.SECRETKEY,
                    { expiresIn: "1h" }
                );
                console.log(token)
                res.cookie(`access-token`, token).send({ message: " user login successfull" });

            } else {
                return res.status(500).json({ error: "user login unsuccesfull" });
            }
        }
    } catch (err) {
        // console.log(err);
        res.status(500).json({ error: err.message || "Something went wrong" });
    }
};

const logOut = async (req, res) => {
    res.clearCookie("access-token");
    return res.status(200).json({ message: "Succesfull logout" });
};
//get user by id 
const getUsersById = async (req, res) => {
    try {
        // console.log(req.params); //parameters
        let { id } = req.params;
        let info = await User.findOne({
            where: { id: id },
        });
        if (info) {
            res.status(200).json({ data: info });
        } else {
            res.status(400).json({ error: "user not found" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message || "Something went wrong" });
    }
};
//user delete
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
        // console.log(err);
        res.status(500).json({ error: err.message || "Something went wrong" });
    }
};


const UpdateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const data = await User.update(req.body, { where: { id: userId } });

        if (data) {
            return res.status(200).json({ message: "user was updatad successfully!" });
        } else {
            return res.status(500).json({ error: "Cannot update user" });
        }
    }
    catch (err) {
        // console.log(err);
        res.status(500).json({ error: err.message || "Something went wrong" });
    }
};
const getUsersByAddress = async (req, res) => {
    //console.log(req.params); //parameters
    try {
        const { address } = req.body;//take address
        const data = await User.findAll({
            limit: 2, where: {
                address: { [Op.like]: "%" + address + "%" },
            },
        }); //find all adress
        if (data.length > 0) {
            res.status(200).json({ data: data });
        } else {
            res.status(400).json({ error: "user not found" });
        }

    } catch (err) {
        // console.log(err);
        res.status(500).json({ error: err.message || "Something went wrong" });
    }
};

const userPartialUpdate = async (req, res) => {
    try {
        const userId = req.params.id;
        const data = await User.update(req.body, { where: { id: userId } });

        if (data) {
            return res.status(200).json({ message: "user updated successfully!" });
        } else {
            return res.status(500).json({ error: "Cannot update user" });
        }
    }
    catch (err) {
        // console.log(err);
        res.status(500).json({ error: err.message || "Something went wrong" });
    }
};


module.exports = { createUser, verifyUser, loginUser, logOut, getUsersById, deleteUser, UpdateUser, getUsersByAddress, userPartialUpdate }
