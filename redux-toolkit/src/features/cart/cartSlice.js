import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartItems from "../../cartItems";

const url = "https://course-api.com/react-useReducer-cart-project";

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async () => {
    const response = await fetch(url);
    const cartItems = await response.json();
    return cartItems;
  }
);

const initialState = {
  cartItems: [],
  amount: cartItems.length,
  total: cartItems.reduce((total, item) => {
    return (total += item.amount * item.price);
  }, 0),
  isLoading: true,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  // Reducers are functions that take the current state and an action as arguments, and return a new state result.
  reducers: {
    clearCart: (state) => {
      // state.cartItems = [];
      return { ...state, cartItems: [], total: 0, amount: 0 };
    },

    removeItem: (state, action) => {
      // action.payload is the id of the selected item to be removed that is passed from the component when dispatching this action
      const itemId = action.payload;
      const newCartItems = state.cartItems.filter((item) => item.id !== itemId);
      return { ...state, cartItems: newCartItems, amount: state.amount - 1 };
    },

    increaseAmount: (state, action) => {
      const itemId = action.payload;
      const newCartItems = state.cartItems.map((item) => {
        if (item.id === itemId) {
          return { ...item, amount: item.amount + 1 };
        }
        return item;
      });
      return { ...state, cartItems: newCartItems, amount: state.amount + 1 };
    },

    decreaseAmount: (state, action) => {
      const itemId = action.payload;
      const newCartItems = state.cartItems
        .map((item) => {
          if (item.id === itemId) {
            return { ...item, amount: item.amount - 1 };
          }
          return item;
        })
        .filter((item) => item.amount > 0); // remove items with amount less than 1
      return { ...state, cartItems: newCartItems, amount: state.amount - 1 };
    },

    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      total = Number(total.toFixed(2)); // round total to 2 decimal places
      return { ...state, amount, total };
    },
  },

  // Extra reducers are related to asynchronous logic such as thunks and promises.
  // actions inside it called Lifecycle Actions
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        console.log(action);
        state.isLoading = false;
        state.cartItems = action.payload;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        // console.log(action);
        state.isLoading = false;
      });
  },
});

// Access the slice state ( data )
export default cartSlice.reducer;

// Access the slice actions to dispatch them from components ( manipulate the data )
export const {
  clearCart,
  removeItem,
  increaseAmount,
  decreaseAmount,
  calculateTotals,
} = cartSlice.actions;
