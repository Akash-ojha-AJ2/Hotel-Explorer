import {Listing} from "../models/listing.js" ;
import {Review} from "../models/review.js";


// Get all listings
export const index = async (req, res) => {
    try {
        const allListings = await Listing.find({});
        res.json({ listings: allListings });
    } catch (error) {
        res.status(500).json({ message: "Error fetching listings", error: error.message });
    }
};

// Get single listing
import mongoose from "mongoose";

export const showListing = async (req, res) => {
  try {
    let { id } = req.params;
    console.log("Requested ID:", id);

    // Check if ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid listing ID" });
    }

    const listing = await Listing.findById(id)
      .populate({
        path: "reviews",
        populate: { path: "author" },
      })
      .populate("owner");

    if (!listing) {
      return res.status(404).json({ error: "Listing not found" });
    }

    console.log("Found listing:", listing);
    res.json(listing);
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
};


// Create a new listing
export const createListing = async (req, res) => {
    try {
        console.log(req.body);
        let url = req.file?.path;
        let filename = req.file?.filename;

        const newListing = new Listing(req.body.listing);
        newListing.owner = req.user._id;
        newListing.image = { url, filename };

        await newListing.save();

        res.status(201).json({ message: "Listing created", listing: newListing });
    } catch (err) {
        res.status(500).json({ error: "Failed to create listing" });
    }
};

// Update a listing
export const updateListing = async (req, res) => {
    try {
        let { id } = req.params;
        let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { new: true });

        if (typeof req.file !== "undefined") {
            let url = req.file.path;
            let filename = req.file.filename;
            listing.image = { url, filename };
            await listing.save();
        }

        res.json({ message: "Listing updated", listing });
    } catch (err) {
        res.status(500).json({ error: "Failed to update listing" });
    }
};

// Delete a listing
export const destroyListing = async (req, res) => {
  try {
    const { id } = req.params;

    // Step 1: Find the listing
    const listing = await Listing.findById(id);

    if (!listing) {
      return res.status(404).json({ error: "Listing not found" });
    }

    // Step 2: Delete associated reviews
    await Review.deleteMany({ _id: { $in: listing.reviews } });

    // Step 3: Delete the listing
    const deletedListing = await Listing.findByIdAndDelete(id);

    res.json({ message: "Listing and associated reviews deleted", listing: deletedListing });
  } catch (err) {
    console.error("Error deleting listing and reviews:", err);
    res.status(500).json({ error: "Failed to delete listing" });
  }
};
