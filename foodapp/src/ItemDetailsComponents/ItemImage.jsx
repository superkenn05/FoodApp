// import React, { useState } from "react";
// import styles from "./itemimage.module.css";

// const FoodMenu = ({ food }) => {
//   // Set first image from the images array as default
//   const [mainImage, setMainImage] = useState(food.images[0]);

//   return (
//     <div className={styles.container}>
//       <div className={styles.foodImage}>
//         <span className={styles.discountBadge}>-25%</span>
//         <img src={mainImage} alt={food.name} className={styles.image} />
//       </div>

//       {/* Dynamically display all available images */}
//       <div className={styles.foodGallery}>
//         {food.images.map((img, index) => (
//           <img
//             key={index}
//             src={img}
//             alt={`${food.name} ${index + 1}`}
//             className={`${styles.thumbnail} ${mainImage === img ? styles.active : ""}`}
//             onClick={() => setMainImage(img)} // Update main image on click
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FoodMenu;
