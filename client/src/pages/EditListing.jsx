import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../main";
import "../styles/EditListing.css";

function EditListing() {
  const { id } = useParams();
  const { currentUser,backend } = useContext(Context);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
    originalImageUrl: "",
    price: "",
    country: "",
  });

  useEffect(() => {
    const fetchListing = async () => {
      const res = await fetch(`${backend}/api/v1/listing/${id}`, 
        {
        credentials: "include",
      });
      const data = await res.json();
      setFormData({
        title: data.title || "",
        description: data.description || "",
        originalImageUrl: data.image?.url || "",
        image: null,
        price: data.price || "",
        country: data.country || "",
      });
    };
    fetchListing();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = new FormData();
  
    updatedData.append("listing[title]", formData.title);
    updatedData.append("listing[description]", formData.description);
    updatedData.append("listing[price]", formData.price);
    updatedData.append("listing[country]", formData.country);
  
    if (formData.image) {
      updatedData.append("listing[image]", formData.image);
    }
  
    const res = await fetch(`${backend}/api/v1/listing/${id}`, {
      method: "PUT",
      credentials: "include",
      body: updatedData,
    });
  
    if (res.ok) {
      navigate(`/listing/${id}`);
    } else {
      const errData = await res.json();
      console.error("Failed to update listing:", errData);
      alert("Failed to update listing: " + errData.error);
    }
  };
  
  return (
    <div className="editForm-container">
      <h2 className="editForm-heading">Edit your Listing</h2>
      <form onSubmit={handleSubmit} className="editForm-form">
        <label>Title</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} />

        <label>Description</label>
        <textarea name="description" value={formData.description} onChange={handleChange} />

        <label>Original Image Preview</label>
        {formData.originalImageUrl && (
          <img src={formData.originalImageUrl} alt="Original Preview" className="editForm-preview" />
        )}

        <label>Upload New Image</label>
        <input type="file" name="image" onChange={handleChange} />

        <div className="editForm-flexGroup">
          <div>
            <label>Price</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} />
          </div>
          <div>
            <label>Country</label>
            <input type="text" name="country" value={formData.country} onChange={handleChange} />
          </div>
        </div>


        <button type="submit" className="editForm-submitBtn">Update Listing</button>
      </form>
    </div>
  );
}

export default EditListing;
