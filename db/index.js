require("dotenv").config();
const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI).then((result) => {
  console.log(`Yay! connected! : ${result.connections[0].name}`);
});
