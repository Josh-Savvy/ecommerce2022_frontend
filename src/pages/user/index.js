import React, { useState, useEffect } from "react";
import axios from "axios";
import { getCookie, isAuth } from "../../helpers/auth";
import { Link, useHistory } from "react-router-dom";
import "./style.css";

const User = () => {
  const history = useHistory();
  !isAuth() && history.push("/login");

  const [user, setUser] = useState([]);
  const [orderedItems, setOrderedItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const [state, setState] = useState({
    name: "",
    role: "",
    phone: "",
    address: "",
    email: "",
  });

  const { name, email, phone, address } = state;

  useEffect(() => {
    const token = isAuth() ? getCookie("token") : undefined;
    if (token) {
      axios
        .get("/api/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            contentType: "application/json",
          },
        })
        .then((response) => {
          setUser(response?.data?.user);
          setOrderedItems(response?.data?.orderedItems);
          setCartItems(JSON.parse(localStorage.getItem("cart")));
        })
        .catch((error) => console.log(error));
    }
  }, []);

  useEffect(() => {
    setState({
      ...state,
      name: user.name,
      role: user.role,
      phone: user.phone,
      email: user.email,
      address: user.address,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <div className="container">
        <div className="">
          <h4 className="text-center mb-4  bg-secondary text-light">
            Account Overview
          </h4>
          <div
            className=""
            style={{ border: "1px solid #80808057", padding: "2px" }}
          >
            <h6 className="text-center">Account Details</h6>
            <ul
              className="list-unstyled text-center"
              style={{ borderTop: "1px solid #80808087", paddingTop: "5px" }}
            >
              <li>
                <i className="fa fa-user" style={{ fontSize: "20px" }}></i>
                <p className="text-primary">
                  Name: <span className="text-secondary">{name}</span>
                </p>
              </li>
              <li>
                <i className="fa fa-envelope" style={{ fontSize: "20px" }}></i>
                <p className="text-primary">
                  Email: <span className="text-secondary">{email}</span>
                </p>
              </li>
              <li>
                <i className="fa fa-phone" style={{ fontSize: "20px" }}></i>
                <p className="text-primary">
                  Phone: <span className="text-secondary">{phone}</span>
                </p>
              </li>
              <li style={{ whiteSpace: "nowrap", fontSize: "14px" }}>
                <Link to="/account/changepassword">
                  <p className="btn btn-danger h6 mt-2">Change Password</p>
                </Link>
              </li>
              <li>
                <div
                  className="list-unstyled text-center"
                  style={{
                    borderTop: "1px solid #80808087",
                    paddingTop: "5px",
                  }}
                >
                  <div className="mt-3">
                    <i
                      className="fa fa-map-marker"
                      style={{ fontSize: "25px" }}
                    ></i>
                    <h6>Your default shipping address:</h6>
                    <span className={address ? "text-muted" : "text-danger"}>
                      {address ? address : "No registered address found!"}
                    </span>
                  </div>
                </div>
              </li>
            </ul>
            <br />
            <br />
          </div>
          <br />
          <br />
          <div className="text-center">
            <h4 className=" bg-secondary text-light">My Cart</h4>
            <br />
            {cartItems &&
              cartItems.map((item, index) => (
                <div key={index}>
                  <div
                    className="d-flex mb-3 p-3 user_cartitem rounded-lg"
                    style={{ boxShadow: "grey 1px 2px 5px 1px" }}
                  >
                    <div className="flex-fill">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        title={item.name}
                        height="160px"
                      />
                    </div>

                    <p style={{ pointerEvents: "none" }} className="mt-5 ml-3">
                      {item.name.substr(0, 35)}...
                    </p>
                    <div className="flex-fill mt-5 ml-2">
                      <label>Quantity: {item.qty}</label>
                    </div>
                  </div>
                </div>
              ))}
            {cartItems && (
              <Link to="/checkout">
                <p className="btn btn-success h6 mt-2">Proceed to checkout</p>
              </Link>
            )}
          </div>
          <br />
          <br />
          <div className="text-center">
            <h4 className=" bg-secondary text-light">My Orders</h4>
            {orderedItems &&
              orderedItems.map((item, index) => (
                <>
                  <div
                    key={index}
                    className="d-flex mb-3 p-3 user_cartitem rounded-lg"
                    style={{ boxShadow: "grey 1px 2px 5px 1px" }}
                  >
                    <div className="flex-fill">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        title={item.name}
                        height="160px"
                      />
                    </div>

                    <p style={{ pointerEvents: "none" }} className="mt-5 ml-3">
                      {item.name.substr(0, 35)}...
                    </p>
                    <div className="flex-fill mt-5 ml-2">
                      <label>Quantity: {item.qty}</label>
                    </div>
                  </div>
                </>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
