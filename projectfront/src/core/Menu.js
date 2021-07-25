import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, signout } from "../auth/helper";
const { user } = isAuthenticated();

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { backgroundColor: "#2ecc72", color: "#FFF", borderRadius: 0 };
  } else {
    return { color: "#FFF" };
  }
};

const Menu = ({ history }) => (
  <div>
    <ul className="nav nav-tabs bg-dark p-2" style={{ border: 0 }}>
      <li className="nav-item">
        <Link style={currentTab(history, "/")} className="nav-link" to="/">
          Home
        </Link>
      </li>
      <li>
        <Link
          style={currentTab(history, "/cart")}
          className="nav-link"
          to="/cart"
        >
          Cart
        </Link>
      </li>
      <li>
        {isAuthenticated() && user.role === 0 && (
          <Link
            style={currentTab(history, "/user/dashboard")}
            className="nav-link"
            to="/user/dashboard"
          >
            Dashboard
          </Link>
        )}
      </li>
      <li>
        {isAuthenticated() && user.role === 1 && (
          <Link
            style={currentTab(history, "/admin/dashboard")}
            className="nav-link"
            to="/admin/dashboard"
          >
            Admin Dashboard
          </Link>
        )}
      </li>
      {!isAuthenticated() && (
        <Fragment>
          <li>
            <Link
              style={currentTab(history, "/signup")}
              className="nav-link"
              to="/signup"
            >
              Signup
            </Link>
          </li>
          <li>
            <Link
              style={currentTab(history, "/signin")}
              className="nav-link"
              to="/signin"
            >
              Signin
            </Link>
          </li>
        </Fragment>
      )}
      {isAuthenticated() && (
        <li>
          <span
            className="nav-link bg-danger"
            style={{
              cursor: "pointer",
              color: "white",
              borderRadius: "0px",
              marginLeft: "10px",
            }}
            onClick={() => {
              signout(() => {
                history.push("/");
              });
            }}
          >
            Signout
          </span>
        </li>
      )}
    </ul>
  </div>
);

export default withRouter(Menu);
