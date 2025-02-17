import styles from "./cartItemQuantity.module.css";
export default function CartItemQuantity({ quantity, increase, decrease }) {
    return (
      <div className={styles.cartItemQuantity}>
        <button onClick={decrease}>-</button>
        <input type="text" value={quantity} readOnly />
        <button onClick={increase}>+</button>
      </div>
    );
  }
  