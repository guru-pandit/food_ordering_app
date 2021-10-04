const { Mealtype } = require("../models");

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

    } catch (err) {
        res.status(500).json({ error: err.message || "Something went wrong" })
    }
}

module.exports = { getAllMealtypes, searchMealtypes }