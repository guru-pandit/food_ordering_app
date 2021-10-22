const restaurantController = require("../controllers").restaurant;
const { uploadImage } = require("../services/upload.service");
const { isLoggedIn } = require("../middlewares/auth")

module.exports = (app) => {
   // Home page
   app.get("/", restaurantController.home)
   //to get all restaurant
   app.get("/restaurants", restaurantController.getAllRestaurants)
   //to get restaurants by location
   app.get("/restaurantsbylocation/:locationId", restaurantController.getRestaurantsByLocation)
   //to get restaurants details by restaurantId
   app.get("/restaurantsdetails", restaurantController.getRestaurantsDetails)
   //to add review
   app.post("/addnewreview", restaurantController.addReview)
   //to filter restaurant
   app.post("/filterrestaurants", restaurantController.filterRestaurant)
   //to search restaurant
   app.post("/searchrestaurants", restaurantController.searchRestaurant)
   // app.get("/api/v1/searchrestaurants", restaurantController.searchRestaurant)
   //to add opening and closing time
   app.post("/addtime/:restaurantId", restaurantController.addTime);
   //to add iamge
   app.post("/restaurantImage/:restaurantId", uploadImage.array('images', 15), restaurantController.addImage);
}