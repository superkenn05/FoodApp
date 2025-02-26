import { useState, useEffect } from "react";
import FoodItem from "./FoodItem";
import Filter from "./Filter";
import Search from "./Search";
import styles from "./foodlist.module.css";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import db from "../firebase";
import { collection, onSnapshot, doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function FoodList() {
  const [sortOrder, setSortOrder] = useState("latest");
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [food, setFood] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "foodData"), (snapshot) =>
      setFood(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
    );
    return () => unsubscribe();
  }, []);

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

  const addToCart = async (foodItem) => {
    if (!user) {
      alert("You must be logged in to add items to the cart.");
      return;
    }

    let updatedCart = [...cartItems];
    const existingItemIndex = updatedCart.findIndex((item) => item.id === foodItem.id);
    
    if (existingItemIndex !== -1) {
      updatedCart[existingItemIndex].quantity += 1;
    } else {
      updatedCart.push({ ...foodItem, quantity: 1 });
    }

    setCartItems(updatedCart);
    await saveCart(updatedCart);
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
