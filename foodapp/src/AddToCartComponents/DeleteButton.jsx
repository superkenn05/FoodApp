import styles from "./deleteButton.module.css";
export default function DeleteButton({ onDelete }) {
    return (
      <span className={styles.cartItemDelete} onClick={onDelete}>
        Delete
      </span>
    );
  }
  