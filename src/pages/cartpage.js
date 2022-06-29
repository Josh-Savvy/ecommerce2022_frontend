import CartItem from "../components/CartItem";
import "./styles/cartpage.css";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../redux/actions/cartActions";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { isAuth } from "../helpers/auth";

const CartPage = () => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const { cartItems } = cart;

  const qtyChangeHandler = (id, qty) => {
    dispatch(addToCart(id, qty));
  };

  const removeCartItem = (id) =>
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>Are you sure?</h1>
            <p>You want to remove this item from your Cart?</p>
            <button className="btn btn-outline-dark" onClick={onClose}>
              No
            </button>
            <button
              className="btn btn-outline-dark offset-3"
              onClick={() => {
                dispatch(removeFromCart(id));
                onClose();
              }}
            >
              Remove
            </button>
          </div>
        );
      },
    });
  // const getCartCount = () => {
  //   return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  // };

  // const getCartSubtotalPrice = () => {
  //   return cartItems.reduce((item) => item.price * item.qty, 0);
  // };

  // const checkDisabled = () => {
  //   if (cartItems.length === 0) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };

  const history = useHistory();
  const checkOut = () =>
    cartItems.length > 0 ? history.push("/checkout") : history.push("/cart");

  return (
    <div className="cartpage fade-in">
      <div className="cartpage_left">
        <h2>Cart</h2>
        {!isAuth() ? (
          <>
            <div className="text-center">
              <i className="fa fa-shopping-cart "></i>
              <h4>Your cart is empty!</h4>
              <p>
                Already have an account? <Link to="/login">Login</Link> to see
                the items in your cart.
              </p>
              <p>
                New User? <Link to="/signup">Create a new account here.</Link>{" "}
              </p>
              <Link className="btn btn-outline-secondary" to="/">
                Start Shopping
              </Link>
            </div>
          </>
        ) : cartItems.length === 0 ? (
          <>
            <div className="text-center">
              <i className="fa fa-shopping-cart "></i>
              <h4>Your cart is empty!</h4>
              <Link className="btn btn-outline-secondary" to="/">
                Start Shopping
              </Link>
            </div>
          </>
        ) : (
          cartItems.map((item) => (
            <>
              <CartItem
                key={item.product}
                item={item}
                qtyChangeHandler={qtyChangeHandler}
                removeCartItem={removeCartItem}
              />
              <hr />
            </>
          ))
        )}
        <br />
        <br />
        <div className="cartpage_button text-center">
          <button
            disabled={!isAuth()}
            onClick={checkOut}
            className="cartpage_btn btn btn-outline-secondary w-50"
          >
            Proceed to checkout
          </button>
        </div>
        <br />
        <br />
        <div className="text-center ">
          <Link className="" to="/">
            Continue Shopping
          </Link>
        </div>
      </div>
      {/*  <div className="cartpage_right">
        <div className="cartpage_info">
          <p className="cartpage_subtotal">
            Items: <b>({getCartCount()})</b>
          </p>
          <p className="cartpage_price">
            Total: ${getCartSubtotalPrice().toFixed(2)}
          </p>
        </div>
        
      </div>
      <br /> */}
    </div>
  );
};

export default CartPage;
