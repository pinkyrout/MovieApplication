import React, { Component, Fragment } from 'react';
import axios from "axios";
import { Row, Card, Container, Button } from "reactstrap";
import MovieIcon from "../../assets/images/moviesIcon/MovieIcon.jpg";

class MoviesList extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      movies: [],
      isError: false,
    };
  }
  
  componentDidMount() {
    axios({
      method: "get",
      url: "http://localhost:3001/api/v1/movies",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => {
      this.setState({ movies: res.data });
    })
    .catch(() => {
      this.setState({ isError: true })
    })
  }

  renderShowsList = movieId => {
  	const { history } = this.props;
  	history.push(`/${movieId}/list_shows`);
  }

  renderMoviesList = () => {
    const { movies } = this.state;
    return (
      <div className="row">
        { movies.map( movie => {
            return (
              <div className='col-md-6' key={movie.id}>
                <Card className="movie-card">
                  <Button type="button" onClick= {() => {this.renderShowsList(movie.id)}} color="success">
                    Book Tickets
                  </Button>
                  <img src={MovieIcon} className="movie-poster" />
                </Card>
                <Row>
                  <h6 className="movie-name">{ movie.name }&nbsp;&nbsp;&nbsp; Rating: { movie.rating }</h6> 
                </Row>
              </div>
            )
          })}
      </div>
    )
  }

  render() {
    const { movies } = this.state;
    return (
      <Fragment>
        <Container className="page-container">
          { movies.length !== 0 && this.renderMoviesList()}
        </Container>
      </Fragment>
    )
  }
}

export default MoviesList;
