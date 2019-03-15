import React, { Component } from "react";
import { Icon } from "antd";

class Header extends Component {
  render() {
    return (
      <div className="top-header">
        <div className="main-gutter">
          <div className="top-menus">
            <ul>
              <li>
                <a href="/">Бидний тухай</a>
              </li>
              <li>
                <a href="/">Хүний нөөц</a>
              </li>
              <li>
                <a href="/">Интернет банк</a>
              </li>
              <li>
                <a href="/">
                  English
                </a>
              </li>
              <li>
                <Icon type="search" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
