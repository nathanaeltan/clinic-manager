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
                <div className="container text-center border px-4 pt-2 pb-2" style={this.props.displayinfo  ? {display:"block"} : {display:"none"}}>
                    <p className="border-bottom"style={{fontWeight:"bold"}}> DETAILS </p> 
                    <p>{this.props.displayinfo ? "Name: " + this.props.displayinfo[0].title: ""}</p>
                    <p> {this.props.displayinfo ? "Email: " + this.props.displayinfo[0].extendedProps.email : ""}</p>
                    <p> {this.props.displayinfo ? "Phone: " + this.props.displayinfo[0].extendedProps.phone : ""}</p>
                    <p> {this.props.displayinfo ? "Diagnosis: " + this.props.displayinfo[0].extendedProps.diagnosis : ""}</p>
                    <hr/>
                    {this.props.displayinfo ? this.props.displayinfo[0].extendedProps.medications.length === 0 ? "" : <p>Medication</p> : ""}
                    {this.props.displayinfo ? this.props.displayinfo[0].extendedProps.medications.map((med, i) => <li key={i}>{med.name}</li> ) : ""}

                    <div className="container mt-2">
                        {this.props.displayinfo ? <button onClick={(e) => { if (window.confirm('Are you sure you wish to delete this item?'))this.handleDelete(e)}} className="btn btn-lg btn-danger btn-sm"><i className="fas fa-trash-alt"></i></button> : ""}
                        {this.props.displayinfo ? <a href={"patients/" + this.props.displayinfo[0].extendedProps.patient_id} className="btn btn-lg btn-warning ml-3 btn-sm"><i className="fas fa-edit "></i></a>  : null}
                    </div>
                    

                </div>
               
            
            </div>
        )
    }

    handleDelete(e) {
       
        axios.delete('http://localhost:3000/appts/' + this.props.displayinfo[0].extendedProps.appt_id)
        .then(response => {
          console.log(response);
          this.props.deleteEvent(this.props.displayinfo[0].extendedProps.appt_id)
        })
        .catch(error => {
          console.log(error);
         
        });
    }
}

export default DisplayInfo
