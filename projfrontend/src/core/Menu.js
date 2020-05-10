import React from "react";
import { Link, withRouter } from "react-router-dom";
const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#2ecc72" };
  } else {
    return { color: "#FFFFFF" };
  }
};
const Menu = ({ history }) => (
  <div>
    <ul className="nav nav-tabs bg-dark">
      <li className="nav-item">
        <Link style={currentTab(history, "/")} className="nav-link" to="/">
          HOME
        </Link>
      </li>
      <li className="nav-item">
        <Link
          style={currentTab(history, "/cart")}
          className="nav-link"
          to="/cart"
        >
          CART
        </Link>
      </li>
      <li className="nav-item">
        <Link
          style={currentTab(history, "/user/dashboard")}
          className="nav-link"
          to="/user/dashboard"
        >
          DASHBOARD
        </Link>
      </li>
      <li className="nav-item">
        <Link
          style={currentTab(history, "/admin/dashboard")}
          className="nav-link"
          to="/admin/dashboard"
        >
          ADMIN
        </Link>
      </li>
      <li className="nav-item">
        <Link
          style={currentTab(history, "/signout")}
          className="nav-link"
          to="/signout"
        >
          SIGNOUT
        </Link>
      </li>
      <li className="nav-item">
        <Link
          style={currentTab(history, "/signin")}
          className="nav-link"
          to="/signin"
        >
          SIGNIN
        </Link>
      </li>
      <li className="nav-item">
        <Link
          style={currentTab(history, "/signup")}
          className="nav-link"
          to="/signup"
        >
          SIGNUP
        </Link>
      </li>
    </ul>
  </div>
);

export default withRouter(Menu);
