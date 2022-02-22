import { Link, useHistory } from "react-router-dom";
import "./component-styles/Sidebar.css";
import { useSelector } from "react-redux";
import { isAuth, removeCookie, removeLocalStorage } from "../helpers/auth";

const Sidebar = ({ show, click }) => {
  const history = useHistory();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const cartCounter = () => {
    return cartItems.reduce((qty, item) => Number(item.qty), 0);
  };
  const showSideBar = ["sidebar user-select-none"];
  if (show) {
    showSideBar.push("show");
  }

  const Logout = () => {
    if (window.confirm("Do you want to logout?")) {
      removeCookie("token");
      removeLocalStorage("user");
      history.push("/login");
    }
  };
  return (
    <div className={showSideBar.join(" ")}>
      {isAuth() && (
        <>
          <br />
          <span
            className="rounded ml-3 p-2 user-select-none"
            style={{
              background: "green",
            }}
          >
            <i
              style={{ color: "lightgreen", fontSize: "25px" }}
              className="fa fa-user"
            ></i>
            <span className="text-light ml-2">
              {isAuth().name.replace(/ .*/, "")}
            </span>{" "}
            {/* <i  className="fa fa-dot-circle-o"></i> */}
          </span>
        </>
      )}
      <ul className="sidebar_nav" onClick={click}>
        <li>
          <Link
            to="/"
            style={{
              fontWeight: 600,
              padding: "1rem 6.5rem",
              whiteSpace: "nowrap",
            }}
          >
            <i className="fa fa-home m-2"></i>
            Home
          </Link>
        </li>

        <li>
          <Link
            to="/cart"
            style={{
              fontWeight: 600,
              padding: "1rem 5.85rem",
              whiteSpace: "nowrap",
            }}
            className=""
          >
            <i className="fa fa-shopping-cart m-2"></i>
            My Cart
            {/* <span className="cart_counter">{cartCounter()}</span> */}
          </Link>
        </li>

        <li>
          <Link
            to="/trackorders"
            style={{
              fontWeight: 600,
              padding: "1rem 6.3rem",
              whiteSpace: "nowrap",
            }}
            className=""
          >
            <i className="fa fa-shopping-basket m-2"></i>
            Orders
          </Link>
        </li>
        <li>
          <Link
            to="/user"
            style={{
              fontWeight: 600,
              padding: "1rem 4.7rem",
              whiteSpace: "nowrap",
            }}
            className=""
          >
            <i className="fa fa-user-circle m-2"></i>
            My Account
          </Link>
        </li>
        {isAuth() ? (
          <>
            <li style={{ marginTop: "40%" }}>
              <button className="btn btn-danger" onClick={Logout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <div className="text-center">
            <Link
              to="/login"
              className="btn btn-primary w-50"
              style={{ marginTop: "40%" }}
            >
              Login
            </Link>
          </div>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
