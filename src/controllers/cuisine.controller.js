const { Cuisine } = require("../models");

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


module.exports = { getAllCuisines }