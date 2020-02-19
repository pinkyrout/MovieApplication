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

  toggleNavbar = () => {

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
          </Nav>
        </aside>
      </div>
    );
  }
}

export default SideNav;
