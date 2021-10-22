const menuitemController = require("../controllers").menuitem;
const { uploadImage } = require("../services/upload.service");
module.exports = (app) => {
    //to create new menuitem
    app.post("/addnewmenuitem", uploadImage.array('images', 5), menuitemController.addNewMenuitem);
    //to fetch all menuitems
    app.get("/getmenuitems", menuitemController.getMenuitems);
    //to get menuitems by restaurantid
    app.get("/getmenuitemsbyrestaurant/:restaurantId", menuitemController.getMenuitemsByRestaurant);
    //to get menuitems by mealtypeId
    app.get("/getmenuitemsbymealtype/:mealtypeId", menuitemController.getMenuitemsByMealtype);
    //to search menuitems based on perticular keyword
    app.post("/search", menuitemController.searchMenuitems);
    //to filter menuitems
    app.post("/filter", menuitemController.filterMenuitems)
    //to add images
    app.post("/menuitemimages/:menuitemid", uploadImage.array('images', 5), menuitemController.addImage)
}