import React, { Component } from 'react';
import { Row, Card, Container } from "reactstrap";
import axios from "axios";

class ShowsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shows: [],
    };
  }

  componentDidMount() {
  	const id = this.props.match ? parseInt(this.props.match.params.id, 10) : null
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

  renderUpcomingShows = () => {
  	const { shows } = this.state;
    return (
      <div className="row">
        { shows.map( show => {
            return (
              <div className='col-md-6' key={show.id}>
                <Card className="movie-card">
                </Card>
                <Row>
                  <h6 className="movie-name">{ show.screen }&nbsp;&nbsp;&nbsp; Date: { show.date }</h6> 
                </Row>
              </div>
            )
          })}
      </div>
    )
  }

  render () {
    return (
      <React.Fragment>
        <Container className="page-container">
          {this.renderUpcomingShows()}
        </Container>
      </React.Fragment>
    )
  }
}

export default ShowsList;
