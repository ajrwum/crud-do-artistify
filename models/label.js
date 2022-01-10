const { model, Schema } = require("mongoose");

// constructing Schema
const labelSchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  city: String,
  country: String,
  street: String,
  streetNumber: Number,
  zipcode: String,
  logo: {
    type: String,
    default:
      "https://cdn6.aptoide.com/imgs/1/4/c/14c166cc3cd2cac8da4809024ba82d0e_icon.png",
  },
});

// constructing Model, deciding collection name on the base of the collection name
const labelModel = model("label", labelSchema);

// Exporting the Model
module.exports = labelModel;
