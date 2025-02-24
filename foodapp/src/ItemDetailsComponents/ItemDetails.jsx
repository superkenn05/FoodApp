import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import istyles from "./itemdetails.module.css"; // Styles for item details
import Navbar from "../ItemComponents/Navbar";
import ItemImage from "./ItemImage";
import AddToCartButton from "../ItemComponents/AddToCartButton";
import { collection, getDocs } from "firebase/firestore";
import db from "../firebase";

export default function ItemDetails() {
  const { name } = useParams();
  const [cartItems, setCartItems] = useState([]);
  const [food, setFood] = useState(null);
  const [quantity, setQuantity] = useState(1); // Initialize quantity state

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCart);
  }, []);

  useEffect(() => {
    const fetchFood = async () => {
      const querySnapshot = await getDocs(collection(db, "foodData"));
      const foodList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const foundFood = foodList.find(
        (item) => item.name === decodeURIComponent(name)
      );

      setFood(foundFood || null);
    };

    fetchFood();
  }, [name]);

  if (!food) {
    return <p>Loading...</p>;
  }

  // Calculate new price if there's a discount
  const newPrice = food.foodDiscount
    ? food.price * (1 - food.foodDiscount / 100)
    : food.price;

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  // Function to add item to cart with quantity
  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cartItems")) || [];
    const existingItemIndex = cart.findIndex((item) => item.id === food.id);

    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity += quantity;
    } else {
      cart.push({ ...food, quantity });
    }

    setCartItems(cart);
    localStorage.setItem("cartItems", JSON.stringify(cart));
  };

  return (
    <div>
      <Navbar cartCount={cartItems.length} />
      <div className={istyles.container}>
        <ItemImage food={food} />
        <div className={istyles.info}>
          <p className={istyles.category}>{food.category}</p>
          <h2 className={istyles.name}>{food.name}</h2>

          <div className={istyles.priceContainer}>
            {food.foodDiscount ? (
              <>
                <span className={istyles.price}>₱{food.price.toFixed(2)}</span>
                <span className={istyles.discount}>₱{newPrice.toFixed(2)}</span>
              </>
            ) : (
              <span className={istyles.price}>₱{food.price.toFixed(2)}</span>
            )}
          </div>

          <p className={istyles.description}>{food.description}</p>
          <div className={istyles.addcart}>
            <div className={istyles.cartItemQuantity}>
              <button onClick={decreaseQuantity}>-</button>
              <input type="text" value={quantity} readOnly />
              <button onClick={increaseQuantity}>+</button>
            </div>
            {/* Ginagamit na ngayon ang AddToCartButton */}
            <AddToCartButton food={food} quantity={quantity} addToCart={addToCart} />
          </div>
        </div>
      </div>
    </div>
  );
}
