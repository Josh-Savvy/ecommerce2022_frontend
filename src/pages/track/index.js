import React, { useState, useEffect } from "react";
import withUser from "../withUser";

import { isAuth } from "../../helpers/auth";
import { useHistory } from "react-router-dom";

const TrackOrders = () => {
  const history = useHistory();
  !isAuth() && history.push("/");

  const [orderState, setOrderState] = useState([]);

  useEffect(() => {
    isAuth() && setOrderState(JSON.parse(localStorage.getItem("cart")));
  }, []);

  return (
    <>
      <div
        className="col-md-12"
        style={{
          background: "white",
          boxShadow: "0 1px 4px rgb(0 0 0 / 40%)",
          paddingTop: "20px",
        }}
      >
        <div className="p-2">
          <h4 className="fw-bold text-center text-success">
            Active/Pending Orders
          </h4>
          <br />
          {orderState &&
            orderState.map((cartItem, index) => (
              <div
                className="cartitem"
                style={{
                  marginBottom: "20px",
                  gridTemplateColumns: "3fr 5fr 3fr 2fr 2fr",
                  gap: "20px",
                  boxShadow: "0 1px 4px rgb(0 0 0 / 40%)",
                }}
              >
                <div className="cartitem_image">
                  <img
                    src={cartItem.imageUrl}
                    alt={cartItem.name}
                    title={cartItem.name}
                  />
                </div>
                <div>
                  <p className="m-auto offset-3">
                    {cartItem.name.substring(0, 10)}...
                  </p>
                  <caption className="qty">Quantity: {cartItem.qty}</caption>
                  <br />
                  <br />
                  <span
                    onClick={(e) => {
                      e.preventDefault();
                      history.push(`/product/${cartItem.product}`);
                    }}
                    className="btn btn-outline-secondary"
                  >
                    View
                  </span>
                </div>

                <p style={{ fontSize: "14px" }} className="cartitem_price">
                  Price: ${cartItem.price} each
                </p>
                <p style={{ fontSize: "14px" }} className="cartitem_price">
                  Total: ${cartItem.price * cartItem.qty}
                </p>
              </div>
            ))}
        </div>
      </div>
      <br /> <br />
      <br />
      <div
        className="col-md-12"
        style={{
          background: "white",
          boxShadow: "0 1px 4px rgb(0 0 0 / 40%)",
          paddingTop: "20px",
        }}
      >
        <div className="p-2">
          <h4 className="fw-bold text-center">Completed Orders</h4>
          <br />
          {orderState &&
            orderState.map((cartItem, index) => (
              <div
                className="cartitem"
                style={{
                  marginBottom: "20px",
                  gridTemplateColumns: "3fr 5fr 3fr 2fr 2fr",
                  gap: "20px",
                  boxShadow: "0 1px 4px rgb(0 0 0 / 40%)",
                }}
              >
                <div className="cartitem_image">
                  <img
                    src={cartItem.imageUrl}
                    alt={cartItem.name}
                    title={cartItem.name}
                  />
                </div>
                <div>
                  <p className="m-auto offset-3">
                    {cartItem.name.substring(0, 10)}...
                  </p>
                  <caption className="qty">Quantity: {cartItem.qty}</caption>
                  <br />
                  <br />
                  <span
                    onClick={(e) => {
                      e.preventDefault();
                      history.push(`/product/${cartItem.product}`);
                    }}
                    className="btn btn-outline-secondary"
                  >
                    View
                  </span>
                </div>

                <p style={{ fontSize: "14px" }} className="cartitem_price">
                  Price: ${cartItem.price} each
                </p>
                <p style={{ fontSize: "14px" }} className="cartitem_price">
                  Total: ${cartItem.price * cartItem.qty}
                </p>
              </div>
            ))}
        </div>
      </div>
      <br />
      <br />
      <br />
      <div
        className="col-md-12"
        style={{
          background: "white",
          boxShadow: "0 1px 4px rgb(0 0 0 / 40%)",
          paddingTop: "20px",
        }}
      >
        <div className="p-2">
          <h4 className="fw-bold text-center text-danger">Cancelled Orders</h4>
          <br />
          {orderState &&
            orderState.map((cartItem, index) => (
              <div
                className="cartitem"
                style={{
                  marginBottom: "20px",
                  gridTemplateColumns: "3fr 5fr 3fr 2fr 2fr",
                  gap: "20px",
                  boxShadow: "0 1px 4px rgb(0 0 0 / 40%)",
                }}
              >
                <div className="cartitem_image">
                  <img
                    src={cartItem.imageUrl}
                    alt={cartItem.name}
                    title={cartItem.name}
                  />
                </div>
                <div>
                  <p className="m-auto offset-3">
                    {cartItem.name.substring(0, 10)}...
                  </p>
                  <caption className="qty">Quantity: {cartItem.qty}</caption>
                  <br />
                  <br />
                  <span
                    onClick={(e) => {
                      e.preventDefault();
                      history.push(`/cancelledorder/product`);
                    }}
                    className="nav-link"
                  >
                    View
                  </span>
                </div>

                <p style={{ fontSize: "14px" }} className="cartitem_price">
                  Price: ${cartItem.price} each
                </p>
                <p style={{ fontSize: "14px" }} className="cartitem_price">
                  Total: ${cartItem.price * cartItem.qty}
                </p>
              </div>
            ))}
        </div>
      </div>
      <br />
    </>
  );
};

export default withUser(TrackOrders);
