import React, { Component, Fragment } from 'react';
import SideNav from "../SideNav.js";
import axios from "axios";
import { Form, FormGroup, Label, Input, Row, Col, Button } from "reactstrap";
import { CREATE } from "./../../Constants";

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      rating: null,
      isError: false,
    };
  }

  createMovie = () => {
    const { name, rating } = this.state,
      { history } = this.props;
    axios({
      method: "post",
      url: "http://localhost:3001/api/v1/movies",
      params: {
        name: name,
        rating: rating
      },
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(() => {
      history.push("/admin_dashboard/movies");
    })
    .catch(() => {
      this.setState({ isError: true });
    })
  }

  render () {
    return (
      <Fragment>
        <Row>
          <Col sm={2}>
            <SideNav />
          </Col>
            <Col sm={10}>
              <Row>
                <label className="table-headers"> Create Movie </label>
              </Row>
              <Row>
                <Form className="ml-4">
                <FormGroup>
                  <Label>Name</Label>
                  <Input type="email" value={null} onChange={e => this.setState({ name: e.target.value })} />
                </FormGroup>
                <FormGroup>
                  <Label>Rating</Label>
                  <Input type="number" value={null} onChange={e => this.setState({ rating: e.target.value })} />
                </FormGroup>
                <Button type="button" color="primary" onClick={() => {this.createMovie()}}>
                  Create
                </Button>
              </Form>
              </Row>
            </Col>
          </Row>
      </Fragment>
    )
  }
}

export default Create;
