import AddToCartList from "./AddToCartComponents/AddToCartList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FoodList from "./ItemComponents/FoodList";
import ItemDetails from "./ItemDetailsComponents/ItemDetails";
import "./app.css";
import Register from "./RegisterComponents/Register";
import Login from "./RegisterComponents/Login";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/food-list" element={<FoodList />} />
        <Route path="/item-details/:name" element={<ItemDetails />} />
        <Route path="/cart" element={<AddToCartList />} />
      </Routes>
    </Router>
  );
}

export default App;
