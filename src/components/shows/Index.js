import React, { Component, Fragment } from "react";
import { sizePerPage } from "./../../Constants";
import axios from "axios";
import { PageHeader, Row, Col, UncontrolledTooltip, Button } from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import SideNav from "../SideNav.js";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shows: [],
      totalSize: 0,
      page: 1,
      sizePerPage: sizePerPage,
    };
  }

  componentDidMount() {
    axios({
      method: "get",
      url: "http://localhost:3001/api/v1/shows",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => {
      this.setState({ shows: res.data, totalSize: res.data.length });
    })
    .catch(() => {
      this.setState({ isError: true })
    })
  }

  columns = () => {
    return [
      {
        dataField: 'start_time',
        text: 'Show Start Time',
      },
      {
        dataField: 'end_time',
        text: 'Show End Time',
      },
      {
        dataField: 'date',
        text: 'Show Date',
      },
      {
        dataField: 'is_full',
        text: 'Is Full',
      },
      {
        dataField: 'movie_name',
        text: 'Movie Name',
      },
      {
        dataField: 'action',
        text: '',
        classes:'text-center action-cell',
        formatter: this.actionButton,
        headerStyle: {
          width:'200px'
        }
      }
    ];
  }

  actionButton = (url, row) => {
    const { history } = this.props;
    return (
      <div>
        <Button color="primary" onClick={() => {history.push(`/admin_dashboard/movies/${row.id}/edit`)}} >Show Report</Button>
      </div>
    )
  }

  render () {
    const { shows, page, totalSize } = this.state;
    return (
      <Fragment>
          <Row>
            <Col sm={2}>
              <SideNav />
            </Col>
            <Col sm={10}>
              <label className="table-headers"> Shows List </label>
              <div className="listing-table">
                <BootstrapTable keyField='id'
                  remote={ { sort: true, pagination: true } }
                  data={ shows }
                  noDataIndication="No Data Found"
                  columns={this.columns()}
                  bordered={ false }
                  hover
                  pagination={ paginationFactory({page, sizePerPage, totalSize, sizePerPageList: []}) }
                  props={this.props}
                  _that={ this }
                >
               </BootstrapTable>
              </div>
            </Col>
          </Row>
      </Fragment>
    )
  }
}

export default Index;
