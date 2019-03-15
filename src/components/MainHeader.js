import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../scss/assets/logo.jpg";

class MainHeader extends Component {
  render() {
    return (
      <div className="main-header">
        <div className="main-gutter">
          <div className="header-wrap">
            <div className="logo">
              <img src={logo} alt="logo" height="50" />
            </div>
            <div className="main-menus">
              <ul>
                <li>
                  <Link to="/pro">Иргэд</Link>
                </li>
                <li>
                  <a href="/">Байгууллага</a>
                </li>
                <li>
                  <a href="/">Карт</a>
                </li>
                <li>
                  <a href="/">Холбоо барих</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MainHeader;
