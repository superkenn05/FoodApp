import styles from "./cartItemPrice.module.css";
export default function CartItemPrice({ price, oldPrice }) {
  return (
    <div className={styles.cartItemPricing}>
      <span className={styles.cartItemOldPrice}>
        ₱{oldPrice || (price * 1.5).toFixed(2)}
      </span>
      <span className={styles.cartItemPrice}>₱{price}</span>
    </div>
  );
}
