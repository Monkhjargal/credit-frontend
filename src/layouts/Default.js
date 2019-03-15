import React, { Component } from "react";
class Default extends Component {
  render() {
    const { children } = this.props;
    return <div>{children}</div>;
  }
}

export default Default;
