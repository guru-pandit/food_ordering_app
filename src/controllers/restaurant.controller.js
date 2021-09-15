const {Restaurant, Location,Review} = require("../models");
const db = require("../models");
const Op = db.Sequelize.Op;

//to get all restaurants
const getAllRestaurants = async(req,res) => {
    try{
        //to get all restaurants
        const response = await Restaurant.findAll({
            //to include location model  in restaurant
            include : {model : Location ,attributes : ["name","landmark","city","state","country"]}
        })
        //to check whether we get response or not
        if(response.length > 0){
            return res.status(200).json({message : "Restaurants Fetched Successfully",restaurants : response})
        }else{
            return res.status(500).json({error : "Restaurants NOT Fetched Successfully"})
        }
    }catch(err){
        res.status(500).json({error : err.message || "something went wrong"})
    }
}

//to get restaurants by location
const getRestaurantsByLocation = async(req,res) => {
    try{
        //to take locationId from url
        const locationId = req.params.locationId;
        //to find Restaurants Based on the locationId which is passed in url 
        const response = await Restaurant.findAll({
            where : {
                locationId : locationId
        },
        //to include location model in restaurant
        include : {model : Location ,attributes : ["name","landmark","city","state","country"]}
    })
    //to check whether we get response or not
    if(response.length>0){
        res.status(200).json({message : "Restaurants Fetched Successfully",restaurants : response})
    }else{
        res.status(500).json({message: "Restaurants NOT Fetched Successfully"})
    }

    }catch(err){
        res.status(500).json({error : err.message || "something went wrong"})
    }
}

//to add new review
const addReview = async(req,res) => {
    try{
        // to take value from req.body
        const review = {
            stars : req.body.stars,
            comment : req.body.comment,
            userId : req.body.userId,
            restaurantId : req.body.restaurantId,
            commentedAt : Date.now()
        }
        //to create review
        const response = await Review.create(review)
        //to check whether review is created or not
        if(response!==null){
            //to find restaurant based on restaurant id which is passed in req.body
            const restaurant = await Restaurant.findOne({
                where:{id:review.restaurantId},
                //to include review model details in restaurant
                include:[{model:Review}]
            })
            //console.log(restaurant.Reviews)
            let totalrating = 0

            //to find length of "restaurant.Reviews" array
            let totallen = restaurant.Reviews.length

            //to calculate total ratings of restaurant
            restaurant.Reviews.map((item)=>{
                totalrating += item.stars
                console.log(totalrating)
            })

            //to calculate average rating of restaurant
            restaurant.avgRatings = totalrating/totallen;
            console.log(restaurant.avgRatings)

            //to update "avgRatings" with calculated average ratings in restaurant table
            restaurant.save()

            res.status(200).json({message:"Review added successfully",review : response})
        }else{
            return res.status(500).json({message:"Review NOT added successfully"})
        }
    }catch(err){
        res.status(500).json({error : err.message || "something went wrong"})
    }
}

module.exports = {getAllRestaurants, getRestaurantsByLocation, addReview}