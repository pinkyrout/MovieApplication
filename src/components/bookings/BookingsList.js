import React, { Component, Fragment } from 'react';
import { Row, Card, Container, Col, Button } from "reactstrap";
import axios from "axios";
import { timeDisplayFormatter } from "../../utils";

class BookingsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookings: [],
    };
  }

  componentWillMount() {
    axios({
      method: "get",
      url: `http://localhost:3001/api/v1/bookings`,
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => {
      this.setState({ bookings: res.data });
    })
    .catch(() => {
      this.setState({ isError: true })
    })
  }

  renderBookings = () => {
    const { bookings } = this.state,
      { history } = this.props;
    return (
      <div>
        <Row>
          <Col>
            <h4 className="font-style"> Booked Tickets </h4>
          </Col>
          <Col>
            <Button color="primary" onClick={() => {history.push("/")}} className="back-button">Back To Home</Button>
          </Col>
          </Row>
        <Row>
        { bookings.map( booking => {
          return (
            <div className='col-md-6' key={booking.id}>
              <Card className="booking-card">
                <label className= "movie-name">Movie Name: {booking.movie_name}</label>
                <label className= "movie-name">Total Price: Rs {booking.price}</label>
                <label className= "movie-name">Booked Seats Details: ({booking.seats.map(seat => { return ` ${seat.number} ` })})</label>
                <label className= "movie-name">Show Start Time: {timeDisplayFormatter(booking.show_start_time)}</label>
                <label className= "movie-name">Booked at: {booking.booked_at}</label>
              </Card>
            </div>
          )
        })}
        </Row>
      </div>
    )
  }

  render () {
    return (
      <Fragment>
        <Container>
          {this.renderBookings()}
        </Container>
      </Fragment>
    )
  }
}

export default BookingsList;
