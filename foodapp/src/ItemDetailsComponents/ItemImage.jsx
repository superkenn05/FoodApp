import React, { useState } from "react";
import styles from "./itemimage.module.css";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const FoodMenu = ({ food }) => {
  // Default placeholder image
  const defaultImage = "/placeholder.jpg";

  // Ensure there are always 5 images, filling missing spots with placeholders
  const images = food?.images?.length
    ? [...food.images, ...Array(5 - food.images.length).fill(defaultImage)]
    : Array(5).fill(defaultImage);

  const [mainImage, setMainImage] = useState(null);
  const [loaded, setLoaded] = useState(false); // Track image loading

  // Function to handle image click
  const handleImageClick = (img) => {
    setMainImage(img);
    setLoaded(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.foodImage}>
        {food?.foodDiscount && <span className={styles.discountBadge}>-{food.foodDiscount}%</span>}
        
        {/* Show Skeleton while loading */}
        {!loaded ? (
          <Skeleton variant="rectangular" width={500} height={300} sx={{ bgcolor: "#444" }} />
        ) : (
          <img
            src={mainImage || images[0]}
            alt={food?.name || "Food"}
            className={styles.image}
            onLoad={() => setLoaded(true)}
          />
        )}
      </div>

      {/* Food Gallery */}
      <div className={styles.foodGallery}>
        {images.slice(0, 5).map((img, index) => (
          <div key={index}>
            {!loaded ? (
              <Skeleton variant="rectangular" width={90} height={80} sx={{ bgcolor: "#555" }} />
            ) : (
              <img
                src={img}
                alt={`${food?.name || "Food"} ${index + 1}`}
                className={`${styles.thumbnail} ${mainImage === img ? styles.active : ""}`}
                onClick={() => handleImageClick(img)}
                onLoad={() => setLoaded(true)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodMenu;
