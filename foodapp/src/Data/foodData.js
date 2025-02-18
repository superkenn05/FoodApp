import barq from "../img/barq.jpg";
import barq2 from "../img/barq2.jpg";
import barq3 from "../img/barq3.jpg";
import barq4 from "../img/barq4.jpg";
import barq5 from "../img/barq5.jpg";

import pizza from "../img/Pizza.jpg";
import pizza2 from "../img/Pizza2.jpg";
import pizza3 from "../img/Pizza3.jpg";
import pizza4 from "../img/Pizza4.jpg";
import pizza5 from "../img/Pizza5.jpg";

import burger from "../img/Burger.jpg";
import burger2 from "../img/Burger2.jpg";
import burger3 from "../img/Burger3.jpg";
import burger4 from "../img/Burger4.jpg";
import burger5 from "../img/Burger5.jpg";

import fries from "../img/fries.jpg";
import fries2 from "../img/fries2.jpg";
import fries3 from "../img/fries3.jpg";
import fries4 from "../img/fries4.jpg";
import fries5 from "../img/fries5.jpg";

import stk from "../img/stk.jpg";
import stk2 from "../img/stk2.jpg";
import stk3 from "../img/stk3.jpg";
import stk4 from "../img/stk4.jpg";
import stk5 from "../img/stk5.jpg";

const foodData = [
  { 
    name: "Barbecue Chicken", 
    price: 8.0, 
    images: [barq, pizza2, burger3, fries4, stk5 ], // Multiple images array
    category: "meat", 
    description: "A delicious Margherita Pizza with fresh mozzarella, tomatoes, and basil, baked to perfection. This classic Italian pizza is loved for its simplicity and authentic flavors. The crispy thin crust, rich tomato sauce, and melted mozzarella cheese create a mouthwatering combination that satisfies every pizza lover. Perfect for a quick meal, party, or family gathering."
  },
  { 
    name: "Margherita Pizza", 
    price: 14.0, 
    images: [pizza, pizza2, pizza3, pizza4, pizza5 ], 
    category: "pizza", 
    description: "A delicious Margherita Pizza with fresh mozzarella, tomatoes, and basil, baked to perfection. This classic Italian pizza is loved for its simplicity and authentic flavors. The crispy thin crust, rich tomato sauce, and melted mozzarella cheese create a mouthwatering combination that satisfies every pizza lover. Perfect for a quick meal, party, or family gathering."
  },
  { 
    name: "Burger Beef", 
    price: 12.0, 
    images: [burger, burger2, burger3, burger4, burger5], 
    category: "burger" ,
    description: "A delicious Margherita Pizza with fresh mozzarella, tomatoes, and basil, baked to perfection. This classic Italian pizza is loved for its simplicity and authentic flavors. The crispy thin crust, rich tomato sauce, and melted mozzarella cheese create a mouthwatering combination that satisfies every pizza lover. Perfect for a quick meal, party, or family gathering."
  },
  { 
    name: "French Fries", 
    price: 5.0, 
    images: [fries, fries2, fries3, fries4, fries5], 
    category: "fries",
    description: "A delicious Margherita Pizza with fresh mozzarella, tomatoes, and basil, baked to perfection. This classic Italian pizza is loved for its simplicity and authentic flavors. The crispy thin crust, rich tomato sauce, and melted mozzarella cheese create a mouthwatering combination that satisfies every pizza lover. Perfect for a quick meal, party, or family gathering." 
  },
  { 
    name: "Grilled Flank Steak", 
    price: 14.0, 
    images: [stk, stk2, stk3, stk4, stk5], 
    category: "steak",
    description: "A delicious Margherita Pizza with fresh mozzarella, tomatoes, and basil, baked to perfection. This classic Italian pizza is loved for its simplicity and authentic flavors. The crispy thin crust, rich tomato sauce, and melted mozzarella cheese create a mouthwatering combination that satisfies every pizza lover. Perfect for a quick meal, party, or family gathering." 
  },
];

export default foodData;

