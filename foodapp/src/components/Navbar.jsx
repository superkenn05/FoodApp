import { useNavigate } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import styles from "./navbar.module.css";

export default function Navbar({ cartCount }) {
  const navigate = useNavigate();

  const handleCartClick = () => {
    navigate("/cart"); // ✅ Redirect to cart page
  };
  return (
    <div className={styles.nav}>
      🍔FoodAp
      <div className={styles.cartContainer} onClick={handleCartClick}>
        <ShoppingCartOutlinedIcon className={styles.cartIcon} />
        {cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
      </div>
    </div>
  );
}
