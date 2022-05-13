require('dotenv').config()
const mongoose = require("mongoose")

CONNECTION_STRING = process.env.CONNECTION_STRING
MONGO_URL =
    CONNECTION_STRING.replace("<username>", process.env.MONGO_USERNAME).replace("<password>", process.env.MONGO_PASSWORD)

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "ZooY"
})

const db = mongoose.connection

db.on("error", err => {
    console.error(err);
    process.exit(1)
})

db.once("open", async () => {
    console.log("Mongo connection started on " + db.host + ":" + db.port)
})

module.exports = db