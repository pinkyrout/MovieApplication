import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import AppHeader from "./AppHeader.js";
import MoviesList from "./movies/MoviesList.js";
import Authenticate from "./registrations/Authenticate.js";
import SignUp from "./registrations/SignUp.js";

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
            <Row>
              <Authenticate
                history={history}
              />{"  "}
              <SignUp
                history={history}
              />
            </Row>
          </Col>
        </Row>
        <Row className="movies-list">
          <MoviesList
            history={history}
          />
        </Row>
      </React.Fragment>
    );
  }
}
export default Home;
