import ShoppingBagIcon from "@mui/icons-material/ShoppingBagOutlined";
import styles from "./addtocartbutton.module.css";

export default function AddToCartButton({ food, addToCart }) {
  return (
    <button
      className={styles.button}
      onClick={(e) => {
        e.stopPropagation();
        addToCart(food);
      }}
    >
      <ShoppingBagIcon className={styles.shopicon} fontSize="small" />
      ADD TO CART
    </button>
  );
}
