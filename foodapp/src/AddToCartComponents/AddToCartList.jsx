import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import AddToCartNavbar from "./AddToCartNavbar";
import styles from "./addtocartlist.module.css";
import CartItemQuantity from "./CartItemQuantity";
import CartItemPrice from "./CartItemPrice";
import DeleteButton from "./DeleteButton";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import db from "../firebase";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#2a2a2a",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: "#ffffff",
  display: "flex",
  alignItems: "center",
  borderRadius: "8px",
  border: "none",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  width: "900px",
  marginLeft: "auto",
  marginRight: "auto",
  marginTop: "15px",
}));

export default function BasicStack() {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        await loadCart(currentUser.uid);
      } else {
        setUser(null);
        setCartItems([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const loadCart = async (uid) => {
    const cartRef = doc(db, "carts", uid);
    const cartSnap = await getDoc(cartRef);
    if (cartSnap.exists()) {
      setCartItems(cartSnap.data().items || []);
    } else {
      setCartItems([]);
    }
  };

  const saveCart = async (updatedCart) => {
    if (!user) return;
    const cartRef = doc(db, "carts", user.uid);
    await setDoc(cartRef, { items: updatedCart }, { merge: true });
  };

  const increaseQuantity = async (index) => {
    let updatedCart = [...cartItems];
    updatedCart[index].quantity += 1;
    setCartItems(updatedCart);
    await saveCart(updatedCart);
  };

  const decreaseQuantity = async (index) => {
    let updatedCart = [...cartItems];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      setCartItems(updatedCart);
      await saveCart(updatedCart);
    }
  };

  const removeItem = async (index) => {
    let updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    await saveCart(updatedCart);
  };

  return (
    <div>
      <AddToCartNavbar />
      <div className={styles["cart-container"]}>
        <Box sx={{ width: "100%" }}>
          {cartItems.length === 0 ? (
            <Item className={styles["cart-empty"]}>Your cart is empty.</Item>
          ) : (
            cartItems.map((item, index) => (
              <Item key={index} className={styles["cart-item"]}>
                <img src={item.image} alt={item.name} />
                <div className={styles["cart-item-info"]}>
                  <div className={styles["cart-item-name"]}>{item.name}</div>
                </div>
                <p className={styles["cart-item-variation"]}>
                  Variations: {item.variation || "Default"}
                </p>

                <CartItemPrice price={item.price} oldPrice={item.oldPrice} />

                <CartItemQuantity
                  quantity={item.quantity}
                  increase={() => increaseQuantity(index)}
                  decrease={() => decreaseQuantity(index)}
                />

                <p className={styles["cart-item-total"]}>
                  ₱{(item.price * item.quantity).toFixed(2)}
                </p>

                <DeleteButton onDelete={() => removeItem(index)} />
              </Item>
            ))
          )}
        </Box>
      </div>
    </div>
  );
}
