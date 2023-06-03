import { CartIcon } from "../icons";
import { useSelector } from "react-redux";
import logo from "../assets/redux-icon.svg";

const Navbar = () => {
  // you can name the useSelector argument whatever you want
  const { amount } = useSelector((store) => store.cart);

  return (
    <nav>
      <div className="nav-center">
        <img src={logo} alt="Logo" className="logo" />
        <h3 className="title">Redux Toolkit</h3>

        <div className="nav-container">
          <CartIcon />
          <div className="amount-container">
            <p className="total-amount">{amount}</p>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
