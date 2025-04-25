import express from "express";
import multer from "multer";
import { storage } from "../cloudConfig.js"; // ✅ Correct import
const upload = multer({ storage });

import { index, createListing, showListing, destroyListing, updateListing } from "../controllers/listings.js";
import wrapAsync from "../middlewares/wrapAsync.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { validateListing } from "../listingMiddleware.js";

const router = express.Router();

router.route("/").get(wrapAsync(index), isAuthenticated);

router.route("/addpost").post(
  isAuthenticated,
  upload.single("listing[image]"), // ✅ Make sure this matches field name in frontend
  validateListing,
  wrapAsync(createListing)
);

router.route("/:id").get(wrapAsync(showListing),isAuthenticated);
router.route("/:id").delete(wrapAsync(destroyListing),isAuthenticated);

router.route("/:id").put(
  isAuthenticated,
  upload.single("listing[image]"),
  validateListing,
  wrapAsync(updateListing)
);


export default router;

