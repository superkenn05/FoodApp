import AddToCartList from "./AddToCartComponents/AddToCartList";     
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FoodList from "./ItemComponents/FoodList";
import ItemDetails from "./ItemDetailsComponents/ItemDetails";
import "./app.css";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FoodList />} />
        <Route path="/item-details/:name" element={<ItemDetails />} />
        <Route path="/cart" element={<AddToCartList />} /> {/* ✅ Cart Page */}
      </Routes>
    </Router>
  );
}

export default App;
