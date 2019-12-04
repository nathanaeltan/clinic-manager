import React, { Component } from 'react'
import axios from "axios";
import swal from 'sweetalert';

export class DisplayInfo extends Component {
        constructor(){
            super()

            this.handleDelete = this.handleDelete.bind(this)

        }
    render() {
        return (
            <div>
                <div className="container border px-4 pt-2 pb-2" style={this.props.displayinfo  ? {display:"block"} : {display:"none"}}>
                    <p className="border-bottom"style={{fontWeight:"bold"}}> DETAILS </p> 
                   <strong>Name: </strong><p>{this.props.displayinfo ?    this.props.displayinfo[0].title: ""}</p>
                     <strong>Email: </strong>   <p> {this.props.displayinfo ?  this.props.displayinfo[0].extendedProps.email : ""}</p>
                    <strong>Phone: </strong> <p> {this.props.displayinfo ? this.props.displayinfo[0].extendedProps.phone : ""}</p>
                     <strong>Diagnosis: </strong>   <p> {this.props.displayinfo ? this.props.displayinfo[0].extendedProps.diagnosis : ""}</p>
                    <hr/>
                    {this.props.displayinfo ? this.props.displayinfo[0].extendedProps.medications.length === 0 ? "" : <strong>Medication</strong> : ""}
                    {this.props.displayinfo ? this.props.displayinfo[0].extendedProps.medications.map((med, i) => <li key={i}>{med.name}</li> ) : ""}

                    <div className="container mt-2 text-center">
                        {this.props.displayinfo ? <button onClick={(e) => { swal({
                            title: "Are you sure?",
                            text: "Once deleted, you will not be able to recover this appointment",
                            icon: "warning",
                            buttons: true,
                            dangerMode: true,
                            })
                            .then((willDelete) => {
                            if (willDelete) {
                                this.handleDelete(e)
                                swal("APPOINTMENT DELETED", {
                                icon: "success",
                                });
                            } 
                            });}} className="btn btn-lg btn-danger btn-sm"><i className="fas fa-trash-alt"></i></button> : ""}
                        {/* {this.props.displayinfo ? <button onClick={(e) => { if (window.confirm('Are you sure you wish to delete this item?'))this.handleDelete(e)}} className="btn btn-lg btn-danger btn-sm"><i className="fas fa-trash-alt"></i></button> : ""} */}
                        {this.props.displayinfo ? <a href={"patients/" + this.props.displayinfo[0].extendedProps.patient_id + "/edit"} className="btn btn-lg btn-warning ml-3 btn-sm"><i className="fas fa-edit "></i></a>  : null}
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
