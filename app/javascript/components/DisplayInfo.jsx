import React, { Component } from 'react'

export class DisplayInfo extends Component {
    render() {
        console.log( this.props.displayinfo.extendedProps ? this.props.displayinfo.extendedProps.email : "")
        return (
            <div>
                <div className="container text-center">
                    <p className="border-bottom">{this.props.displayinfo.title } Details </p> 
                    <p> {this.props.displayinfo.extendedProps ? "Email: " + this.props.displayinfo.extendedProps.email : ""}</p>
                    <p>  {this.props.displayinfo.extendedProps ? "Phone: " + this.props.displayinfo.extendedProps.phone : ""}</p>
                    <p> {this.props.displayinfo.extendedProps ? "Diagnosis: " + this.props.displayinfo.extendedProps.diagnosis : ""}</p>
                </div>
               
            
            </div>
        )
    }
}

export default DisplayInfo
