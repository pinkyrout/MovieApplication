import React, { Component } from "react";
import {Link} from "react-router-dom";
import { Row, Col } from "reactstrap";
import AppHeader from "./AppHeader.js";
import MoviesList from "./movies/MoviesList.js";
import Authenticate from "./registrations/Authenticate.js";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { 
    };
  }

  render () {
    const { history } = this.props;
    return (
      <React.Fragment>
        <Row className="header-style">
          <Col sm={10}>
            <AppHeader />
          </Col>
          <Col>
            <Authenticate 
              history={history}
            />
          </Col>
        </Row>
        <Row>
          <MoviesList
            history={history}
          />
        </Row>
      </React.Fragment>
    );
  }
}
export default Home;
