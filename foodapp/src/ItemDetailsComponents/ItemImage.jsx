import React, { useState } from "react";
import styles from "./itemimage.module.css";

const FoodMenu = ({ food }) => {
  // Default placeholder image
  const defaultImage = "/placeholder.jpg";

  // Ensure there are always 5 images, filling missing spots with placeholders
  const images = food?.images?.length
    ? [...food.images, ...Array(5 - food.images.length).fill(defaultImage)]
    : Array(5).fill(defaultImage);

  // Set the first image as default
  const [mainImage, setMainImage] = useState(images[0]);

  // Function to handle image click
  const handleImageClick = (img) => {
    setMainImage(img);
  };

  return (
    <div className={styles.container}>
      <div className={styles.foodImage}>
        <span className={styles.discountBadge}>-25%</span>
        <img src={mainImage} alt={food?.name || "Food"} className={styles.image} />
      </div>

      {/* Dynamically display 5 images */}
      <div className={styles.foodGallery}>
        {images.slice(0, 5).map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`${food?.name || "Food"} ${index + 1}`}
            className={`${styles.thumbnail} ${mainImage === img ? styles.active : ""}`}
            onClick={() => handleImageClick(img)} // Update main image on click
          />
        ))}
      </div>
    </div>
  );
};

export default FoodMenu;

