const { Menuitem, Restaurant, Mealtype } = require("../models");
const db = require("../models");
const Op = db.Sequelize.Op;

//to add new menuitem
const addNewMenuitem = async(req, res) => {
    try {
        const menuitem = {
            name: req.body.name,
            description: req.body.description,
            image: req.body.image,
            price: req.body.price,
            restaurantId: req.body.restaurantId,
            mealtypeId: req.body.mealtypeId
        }
        const isExist = await Menuitem.findOne({ where: { name: menuitem.name, restaurantId: menuitem.restaurantId } })
        if (isExist === null) {
            const menuitemCreated = await Menuitem.create(menuitem)
            if (menuitemCreated !== null) {
                return res.status(200).json({ message: "Menuitem Added Successfully", restaurant: menuitemCreated })
            } else {
                return res.status(500).json({ error: "Menuitem NOT Added Successfully" })
            }
        } else {
            return res.status(500).json({ message: "Menuitem already Exist" })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Menuitem NOT Added Successfully", Error: err })
    }
}

//to get all Menuitems
const getMenuitems = async(req, res) => {
    try {
        const response = await Menuitem.findAll({
            include: [{ model: Mealtype, attributes: ["name", "content"] },
                { model: Restaurant, attributes: ["name", "address", "contact", "locationId"] }
            ]
        });
        //to check if we get response or not
        /*findAll method returns array of objects because of that we check length of array to ensure 
        whether array is empty or not*/
        if (response.length > 0) {
            return res.status(200).json({ message: "Menuitems Fetched Successfully.", Menuitems: response });
        } else {
            return res.status(500).json({ error: "Menuitems Not Fetched Successfully." });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Menuitems Not Fetched Successfully.", error: err });
    }
}

//to get menuitems by restaurantId
const getMenuitemsByRestaurant = async(req, res) => {
    try {
        const restaurantId = req.params.restaurantId;
        const response = await Menuitem.findAll({
            where: { /*this id variable from Menuitem table*/ restaurantId: restaurantId /*this id variable from params*/ },
            include: [{ model: Mealtype, attributes: ["name", "content"] },
                { model: Restaurant, attributes: ["name", "address", "contact", "locationId"] }
            ]
        })

        //to check if we get response or not
        /*findAll method returns array of objects because of that we check length of array to ensure 
        whether array is empty or not*/
        if (response.length > 0) {
            return res.status(200).json({ message: "Menuitems Fetched Successfully.", Menuitems: response });
        } else {
            return res.status(500).json({ error: "Menuitems Not Fetched Successfully." });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Menuitems Not Fetched Successfully.", error: err });
    }
}

//to get menuitems by mealtypeId
const getMenuitemsByMealtype = async(req, res) => {
    try {
        const mealtypeId = req.params.mealtypeId;
        const response = await Menuitem.findAll({
            where: { /*this id variable from Menuitem table*/ mealtypeId: mealtypeId /*this id variable from params*/ },
            include: [{ model: Mealtype, attributes: ["name", "content"] },
                { model: Restaurant, attributes: ["name", "address", "contact", "locationId"] }
            ]
        })

        //to check if we get response or not
        /*findAll method returns array of objects because of that we check length of array to ensure 
        whether array is empty or not*/
        if (response.length > 0) {
            return res.status(200).json({ message: "Menuitems Fetched Successfully.", Menuitems: response });
        } else {
            return res.status(500).json({ error: "Menuitems Not Fetched Successfully." });
        }
    } catch (err) {
        console.log(err)
    }
}

const searchMenuitems = async(req, res) => {
    let { menuitem } = req.query;

    const Op = db.Sequelize.Op;
    try {
        const filteredMenuitems = await Menuitem.findAll({
            where: {
                name: {
                    [Op.like]: '%' + menuitem + '%'
                }
            },
            include: [{ model: Mealtype, attributes: ["name", "content"] },
                { model: Restaurant, attributes: ["name", "address", "contact", "locationId"] }
            ]
        })
        if (filteredMenuitems) {
            return res.status(200).json({ message: "Menuitems fetched successfully", Menuitem: filteredMenuitems })
        } else {
            return res.status(500).json({ error: "No Result Found.." })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "No Result Found..", Error: err })
    }
}

module.exports = { addNewMenuitem, getMenuitems, getMenuitemsByRestaurant, getMenuitemsByMealtype, searchMenuitems }