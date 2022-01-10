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

dashboardRouter.get("/artists", async (req, res, next) => {
  try {
    const artists = await artistModel.find();
    res.render("dashboard/artists", { artists });
  } catch (error) {
    next(error);
  }
});

dashboardRouter.get("/artists/create", (req, res, next) => {
  res.render("dashboard/artist-create");
});

dashboardRouter.post("/artists/create", async (req, res, next) => {
  try {
    await artistModel.create(req.body);
    res.redirect("/dashboard/artists");
  } catch (error) {
    next(error);
  }
});

dashboardRouter.get("/artists/delete/:id", async (req, res, next) => {
  try {
    await artistModel.findByIdAndDelete(req.params.id);
    res.redirect("/dashboard/artists");
  } catch (e) {
    next(e);
  }
});

module.exports = dashboardRouter;
