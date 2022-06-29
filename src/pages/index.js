import "./styles/homepage.css";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts as listProducts } from "../redux/actions/productAction";

// import Product Component
import Product from "../components/Product";
import { isAuth, removeCookie } from "../helpers/auth";

const HomePage = () => {
  const dispatch = useDispatch();
  const getProducts = useSelector((state) => state.getProducts);
  const { products, loading, error } = getProducts;

  useEffect(() => {
    dispatch(listProducts());
    !isAuth() && removeCookie("user");
  }, [dispatch]);

  function reloadIt() {
    if (window.location.href.substr(-2) !== "?r") {
      window.location = window.location.href + "?r";
    }
  }
  setTimeout(reloadIt(), 1000);
  return (
    <div className="homepage fade-in">
      <h2 className="homepage_title">Latest Products</h2>
      <div className="homepage_products">
        {loading ? (
          <h2>Loading...</h2>
        ) : error ? (
          <h2 className="text-center alert bg-danger text-light">
            Error loading products!
          </h2>
        ) : (
          products.map((product) => (
            <>
              <Product
                key={product._id}
                productId={product._id}
                name={product.name}
                price={product.price}
                description={product.description}
                imageUrl={product.imageUrl}
              />
            </>
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;
