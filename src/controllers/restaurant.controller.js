const { Restaurant, Location, Review, Menuitem, User } = require("../models");
const db = require("../models");
const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken');
const fs = require("fs")
const path = require("path");
const userRoute = require("../routes/user.route");

// This function renders the homepage as per the login status of the user
const home = async (req, res) => {
    try {
        if (req.user) {
            // console.log(req.user.email);
            await User.findOne({ where: { email: req.user.email } }).then((user) => {
                // user.image = `${req.protocol}://${req.headers.host}/images/users/${user.id}/${user.image}`
                user.image = `/images/users/${user.id}/${user.image}`
                // console.log(user);
                res.status(200).render("index", { isLoggedIn: true, user })
            })
        } else {
            res.status(200).render("index", { isLoggedIn: false })
        }
    } catch (err) {
        res.status(500).json({ error: err.message || "Something went wrong" });
    }
}

//to get all restaurants
const getAllRestaurants = async (req, res) => {
    try {
        //to get all restaurants
        const response = await Restaurant.findAll({
            //to include location model  in restaurant
            include: [
                { model: Location, attributes: ["name", "landmark", "city", "state", "country"] },
                { model: Menuitem },
                { model: Review },
            ]
        })
        //to check whether we get response or not
        if (response.length > 0) {
            // return res.status(200).json({ message: "Restaurants Fetched Successfully", restaurants: response })
            let restaurants = []
            response.forEach((rest) => {
                let imgPath = []
                imgPath = rest.image.map((img) => {
                    // return `${req.protocol}://${req.headers.host}/images/restaurants/${rest.id}/${img}`
                    return `/images/restaurants/${rest.id}/${img}`
                })
                rest.image = imgPath
                restaurants.push(rest)
            })

            // console.log(restaurants);
            res.status(200).json({ restaurants: restaurants })
            // res.render("index", { restaurants: restaurants })
        } else {
            return res.status(500).json({ error: "Restaurants NOT Fetched Successfully" })
        }
    } catch (err) {
        res.status(500).json({ error: err.message || "something went wrong" })
    }
}

//to get restaurants by location
const getRestaurantsByLocation = async (req, res) => {
    try {
        //to take locationId from url
        const locationId = req.params.locationId;
        //to find Restaurants Based on the locationId which is passed in url 
        const response = await Restaurant.findAll({
            where: {
                locationId: locationId
            },
            //to include location,Menuitem,Review model in restaurant
            include: [
                { model: Location, attributes: ["name", "landmark", "city", "state", "country"] },
                { model: Menuitem },
                { model: Review },
            ]
        })
        //to check whether we get response or not
        if (response.length > 0) {

            let restaurants = []
            response.forEach((rest) => {
                let imgPath = []
                imgPath = rest.image.map((img) => {
                    return `${req.protocol}://${req.headers.host}/images/restaurants/${rest.id}/${img}`
                    //return `/images/restaurants/${rest.id}/${img}`
                })
                rest.image = imgPath
                restaurants.push(rest)
            })

            // let menuitemsByLocation = []

            // response.forEach((rest) => {
            //     // console.log(rest.Menuitems.length);
            //     if (rest.Menuitems.length > 0) {
            //         rest.Menuitems.forEach((menu) => {
            //             menu.image = `/images/menuitems/${menu.id}/${menu.image.images[0]}`
            //             menuitemsByLocation.push(menu)
            //         })
            //     }
            // })


            res.status(200).json({ restaurants: restaurants })
            // res.status(200).json({ message: "Restaurants Fetched Successfully", restaurants: response })
            // res.status(200).render("index", { restaurants: restaurants, menuitems: menuitemsByLocation })
        } else {
            res.status(500).json({ message: "Restaurants NOT Fetched Successfully" })
        }

    } catch (err) {
        res.status(500).json({ error: err.message || "something went wrong" })
    }
}

