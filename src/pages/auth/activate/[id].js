import axios from "axios";
import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";

const RegisterActivate = () => {
  const token = window.location.pathname.split("/").pop();
  const [state, setState] = useState({
    name: "",
    buttonText: "Activate Account",
    error: "",
    success: "",
  });
  const { name, buttonText, error, success } = state;

  useEffect(() => {
    if (token) {
      if (jwt.decode(token)) {
        const { name } = jwt.decode(token);
        setState({ ...state, name });
      }
    }
  }, []);

  const clickSubmit = async (e) => {
    e.preventDefault();
    setState({ ...state, buttonText: "Activating..." });
    try {
      //   const response = await axios.post(`${process.env.BACKEND_API}/register/activate`, { token });
      const response = await axios.post(`/api/register/activate`, { token });
      setState({
        ...state,
        name: "",
        error: "",
        success: response.data.message,
        buttonText: "Account Activated",
      });
    } catch (error) {
      setState({
        ...state,
        buttonText: "Activate",
        error: error.response.data.error,
      });
    }
  };

  useEffect(() => {
    if (buttonText === "Account Activated") {
      window.location = "/";
    }
  }, [success]);

  var myDate = new Date();
  var hrs = myDate.getHours();

  let greet;

  if (hrs < 12) greet = "Good Morning ";
  else if (hrs >= 12 && hrs <= 17) greet = "Good Afternoon ";
  else if (hrs >= 17 && hrs <= 24) greet = "Good Evening ";

  return (
    <div>
      <div className="row">
        <div className="col-lg-6 col-md-5 offset-md-3 text-center">
          <h1>
            {greet} {name}, Are you ready to activate your account?
          </h1>
          <br />
          {success && (
            <div className="alert text-light bg-success">{success}</div>
          )}
          {error && <div className="alert text-light bg-danger">{error}</div>}
          <button onClick={clickSubmit} className="btn btn-outline-dark">
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterActivate;
