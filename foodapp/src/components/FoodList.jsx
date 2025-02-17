import { useState, useEffect } from "react";
import FoodItem from "./FoodItem";
import Filter from "./Filter";
import Search from "./Search";
import styles from "./foodlist.module.css";
import burger from "../img/Burger.jpg";
import pizza from "../img/Pizza.jpg";
import barq from "../img/barq.jpg";
import stk from "../img/stk.jpg";
import fries from "../img/fries.jpg";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

export default function FoodList() {
  const [sortOrder, setSortOrder] = useState("latest");
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState([]);

  const navigate = useNavigate();

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

  const products = [
    { name: "Barbecue Chicken", price: 8.0, image: barq, category: "meat" },
    { name: "Margherita Pizza", price: 14.0, image: pizza, category: "pizza" },
    { name: "Burger Beef", price: 12.0, image: burger, category: "burger" },
    { name: "French Fries", price: 5.0, image: fries, category: "fries" },
    { name: "Grilled Flank Steak", price: 14.0, image: stk, category: "steak" },
  ];

  const filteredProducts = products.filter((product) =>
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
        {sortedProducts.map((food, index) => (
          <FoodItem key={index} food={food} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
}