//to get restaurants details by restaurantId
const getRestaurantsDetails = async (req, res) => {
    try {
        const { restaurantId } = req.query;
        const restaurantDetails = await Restaurant.findOne({
            where: { id: restaurantId },
            //to include location,Menuitem,Review model in restaurant
            include: [
                { model: Location, attributes: ["name", "landmark", "city", "state", "country"] },
                { model: Menuitem },
                { model: Review },
            ]
        })
        if (restaurantDetails !== null) {
            let reviewsCount = restaurantDetails.Reviews.length;
            let avgRatings = restaurantDetails.avgRatings.toFixed()

            let imgPath = []
            imgPath = restaurantDetails.image.map((img) => {
                // return `${req.protocol}://${req.headers.host}/images/restaurants/${restaurantId}/${img}`
                return `/images/restaurants/${restaurantId}/${img}`
            })
            restaurantDetails.image = imgPath

            restaurantDetails.Menuitems.map((menu) => {
                let menuImgPath = []
                menuImgPath = menu.image.images.map((img) => {
                    console.log(img);
                    // return `${req.protocol}://${req.headers.host}/images/restaurants/${restaurantId}/${img}`
                    return `/images/menuitems/${menu.id}/${img}`
                })
                console.log(menuImgPath);
                menu.image.images = menuImgPath
            })

            // res.status(200).json({ message: "Restaurant Details Fetched Successfully", restaurants: restaurantDetails, menuitems: restaurantDetails.Menuitems })
            res.render('details', { restaurant: restaurantDetails, reviews: restaurantDetails.Reviews, reviewsCount: reviewsCount, avgRatings: avgRatings, menuitems: restaurantDetails.Menuitems })
        } else {
            res.status(500).json({ message: "Restaurants Details NOT Fetched Successfully" })
        }
    } catch (err) {
        res.status(500).json({ error: err.message || "something went wrong" })
    }
}

//to add new review
const addReview = async (req, res) => {
    try {
        // to take value from req.body
        const review = {
            stars: req.body.stars > 5 ? 5 : req.body.stars,
            comment: req.body.comment,
            userId: req.query.userId,
            restaurantId: req.query.restaurantId,
            commentedAt: Date.now()
        }
        //to create review
        const response = await Review.create(review)
        //to check whether review is created or not
        if (response !== null) {
            //to find restaurant based on restaurant id which is passed in req.body
            const restaurant = await Restaurant.findOne({
                where: { id: review.restaurantId },
                //to include review model details in restaurant
                include: [{ model: Review }]
            })
            //console.log(restaurant.Reviews)
            let totalrating = 0

            //to find length of "restaurant.Reviews" array
            let totallen = restaurant.Reviews.length

            //to calculate total ratings of restaurant
            restaurant.Reviews.map((item) => {
                totalrating += item.stars
                //console.log(totalrating)
            })

            //to calculate average rating of restaurant
            restaurant.avgRatings = totalrating / totallen;
            //console.log(restaurant.avgRatings)

            //to update "avgRatings" with calculated average ratings in restaurant table
            restaurant.save()

            res.status(200).json({ message: "Review added successfully", review: response })
        } else {
            return res.status(500).json({ message: "Review NOT added successfully" })
        }
    } catch (err) {
        res.status(500).json({ error: err.message || "something went wrong" })
    }
}

//to filter restaurant
const filterRestaurant = async (req, res) => {
    try {
        const { review } = req.body;
        var payload = {}
        if (review) {
            payload = {
                avgRatings: {
                    [Op.gte]: review
                }
            }
        }
        const restaurant = await Restaurant.findAll({
            where: payload,
            include: [
                { model: Location, attributes: ["name", "landmark", "city", "state", "country"] },
                { model: Menuitem },
                { model: Review },
            ]
        })
        if (restaurant.length > 0) {
            res.status(200).json({ message: "Restaurants Fetched successfully", restaurants: restaurant })
        } else {
            res.status(500).json({ message: "Restaurants not found" })
        }

    } catch (err) {
        res.status(500).json({ error: err.message || "something went wrong" })
    }
}

