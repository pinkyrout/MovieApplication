import React from 'react';
import AppIcon from '../assets/images/MovieAppIcon.png';
import { Row, Col } from "reactstrap";

const AppHeader = () => {
	return (
    <div>
      <Row>
        <Col sm={4}>
          <img src={AppIcon} id={'movie-mania-logo'} alt="MovieMania" className="app-icon"/>
        </Col>
        <Col sm={8}>
          <h4 className="font-style">Movie Mania</h4>
        </Col>
      </Row>
    </div>
	);
};

export default AppHeader;

