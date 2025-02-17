import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FoodList from "./components/FoodList";
import AddToCartList from "./AddToCartComponents/AddToCartList";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FoodList />} /> {/* ✅ Home Page */}
        <Route path="/cart" element={<AddToCartList />} /> {/* ✅ Cart Page */}
      </Routes>
    </Router>
  );
}

export default App;
