const { Cuisine } = require("../models");
const db = require("../models");
const Op = db.Sequelize.Op;

// Function to get all cuisines
const getAllCuisines = async (req, res) => {
    try {
        let cuisines = await Cuisine.findAll()

        // Checking cuisines 
        if (cuisines.length > 0) {
            return res.status(200).json({ message: "Cuisines fetched", cuisines });
        } else {
            return res.status(500).json({ error: "Cuisines not fetched Successfully." });
        }
    } catch (err) {
        res.status(500).json({ error: err.message || "Something went wrong" })
    }
}

// Funtion to search cuisine
const searchCuisines = async (req, res) => {
    try {
        let { search } = req.query
        console.log(search)
        let cuisines = await Cuisine.findAll({
            where: {
                name: { [Op.like]: '%' + search + '%' }
            },
        })

        // console.log(cuisines)

        if (cuisines.length > 0) {
            return res.status(200).json({ cuisines })
        } else {
            return res.status(400).json({ message: "Cuisines not found" })
        }
    } catch (err) {
        res.status(500).json({ error: err.message || "Something went wrong" })
    }
}

module.exports = { getAllCuisines, searchCuisines }