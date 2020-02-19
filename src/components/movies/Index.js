import React, { Component, Fragment } from 'react';
import SideNav from "../SideNav.js";
import axios from "axios";
import { PageHeader, Row, Col, UncontrolledTooltip, Button } from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { sizePerPage, CREATE } from "./../../Constants";
import { Link } from "react-router-dom";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      page: 1,
      sizePerPage: sizePerPage,
      totalSize: 0,
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
      this.setState({ movies: res.data, totalSize: res.data.length });
    })
    .catch(() => {
      this.setState({ isError: true })
    })
  }

  columns = () => {
    return [
      {
        dataField: 'name',
        text: 'Movie Name',
        sort: true,
      },
      {
        dataField: 'rating',
        text: 'Movie Rating',
        sort: true,
      },
    ];
  }

  newActionButton() {
    return (
      <div>
        <Button id="createMovie" onClick={() => {}} className="create-button">Create</Button>
        <UncontrolledTooltip target={"createMovie"} placement="bottom">
          {CREATE}
        </UncontrolledTooltip>
      </div>
    );
  }

  render () {
    const { movies, page, totalSize } = this.state;
    return (
      <React.Fragment>
          <Row>
            <Col sm={2}>
              <SideNav />
            </Col>
            <Col sm={10}>
              <Row>
                <Col sm={8}>
                <label className="table-headers"> Movies List </label>
                </Col>
                <Col>
                  {this.newActionButton()}
                </Col>
              </Row>
              <div className="listing-table">
                <BootstrapTable keyField='id'
                  remote={ { sort: true, pagination: true } }
                  data={ movies }
                  noDataIndication="No Data Found"
                  columns={this.columns()}
                  bordered={ false }
                  hover
                  pagination={ paginationFactory({page, sizePerPage, totalSize, sizePerPageList: []}) }
                  props={this.props}
                  _that={ this }
                  onTableChange={ this.handleTableChange }
                >
               </BootstrapTable>
              </div>
            </Col>
          </Row>
      </React.Fragment>
    )
  }
}

export default Index;
