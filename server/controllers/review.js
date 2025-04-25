
import {Review} from "../models/review.js";
import {Listing} from "../models/listing.js";

export const createReview = async (req, res) => {
    try {
      console.log("Incoming Review:", req.body);

  
      const listing = await Listing.findById(req.params.id);

      console.log(listing);
      if (!listing) {
        return res.status(404).json({ error: "Listing not found" });
      }
  
      const newReview = new Review(req.body.review);
      newReview.author = req.user._id;
  
      listing.reviews.push(newReview._id); // Make sure you're pushing the ID only
      await newReview.save();
      await listing.save();
  
      res.status(201).json({ message: "Review created successfully", review: newReview });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to create review" });
    }
  };
  

export const destroyReview = async (req, res) => {
  try {
    const { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete review" });
  }
};
