import React, { Component } from "react";
import axios from "axios";
export class AddTest extends Component {
  constructor() {
      super()
      this.state = {
          tests: []
      }
  }

  componentDidMount() {
    axios.get("http://localhost:3000/alltests.json").then(response => {
      this.setState({ tests: response.data });
    });
  }

  render() {
    return (
      <div>
        <h1>Appointment Added</h1>
       
      </div>
    );
  }
}

export default AddTest;
