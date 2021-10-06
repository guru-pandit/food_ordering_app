const { Mealtype } = require("../models");
const db = require("../models");
const Op = db.Sequelize.Op;

// Function to get all mealtypes
const getAllMealtypes = async (req, res) => {
    try {
        let mealtypes = await Mealtype.findAll()

        // Checking mealtypes 
        if (mealtypes.length > 0) {
            return res.status(200).json({ message: "Mealtypes fetched", mealtypes });
        } else {
            return res.status(500).json({ error: "Mealtypes not fetched Successfully." });
        }
    } catch (err) {
        res.status(500).json({ error: err.message || "Something went wrong" })
    }
}

// Funtion to search mealtypes
const searchMealtypes = async (req, res) => {
    try {
        let { search } = req.query
        let mealtypes = await Mealtype.findAll({
            where: {
                name: { [Op.like]: '%' + search + '%' }
            },
        })

        if (mealtypes.length > 0) {
            return res.status(200).json({ mealtypes })
        } else {
            return res.status(400).json({ message: "Mealtypes not found" })
        }
    } catch (err) {
        res.status(500).json({ error: err.message || "Something went wrong" })
    }
}

module.exports = { getAllMealtypes, searchMealtypes }