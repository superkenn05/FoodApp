import { useParams, useNavigate } from "react-router-dom";
import styles from "./itemdetails.module.css";
import foodData from "../Data/foodData"; // ✅ Use correct capitalization and path


export default function ItemDetails() {
  const { name } = useParams(); // Get item name from URL
  const navigate = useNavigate();

  // Find the food item using the decoded name
  const food = foodData.find((item) => item.name === decodeURIComponent(name));

  if (!food) {
    return <p>Item not found.</p>;
  }

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>← Back</button>
      <div className={styles.detailsCard}>
        <img src={food.image} alt={food.name} className={styles.image} />
        <div className={styles.info}>
          <h2 className={styles.name}>{food.name}</h2>
          <p className={styles.category}>{food.category}</p>
          <p className={styles.price}>${food.price}</p>
          <p className={styles.description}>Delicious {food.name} served fresh.</p>
        </div>
      </div>
    </div>
  );
}
