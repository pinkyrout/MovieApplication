import React, { Component, Fragment } from 'react';
import SideNav from "../SideNav.js";
import axios from "axios";
import { Form, FormGroup, Label, Input, Row, Col, Button } from "reactstrap";
import { CREATE } from "./../../Constants";
import { getId } from '../../utils';

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      rating: null,
      isActive: false,
      isError: false,
    };
  }

  componentWillMount() {
    const { history } = this.props;
    if (localStorage.getItem("loginToken") === null) {
      history.push("/");
    }
  }

  componentDidMount() {
    const movieId = getId(this.props);
    axios({
      method: "get",
      url: `http://localhost:3001/api/v1/movies/${movieId}/edit`,
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => {
      this.setState({
        name: res.data.name,
        rating: res.data.rating,
        isActive: res.data.is_active,
      });
    })
    .catch(() => {
      this.setState({ isError: true });
    })
  }

  updateMovie = () => {
    const { name, rating, isActive } = this.state,
      { history } = this.props,
      id = getId(this.props);
    axios({
      method: "patch",
      url: `http://localhost:3001/api/v1/movies/${id}`,
      params: {
        name: name,
        rating: rating,
        is_active: isActive
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
                <label className="table-headers"> Edit Movie </label>
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
                <Button type="button" color="primary" onClick={() => {this.updateMovie()}} className="mt-4">
                  Update
                </Button>
              </Form>
              </Row>
            </Col>
          </Row>
      </Fragment>
    )
  }
}

export default Edit;