// Function to search restaurants or menuitems
const searchRestaurant = async (req, res) => {
    try {
        //to get data from req.body
        const { search, locationId } = req.body;
        //to create empty array variable
        var searchArray = []

        //to get all restaurants based on search keyword
        const searchResult = await Restaurant.findAll({
            where: {
                name: { [Op.like]: '%' + search + '%' },
                locationId: locationId
            },
            include: [{ model: Location, attributes: ["name", "landmark", "city", "state", "country"] }]
        })

        //to check whether searchResult is empty or not
        if (searchResult) {
            //to push searchResult into searchArray
            let restArray = []
            searchResult.forEach((rest) => {
                let imgPath = []
                imgPath = rest.image.map((img) => {
                    // return `${req.protocol}://${req.headers.host}/images/restaurants/${rest.id}/${img}`
                    return `/images/restaurants/${rest.id}/${img}`
                })
                rest.image = imgPath
                restArray.push(rest)
            })

            searchArray.push({ restaurantList: restArray })
        } else {
            searchArray.push({ restaurantList: [] })
        }

        //here we create function to get restaurantids based on locationid
        const getRestaurantIds = async (locationId) => {
            let restaurantid = []
            return await Restaurant.findAll({
                where: { locationId: locationId }
            }).then(restaurant => {
                if (restaurant) {
                    restaurant.forEach(res => {
                        restaurantid.push(res.id);
                    })
                    return restaurantid;
                }
            })
        }
        //to set result array(result of getRestaurantIds(locationId)) into restaurantIds
        let restaurantIds = await getRestaurantIds(locationId);
        // console.log(restaurantIds);
        //to get all menuitems based on search keyword and location
        const menuitems = await Menuitem.findAll({
            where: {
                name: { [Op.like]: '%' + search + '%' },
                restaurantId: { [Op.in]: restaurantIds }
            }
        })
        //to check whether menuitems is empty or not
        if (menuitems) {
            //to push menuitems into searchArray
            searchArray.push({ menuitemList: menuitems })
        } else {
            searchArray.push({ menuitemList: [] })
        }

        //to check whether searchArray is Empty or Not
        if (searchArray.length > 0) {
            return res.status(200).json({ message: "Restaurants Fetched successfully", restaurants: searchArray })
        } else {
            return res.status(400).json({ message: "Restaurants not found...", restaurants: searchArray })
        }
    } catch (err) {
        res.status(500).json({ error: err.message || "something went wrong" })
    }
}

const addTime = async (req, res) => {
    try {
        const { restaurantId } = req.params;
        const { ot, ct } = req.body;
        const restaurant = await Restaurant.findOne({
            where: {
                id: restaurantId
            }
        })
        if (restaurant !== null) {
            restaurant.openingTime = ot;
            restaurant.closingTime = ct;
            restaurant.save();
            return res.status(200).json({ message: "Restaurants Updated", restaurant: restaurant })
        } else {
            return res.status(500).json({ message: "Restaurants not found..." })
        }
    } catch (err) {
        res.status(500).json({ error: err.message || "something went wrong" })
    }
}

// function to add image in restaurnt
const addImage = async (req, res) => {
    try {
        let { restaurantId } = req.params;
        // console.log(req.files);

        let restaurant = await Restaurant.findOne({ where: { id: restaurantId } })
        // console.log(restaurant);

        if (restaurant !== null) {

            //to update image field in restaurant model
            const result = req.files && req.files.length > 0 ? req.files.map(item => {
                return item.originalname;
            }) : null;
            // console.log(result)

            restaurant.image = result;
            await restaurant.save();

            //to check whether folder is exist or not
            let isFolderExist = fs.existsSync(path.join(__basedir, `public/images/restaurants/${restaurantId}`));

            // //if folder exists
            if (isFolderExist) {
                //to copy images from tmp folder to images folder
                req.files.forEach(({ filename, originalname }) => {
                    fs.copyFileSync(path.join(__basedir, `public/tmp/${filename}`), path.join(__basedir, `public/images/restaurants/${restaurantId}/${originalname}`));
                    fs.unlinkSync(path.join(__basedir, `public/tmp/${filename}`));
                })
            } else {
                //to create new directory
                fs.mkdirSync(path.join(__basedir, `public/images/restaurants/${restaurantId}`), { recursive: true });
                //to copy images from tmp folder to images folder
                req.files.forEach(({ filename, originalname }) => {
                    fs.copyFileSync(path.join(__basedir, `public/tmp/${filename}`), path.join(__basedir, `public/images/restaurants/${restaurantId}/${originalname}`));
                    fs.unlinkSync(path.join(__basedir, `public/tmp/${filename}`));
                })
            }
            return res.status(200).json({ message: "Images uploaded" })
        } else {
            return res.status(400).json({ message: "No restaurant found" })
        }
    } catch (err) {
        res.status(500).json({ error: err.message || "something went wrong" })
    }
}

module.exports = { home, getAllRestaurants, getRestaurantsByLocation, addReview, filterRestaurant, searchRestaurant, getRestaurantsDetails, addTime, addImage }