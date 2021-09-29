const { Menuitem, Restaurant, Mealtype, Cuisine } = require("../models");
const db = require("../models");
const Op = db.Sequelize.Op;
const path = require("path");
const fs = require("fs");

//to add new menuitem
const addNewMenuitem = async (req, res) => {
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
        const isExist = await Menuitem.findOne({
            where: {
                [Op.and]: [
                    { name: menuitem.name },
                    { restaurantId: menuitem.restaurantId }
                ]
            }
        })
        if (isExist === null) {
            const menuitemCreated = await Menuitem.create(menuitem)
            if (menuitemCreated !== null) {

                //to get filename of uploaded images
                const result = req.files && req.files.length > 0 ? req.files.map(item => {
                    return item.originalname;
                }) : null;
                //console.log(result)

                const uploadedImages = {
                    images: result
                }
                //console.log(uploadedImages)

                //to update image field in menuitem model
                menuitemCreated.image = uploadedImages;
                await menuitemCreated.save();

                //to check whether folder is exist or not
                let isFolderExist = fs.existsSync(path.join(__basedir, `public/images/menuitems/${menuitemCreated.id}`));

                // //if folder exists
                if (isFolderExist) {
                    //to copy images from tmp folder to images folder
                    req.files.forEach(({ filename, originalname }) => {
                        fs.copyFileSync(path.join(__basedir, `public/tmp/${filename}`), path.join(__basedir, `public/images/menuitems/${menuitemCreated.id}/${originalname}`));
                        fs.unlinkSync(path.join(__basedir, `public/tmp/${filename}`));
                    })
                } else {
                    //to create new directory
                    fs.mkdirSync(path.join(__basedir, `public/images/menuitems/${menuitemCreated.id}`), { recursive: true });
                    //to copy images from tmp folder to images folder
                    req.files.forEach(({ filename, originalname }) => {
                        fs.copyFileSync(path.join(__basedir, `public/tmp/${filename}`), path.join(__basedir, `public/images/menuitems/${menuitemCreated.id}/${originalname}`));
                        fs.unlinkSync(path.join(__basedir, `public/tmp/${filename}`));
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
        res.status(500).json({ error: err.message || "Something went wrong" });
    }
}

//to get all Menuitems
const getMenuitems = async (req, res) => {
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
        // console.log(err);
        res.status(500).json({ error: err.message || "Something went wrong" });
    }
}

//to get menuitems by restaurantId
const getMenuitemsByRestaurant = async (req, res) => {
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
        // console.log(err);
        res.status(500).json({ error: err.message || "Something went wrong" });
    }
}

//to get menuitems by mealtypeId
const getMenuitemsByMealtype = async (req, res) => {
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
        // console.log(err)
        res.status(500).json({ error: err.message || "Something went wrong" });
    }
}

const searchMenuitems = async (req, res) => {
    try {
        let { search } = req.body;
        var payload = {}

        if (search) {
            payload = {
                [Op.or]: [
                    { name: { [Op.like]: '%' + search + '%' } },
                    { description: { [Op.like]: '%' + search + '%' } }
                ]
            }
        }

        const filteredMenuitems = await Menuitem.findAll({
            where: payload,
            include: [
                { model: Mealtype, attributes: ["name", "content"] },
                { model: Cuisine, attributes: ["name"] },
                { model: Restaurant, attributes: ["name", "address", "contact", "locationId"] }
            ]
        })
        if (filteredMenuitems.length > 0) {
            return res.status(200).json({ message: "Menuitems fetched successfully", Menuitem: filteredMenuitems })
        } else {
            return res.status(500).json({ error: "No Result Found.." })
        }
    } catch (err) {
        // console.log(err)
        res.status(500).json({ error: err.message || "Something went wrong" });
    }
}

//to filter menuitems
const filterMenuitems = async (req, res) => {
    try {
        let { hcost, lcost } = req.body;
        const mealtype = req.body.mealtype;

        var payload = {}

        if (hcost && lcost) {
            payload = {
                price: {
                    [Op.between]: [lcost, hcost],
                }
            }
        }

        const allMenuitems = await Menuitem.findAll({
            include: [
                { model: Mealtype, attributes: ["name", "content"] },
                { model: Cuisine, attributes: ["name"] },
                { model: Restaurant, attributes: ["name", "address", "contact", "locationId"] }
            ]
        }).sort((a, b) => a - b)
        if (allMenuitems.length > 0) {
            if (hcost && lcost) {
                const costWiseMenuitems = await Menuitem.findAll({ where: payload })
                if (costWiseMenuitems.length > 0) {
                    res.status(200).json({ message: "Menuitems Fetched successfully", menuitems: costWiseMenuitems })
                } else {
                    res.status(500).json({ error: "Menuitems NOT Fetched successfully" })
                }

            } else {
                const mealtypeWiseMenuitems = allMenuitems.filter((menuitem) => {
                    return menuitem.Mealtype.name.toLowerCase() === req.body.mealtype.toLowerCase()
                })
                console.log(mealtypeWiseMenuitems.length)

                if (mealtypeWiseMenuitems.length > 0) {
                    res.status(200).json({ message: "Menuitems Fetched successfully", menuitems: mealtypeWiseMenuitems })
                } else {
                    res.status(500).json({ error: "Menuitems NOT Fetched successfully" })
                }
            }
        } else {
            res.status(200).json({ error: "Menuitems NOT Fetched successfully" })
        }
    } catch (err) {
        res.status(500).json({ error: err.message || "something went wrong" })
    }
}

// Function to add images to menuitem
const addImage = async (req, res) => {
    try {
        let { menuitemid } = req.params
        // console.log(menuitemid)
        // console.log(req.files);

        // Finding a menuitem in table using id
        let menu = await Menuitem.findOne({ where: { id: menuitemid } })
        // console.log(menu);

        if (menu !== null) {
            // save images to the menuitem table
            //to get filename of uploaded images
            let images = req.files && req.files.length > 0 ? req.files.map(item => {
                return item.originalname;
            }) : null;
            // console.log(images)

            let uploadedImages = {
                images: images
            }
            // console.log(uploadedImages)

            //to update image field in menuitem model
            menu.image = uploadedImages;
            await menu.save();

            // Checking folder exist or not
            let isFolderExist = fs.existsSync(path.join(__basedir, `public/images/menuitems/${menu.id}`));
            // console.log(isFolderExist);

            if (isFolderExist) {
                req.files.forEach(({ filename, originalname }) => {
                    fs.copyFileSync(path.join(__basedir, `public/tmp/${filename}`), path.join(__basedir, `public/images/menuitems/${menu.id}/${originalname}`));
                    fs.unlinkSync(path.join(__basedir, `public/tmp/${filename}`));
                })
            } else {
                fs.mkdirSync(path.join(__basedir, `public/images/menuitems/${menu.id}`), { recursive: true });
                req.files.forEach(({ filename, originalname }) => {
                    fs.copyFileSync(path.join(__basedir, `public/tmp/${filename}`), path.join(__basedir, `public/images/menuitems/${menu.id}/${originalname}`));
                    fs.unlinkSync(path.join(__basedir, `public/tmp/${filename}`));
                })
            }
            return res.status(200).json({ message: "Images uploaded" })
        } else {
            return res.status(400).json({ error: "No menu item found" })
        }
    } catch (err) {
        // console.log(err);
        res.status(500).json({ error: err.message || "Something went wrong" });
    }
}

module.exports = { addNewMenuitem, getMenuitems, getMenuitemsByRestaurant, getMenuitemsByMealtype, searchMenuitems, filterMenuitems, addImage }