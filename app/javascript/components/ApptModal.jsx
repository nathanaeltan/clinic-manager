import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import axios from "axios";
export class ApptModal extends Component {
  constructor() {
    super();
    this.state = {
      search: "",
      appts: { patient_id: "", time: "" },
      patients: []
    };
  }

  // changeHandler = e => {
  //   this.setState({ appts: { [e.target.name]: e.target.value } });
  // };

  submitHandler = e => {
    e.preventDefault();
    this.props.handleSubmit(this.state.appts.patient_id);
  };

  patientSelect = e => {
    this.state.appts.patient_id = e.target.value
    this.setState({appts: {patient_id: this.state.appts.patient_id}})
    console.log(this.state.appts)
  }

  componentDidMount() {
    axios.get("http://localhost:3000/allpatients.json").then(response => {
      this.setState({ patients: response.data });
      console.log(this.state.patients);
    });
  }

  updateSearch(e) {
    this.setState({ search: e.target.value });
  }

  render() {
    // const { id } = this.state.appts;
    let searchFilter = this.state.patients.filter(patient => {
      return patient.name
        .toLowerCase()
        .includes(this.state.search.toLowerCase());
    });

    let searchResult = searchFilter.map(item => {
      if (this.state.search !== "") {
        return <li onClick={(e) => this.patientSelect(e)} value ={item.id}>{item.name}</li>;
      }
    });
    return (
      <div>
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton onClick={this.props.hide}>
            <Modal.Title id="contained-modal-title-vcenter">
              Add An Appointment
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.submitHandler}>
              <input
                type="text"
                value={this.state.search}
                onChange={e => {
                  this.updateSearch(e);
                }}
              />

              {/* <input
                type="text"
                name="id"
                value={id}
                onChange={this.changeHandler}
              /> */}

              <button type="submit">Submit</button>
            </form>
            {searchResult}
            <p>
              Date:{" "}
              {this.props.selectTime
                ? this.props.selectTime.startStr.slice(0, 10)
                : ""}{" "}
              <br />
              Time:{" "}
              {this.props.selectTime
                ? this.props.selectTime.startStr.slice(11, 16)
                : ""}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.hide}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ApptModal;
