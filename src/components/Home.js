import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Row, Col } from "reactstrap";
import AppHeader from "./AppHeader.js";
import MoviesList from "./movies/MoviesList.js";

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
          <Col sm={2}>
            <div>
              <Link to='/login'>Log In</Link>
              <br></br>
              <Link to='/signup'>Sign Up</Link>
            </div>
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