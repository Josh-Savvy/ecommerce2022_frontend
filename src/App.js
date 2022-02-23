import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages/homepage";
import ProductPage from "./pages/productpage";
import CartPage from "./pages/cartpage";
import Navbar from "./components/Navbar";
import Backdrop from "./components/Backdrop";
import Sidebar from "./components/Sidebar";
import CheckoutPage from "./pages/checkoutpage";
import Login from "./pages/login";
import TrackOrders from "./pages/track";
import TrackOrderById from "./pages/track/trackId";
import SignUp from "./pages/register";
import User from "./pages/user";
import RegisterActivate from "./pages/auth/activate/[id]";

const App = () => {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const showSideBar = () => setSidebarToggle(true);
  const handleUserModal = () => {
    if (document.getElementById("user_loggedin_dropdown")) {
      const y = document.getElementById("user_loggedin_dropdown").style;
      if (y.display === "block") {
        y.display = "none";
      }
    }
  };
  return (
    <>
      <Router>
        <Navbar click={showSideBar} />
        <Sidebar show={sidebarToggle} click={() => setSidebarToggle(false)} />
        <Backdrop show={sidebarToggle} click={() => setSidebarToggle(false)} />
        <main onClick={handleUserModal}>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/product/:id" component={ProductPage} />
            <Route exact path="/cart" component={CartPage} />
            <Route exact path="/checkout/" component={CheckoutPage} />
            <Route exact path="/trackorders" component={TrackOrders} />
            <Route
              exact
              path="/trackorders/track/:id"
              component={TrackOrderById}
            />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/user" component={User} />
            <Route exact path="/auth/activate/:id" component={RegisterActivate} />
          </Switch>
        </main>
      </Router>
    </>
  );
};

export default App;
