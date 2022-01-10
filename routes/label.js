const express = require("express");
const labelRouter = express.Router();
const labelModel = require("./../models/label.js");

// cloudinary config
const fileUploader = require("./../config/cloudinary");
const app = require("../app");
const async = require("hbs/lib/async");

// routes
labelRouter.get("/", async (req, res) => {
  try {
    const labels = await labelModel.find();
    res.render("dashboard/labels", labels);
  } catch (e) {
    next(e);
  }
});

module.exports = labelRouter;
