require('dotenv').config()
const util = require("util");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

CONNECTION_STRING = process.env.CONNECTION_STRING
MONGO_URL =
    CONNECTION_STRING.replace("<username>", process.env.MONGO_USERNAME).replace("<password>", process.env.MONGO_PASSWORD)

const storage = new GridFsStorage({
    url: MONGO_URL,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        const match = ["image/png", "image/jpeg"];
        if (match.indexOf(file.mimetype) === -1) {
            const filename = `${Date.now()}-image-${file.originalname}`;
            return filename;
        }
        return {
            bucketName: db.imageBucket,
            filename: `${Date.now()}-image-${file.originalname}`
        };
    }
});

const uploadFiles = multer({ storage: storage }).single("file");
const uploadFilesMiddleware = util.promisify(uploadFiles);
module.exports = uploadFilesMiddleware;