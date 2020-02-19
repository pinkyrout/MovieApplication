import React, { Component, Fragment } from "react";
import { getId } from "../../utils";
import { sizePerPage } from "./../../Constants";
import axios from "axios";
import { PageHeader, Row, Col, UncontrolledTooltip, Button } from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import SideNav from "../SideNav.js";

class Report extends Component {
	constructor(props) {
    super(props);
    this.state = {
      seats: [],
      totalSize: 0,
      page: 1,
      sizePerPage: 10,
    };
	}

	componentDidMount() {
    const showId = getId(this.props);
    axios({
      method: "get",
      url: `http://localhost:3001/api/v1/shows/${showId}/seats`,
      params: { is_admin: true },
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => {
      this.setState({ seats: JSON.parse(res.data.seats), totalSize: JSON.parse(res.data.count) });
    })
    .catch(() => {
      this.setState({ isError: true })
    })
  }

  columns = () => {
    return [
      {
        dataField: "category",
        text: "Category",
      },
      {
        dataField: "price",
        text: "Price",
      },
      {
        dataField: "is_booked",
        text: "Is Booked",
      },
      {
        dataField: "number",
        text: "Seat Number",
      },
    ];
  }

  handleTableChange = (type, {page, sizePerPage} ) => {
    const showId = getId(this.props);
    axios({
      method: "get",
      url: `http://localhost:3001/api/v1/shows/${showId}/seats`,
      params: {page: page,
        is_admin: true,
      },
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => {
      this.setState({ seats: JSON.parse(res.data.seats), page: page, sizePerPage: sizePerPage });
    })
    .catch(() => {
      this.setState({ isError: true })
    })
  }

	render () {
		const { seats, page, totalSize, sizePerPage } = this.state;
		return (
      <Fragment>
        <Row>
          <Col sm={2}>
            <SideNav />
          </Col>
          <Col sm={10}>
            <label className="table-headers"> Seats Report </label>
            <div className="listing-table">
              <BootstrapTable keyField='id'
                remote={ { sort: true, pagination: true } }
                data={ seats }
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
      </Fragment>
		)
	}
}

export default Report;
