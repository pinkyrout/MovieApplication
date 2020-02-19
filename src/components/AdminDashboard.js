import React, { Component } from "react";
import SideNav from "./SideNav.js";

class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render () {
    return (
      <React.Fragment>
        <SideNav />
      </React.Fragment>
    )
  }
}

export default AdminDashboard;
