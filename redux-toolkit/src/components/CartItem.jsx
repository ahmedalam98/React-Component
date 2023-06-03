import {
  increaseAmount,
  decreaseAmount,
  removeItem,
} from "../features/cart/cartSlice";
import { ChevronDown, ChevronUp } from "../icons";
import { useDispatch } from "react-redux";

const CartItem = ({ id, img, title, price, amount }) => {
  const dispatch = useDispatch();

  // passing the (id) while dispatching actions will be the action.payload in the reducer
  return (
    <article className="cart-item">
      <img src={img} alt={title} />
      <div>
        <h4>{title}</h4>
        <h4 className="item-price">${price}</h4>

        <button className="remove-btn" onClick={() => dispatch(removeItem(id))}>
          remove
        </button>
      </div>
      <div>
        <button
          className="amount-btn"
          onClick={() => dispatch(increaseAmount(id))}
        >
          <ChevronUp />
        </button>
        {/* amount */}
        <p className="amount">{amount}</p>

        <button
          className="amount-btn"
          onClick={() => dispatch(decreaseAmount(id))}
        >
          <ChevronDown />
        </button>
      </div>
    </article>
  );
};

export default CartItem;
