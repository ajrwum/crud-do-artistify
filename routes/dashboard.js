const express = require("express");
const artistModel = require("../models/artist");
const dashboardRouter = express.Router();

// cloudinary config
const fileUploader = require("./../config/cloudinary");

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

dashboardRouter.post(
  "/artists/create",
  fileUploader.single("picture"),
  async (req, res, next) => {
    try {
      // user's input directly from the form fields
      const { name, isBand, description } = req.body;
      // user's input after treatment from the middleware
      const picture = req.file.path;

      await artistModel.create({ name, isBand, description, picture });
      res.redirect("/dashboard/artists");
    } catch (error) {
      next(error);
    }
  }
);

//display id you selected to update
dashboardRouter.get("/artists/update/:id", async (req, res, next) => {
  try {
    const artistToUpdate = await artistModel.findById(req.params.id);
    res.render("dashboard/artist-update", {
      artistToUpdate,
    });
  } catch (error) {
    next(error);
  }
});

dashboardRouter.post(
  "/artists/:id",
  fileUploader.single("picture"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, isBand, description, existingImage } = req.body;
      let newPicture;
      if (req.file) newPicture = req.file.path;
      else newPicture = existingImage;

      const updated = await artistModel.findByIdAndUpdate(
        id,
        {
          name,
          isBand,
          description,
          picture: newPicture,
        },
        { new: true }
      );
      res.redirect("/dashboard/artists");
    } catch (e) {
      next(e);
    }
  }
);

dashboardRouter.get("/artists/delete/:id", async (req, res, next) => {
  try {
    await artistModel.findByIdAndDelete(req.params.id);
    res.redirect("/dashboard/artists");
  } catch (e) {
    next(e);
  }
});

module.exports = dashboardRouter;
