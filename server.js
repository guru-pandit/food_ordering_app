// Importing required packages
const express = require("express");
const path = require("path");
const cors = require("cors");
const db = require("./src/models");
const cookieParser = require("cookie-parser");
const session = require("express-session");

global.__basedir = __dirname;

const app = express();

let corsOptions = {
    origin: "http://localhost:8081",
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.set('view engine', 'hbs');
app.use(session({ secret: process.env.SESSION_SECRET_KEY, resave: false, saveUninitialized: true }));
//app.use(express.static('public'));

//setting view engine
app.set("views", "views");
app.set("view engine", 'hbs');

//setting public directory
const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

// calling sync() method
db.sequelize.sync();
// In Development, you need to drop existing tables and re-sync database. for that use force:true as following
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync DB");
// });

// Routes
require("./src/routes/user.route")(app);
require("./src/routes/menuitem.route")(app);
require("./src/routes/order.route")(app);
require("./src/routes/restaurant.route")(app);

// Setting Port and listening for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});
