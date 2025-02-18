import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./itemdetails.module.css";
import foodData from "../Data/foodData";
import Navbar from "../ItemComponents/Navbar";
import ItemImage from "./ItemImage";
import CartItemPrice from "../AddToCartComponents/CartItemPrice";
import AddToCartButton from "../ItemComponents/AddToCartButton";
import CartItemQuantity from "../AddToCartComponents/CartItemQuantity";

export default function ItemDetails() {
  const { name } = useParams();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCart);
  }, []);

  const food = foodData.find((item) => item.name === decodeURIComponent(name));

  if (!food) {
    return <p>Item not found.</p>;
  }

  return (
    <div>
      <Navbar cartCount={cartItems.length} />
      <div className={styles.container}>
        <ItemImage food={food} />
        <div className={styles.info}>
          <p className={styles.category}>{food.category}</p>
          <h2 className={styles.name}>{food.name}</h2>
          <div className={styles.price} style={{ all: "unset" }}>
            <CartItemPrice price={food.price} oldPrice={food.oldPrice} />
          </div>
          <p className={styles.description}>{food.description}</p>
          <div className={styles.addcart}>
            <CartItemQuantity />
            <AddToCartButton />
          </div>
        </div>
      </div>
    </div>
  );
}
