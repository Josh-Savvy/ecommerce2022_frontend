import * as actionTypes from "../consts/cartConst";
import axios from "axios";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);
  const { _id, name, imageUrl, price } = data;
  dispatch({
    type: actionTypes.ADD_TO_CART,
    payload: {
      product: _id,
      name: name,
      imageUrl: imageUrl,
      price: price,
      qty,
    },
  });
  const cartItems = getState().cart.cartItems;
  localStorage.setItem("cart", JSON.stringify(cartItems));

  // const token = getCookie("token");
  // data &&
  // (await axios.post("/api/cartitems", {
  //   _id,
  //     name,
  //     imageUrl,
  //     price,
  //     qty,
  //     token,
  //   }));
};
export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.REMOVE_FROM_CART,
    payload: id,
  });

  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};
