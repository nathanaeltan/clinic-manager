import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import axios from "axios";
export class ApptModal extends Component {
  constructor() {
    super();
    this.state = {
      patients: [],
      appts: { id: "", time: "" }
    };
  }

  changeHandler = e => {
    this.setState({ appts: { [e.target.name]: e.target.value } });
  };

  submitHandler = e => {
    e.preventDefault();
    this.props.handleSubmit(this.state.appts.id);
    
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
    const { id } = this.state.appts;
    console.log(this.props.selectTime.startStr);
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
              {/* <input type="text" name="name" value={name} onChange={this.changeHandler}/> */}
              <input
                type="text"
                name="id"
                value={id}
                onChange={this.changeHandler}
              />
              <input
                type="text"
                name="time"
                value={this.props.selectTime.startStr}
                onChange={this.changeHandler}
              />

              <button type="submit">Submit</button>
            </form>

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
