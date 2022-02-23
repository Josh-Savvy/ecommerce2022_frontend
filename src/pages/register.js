import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import { isAuth } from "../helpers/auth";

const Login = () => {
  const history = useHistory();
  const [state, setState] = useState({
    email: "",
    phone: "",
    name: "",
    password: "",
    address: "",
    error: "",
    success: "",
    buttonText: "Submit",
  });
  const { name, address, phone, email, password, buttonText, success, error } =
    state;

  const handleChange = (name) => (e) => {
    setState({
      ...state,
      [name]: e.target.value,
      error: "",
      success: "",
      buttonText: "Submit",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({
      ...state,
      buttonText: "Loading...",
    });
    try {
      const response = await axios.post("/api/register", {
        name,
        email,
        password,
        address,
        phone,
      });
      console.log(response.data);
      response &&
        setState({
          ...state,
          name: "",
          phone: "",
          email: "",
          password: "",
          address: "",
          success: response.data.message,
          error: "",
          buttonText: "Submit",
        });
    } catch (error) {
      console.log(error);
      setState({
        ...state,
        error:
          error.response.data.error ||
          "An error was encountered while creating your account. Please try again.",
        success: "",
        buttonText: "Submit",
      });
    }
  };

  useEffect(() => {
    isAuth() && history.push("/");
  }, [history]);

  const register = () => (
    <form onSubmit={handleSubmit} className="w-100">
      <div className="form-group">
        <i className="fa fa-user"></i> Name:
        <input
          autoComplete="false"
          value={name}
          onChange={handleChange("name")}
          type="text"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <i className="fa fa-envelope"></i> Email:
        <input
          autoComplete="false"
          value={email}
          onChange={handleChange("email")}
          type="email"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <i className="fa fa-lock"></i> Password:
        <input
          autoComplete="false"
          value={password}
          onChange={handleChange("password")}
          type="password"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <i className="fa fa-phone"></i> Phone:
        <input
          autoComplete="false"
          value={phone}
          onChange={handleChange("phone")}
          type="tel"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <i className="fa fa-map-marker"></i> Address:
        <input
          autoComplete="false"
          value={address}
          onChange={handleChange("address")}
          type="text"
          className="form-control"
        />
      </div>
      <div className="form-group text-center">
        <button id="submit-btn" className="btn btn-outline-dark">
          {buttonText}
        </button>
      </div>
      <hr style={{ opacity: "60%" }} />
      <div className="socials">
        <div className="text-center">
          <span
            className="btn border-dark w-50 p-1 "
            style={{ fontSize: "14px" }}
          >
            <i className="fa fa-google"></i>
            <span className="offset-1"> Sign up with Google </span>
          </span>
          <br />
          <br />
          <span
            className="btn btn-primary w-50 p-1 "
            style={{ fontSize: "14px" }}
          >
            <i className="fa fa-facebook"></i>
            <span className="offset-1"> Sign up with Facebook </span>
          </span>
        </div>
      </div>
    </form>
  );

  return (
    <div className="fade-in">
      <br />
      <div className="row">
        <div
          className="m-auto"
          style={{
            background: "white",
            padding: "20px",
            width: "80%",
            borderRadius: "10px",
          }}
        >
          <br />
          <h4 className="text-center">Create account</h4>
          <br />
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert bg-green text-light">{success}</div>}
          {register()}
        </div>
      </div>
      <div className="">
        <h6 className="offset-2">
          Aleady a user?
          <Link to="/login"> Log in here</Link>
        </h6>
      </div>
    </div>
  );
};

export default Login;
