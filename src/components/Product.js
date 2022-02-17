import { Link } from "react-router-dom";
import "./component-styles/Product.css";

const Product = ({ imageUrl, name, description, stock, price, productId }) => {
  return (
    <div className="product user_cartitem">
      <img src={imageUrl} alt={name} title={name} />
      <div className="product_info">
        <h5 className="info_title">{name}</h5>
        <br />
        <p className="info_desc">{description.substr(0, 100)}...</p>
        <p className="product_price_tag">${price}</p>
        <Link
          to={`/product/${productId}`}
          className="info_btn text-decoration-none"
        >
          View
        </Link>
      </div>
    </div>
  );
};

export default Product;
