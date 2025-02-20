import { useNavigate } from "react-router-dom";
import styles from "./fooditem.module.css";
import AddToCartButton from "./AddToCartButton";

export default function FoodItem({ food, addToCart }) {
  const navigate = useNavigate();

  return (
    <div
      className={styles.container}
      onClick={() => navigate(`/item-details/${encodeURIComponent(food.name)}`)}
    >
      <div className={styles.card}>
        <img src={food.image} alt={food.name} className={styles.image} />
        <p className={styles.category}>{food.category}</p>
        <p className={styles.name}>{food.name}</p>
        <p className={styles.price}>${food.price}</p>
        <AddToCartButton food={food} addToCart={addToCart} />
      </div>
    </div>
  );
}
