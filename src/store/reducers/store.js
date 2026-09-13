import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./ProductReducer";
import { errorReducer } from "./ErrorReducer";
import { cartReducer } from "./cardReducer";
import { authReducer } from "./authReducer";
import { paymentMethodReducer } from "./paymentMethodReducer";
import { adminReducer } from "./adminReducer";
import { orderReducer } from "./orderReducer";
import { sellerReducer } from "./sellerReducer";

// Auth data
const user = localStorage.getItem("auth")
  ? JSON.parse(localStorage.getItem("auth"))
  : null;

// Cart data
const cartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

// Checkout address
const selectedUserCheckoutAddress = localStorage.getItem(
  "CHECKOUT_ADDRESS"
)
  ? JSON.parse(localStorage.getItem("CHECKOUT_ADDRESS"))
  : null;

const initialState = {
  auth: {
    user: user,
    selectedUserCheckoutAddress: selectedUserCheckoutAddress,
  },

  carts: {
    cart: cartItems,
  },
};

const store = configureStore({
  reducer: {
    products: productReducer,
    errors: errorReducer,
    carts: cartReducer,
    auth: authReducer,
    payment: paymentMethodReducer,
    admin: adminReducer,
    order: orderReducer,
    seller: sellerReducer,
  },

  preloadedState: initialState,
});

export default store;



