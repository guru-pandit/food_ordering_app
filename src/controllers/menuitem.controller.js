const { Menuitem, Restaurant, Mealtype, Cuisine} = require("../models");
const db = require("../models");
const Op = db.Sequelize.Op;
const path = require("path");
const fs = require("fs");

//to add new menuitem
const addNewMenuitem = async(req, res) => {
    try {
        //console.log(req.files);
        const menuitem = {
            name: req.body.name,
            description: req.body.description,
            image: null,
            price: req.body.price,
            restaurantId: req.body.restaurantId,
            mealtypeId: req.body.mealtypeId,
            cuisineId: req.body.cuisineId
        }
        const isExist = await Menuitem.findOne({ where: {
            [Op.and] : [
                {name: menuitem.name},
                {restaurantId: menuitem.restaurantId}
            ]  
        } 
        })
        if (isExist === null) {
            const menuitemCreated = await Menuitem.create(menuitem)
            if (menuitemCreated !== null) {
                const result = req.files && req.files.length > 0 ? req.files.map(item => {
                    return item.filename
                }) : null;
                //console.log(result)

                const uploadedImages = {
                    images: result
                }
                //console.log(uploadedImages)

                menuitemCreated.image = uploadedImages;
                await menuitemCreated.save();

                let isFolderExist = fs.existsSync(path.join(__basedir, `public/images/${menuitemCreated.id}`));
                if (isFolderExist) {
                    req.files.forEach(({ filename }) => {
                        fs.copyFileSync(path.join(__basedir, `public/tmp/${filename}`), path.join(__basedir, `public/images/${menuitemCreated.id}/${filename}`));
                    })
                } else {
                    fs.mkdirSync(path.join(__basedir, `public/images/${menuitemCreated.id}`));
                    req.files.forEach(({ filename }) => {
                        fs.copyFileSync(path.join(__basedir, `public/tmp/${filename}`), path.join(__basedir, `public/images/${menuitemCreated.id}/${filename}`));
                    })
                }
                return res.status(200).json({ message: "Menuitem Added Successfully", restaurant: menuitemCreated })
            } else {
                return res.status(500).json({ error: "Menuitem NOT Added Successfully" })
            }
        } else {
            return res.status(500).json({ message: "Menuitem already Exist" })
        }
    } catch (err) {
        // console.log(err);
        res.status(500).json({ error: "Menuitem NOT Added Successfully", Error: err })
    }
}

//to get all Menuitems
const getMenuitems = async(req, res) => {
    try {
        const response = await Menuitem.findAll({
            include: [
                { model: Mealtype, attributes: ["name", "content"] },
                { model: Cuisine, attributes: ["name"] },
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
    try {
        let { name,hcost,lcost } = req.query;
        var payload = {}

    if(name){
        payload = {
            name: {
                [Op.like]: '%' + name + '%'
            }
        }
    }
    if(hcost && lcost){
        payload = {
            price: {
                [Op.and]: {
                    [Op.lte]: hcost,
                    [Op.gte]: lcost
                }
            }
        }
    }
    if(name && hcost && lcost){
        payload = {
            name: {
                [Op.like]: '%' + name + '%'
            },
            price: {
                [Op.and]: {
                    [Op.lte]: hcost,
                    [Op.gte]: lcost
                }
            }
        }
    }

        const filteredMenuitems = await Menuitem.findAll({
            where: payload,
            include: [{ model: Mealtype, attributes: ["name", "content"] },
                { model: Restaurant, attributes: ["name", "address", "contact", "locationId"] }
            ]
        })
        if (filteredMenuitems.length > 0) {
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