
import {Review}  from "./models/review.js" ;
import {ExpressError}  from "./middlewares/ExpressError.js" ;
import { listingSchema, reviewSchema }  from "./schema.js" ;




//listing schema validation
export const validateListing = (req, res, next) => {
    let {error} = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }else {
        next();
    }
};

//listing review schema
export const validateReview = (req, res, next) => {
    let {error} = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }else {
        next();
    }
};


export const isReviewAuthor= async (req, res, next) => {
    let {id, reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)) {
        req.flash("error", "Only the Author have permission to Delete review!! ");
        return res.redirect(`/listings/${id}`);
    }
    next();
};
