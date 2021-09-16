const restaurantController = require("../controllers").restaurant;

module.exports = (app) => {
   //to get all restaurant
   app.get("/api/v1/restaurants",restaurantController.getAllRestaurants)
   //to get restaurants by location
   app.get("/api/v1/restaurantsbylocation/:locationId",restaurantController.getRestaurantsByLocation)
   //to add review
   app.post("/api/v1/addnewreview",restaurantController.addReview)
}