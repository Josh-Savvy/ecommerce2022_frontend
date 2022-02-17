import React from "react";
// import axios from "axios";
import withUser from "../withUser";

const TrackOrderById = ({ user }) => {
  // const [state, setState] = useState({});
  return (
    <>
      <div className="fade-in">
        <div className="text-center">
          {JSON.stringify(user)}
          <div className="jumbotron">
            <h1 className=" m-auto pt-5 pb-5 text-light bg-danger">
              Page Unavailable!
            </h1>
          </div>
        </div>
        <div className="text-center">
          <span
            className="fa fa-spin"
            style={{ fontSize: "33vw", marginTop: "5%" }}
          >
            ☹
          </span>
        </div>
      </div>
    </>
  );
};
export default withUser(TrackOrderById);
