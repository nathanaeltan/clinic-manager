import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import axios from "axios";
import ApptForm from "./Form";
import AddTest from "./AddTest"
export class ApptModal extends Component {
  constructor() {
    super();
    this.state = {
      search: "",
      appts: { patient_id: "", time: "", name: "", phone: "" },
      patients: []
    
    };
  }
 
  submitHandler = e => {
    e.preventDefault();
    this.props.handleSubmit(
      this.state.appts.patient_id,
      this.state.appts.phone,
      this.state.appts.name
    );
      this.props.hide

  };



  patientSelect = e => {
    this.state.appts.patient_id = e.target.value;
    let patientId = e.target.value;
    const patient = this.state.patients.find(u => u.id === patientId);
    this.state.appts.phone = patient.phone;
    this.state.appts.name = e.target.innerText;
    console.log(patient)
    this.setState({
      appts: {
        patient_id: this.state.appts.patient_id,
        name: this.state.appts.name,
        phone: this.state.appts.phone
      }
    });
    console.log(this.state.appts)
  };

  componentDidMount() {
    axios.get("http://localhost:3000/allpatients.json").then(response => {
      this.setState({ patients: response.data });
    });
  }

  updateSearch(e) {
    this.setState({ search: e.target.value });
  }

  render() {
    let searchFilter = this.state.patients.filter(patient => {
      return patient.name
        .toLowerCase()
        .includes(this.state.search.toLowerCase());
    });

    let searchResult = searchFilter.map(item => {
      if (this.state.search !== "") {
        return (
          <li onClick={e => this.patientSelect(e)} value={item.id}>
            {item.name}
          </li>
        );
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
            <div className="container">
              <div className="row">
                <div className="col-8">
                 {  <ApptForm
                    submitHandler={this.submitHandler}
                    search={this.state.search}
                    updateSearch={e => {
                      this.updateSearch(e);
                    }}
                    appts={this.state.appts}
                    selectTime={this.props.selectTime}
                    hide={this.props.hide}
                  /> 
                  }

                </div>

                <div className="col-4">{ searchResult}</div>
              </div>
            </div>
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
