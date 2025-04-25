import express from "express";
import { createReview ,destroyReview} from "../controllers/review.js";

import wrapAsync from "../middlewares/wrapAsync.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { validateReview } from "../listingMiddleware.js";

const router = express.Router({ mergeParams: true });


router.route("/").post(validateReview, isAuthenticated,wrapAsync(createReview));
router
  .route("/:reviewId")
  .delete(isAuthenticated,destroyReview);



export default router;

