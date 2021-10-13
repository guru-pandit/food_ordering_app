const db = require("../models");
const { User, Token, passwordToken } = require("../models");//models destructure 
const bcrypt = require("bcryptjs"); //bcrypt password
const { validationResult } = require("express-validator");//for validations
const crypto = require("crypto");//convert token into hexabytes
const { sendVerificationMail, passwordResetMail } = require("../services/mail.service");//import service file
const jwt = require('jsonwebtoken');
const user = require("../models/user");
const Op = db.Sequelize.Op;

// Function to render register page
const getRegisterPage = async (req, res) => {
    res.render('register')
}

//create user
const createUser = async (req, res) => {
    try {
        let errors = validationResult(req); // expressvalidator
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
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
        // create new user
        const data = await User.create(user);
        if (data) {

            //get current date
            let currentDate = new Date()
            const token = {

                //convert token into random bytes
                token: crypto.randomBytes(64).toString("hex"),

                //take user id
                userId: data.id,

                //expired token after 30 min
                expiredAt: new Date(currentDate.getTime() + 30 * 60000)
            }

            sendVerificationMail(req, user, token);

            //create token here
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

// Function to render login page
const getLoginPage = async (req, res) => {
    res.render('login')
}

// Function to login user
let sessionArray = []
const loginUser = async (req, res) => {
    try {
        //take email and password
        const { email, password } = req.body;

        //find email
        const data = await User.findOne({ where: { email } });
        if (!data) {

            //if not data found then return user does not exist
            return res.status(400).json({ error: "user does not exist" });

            //if user there then convert there password into hashed
        } else {
            let isPassMatched = await bcrypt.compareSync(password, data.password);

            //if password is match then generate a token
            if (isPassMatched && data.isVerified == true) {
                // req.session.email = data.email
                // console.log(req.session);
                // res.status(200).json({ message: "Successfully logged in" })

                let token = jwt.sign({ id: data.id, email: data.email }, process.env.SECRET_KEY);
                // console.log(token)
                sessionArray.push(data.email)
                req.session.users = sessionArray
                console.log(req.session.users)
                res.cookie(`access-token`, token).json({ message: "Successfully logged in" });
            } else {
                return res.status(400).json({ error: "Login failed" });
            }
        }
    } catch (err) {
        // console.log(err);
        res.status(500).json({ error: err.message || "Something went wrong" });
    }
};

// Function to logout user
const logoutUser = async (req, res) => {
    try {
        let token = req.cookies["access-token"]
        // console.log(token)

        // verify a token
        jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
            if (err) throw err;
            // console.log(decoded)
            // check email in session array
            // console.log(req.session.users)
            sessionArray = req.session.users.filter((user) => {
                return user !== decoded.email
            })

            req.session.users = sessionArray
            console.log(req.session.users)
            res.redirect("/api/v1/login")
        });
    } catch (err) {
        // console.log(err);
        res.status(500).json({ error: err.message || "Something went wrong" });
    }
}

//user logout here
// const logOut = async (req, res) => {
// const { email } = req.body;

// sessionStore = express.session.MemoryStore();
// sessionStore.get(id, function (err, sess) {
//     sess.destroy(function (err) {

//     });
// });

// 

// sessionArray = sessionArray.filter((userEmail) => {
//     return email !== userEmail
// })
// req.session.user=sessionArray

//     const result = sessionArray.filter((userEmail) => {
//         return email === userEmail
//     })

//     //then destroy there session
//     req.session.destroy();

//     console.log(result)
//     console.log(req.session.user)

//     //clear access token
//     res.clearCookie("access-token");

// }

// app dashboard
const dashboard = async (req, res) => {

    //if user session is not there
    if (!req.session.user) {

        //then you cannot allow to access
        return res.status(401).send("You can not allow to access this page ");

    } else {

        //how many time you visit page
        if (req.session.page_views) {
            req.session.page_views++;
            res.send("You visited this page " + req.session.page_views + " times");
        } else {
            req.session.page_views = 1;
            res.send("Welcome to this page for the first time!");
        }
    }
    // return res.status(200).send("welcome to food ordering app");

}

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
//user delete here
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

//update user 
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

//user partially update 
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

const forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        // res.send(email);
        const user = await User.findOne({ where: { email } });
        if (!user) {

            //if not data found then return user does not exist
            return res.status(400).json({ error: "user does not exist" });

            //if user there then convert there password into hashed
        } else {
            let currentDate = new Date()
            // console.log(currentDate)
            const passToken = {
                token: crypto.randomBytes(64).toString("hex"),
                userId: user.id,
                isUsed: false,
                expiredAt: new Date(currentDate.getTime() + 15 * 60000)

            }

            const tokenData = await passwordToken.create(passToken)
            // console.log(tokenData)//save in database
            passwordResetMail(req, user, passToken);


            //console.log(req.protocol)
            res.send('Password reset link has been sent to your email address...')

        }
    } catch (err) {
        // console.log(err);
        res.status(500).json({ error: err.message || "Something went wrong" });
    }

}

