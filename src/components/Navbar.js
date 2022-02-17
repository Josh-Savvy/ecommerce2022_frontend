import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./component-styles/Navbar.css";
import SearchBar from "./searchBar";
import { isAuth, removeCookie, removeLocalStorage } from "../helpers/auth";
import { useHistory } from "react-router-dom";

const Navbar = ({ click }) => {
  const history = useHistory();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const cartCounter = () => {
    return cartItems.reduce((qty, item) => Number(item.qty), 0);
  };
  const handleUserModal = () => {
    if (process.browser) {
      const x = document.getElementById("user_loggedin_dropdown").style;
      if (x.display === "none") {
        x.display = "block";
      } else {
        x.display = "none";
      }
    }
  };
  function closeUserModal() {
    if (process.browser) {
      const y = document.getElementById("user_loggedin_dropdown").style;
      if (y.display === "block") {
        y.display = "none";
      } else {
        y.display = "block";
      }
    }
  }
  const Logout = () => {
    if (window.confirm("Do you want to logout?")) {
      removeCookie("token");
      removeLocalStorage("user");
      history.push("/login");
    }
  };
  return (
    <nav className="navbar bg-dark">
      <Link to="/">
        <div className="navbar_logo">
          <h2>Shopable</h2>
        </div>
      </Link>
      <div className="text-center">
        <SearchBar />
      </div>
      <ul className="nav">
        <li className="nav-item">
          {!isAuth() ? (
            <Link to="/login" className="nav-link text-light border-light">
              Login
            </Link>
          ) : (
            <span
              className="nav-link text-light user-select-none"
              id="user_dropdown_btn"
              onClick={handleUserModal}
            >
              <i style={{ color: "lightgreen" }} className="fa fa-user"></i>
              <span className="text-light">
                {isAuth().name.replace(/ .*/, "")}
              </span>
            </span>
          )}
        </li>
        {isAuth() && (
          <div id="user_loggedin_dropdown" className="user-select-none">
            <ul className="list-unstyled">
              <li style={{ marginBottom: "10%" }}>
                <Link to="/user" onClick={closeUserModal}>
                  <i
                    className="fa fa-user-circle text-dark"
                    style={{ fontSize: "20px" }}
                  ></i>
                  <span className="pl-2">My account</span>
                </Link>
              </li>
              <li style={{ marginBottom: "10%" }}>
                <Link to="/trackorders" onClick={closeUserModal}>
                  <i
                    className="fa fa-user-circle text-dark"
                    style={{ fontSize: "20px" }}
                  ></i>
                  <span className="pl-2">Track Orders</span>
                </Link>
              </li>
              <li style={{ marginBottom: "10%" }}>
                <Link
                  to="/cart"
                  className="nav-link cart_link"
                  onClick={closeUserModal}
                >
                  <i
                    className="fa fa-shopping-cart text-dark"
                    style={{ fontSize: "20px" }}
                  ></i>
                  <span className="pl-2">
                    Cart
                    <span className="cart_counter">{cartCounter()}</span>
                  </span>
                </Link>
              </li>
              <li style={{ marginBottom: "10%" }}>
                <Link to="/user" onClick={closeUserModal}>
                  <i
                    className="fa fa-user-circle text-dark"
                    style={{ fontSize: "20px" }}
                  ></i>
                  <span className="pl-2">My account</span>
                </Link>
              </li>
              <li style={{ marginTop: "40%" }}>
                <button className="btn btn-danger" onClick={Logout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </ul>

      <div className="menu_toggle" onClick={click}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </nav>
  );
};

export default Navbar;
