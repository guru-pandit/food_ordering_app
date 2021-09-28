const { Restaurant, Location, Review, Menuitem } = require("../models");
const db = require("../models");
const Op = db.Sequelize.Op;

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
            // return res.status(200).json({message : "Restaurants Fetched Successfully",restaurants : response})
            res.render("index", { restaurants: response })
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
            where : {
                locationId : locationId
        },
        //to include location,Menuitem,Review model in restaurant
        include : [
            {model : Location ,attributes : ["name","landmark","city","state","country"]},
            {model : Menuitem },
            {model : Review },
    ]
    })
    //to check whether we get response or not
    if(response.length>0){
        res.status(200).json({message : "Restaurants Fetched Successfully",restaurants : response})
    }else{
        res.status(500).json({message: "Restaurants NOT Fetched Successfully"})
    }

    } catch (err) {
        res.status(500).json({ error: err.message || "something went wrong" })
    }
}

//to get restaurants details by restaurantId
const getRestaurantsDetails = async(req,res) => {
try{
    const {restaurantId} = req.params;
    const restaurantDetails = await Restaurant.findOne({
        where : {id : restaurantId},
        //to include location,Menuitem,Review model in restaurant
        include : [
            {model : Location ,attributes : ["name","landmark","city","state","country"]},
            {model : Menuitem },
            {model : Review },
    ]
    })
    if(restaurantDetails !== null){
        //res.status(200).json({message : "Restaurant Details Fetched Successfully",restaurants : restaurantDetails})
        res.render('details', {restaurant : restaurantDetails})
    }else{
        res.status(500).json({message: "Restaurants Details NOT Fetched Successfully"})
    }
}catch(err){
    res.status(500).json({error : err.message || "something went wrong"})
}
}

//to add new review
const addReview = async (req, res) => {
    try {
        // to take value from req.body
        const review = {
            stars: req.body.stars > 5 ? 5 : req.body.stars,
            comment: req.body.comment,
            userId: req.body.userId,
            restaurantId: req.body.restaurantId,
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
                console.log(totalrating)
            })

            //to calculate average rating of restaurant
            restaurant.avgRatings = totalrating / totallen;
            console.log(restaurant.avgRatings)

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

//to search restaurant
// const searchRestaurant = async(req,res) => {
//     try{
//         const {search,name} = req.body;
//         var payload = {}

//         if (name) {
//             payload = {
//                 name: { [Op.like]: '%' + name + '%' } 
//             }
//         }

//         //to get all restaurants
//         const allRestaurant = await Restaurant.findAll({
//             include:[
//                 {model : Location ,attributes : ["name","landmark","city","state","country"]},
//                 {model : Menuitem },
//                 {model : Review}
//             ]
//         });

//         //to check whether all restaurants empty or not
//         if(allRestaurant.length > 0){ 

//             if(name){
//                 const nameWiseRestaurants = await Restaurant.findAll({
//                     where : payload,
//                     include:[
//                         {model : Location ,attributes : ["name","landmark","city","state","country"]},
//                         {model : Menuitem },
//                         {model : Review}
//                     ]
//                 })
//             if(nameWiseRestaurants.length>0){
//                 res.status(200).json({message : "Restaurants Fetched successfully",restaurants : nameWiseRestaurants})
//             }else{
//                 res.status(500).json({error : "Restaurants not found.."})
//             }
//             }else{

//                 var finalresult = []

//             //to map all restaurants from allRestaurant array
//             allRestaurant.map((restaurant)=> {

//                 //to filter restaurants reviews based on search string
//                 const reviews = (restaurant.Reviews.length > 0 ? restaurant.Reviews.filter((review)=> {
//                     return review.comment.trim().includes(search.trim())
//                 }) : null)

//                 //to check whether result is null of not and to map reviews array
//                 reviews && reviews !== null ? reviews.map((item)=>{
//                     if(item !== null){
//                         //to filter restaurants based on restaurantIds from reviews array and id of all restaurants
//                         magicresult = allRestaurant.filter((rest)=> {
//                             return item.restaurantId === rest.id
//                         })
//                         //to push magicresult into finalresult
//                         for(i of magicresult){
//                             finalresult.push(i)
//                         }
//                         //console.log(magicresult)
//                     }else{ 
//                         return
//                     }
//                 }):null
//             })
//             //console.log(finalresult)

//             //to remove duplicate elements from finalresult array
//             let unique = [...new Set(finalresult)]
//             console.log(unique)

//             //to check whether unique array empty or not
//             if(unique.length > 0){
//                 res.status(200).json({message : "Restaurant fetched successfully",restaurants :unique })
//             }else{
//                 res.status(500).json({error : "Restaurants not found..."})
//             }
//             }


//         }else{
//             res.status(500).json({error : "Restaurants not found..."})
//         }

//     }catch(err){
//         res.status(500).json({error : err.message || "something went wrong"})
//     }
// }
const searchRestaurant = async (req, res) => {
    try {
        const { search } = req.body;
        // var payload = {}
        // if (search) {
        //     payload = {
        //         [Op.or] : [
        //             { name: { [Op.like]: '%' + search + '%' } },
        //             { comment: { [Op.like]: '%' + search + '%' } }
        //         ]
        //     }
        // }
        var searchArray = []
        const searchResult = await Restaurant.findAll({
            where: { name: { [Op.like]: '%' + search + '%' } },
            include: [
                { model: Location, attributes: ["name", "landmark", "city", "state", "country"] },
                { model: Menuitem },
                { model: Review, where: { comment: { [Op.like]: '%' + search + '%' } } }
            ]
        })
        for (i of searchResult) {
            searchArray.push(i)
        }
        if (searchArray.length > 0) {
            return res.status(200).json({ message: "Restaurants Fetched successfully", restaurants: searchArray })
        } else {
            return res.status(500).json({ message: "Restaurants not found..." })
        }
    } catch (err) {
        res.status(500).json({ error: err.message || "something went wrong" })
    }
}

const addTime = async(req,res) => {
    try{
        const {restaurantId} = req.params;
        const {ot , ct} = req.body;
        const restaurant = await Restaurant.findOne({where :{
            id : restaurantId
        }})
        if(restaurant !== null){
            restaurant.openingTime = ot;
            restaurant.closingTime = ct;
            restaurant.save();
            return res.status(200).json({message : "Restaurants Updated", restaurant : restaurant})
        }else{
            return res.status(500).json({message : "Restaurants not found..."})
        }
    }catch(err){
        res.status(500).json({error : err.message || "something went wrong"})
    }
}

module.exports = {getAllRestaurants, getRestaurantsByLocation, addReview, filterRestaurant, searchRestaurant,getRestaurantsDetails, addTime}
