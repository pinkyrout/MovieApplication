import React, { Component } from "react";
import axios from "axios";
import { Button, Modal, ModalBody, Col, Row, Form, FormGroup, Label, Input, FormText, Alert } from "reactstrap";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isModalOpen: false,
      userName: "",
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

  createUser = () => {
    const { email, password, userName } = this.state,
      { history } = this.props;
    axios({
      method: "post",
      url: `http://localhost:3001/api/v1/users`,
      data: {
        email: email,
        password: password,
        username: userName
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
        SignUp Failed. Please enter valid values.
      </Alert>
    );
  }

  onAlertDismiss = () => {
    this.setState({ isError: false });
  }

  render () {
    const { isModalOpen, userName, email, password, isError } = this.state;

    return (
      <div>
        <div className="login-button">
          <Button onClick={() => {this.setModalVisibility(true)}}>Sign Up</Button>
        </div>
        <Modal size="md" isOpen={isModalOpen}>
          <ModalBody>
            {isError && this.renderAlertMessage()}
            <Row>
              <Col sm={11} align="center">
                <b>Sign Up</b>
              </Col>
              <Col sm={1} align="right" onClick={() => this.setModalVisibility(false)}>
                <span className="close">x</span>
              </Col>
            </Row>
            <Row>
              <Form className="ml-4">
                <FormGroup>
                  <Label>User Name</Label>
                  <Input type="plaintext" value={userName} onChange={e => this.setState({ userName: e.target.value })} />
                </FormGroup>
                <FormGroup>
                  <Label>Email</Label>
                  <Input type="email" value={email} onChange={e => this.setState({ email: e.target.value })} />
                </FormGroup>
                <FormGroup>
                  <Label>Password</Label>
                  <Input type="password" value={password} onChange={e => this.setState({ password: e.target.value })} />
                </FormGroup>
                <Button type="button" color="primary" onClick={this.createUser}>
                  Sign Up
                </Button>
              </Form>
            </Row>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

export default SignUp;
