import React, { Component } from 'react'
import axios from "axios";

export class DisplayInfo extends Component {
        constructor(){
            super()

            this.handleDelete = this.handleDelete.bind(this)

        }
    render() {
        console.log(this.props.displayinfo)
        return (
            <div>
                <div className="container text-center border">
                    <p className="border-bottom"> Details </p> 
                        <p>{this.props.displayinfo.extendedProps ? "Name: " + this.props.displayinfo.title: ""}</p>
                    <p> {this.props.displayinfo.extendedProps ? "Email: " + this.props.displayinfo.extendedProps.email : ""}</p>
                    <p> {this.props.displayinfo.extendedProps ? "Phone: " + this.props.displayinfo.extendedProps.phone : ""}</p>
                    <p> {this.props.displayinfo.extendedProps ? "Diagnosis: " + this.props.displayinfo.extendedProps.diagnosis : ""}</p>

                    <p> {this.props.displayinfo.extendedProps === undefined ? "" : this.props.displayinfo.extendedProps.medications.length === 0 ? "" : "Medication"}</p>
                    <ul>    
                         {this.props.displayinfo.extendedProps === undefined ? "" : this.props.displayinfo.extendedProps.medications.map((med, i) => <li key={i}>{med.name}</li>)}
                         {this.props.displayinfo.extendedProps === undefined ? "" : <button onClick={this.handleDelete} className="btn btn-danger">Delete</button>} 

                        
                         {this.props.displayinfo.extendedProps? <a href={"patients/" + this.props.displayinfo.extendedProps.patient_id} className="btn btn-primary ml-2">Edit</a>  : null}
                    </ul>
                </div>
               
            
            </div>
        )
    }

    handleDelete(e) {
        axios.delete('http://localhost:3000/appts/' + this.props.displayinfo.extendedProps.appt_id)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
         
        });
    }
}

export default DisplayInfo
