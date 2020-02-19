import React, { Component } from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import AppIcon from '../assets/images/MovieAppIcon.png';

class SideNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
    };
  }

  render() {
    return (
      <div className="navigation-bar">
        <div>
        </div>
        <a href={"/admin_dashboard/movies"}>
          <label className="nav-font">Admin Tasks</label>
        </a>
        <aside>
          <Nav vertical>
            <NavItem>
              <a href={"/admin_dashboard/movies"}>
                <label className="nav-font">Movies</label>
              </a>
            </NavItem>
            <NavItem>
              <a href={"/admin_dashboard/shows"}>
                <label className="nav-font">Shows</label>
              </a>
            </NavItem>
            <NavItem>
              <a href={"/"}>
                <label className="nav-font">Log Out</label>
              </a>
            </NavItem>
          </Nav>
        </aside>
      </div>
    );
  }
}

export default SideNav;
