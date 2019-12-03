import React, { Component } from 'react'

export class Form extends Component {
    render() {
        return (
            <div>
            <form onSubmit={this.props.submitHandler}>
                            <input
                              type="text"
                              value={this.props.search}
                              onChange={this.props.updateSearch}
                              className="input-group"
                              placeholder="Search Patients"
                            />
                            <p>
                               Patient: {this.props.appts.name}
                            </p>
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
                            <button onClick={this.props.hide} type="submit" className="btn btn-success">Add</button>
                       </form>
            </div>
        )
    }
}

export default Form
