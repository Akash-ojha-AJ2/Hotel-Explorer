import mongoose from "mongoose";
import {Review}  from "./review.js";





const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    description: String,

    image: {
       url: String,
       filename: String,
    },

    price: Number,


    country: String,

    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      }
    ],

    owner: 
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        },

 
});



//CREATING MODULE
export const Listing = mongoose.model("Listing", listingSchema) ;

//and exporting this model to app.js with
