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
                            <button type="submit">Next</button>
                       </form>
            </div>
        )
    }
}

export default Form
