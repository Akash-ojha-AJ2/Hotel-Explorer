import React, { useState,useContext } from "react";
import "../styles/addpost.css"; // Your custom styles
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Context } from "../main";

const AddPostForm = () => {

    const navigate = useNavigate();
     const {backend } = useContext(Context);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
    price: "",
    country: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = new FormData();
    data.append("listing[title]", formData.title);
    data.append("listing[description]", formData.description);
    data.append("listing[price]", formData.price);
    data.append("listing[country]", formData.country);
    data.append("listing[image]", formData.image);
  
    try {
      const res = await fetch(`${backend}/api/v1/listing/addpost`, {
        method: "POST",
        credentials: "include", // same as withCredentials: true
        body: data,
      });
  
      const result = await res.json();
  
      if (!res.ok) {
        throw new Error(result.message || "Something went wrong");
      }
  
      toast.success(result.message || "Listing added!");
  
      // Redirect to home route after successful creation
       navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };
  

  return (
    <div className="addpost-container">
      <h3 className="addpost-heading">Create a New Listing</h3>
      <form onSubmit={handleSubmit} className="addpost-form">
        <label className="addpost-label">Title</label>
        <input
          type="text"
          name="title"
          placeholder="Enter title"
          value={formData.title}
          onChange={handleChange}
          className="addpost-input"
          required
        />

        <label className="addpost-label">Description</label>
        <textarea
          name="description"
          placeholder="Enter description"
          value={formData.description}
          onChange={handleChange}
          className="addpost-textarea"
          required
        />

        <label className="addpost-label">Upload Listing Image</label>
        <input
          type="file"
          name="image"
          onChange={handleChange}
          className="addpost-file"
          accept="image/*"
          required
        />

        <div className="addpost-flex-row">
          <div className="addpost-flex-col">
            <label className="addpost-label">Price</label>
            <input
              type="text"
              name="price"
              placeholder="1200"
              value={formData.price}
              onChange={handleChange}
              className="addpost-input"
              required
            />
          </div>
          <div className="addpost-flex-col">
            <label className="addpost-label">Country</label>
            <input
              type="text"
              name="country"
              placeholder="India"
              value={formData.country}
              onChange={handleChange}
              className="addpost-input"
              required
            />
          </div>
        </div>

        <button type="submit" className="addpost-button">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddPostForm;
