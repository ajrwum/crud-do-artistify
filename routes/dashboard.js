const express = require("express");
const artistModel = require("../models/artist");
const dashboardRouter = express.Router();

dashboardRouter.get("/", (req, res, next) => {
  res.render("dashboard/index", {
    artistsNumber: 0,
    labelsNumber: 0,
    stylesNumber: 0,
  });
});

dashboardRouter.get("/artists/create", (req, res, next) => {
  res.render("dashboard/artist-create");
});

dashboardRouter.post("/artists/create", async (req, res, next) => {
  try {
    await artistModel.create(req.body);
    res.redirect("/dashboard");
  } catch (error) {
    next(error);
  }
});

module.exports = dashboardRouter;
