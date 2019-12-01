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
      let list = this.state.tests.map(item => <li>{item.name}</li> )
    return (
      <div>
        <h1>ADD A TEST</h1>
        {list}
      </div>
    );
  }
}

export default AddTest;
