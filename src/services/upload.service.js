const path = require("path");
const fs = require("fs");
// Multer
const multer = require("multer");

// To get the date-time for filename
const getDateTimeString = () => {
    let datetime = new Date();
    let year = datetime.getFullYear();
    let month = `${datetime.getMonth() + 1}`.padStart(2, "0");
    let date = `${datetime.getDate()}`.padStart(2, "0");
    let hours = `${datetime.getHours()}`.padStart(2, "0");
    let minutes = `${datetime.getMinutes()}`.padStart(2, "0");
    let seconds = `${datetime.getSeconds()}`.padStart(2, "0");
    return `${year}${month}${date}${hours}${minutes}${seconds}`
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let storagePath = path.join(__basedir, "public/tmp")
        if (!fs.existsSync(storagePath)) {
            fs.mkdirSync(storagePath);
        }
        cb(null, storagePath);
    },
    filename: function (req, file, cb) {
        let fileName = `${getDateTimeString()}_${file.originalname}`;
        cb(null, fileName);
    },
});

// Funtion to check the file type and accept only image file
const imageFilter = (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        cb(null, true);
    } else {
        cb("Upload an Image file (.jpeg, .jpg, .png)", false);
    }
};

const maxSize = 2 * 1024 * 1024; // for 2 MB
const uploadImage = multer({ storage: storage, fileFilter: imageFilter, limits: { fileSize: maxSize } });

module.exports = { uploadImage };
