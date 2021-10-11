const restaurantController = require("../controllers").restaurant;
const { uploadImage } = require("../services/upload.service");

module.exports = (app) => {
   // Home page
   app.get("/api/v1", restaurantController.home)
   //to get all restaurant
   app.get("/api/v1/restaurants", restaurantController.getAllRestaurants)
   //to get restaurants by location
   app.get("/api/v1/restaurantsbylocation/:locationId", restaurantController.getRestaurantsByLocation)
   //to get restaurants details by restaurantId
   app.get("/api/v1/restaurantsdetails", restaurantController.getRestaurantsDetails)
   //to add review
   app.post("/api/v1/addnewreview", restaurantController.addReview)
   //to filter restaurant
   app.post("/api/v1/filterrestaurants", restaurantController.filterRestaurant)
   //to search restaurant
   app.post("/api/v1/searchrestaurants", restaurantController.searchRestaurant)
   // app.get("/api/v1/searchrestaurants", restaurantController.searchRestaurant)
   //to add opening and closing time
   app.post("/api/v1/addtime/:restaurantId", restaurantController.addTime);
   //to add iamge
   app.post("/api/v1/restaurantImage/:restaurantId", uploadImage.array('images', 15), restaurantController.addImage);
}