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
      rating: "",
      isError: false,
      isActive: false,
    };
  }

  createMovie = () => {
    const { name, rating, isActive } = this.state,
      { history } = this.props;
    axios({
      method: "post",
      url: "http://localhost:3001/api/v1/movies",
      params: {
        name: name,
        rating: rating,
        is_active: isActive,
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
    const { name, rating, isActive } = this.state;
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
                  <Input type="email" value={name} onChange={e => this.setState({ name: e.target.value })} />
                </FormGroup>
                <FormGroup>
                  <Label>Rating</Label>
                  <Input type="number" value={rating} onChange={e => this.setState({ rating: e.target.value })} />
                </FormGroup>
                <FormGroup>
                  <Label>Is Active</Label>
                  <Input type="select" value={isActive} onChange={e => this.setState({ isActive: e.target.value })} >
                    <option>true</option>
                    <option>false</option>
                  </Input>
                </FormGroup>
                <Button type="button" color="primary" onClick={() => {this.createMovie()}} className="mt-4">
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