const verifyUserToken = async (req, res) => {
    //to take query parameter from url
    let { passToken } = req.query;
    // console.log("passToken" + passToken)
    let tokenData = await passwordToken.findOne({ where: { token: passToken } })
    let currentDate = new Date()
    // console.log(tokenData)
    if (tokenData !== null) {
        // to check token expired or not
        //if token expired is less than current date then it will expired
        if (tokenData.expiredAt < currentDate || tokenData.isUsed) {
            res.status(400).json({ error: "Token expired or link already used" })
        } else {
            tokenData.isUsed = true;
            tokenData.save()
            res.render("resetPass")
        }

    } else {
        res.status(400).json({ error: "token not found" })
    }

}

const resetPassword = async (req, res) => {
    const { userId } = req.params
    const { password, confirmPassword } = req.body
    //check if this id exist in database
    // console.log("userId :-" + userId);
    const data = await User.findOne({ where: { id: userId } });
    if (!data) {
        //if not data found then return user does not exist
        return res.status(400).json({ error: "Invalid id..." });
    } else {
        let isPasswordMatched = password === confirmPassword;

        if (!isPasswordMatched) {
            return res.status(400).json({ error: "Password and Confirm password are not match please try again" });
        } else {
            let hashedPassword = await bcrypt.hashSync(password, 10);
            data.password = hashedPassword
            data.save()
        }
        res.status(200).json({ message: "password change " });

    }


};

// Function to add image
const addImage = async (req, res) => {
    try {
        let { userId } = req.params;
        console.log(userId)
        // console.log(req.file)

        if (req.file == undefined) {
            res.status(400).json({ error: "Please select an image file to upload" });
        } else {
            // let { filename, mimetype, originalname } = req.file;
            // // console.log("CONTROLLER_REQ_FILE:", req.file);
            // let user = await User.findOne({ where: { id } });

            // // Checking user existence in DB
            // // if exist store the filename in DB
            // // check is filename successfully stored or not
            // // if stored then only move/copy the file from tmp folder to uploads folder
            // if (user == null) {
            //     return res.status(400).json({ error: "User not found" });
            // } else {
            //     user.fileName = originalname;
            //     user.fileType = mimetype;
            //     user.filePath = path.join(__basedir, `public/uploads/images/${id}/${filename}`);
            //     await user.save();

            //     let isFolderExist = fs.existsSync(path.join(__basedir, `public/uploads/images/${id}`));

            //     if (isFolderExist) {
            //         fs.copyFile(path.join(__basedir, `public/tmp/${filename}`), path.join(__basedir, `public/uploads/images/${id}/${filename}`), (err) => {
            //             if (err) throw err;

            //             // fs.renameSync(path.join(__basedir, `public/uploads/images/${id}/${filename}`), path.join(__basedir, `public/uploads/images/${id}/${originalname}`))
            //             fs.unlinkSync(path.join(__basedir, `public/tmp/${filename}`));
            //             return res.status(200).json({ message: "File uploaded" });
            //         })
            //     } else {
            //         fs.mkdir(path.join(__basedir, `public/uploads/images/${id}`), (err) => {
            //             if (err) throw err;

            //             fs.copyFile(path.join(__basedir, `public/tmp/${filename}`), path.join(__basedir, `public/uploads/images/${id}/${filename}`), (err) => {
            //                 if (err) throw err;

            //                 // fs.renameSync(path.join(__basedir, `public/uploads/images/${id}/${filename}`), path.join(__basedir, `public/uploads/images/${id}/${originalname}`))
            //                 fs.unlinkSync(path.join(__basedir, `public/tmp/${filename}`));
            //                 return res.status(200).json({ message: "File uploaded" });
            //             })
            //         })
            //         fs.unlinkSync(path.join(__basedir, `public/tmp/${filename}`));
            //     }

            // }
        }

    } catch (error) {
        res.status(500).json({ error: err.message || "Something went wrong" });
    }
}

module.exports = { createUser, verifyUser, loginUser, logoutUser, dashboard, getUsersById, deleteUser, UpdateUser, getUsersByAddress, userPartialUpdate, getLoginPage, getRegisterPage, forgetPassword, resetPassword, verifyUserToken, addImage }
