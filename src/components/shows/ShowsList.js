import React, { Component } from 'react';
import { Row, Card, Container, Button, Modal, ModalBody, Col, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import { timeDisplayFormatter, getId } from '../../utils';

class ShowsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shows: [],
      isModalOpen: false,
      seats: [],
      selectedSeats: [],
    };
  }

  componentDidMount() {
    const id = getId(this.props);
    axios({
      method: "get",
      url: `http://localhost:3001/api/v1/movies/${id}/upcoming_shows`,
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => {
      this.setState({ shows: res.data });
    })
    .catch(res => {
      this.setState({ isError: true })
    })
  }

  getShowTime = show => {
    return `${timeDisplayFormatter(show.start_time)}-${timeDisplayFormatter(show.end_time)}`;
  }

  getSeatsAndOpenModal = showId => {
    axios({
      method: "get",
      url: `http://localhost:3001/api/v1/shows/${showId}/seats`,
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => {
      this.setState({ seats: res.data });
    })
    .catch(res => {
      this.setState({ isError: true })
    })
    this.setModalVisibility(true);
  }

  setModalVisibility = (isOpen) => {
    this.setState({
      isModalOpen: isOpen,
      selectedSeats: [],
    });
  }

  renderUpcomingShows = () => {
    const { shows } = this.state;
    return (
      <div className="row">
        { shows.map( show => {
            return (
              <div className='col-md-6' key={show.id}>
                <Card className="show-card">
                  <label className= "movie-name">{show.screen} </label>
                  <label className= "movie-name"> Date: {show.date} </label>
                  <label className= "movie-name"> Show Time: ({this.getShowTime(show)}) </label>
                  <Button color="primary" size="lg" onClick={() => this.getSeatsAndOpenModal(show.id)}>Select Seats</Button>
                </Card>
              </div>
            )
          })}
      </div>
    )
  }

  setSelectedSeats = seat => {
    let { selectedSeats } = this.state;
    if(selectedSeats.includes(seat)) {
      selectedSeats = selectedSeats.filter(selectedSeat =>  selectedSeat !== seat);
    } else {
      selectedSeats.push(seat);
    }
    this.setState({ selectedSeats });
  }

  renderSeatsList = () => {
    const { seats, selectedSeats } = this.state;
    return seats.map( seat => {
      return (
        <FormGroup check>
          <Label check>
            <Input type="checkbox" checked={selectedSeats.includes(seat)} onClick={() => this.setSelectedSeats(seat)} />
          </Label>
        </FormGroup>
      );
    });
  }

  renderSeatsModal = () => {
    const { isModalOpen, selectedSeats } = this.state;
    return (
      <Modal size="lg" isOpen={isModalOpen}>
        <ModalBody>
          <Row>
            <Col sm={11} align="center">
              <b>Select Seats</b>
            </Col>
            <Col sm={1} align="right" onClick={() => this.setModalVisibility(false)}>
              <span className="close">x</span>
            </Col>
          </Row>
          <Row>
          <Col className="ml-4">
            <label className="price-label">Upper(First 3 rows) Price: Rs 300.00</label>
            <label className="price-label">Middle(Next 4 rows) Price: Rs 200.00</label>
            <label className="price-label">Lower(Next 3 rows) Price: Rs 150.00</label>
          </Col>
          <Col>
            <Row className="seats-row">
              {this.renderSeatsList()}
            </Row>
          </Col>
          </Row>
          <Row className="booking-button">
            {selectedSeats.length !== 0 && this.renderBookingButton()}
          </Row>
        </ModalBody>
      </Modal>
    )
  }

  renderBookingButton = () => {
    return (
      <Button color="primary" onClick={() => {this.bookAndRenderTickets()}}>
        Confirm & Book Tickets
      </Button>
    )
  }

  bookAndRenderTickets = () => {
    axios({
      method: "get",
      url: `http://localhost:3001/api/v1/shows/${showId}/seats`,
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => {
      this.setState({ seats: res.data });
    })
    .catch(res => {
      this.setState({ isError: true })
    })
    this.setModalVisibility(false);
  }

  render () {
    const { isModalOpen } = this.state;
    return (
      <React.Fragment>
        <Container className="page-container">
          {this.renderUpcomingShows()}
          {isModalOpen && this.renderSeatsModal()}
        </Container>
      </React.Fragment>
    )
  }
}

export default ShowsList;
