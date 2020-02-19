import React, { Component } from "react";
import axios from "axios";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Home from "./components/Home.js";
import Authenticate from "./components/registrations/Authenticate.js";
import  "./App.css";
import ShowsList from "./components/shows/ShowsList.js";
import BookingsList from "./components/bookings/BookingsList.js";
import AdminDashboard from "./components/AdminDashboard.js";
import Movies from "./components/movies/Index.js";
import MoviesCreate from "./components/movies/Create.js";
import MoviesEdit from "./components/movies/Edit.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: {}
     };
  }
  componentDidMount() {
    this.loginStatus()
  }

  loginStatus = () => {
    axios.get('http://localhost:3001/logged_in', {withCredentials: true})
    .then(response => {
      if (response.data.logged_in) {
        this.handleLogin(response)
      } else {
        this.handleLogout()
      }
    })
    .catch(error => console.log('api errors:', error))
  }

  handleLogin = (data) => {
    this.setState({
      isLoggedIn: true,
      user: data.user
    })
  }

  handleLogout = () => {
    this.setState({
    isLoggedIn: false,
    user: {}
    })
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route
              exact path="/"
              render={props => (
              <Home {...props} loggedInStatus={this.state.isLoggedIn}/>
              )}
            />
            <Route
              exact path="/login"
              render={props => (
              <Authenticate {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn}/>
              )}
            />
            <Route
              exact path="/:id/list_shows"
              render={props => (
                <ShowsList {...props} />
              )}
            />
            <Route
              exact path="/list_bookings"
              render={props => (
                <BookingsList {...props} />
              )}
            />
            <Route
              exact path="/admin_dashboard"
              render={props => (
                <AdminDashboard {...props} />
              )}
            />
            <Route
              exact path="/admin_dashboard/movies"
              render={props => (
                <Movies {...props} />
              )}
            />
            <Route
              exact path="/admin_dashboard/movies/create"
              render={props => (
                <MoviesCreate {...props} />
              )}
            />
            <Route
              exact path="/admin_dashboard/movies/:id/edit"
              render={props => (
                <MoviesEdit {...props} />
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
