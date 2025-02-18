import ShoppingBagIcon from "@mui/icons-material/ShoppingBagOutlined";
import styles from "./addtocartbutton.module.css"; // Create a new CSS file for button styles

export default function AddToCartButton({ food, addToCart }) {
  return (
    <button
      className={styles.button}
      onClick={(e) => {
        e.stopPropagation(); // Prevent navigation when clicking the button
        addToCart(food);
      }}
    >
      <ShoppingBagIcon className={styles.shopicon} fontSize="small" />
      ADD TO CART
    </button>
  );
}
