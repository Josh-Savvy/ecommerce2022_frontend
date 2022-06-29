import "./styles/productpage.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import withUser from "./withUser";
import { getProductDetails } from "../redux/actions/productAction";
import { addToCart } from "../redux/actions/cartActions";

const ProductPage = ({ match, history }) => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.getProductDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    if (product && match.params.id !== product._id) {
      dispatch(getProductDetails(match.params.id));
    }
  }, [dispatch, match, product]);

  const addToCartHandler = () => {
    dispatch(addToCart(product._id, qty));
    history.push("/cart");
  };

  return (
    <div className="productpage">
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>Error loading product :{error}</h2>
      ) : (
        <>
          <div className="productpage_left">
            <div className="left_image">
              <img src={product.imageUrl} alt={product.name} />
            </div>
            <div className="left_info">
              <p className="left_title">{product.name}</p>
              <p className="left-price">${product.price}</p>
              <p className="left_desc">{product.description}</p>
            </div>
          </div>
          <div className="productpage_right">
            <div className="right_info">
              <p className="right_title">
                Price: <span>${product.price} each</span>
              </p>
              <p className="right-stock">
                Status:{" "}
                <span>{product.stock > 0 ? "Available" : "Out of Stock!"}</span>
              </p>
              <p className="right_qty">
                Quantity:
                <select value={qty} onChange={(e) => setQty(e.target.value)}>
                  {[...Array(product.stock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </p>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={addToCartHandler}
              >
                Add to Cart
              </button>
            </div>
          </div>
          <br />
        </>
      )}
    </div>
  );
};

export default withUser(ProductPage);
