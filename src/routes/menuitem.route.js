const menuitemController = require("../controllers").menuitem;
const { uploadImage } = require("../services/upload.service");
module.exports = (app) => {
    //to create new menuitem
    app.post("/api/v1/addnewmenuitem", uploadImage.array('images', 5), menuitemController.addNewMenuitem);
    //to fetch all menuitems
    app.get("/api/v1/getmenuitems", menuitemController.getMenuitems);
    //to get menuitems by restaurantid
    app.get("/api/v1/getmenuitemsbyrestaurant/:restaurantId", menuitemController.getMenuitemsByRestaurant);
    //to get menuitems by mealtypeId
    app.get("/api/v1/getmenuitemsbymealtype/:mealtypeId", menuitemController.getMenuitemsByMealtype);
    //to search menuitems based on perticular keyword
    app.post("/api/v1/search", menuitemController.searchMenuitems);
    //to filter menuitems
    app.post("/api/v1/filter", menuitemController.filterMenuitems)
}