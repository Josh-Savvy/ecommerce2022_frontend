import { Link } from "react-router-dom";
import "./component-styles/CartItem.css";
const CartItem = ({ qtyChangeHandler, item, removeCartItem }) => {
  return (
    <div className="cartitem">
      <div className="cartitem_image">
        <img src={item.imageUrl} alt={item.name} title={item.name} />
      </div>
      <Link to={`/product/${item.product}`} className="cartitem_product_link">
        <p className="m-auto offset-3">{item.name}</p>
        <span className="qty">Quantity: {item.qty}</span>
      </Link>

      <p style={{fontSize:'14px'}} className="cartitem_price">Price: ${item.price} each</p>
      <p style={{fontSize:'14px'}} className="cartitem_price">Total: ${item.price * item.qty}</p>

      {/* <select
        id="qty_select"
        onChange={(e) => qtyChangeHandler(item.product, e.target.value)}
      >
        {[...Array(item.stock).keys()].map((x) => {
          return (
            <option key={x + 1} value={x + 1}>
              {x + 1}
            </option>
          );
        })}
      </select> */}

      <button
        className="btn btn-outline-danger cartitem_deleteBtn"
        onClick={() => removeCartItem(item.product)}
      >
        <i className="fa fa-trash"></i>
      </button>
    </div>
  );
};

export default CartItem;
