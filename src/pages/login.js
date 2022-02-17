import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import { authenticate, isAuth } from "../helpers/auth";

const Login = () => {
  const history = useHistory();
  const [state, setState] = useState({
    email: "",
    password: "",
    error: "",
    success: "",
    buttonText: "Login",
  });
  const { email, password, buttonText, success, error } = state;

  const handleChange = (name) => (e) => {
    setState({
      ...state,
      [name]: e.target.value,
      error: "",
      success: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({
      ...state,
      buttonText: "Logging in...",
    });
    try {
      const response = await axios.post("/api/login", {
        email,
        password,
      });

      authenticate(response, () => {
        isAuth() && history.push("/");
      });

      setState({
        ...state,
        email: "",
        password: "",
        success: response.data.message,
        error: "",
      });
      if (!response.data) {
        setState({
          ...state,
          error: "An error occured. Please check your password and try again",
        });
      }
    } catch (error) {
      console.log(error);
      setState({
        ...state,
        error: error.response.data.error,
        success: "",
      });
    }
  };

  useEffect(() => {
    isAuth() && history.push("/");
  }, [history]);

  function reloadIt() {
    if (window.location.href.substr(-2) !== "?r") {
      window.location = window.location.href + "?r";
    }
  }

  setTimeout(reloadIt(), 1000);

  const login = () => (
    <form onSubmit={handleSubmit} className="w-100">
      <div className="form-group">
        <i className="fa fa-user"></i> Email:
        <input
          value={email}
          onChange={handleChange("email")}
          type="email"
          className="form-control"
          placeholder="Type your email"
        />
      </div>
      <div className="form-group">
        <i className="fa fa-lock"></i> Password:
        <input
          value={password}
          onChange={handleChange("password")}
          type="password"
          className="form-control"
          placeholder="Type your password"
        />
      </div>
      <div>
        <label style={{ fontSize: "13px" }}>
          <input type="checkbox" defaultChecked /> Remember me
        </label>
      </div>

      <div className="form-group text-center">
        {success ? (
          <a href="/">Go to homepage</a>
        ) : (
          <button id="submit-btn" className="btn btn-outline-dark w-50 p-1">
            {buttonText}
          </button>
        )}
      </div>
      <hr style={{ opacity: "60%" }} />
      <div className="socials">
        <div className="text-center">
          <span
            className="btn btn-primary w-50 p-1 "
            style={{ fontSize: "14px" }}
          >
            <i className="fa fa-facebook"></i>
            <span className="offset-1"> Log in with Facebook </span>
          </span>
          <br />
          <br />
          <span
            className="btn border-dark w-50 p-1 "
            style={{ fontSize: "14px" }}
          >
            <i className="fa fa-google"></i>
            <span className="offset-1"> Log in with Google </span>
          </span>
        </div>
      </div>
    </form>
  );

  return (
    <div className="fade-in">
      <br />
      <br />
      <div
        className="m-auto"
        style={{
          background: "white",
          padding: "20px",
          width: "70%",
          borderRadius: "10px",
        }}
      >
        <br />
        <h4 className="text-center">Log in to your account</h4>
        <br />
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        {login()}
      </div>
      <br />
      <div className="text-center">
        <div className="" style={{ whiteSpace: "nowrap", fontSize: "14px" }}>
          <Link to="/account/forgotpassword">
            <p className="text-danger">Forgot Password?</p>
          </Link>
        </div>
        <h6 className="">
          New user?
          <Link to="/signup"> create a new account here</Link>
        </h6>
      </div>
    </div>
  );
};

export default Login;
