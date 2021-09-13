const menuitemController = require("../controllers").menuitem;
module.exports = (app) => {
    //to create new menuitem
    app.post("/api/v1/addnewmenuitem", menuitemController.addNewMenuitem);
    //to fetch all menuitems
    app.get("/api/v1/getmenuitems", menuitemController.getMenuitems);
    //to get menuitems by restaurantid
    app.get("/api/v1/getmenuitemsbyrestaurant/:restaurantId", menuitemController.getMenuitemsByRestaurant);
    //to get menuitems by mealtypeId
    app.get("/api/v1/getmenuitemsbymealtype/:mealtypeId", menuitemController.getMenuitemsByMealtype);
    //to search menuitems based on perticular keyword
    app.get("/api/v1/search", menuitemController.searchMenuitems);
}