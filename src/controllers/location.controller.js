const { Location, City, State, Country } = require("../models");

// Funtion to fetch all locations
const getAllLocations = async (req, res) => {
    try {
        let locations = await Location.findAll(
            {
                include: [
                    {
                        model: City,
                        attributes: ["name"],
                        include: [
                            {
                                model: State,
                                attributes: ["name"],
                                include: [
                                    {
                                        model: Country,
                                        attributes: ["name"]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        );

        if (locations.length > 0) {
            return res.status(200).json({ message: "Locations fetched successfully", locations: locations })
        } else {
            return res.status(400).json({ error: "Locations not fetched successfully" })
        }
    } catch (err) {
        res.status(500).json({ error: err.message || "Something went wrong" });
    }
}

module.exports = { getAllLocations }