import Modal from "./components/Modal";
import Navbar from "./components/NavBar";
import CartContainer from "./components/CartContainer";
import Spinner from "./components/Spinner";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { calculateTotals, fetchCartItems } from "./features/cart/cartSlice";

function App() {
  const dispatch = useDispatch();
  const { cartItems, isLoading } = useSelector((store) => store.cart);
  const { isOpen } = useSelector((store) => store.modal);

  useEffect(() => {
    dispatch(fetchCartItems());
  }, []);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]);

  if (isLoading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
        <Spinner />
      </div>
    );
  }

  return (
    <main>
      {isOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </main>
  );
}
export default App;
