import "../styles/checkout.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../../components/CartItem";
import { addToCart, removeFromCart } from "../../redux/actions/cartActions";
import { useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { getCookie, isAuth } from "../../helpers/auth";

const CheckoutPage = ({ user, token }) => {
  console.log(token);
  const dispatch = useDispatch();
  const history = useHistory();

  const cart = useSelector((state) => state.cart);

  const { cartItems } = cart;

  const [state, setState] = useState({
    products: JSON.parse(localStorage.getItem("cart")),
    name: isAuth().name,
    cardname: "",
    cardnumber: "",
    job: "",
    email: isAuth().email,
    address: "",
    residentState: "",
    city: "",
    expdate: "",
    cvv: "",
    error: "",
    success: "",
    buttonText: "Continue to checkout",
  });

  const {
    name,
    email,
    address,
    residentState,
    city,
    products,
    cardname,
    cardnumber,
    expdate,
    cvv,
    success,
    buttonText,
  } = state;

  const handleChange = (name) => (e) => {
    setState({
      ...state,
      [name]: e.target.value,
    });
  };

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };
  const checkOrderTotalPrice = () => {
    return cartItems.reduce((price, item) => item.price * item.qty + price, 0);
  };
  const checkDisabled = () => {
    if (cartItems.length === 0) {
      return true;
    }
    if (state.cardnumber === "") {
      return true;
    }
    if (state.cvv === "") {
      return true;
    }
    if (state.cardname === "") {
      return true;
    }
    if (state.cardname === "") {
      return true;
    }
    return false;
  };
  const qtyChangeHandler = (id, qty) => {
    dispatch(addToCart(id, qty));
  };
  const removeCartItemHandler = (id) =>
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
              className="btn btn-outline-dark float-end offset-3"
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    setState({
      ...state,
      buttonText: "Processing...",
    });
    const residentialAddress = address + "," + city + "," + residentState;
    const owner = isAuth()._id;
    try {
      const response =
        isAuth() &&
        (await axios.post(`/api/orderItems`, {
          cvv,
          email,
          cardname,
          cardnumber,
          name,
          products,
          residentialAddress,
          owner,
          expdate,
        }));
      setState({
        cardname: "",
        cardnumber: "",
        email: "",
        name: "",
        address: "",
        city: "",
        residentState: "",
        expdate: "",
        cvv: "",
        error: "",
        success: "Your Order is being processed",
        buttonText: "Continue to Checkout",
      });
      console.log(response);
    } catch (error) {
      console.log(error);
      setState({
        ...state,
        success: "",
        error: error.response.data.error
          ? error.response.data.error
          : "Sorry, your order can't be processed at the moment",
        buttonText: "Error",
      });
    }
  };
  return (
    <div className="checkout_page fade-in">
      <div className="">
        <Link className="btn" to="/">
          <i className="fa fa-angle-left"></i> Continue Shopping
        </Link>
      </div>
      <br />
      <br />
      {cartItems.length === 0 ? (
        history.push("/")
      ) : (
        <div className="row">
          <div className="col-75">
            <div className="col-25">
              <div className="container">
                <h5>
                  Complete your order
                  <br />
                </h5>

                {cartItems.map((item, index) => (
                  <>
                    <div key={index}>
                      <CartItem
                        item={item}
                        qtyChangeHandler={qtyChangeHandler}
                        removeCartItem={removeCartItemHandler}
                      />
                      <hr />
                    </div>
                  </>
                ))}
                <br />

                <p>
                  <span className="price float-left" style={{ color: "black" }}>
                    <i className="fa fa-shopping-cart"></i>
                    <b> {getCartCount()}</b>
                  </span>
                  <span className="price" style={{ color: "black" }}>
                    <b>Total: ${checkOrderTotalPrice().toFixed(2)}</b>
                  </span>
                </p>
              </div>
            </div>
            <br />
            <div className="container">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-50">
                    <br />
                    <h3 className=" fw-bold">Billing Address</h3>
                    <label htmlFor="fname">
                      <i className="fa fa-user"></i> Full Name
                    </label>
                    <input
                      type="text"
                      id="fname"
                      name="firstname"
                      value={name}
                      readOnly
                    />
                    <label htmlFor="email">
                      <i className="fa fa-envelope"></i> Email
                    </label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      value={email}
                      readOnly
                    />
                    <label htmlFor="adr">
                      <i className="fa fa-home"></i> Address
                    </label>
                    <input
                      type="text"
                      id="adr"
                      name="address"
                      value={address}
                      onChange={handleChange("address")}
                    />
                    <label htmlFor="city">
                      <i className="material-icons">streetview</i> City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={city}
                      onChange={handleChange("city")}
                    />

                    <div className="row">
                      <div className="col-50">
                        <label htmlFor="state">State</label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          onChange={handleChange("residentState")}
                          value={residentState}
                        />
                      </div>
                      <div className="col-50">
                        <label htmlFor="zip">Zip</label>
                        <input type="text" id="zip" name="zip" />
                      </div>
                    </div>
                  </div>
                  <div className="col-50">
                    <br />
                    <h3 className="fw-bold">Payment</h3>
                    <label htmlFor="fname">Valid Cards</label>
                    <div className="icon-container">
                      <i
                        className="fa fa-cc-visa"
                        style={{ color: "navy" }}
                      ></i>
                      <i
                        className="fa fa-cc-amex"
                        style={{ color: "blue" }}
                      ></i>
                      <i
                        className="fa fa-cc-mastercard"
                        style={{ color: "red" }}
                      ></i>
                      <i
                        className="fa fa-cc-discover"
                        style={{ color: "orange" }}
                      ></i>
                    </div>
                    <label htmlFor="cname">Name on Card</label>
                    <input
                      type="text"
                      id="cname"
                      value={cardname}
                      name="cardname"
                      onChange={handleChange("cardname")}
                    />
                    <label htmlFor="ccnum">
                      <i className="fa fa-credit-card"> </i> Credit card number
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="ccnum"
                      value={cardnumber}
                      name="cardnumber"
                      onChange={handleChange("cardnumber")}
                      minLength="16"
                      maxLength="16"
                    />

                    <div className="row">
                      <div className="col-50">
                        <label htmlFor="expdate">Expiry date</label>
                        <input
                          type="number"
                          className="form-control"
                          id="expdate"
                          name="expdate"
                          onChange={handleChange("expdate")}
                          maxLength="7"
                          value={expdate}
                        />
                      </div>
                      <div className="col-50">
                        <label htmlFor="cvv">CVV</label>
                        <input
                          type="text"
                          id="cvv"
                          onChange={handleChange("cvv")}
                          name="cvv"
                          value={cvv}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <label>
                  <input type="checkbox" name="sameadr" /> Shipping address same
                  as billing
                </label>
                <button
                  type="submit"
                  disabled={checkDisabled()}
                  className="btn btn-dark w-100"
                >
                  {buttonText}
                </button>
              </form>
              <br />
              {success && (
                <>
                  <div className="alert alert-success rounded">
                    <div className="text-center">{success}</div>
                  </div>
                </>
              )}
            </div>
          </div>

          <br />
          {/* <div className="text-center">
            <Link className="" to="/checkout/details/">
              {viewOrderDetails}
            </Link>
          </div> */}
        </div>
      )}
      <br />
      <br />
    </div>
  );
};
CheckoutPage.getInitialProps = async () => {
  let user = null;
  const token = getCookie("token");
  try {
    const response = await axios.get(`${"http://localhost:5000/api"}/user`, {
      headers: {
        authorization: `Bearer ${token}`,
        contentType: "application/json",
      },
    });
    user = response.data;
  } catch (error) {
    console.log(error);
  }
  return { user };
};
export default CheckoutPage;
