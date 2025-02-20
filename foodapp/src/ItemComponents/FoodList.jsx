import { useState, useEffect } from "react";
import FoodItem from "./FoodItem";
import Filter from "./Filter";
import Search from "./Search";
import styles from "./foodlist.module.css";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import db from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

export default function FoodList() {
  const [sortOrder, setSortOrder] = useState("latest");
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [food, setfood] = useState([]);
  const navigate = useNavigate();

  useEffect(
    () =>
      onSnapshot(collection(db, "foodData"), (snapshot) =>
        setfood(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
      ),
    []
  );

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCart);
  }, []);

  const addToCart = (food) => {
    let cart = JSON.parse(localStorage.getItem("cartItems")) || [];
    const existingItemIndex = cart.findIndex((item) => item.name === food.name);
    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity += 1;
    } else {
      cart.push({ ...food, quantity: 1 });
    }

    setCartItems(cart);
    localStorage.setItem("cartItems", JSON.stringify(cart));
  };

  const goToCart = () => {
    navigate("/cart");
  };

  const filteredProducts = food.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "price-low") return a.price - b.price;
    if (sortOrder === "price-high") return b.price - a.price;
    if (sortOrder === "name-asc") return a.name.localeCompare(b.name);
    if (sortOrder === "name-desc") return b.name.localeCompare(a.name);
    return 0;
  });

  return (
    <div>
      <Navbar cartCount={cartItems.length} goToCart={goToCart} />
      <Search setSearchQuery={setSearchQuery} />
      <Filter setSortOrder={setSortOrder} />
      <div className={styles.container}>
        {sortedProducts.map((food) => (
          <FoodItem key={food.id} food={food} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
}
