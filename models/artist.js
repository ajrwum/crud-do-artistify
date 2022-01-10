const mongoose = require("mongoose");
const artistSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  isBand: Boolean,
  description: String,
  picture: {
    type: String,
    default:
      "https://res.cloudinary.com/gdaconcept/image/upload/v1614550771/workshop-artistify/no-image-logo_dcufai.png",
  },
});
