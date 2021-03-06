// Importing required packages
const express = require("express");
const jwt = require('jsonwebtoken')
const path = require("path");
const cors = require("cors");
const db = require("./src/models");
const cookieParser = require("cookie-parser");
const session = require('express-session');
const passport = require("passport");
const logger = require("morgan");
const swaggerUI = require("swagger-ui-express");
const swaggerDocs = require("./swagger")
require("./src/services/passport.service");
require('dotenv').config();
global.__basedir = __dirname;

const app = express();

let corsOptions = {
    origin: "http://localhost:8081",
};

app.use(cors(corsOptions));
app.use(logger('dev'))
app.use(cookieParser());
app.use(express.json());
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }))

// Passport
app.use(passport.initialize())
app.use(passport.session())

//setting view engine
const viewsDirectory = path.join(__dirname, "./src/views");
app.set("views", viewsDirectory);
app.set("view engine", 'hbs');

//setting public directory
const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

// calling sync() method
db.sequelize.sync({ logging: false });
// In Development, you need to drop existing tables and re-sync database. for that use force:true as following
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync DB");
// });

// Swagger UI 
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// Routes
require("./src/routes")(app);

// Setting Port and listening for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});
