import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./itemDetails.module.css";
import Navbar from "../ItemComponents/Navbar";
import ItemImage from "./ItemImage";
import AddToCartButton from "../ItemComponents/AddToCartButton";
import { collection, getDocs, doc, getDoc, setDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import db from "../firebase";
import Stack from "@mui/material/Stack";
import SkeletonLoader from "./SkeletonLoader";

export default function ItemDetails() {
  const { name } = useParams();
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [food, setFood] = useState(null);
  const [quantity, setQuantity] = useState(1);

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

  const addToCart = async () => {
    if (!user) {
      alert("You must be logged in to add items to the cart.");
      return;
    }

    let updatedCart = [...cartItems];
    const existingItemIndex = updatedCart.findIndex((item) => item.id === food.id);
    if (existingItemIndex !== -1) {
      updatedCart[existingItemIndex].quantity += quantity;
    } else {
      updatedCart.push({ ...food, quantity });
    }

    setCartItems(updatedCart);
    await saveCart(updatedCart);
  };

  if (!food) {
    return (
      <div className={styles.skeletonContainer}>
        <Stack spacing={2} sx={{ width: "100%", maxWidth: 500, margin: "auto", textAlign: "center" }}>
          <SkeletonLoader />
        </Stack>
      </div>
    );
  }

  const newPrice = food.foodDiscount
    ? food.price * (1 - food.foodDiscount / 100)
    : food.price;

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div>
      <Navbar cartCount={cartItems.length} />
      <div className={styles.container}>
        <ItemImage food={food} />
        <div className={styles.info}>
          <p className={styles.category}>{food.category}</p>
          <h2 className={styles.name}>{food.name}</h2>
          <div className={styles.priceContainer}>
            {food.foodDiscount ? (
              <>
                <span className={styles.price}>₱{food.price.toFixed(2)}</span>
                <span className={styles.discount}>₱{newPrice.toFixed(2)}</span>
              </>
            ) : (
              <span className={styles.price}>₱{food.price.toFixed(2)}</span>
            )}
          </div>
          <p className={styles.description}>{food.description}</p>
          <div className={styles.addCart}>
            <div className={styles.cartItemQuantity}>
              <button onClick={decreaseQuantity}>-</button>
              <input type="text" value={quantity} readOnly />
              <button onClick={increaseQuantity}>+</button>
            </div>
            <AddToCartButton
              food={food}
              quantity={quantity}
              addToCart={addToCart}
            />
          </div>
        </div>
      </div>
    </div>
  );
}




// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import styles from "./itemDetails.module.css";
// import Navbar from "../ItemComponents/Navbar";
// import ItemImage from "./ItemImage";
// import AddToCartButton from "../ItemComponents/AddToCartButton";
// import { collection, getDocs } from "firebase/firestore";
// import db from "../firebase";
// import Stack from "@mui/material/Stack";
// import Skeleton from "@mui/material/Skeleton";

// export default function ItemDetails() {
//   const { name } = useParams();
//   const [cartItems, setCartItems] = useState([]);
//   const [food, setFood] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [loaded, setLoaded] = useState(false); // Track if image & text are ready

//   useEffect(() => {
//     const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
//     setCartItems(storedCart);
//   }, []);

//   useEffect(() => {
//     const fetchFood = async () => {
//       const querySnapshot = await getDocs(collection(db, "foodData"));
//       const foodList = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       const foundFood = foodList.find(
//         (item) => item.name === decodeURIComponent(name)
//       );
//       setFood(foundFood || null);
//     };
//     fetchFood();
//   }, [name]);

//   if (!food) {
//     return (
//       <div className={styles.skeletonContainer}>
//         <Stack spacing={2} sx={{ width: "100%", maxWidth: 500, margin: "auto", textAlign: "center" }}>
//           <Skeleton variant="text" width={200} height={30} />
//           <Skeleton variant="text" width={150} height={25} />
//           <Skeleton variant="rectangular" width={500} height={300} />
//           <Skeleton variant="text" width={400} height={20} />
//           <Skeleton variant="text" width={350} height={20} />
//         </Stack>
//       </div>
//     );
//   }

//   const newPrice = food.foodDiscount
//     ? food.price * (1 - food.foodDiscount / 100)
//     : food.price;

//   const increaseQuantity = () => setQuantity((prev) => prev + 1);
//   const decreaseQuantity = () =>
//     setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

//   const addToCart = () => {
//     let cart = JSON.parse(localStorage.getItem("cartItems")) || [];
//     const existingItemIndex = cart.findIndex((item) => item.id === food.id);
//     if (existingItemIndex !== -1) {
//       cart[existingItemIndex].quantity += quantity;
//     } else {
//       cart.push({ ...food, quantity });
//     }
//     setCartItems(cart);
//     localStorage.setItem("cartItems", JSON.stringify(cart));
//   };

//   return (
//     <div>
//       <Navbar cartCount={cartItems.length} />
//       <div className={styles.container}>
//         {/* Pass setLoaded to track when the image is ready */}
//         <ItemImage food={food} setLoaded={setLoaded} />

//         {/* Show skeleton text while waiting for the image */}
//         {!loaded ? (
//           <div className={styles.info}>
//             <Skeleton variant="text" width={200} height={30} sx={{ bgcolor: "#555" }} />
//             <Skeleton variant="text" width={150} height={25} sx={{ bgcolor: "#555" }} />
//             <Skeleton variant="text" width={400} height={20} sx={{ bgcolor: "#555" }} />
//             <Skeleton variant="text" width={350} height={20} sx={{ bgcolor: "#555" }} />
//             <Skeleton variant="rectangular" width={100} height={30} sx={{ bgcolor: "#555" }} />
//           </div>
//         ) : (
//           <div className={styles.info}>
//             <p className={styles.category}>{food.category}</p>
//             <h2 className={styles.name}>{food.name}</h2>
//             <div className={styles.priceContainer}>
//               {food.foodDiscount ? (
//                 <>
//                   <span className={styles.price}>₱{food.price.toFixed(2)}</span>
//                   <span className={styles.discount}>₱{newPrice.toFixed(2)}</span>
//                 </>
//               ) : (
//                 <span className={styles.price}>₱{food.price.toFixed(2)}</span>
//               )}
//             </div>
//             <p className={styles.description}>{food.description}</p>
//             <div className={styles.addCart}>
//               <div className={styles.cartItemQuantity}>
//                 <button onClick={decreaseQuantity}>-</button>
//                 <input type="text" value={quantity} readOnly />
//                 <button onClick={increaseQuantity}>+</button>
//               </div>
//               <AddToCartButton
//                 food={food}
//                 quantity={quantity}
//                 addToCart={addToCart}
//               />
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
