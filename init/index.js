const mongoose = require("mongoose");
const intializedata = require("./travel.js");
const travels = require("../models/travels.js");

const MONGO_URl = "mongodb://127.0.0.1:27017/Channel";

// Response from DataBase
main().then(() => {
    console.log("Connected to DataBase");
})
    .catch((err) => {
        console.log(err);
    })

// Connect to DB
async function main() {
    mongoose.connect(MONGO_URl);
};

const initDB = async () => {
    travels.deleteMany({});
    travels.insertMany(intializedata.data);
    console.log("Data is Saved");
};

initDB();