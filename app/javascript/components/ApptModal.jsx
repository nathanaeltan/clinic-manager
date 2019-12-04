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
      appts: { patient_id: "", time: "", name: "", phone: "", email:"", diagnosis: "", medication:"" },
      patients: []
    
    };
  }
 
  submitHandler = e => {
    e.preventDefault();
    this.props.handleSubmit(
      this.state.appts.patient_id,
      this.state.appts.phone,
      this.state.appts.name,
      this.state.appts.email,
      this.state.appts.diagnosis,
      this.state.appts.medication

    );
      this.props.hide
      e.target.value = ""
  };



  patientSelect = e => {
    this.state.appts.patient_id = e.target.value;
    let patientId = e.target.value;
    const patient = this.state.patients.find(u => u.id === patientId);
    this.state.appts.phone = patient.phone;
    this.state.appts.name = e.target.innerText;
    this.state.appts.email = patient.email
    this.state.appts.diagnosis = patient.diagnosis
    this.state.appts.medication = patient.medications
    console.log(patient.medications)
    this.setState({
      appts: {
        patient_id: this.state.appts.patient_id,
        name: this.state.appts.name,
        phone: this.state.appts.phone,
        email: this.state.appts.email,
        diagnosis: this.state.appts.diagnosis,
        medication: this.state.appts.medication
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
          <li onClick={e => this.patientSelect(e)} value={item.id} className="list-group-item list-group-item-action">
            {item.name}
          </li>
        );
      }
    });
    return (
      <div className="p-5">
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className="p-4"
        >
          <Modal.Header closeButton onClick={this.props.hide}>
            <Modal.Title id="contained-modal-title-vcenter">
              Add An Appointment
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container">
              <div className="row">
                <div className="col-8 border-right">
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
               
                <div className="col-4">  {searchResult[0] !== undefined ? <p className="border-bottom">SELECT A PATIENT</p> : null}{ searchResult}</div>
              </div>
            </div>
          </Modal.Body>

        </Modal>
      </div>
    );
  }
}

export default ApptModal;
