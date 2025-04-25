import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext, useEffect, useState } from 'react';
import { Context } from "../main";
import '../styles/ShowList.css';

function ListingDetail() {
  const navigate = useNavigate();
  const { currentUser,backend } = useContext(Context);
  const { id } = useParams();
  const [listing, setListing] = useState();
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await fetch(`${backend}/api/v1/listing/${id}`, {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) throw new Error('Network error');
        const data = await response.json();
        setListing(data);
      } catch (error) {
        toast.error("Failed to load listing data.");
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchListing();
  }, [id]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${backend}/api/v1/listing/${id}/reviews/`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ review: { rating, comment } }),
      });

      const data = await response.json();
      if (response.ok) {
        setRating(0);
        setComment("");
        toast.success("Review successfully submitted!");
        setListing((prev) => ({ ...prev, reviews: [...(prev.reviews || []), data.review] }));
      } else {
        console.error("Failed to submit review:", data.error);
        toast.error(data.error || "Failed to submit review");
      }
    } catch (err) {
      console.error("Error submitting review:", err);
      toast.error("Something went wrong");
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      const response = await fetch(`${backend}/api/v1/listing/${id}/reviews/${reviewId}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Review deleted successfully!");
        setListing((prev) => ({
          ...prev,
          reviews: (prev.reviews || []).filter((r) => r._id !== reviewId),
        }));
      } else {
        toast.error(data.error || "Failed to delete review");
      }
    } catch (error) {
      console.error("Error deleting review:", error);
      toast.error("Something went wrong");
    }
  };

  const handleDeleteListing = async () => {
    if (!window.confirm("Are you sure you want to delete this listing?")) return;
    try {
      const response = await fetch(`${backend}/api/v1/listing/${listing._id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Listing deleted successfully!");
        navigate("/");
      } else {
        toast.error(data.error || "Failed to delete listing");
      }
    } catch (error) {
      console.error("Delete listing error:", error);
      toast.error("Something went wrong");
    }
  };

  const StarRatingDisplay = ({ rating }) => (
    <div className="star-display">
      {[...Array(5)].map((_, i) => (
        <span key={i} className={i < rating ? "filled" : "empty"}>★</span>
      ))}
    </div>
  );

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
        <p>Loading listing...</p>
      </div>
    );
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

      <div className="listingDetail-wrapper">
        <div className="listingDetail-header">
          <h3 className="listingDetail-title">{listing.title}</h3>
        </div>

        <div className="listingDetail-imageContainer">
          {listing?.image?.url ? (
            <img src={listing.image.url} alt={listing.title} className="listingDetail-image" />
          ) : (
            <p>No image available</p>
          )}
        </div>

        <div className="listingDetail-info">
          <p><strong>Owner:</strong> {listing.owner.name || 'Not specified'}</p>
          <p>{listing.description}</p>
          <p className="listingDetail-price">Price: ₹{listing.price} /Night</p>
        </div>

        {currentUser?._id === listing.owner._id && (
          <div className="listingDetail-ownerActions">
            <button className="ownerActions-editButton" onClick={() => navigate(`/edit-listing/${listing._id}`)}>Edit</button>
            <button className="ownerActions-deleteButton" onClick={handleDeleteListing}>Delete</button>
          </div>
        )}

        <section className="listingDetail-allReviews">
          <h3>All Reviews</h3>
          <div className="listingDetail-reviewGrid">
            {(listing.reviews || []).length > 0 ? (
              listing.reviews.map((review) => (
                <article key={review._id} className="listingDetail-reviewCard">
                  <p className="listingDetail-reviewAuthor">@{review.author?.name || "Anonymous"}</p>
                  <StarRatingDisplay rating={review.rating} />
                  <p className="listingDetail-reviewComment">{review.comment}</p>
                  {currentUser?._id === review.author?._id && (
                    <button className="listingDetail-deleteBtn" onClick={() => handleDeleteReview(review._id)}>Delete</button>
                  )}
                </article>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>
        </section>

        <section className="listingDetail-reviewSection">
          <h3>Leave a Review</h3>
          <form onSubmit={handleSubmitReview}>
            <div className="listingDetail-stars">
              {[...Array(5)].map((_, index) => {
                const starValue = index + 1;
                return (
                  <span
                    key={starValue}
                    className={`listingDetail-star ${starValue <= (hover || rating) ? 'active' : ''}`}
                    onClick={() => setRating(starValue)}
                    onMouseEnter={() => setHover(starValue)}
                    onMouseLeave={() => setHover(0)}
                    aria-label={`Rate ${starValue} star`}
                  >
                    ★
                  </span>
                );
              })}
            </div>

            <textarea
              className="listingDetail-commentBox"
              placeholder="Write your comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>

            <button type="submit" className="listingDetail-submitBtn">Submit Review</button>
          </form>
        </section>
      </div>
    </>
  );
}

export default ListingDetail;
