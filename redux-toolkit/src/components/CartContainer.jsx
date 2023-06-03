import { useSelector } from "react-redux";
import CartItem from "./CartItem.jsx";

import { useDispatch } from "react-redux";
import { toggleModal } from "../features/modal/modalSlice.js";

const CartContainer = () => {
  const { cartItems, amount, total } = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  if (amount < 1) {
    return (
      <section>
        <header className="cart">
          <h2>Your Cart</h2>

          <h4 className="empty-cart">is currently empty</h4>
        </header>
      </section>
    );
  }

  return (
    <section className="cart">
      <header>
        <h2>Your Cart</h2>
      </header>
      <div>
        {cartItems.map((item) => {
          return <CartItem key={item.id} {...item} />;
        })}
      </div>
      <footer>
        <hr />
        <div className="cart-total">
          <h4>
            total <span>${total}</span>
          </h4>
        </div>
        <button
          className="btn clear-btn"
          onClick={() => dispatch(toggleModal())}
        >
          clear cart
        </button>
      </footer>
    </section>
  );
};

export default CartContainer;
