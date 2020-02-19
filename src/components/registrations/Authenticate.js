import React, { Component } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import { Button, Modal, ModalBody, Col, Row, Form, FormGroup, Label, Input, FormText, Alert } from "reactstrap";

class Authenticate extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isModalOpen: false,
      email: "",
      password: "",
      isError: false,
    };
  }

  setModalVisibility = isOpen => {
    this.setState({
      isModalOpen: isOpen
    });
  }

  loginUser = () => {
    const { email, password } = this.state,
      { history } = this.props;
    axios({
      method: "post",
      url: `http://localhost:3001/api/v1/users/authenticate_user`,
      data: {
        email: email,
        password: password
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

  renderAlertMessage = () => {
    return (
      <Alert color="danger" toggle={this.onAlertDismiss}>
        Authentication failed. Please enter valid credentials.
      </Alert>
    );
  }

  onAlertDismiss = () => {
    this.setState({ isError: false });
  }

  render () {
    const { isModalOpen, email, password, isError } = this.state;

    return (
      <div>
        <div className="mt-4">
          <Button onClick={() => {this.setModalVisibility(true)}}>Log In</Button>
        </div>
        <Modal size="md" isOpen={isModalOpen}>
          <ModalBody>
            {isError && this.renderAlertMessage()}
            <Row>
              <Col sm={11} align="center">
                <b>Login</b>
              </Col>
              <Col sm={1} align="right" onClick={() => this.setModalVisibility(false)}>
                <span className="close">x</span>
              </Col>
            </Row>
            <Row>
              <Form className="ml-4">
                <FormGroup>
                  <Label>Email</Label>
                  <Input type="email" value={email} onChange={e => this.setState({ email: e.target.value })} />
                </FormGroup>
                <FormGroup>
                  <Label>Password</Label>
                  <Input type="password" value={password} onChange={e => this.setState({ password: e.target.value })} />
                </FormGroup>
                <Button type="button" color="primary" onClick={this.loginUser}>
                  Submit
                </Button>
              </Form>
            </Row>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

export default Authenticate;
