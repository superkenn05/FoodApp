import styles from "./fooditem.module.css";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBagOutlined";

export default function FoodItem({ food, addToCart }) {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img src={food.image} alt={food.name} className={styles.image} />
        <p className={styles.category}>{food.category}</p>
        <p className={styles.name}>{food.name}</p>
        <p className={styles.price}>${food.price}</p>
        <button className={styles.button} onClick={() => addToCart(food)}>
          <ShoppingBagIcon className={styles.shopicon} fontSize="small" />
          ADD TO CART
        </button>
      </div>
    </div>
  );
}
