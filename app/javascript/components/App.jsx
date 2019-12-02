import React, { Component } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import bootstrapPlugin from "@fullcalendar/bootstrap";
import axios from "axios";
import DisplayInfo from "./DisplayInfo"
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import ApptModal from "./ApptModal";
import "./main.scss";



const csrfToken = document.querySelector('[name=csrf-token]').content
axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken



export class App extends Component {
  constructor() {
    super();
    this.state = {
      calendarWeekends: true,
      calendarEvents: [],
      modal: false,
      selectTime: "",
      selectedPatient: "",
      displayInfo: ""
 
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.selectPatient=this.selectPatient.bind(this)
    this.eventClick = this.eventClick.bind(this)
    this.select = this.select.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.updatedate = this.updatedate.bind(this)
    this.deleteEvent = this.deleteEvent.bind(this)
  }


  componentDidMount() {
    axios.get("http://localhost:3000/showall.json").then(response => {
    
      let eventInfo = response.data.map(item => {
        return {
          title: item.patient.name,
          start: item.time,
          extendedProps: { phone: item.patient.phone,  email: item.patient.email, diagnosis: item.patient.diagnosis, medications: item.patient.medications, appt_id: item.id, patient_id: item.patient_id}
        };
      });
      this.setState({ calendarEvents: eventInfo });
    });
  }
  calendarComponentRef = React.createRef();
  render() {
    console.log(this.state)
    return (
      <div className="container mt-4">
        
        <div className="row">
          <div className="col-9">
              <FullCalendar
              defaultView="dayGridMonth"
              header={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay,list"
              }}
              eventTimeFormat={{
                hour: "numeric",
                minute: "2-digit",
                meridiem: true
              }}
              selectable="true"
              selectHelper="true"
              editable="true"
              eventLimit="true"
              themeSystem="standard"
              eventColor="#D7F0F7"
              plugins={[
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
                listPlugin,
                bootstrapPlugin
              ]}
              ref={this.calendarComponentRef}
              timeZone="local"
              events={this.state.calendarEvents}
              select={this.select}
              eventClick={this.eventClick}
              droppable= "true"
              eventDrop= {this.updatedate}
            />
          </div>

          <div className="col-3">
              <DisplayInfo displayinfo={this.state.displayInfo} deleteEvent={this.deleteEvent}/>
          </div>
        </div>
        
        

        <ApptModal
          show={this.state.modal}
          hide={this.closeModal}
          selectTime={this.state.selectTime}
          handleSubmit={this.handleSubmit}
          selectpatient={this.selectPatient}
          patients={this.state.patients}
          selectedpatient={this.state.selectedPatient}
          eventDrop={this.eventDrop}
        />
      </div>
    );
  }
  handleSubmit(patient_id, phone, name) {
    const event = {
      title: name,
      start: this.state.selectTime.startStr
    }
    const data = {
        patient_id: patient_id,
        time: this.state.selectTime.startStr,
        phone: phone
      
    }
    console.log(data)
    
    axios.post('http://localhost:3000/appts', data)
    .then(response => {
      console.log(response.config.data)
     
      this.setState({calendarEvents: [...this.state.calendarEvents, event]})
      console.log(this.state.calendarEvents)
    })
    .catch(error => console.log(error))
    
  }



deleteEvent(appt_id) {
  console.log(appt_id)
  console.log(this.state.calendarEvents)
  const data = this.state.calendarEvents.filter(i => i.extendedProps.appt_id !== appt_id)
  this.setState({calendarEvents: data})
}
  select(start, end){
    this.setState({ modal: true, selectTime: start });
    
  };




  eventClick(calEvent, jsEvent, view, resourceObj){
    console.log(calEvent.event)
    this.setState({displayInfo: calEvent.event})
  }
  closeModal() {
    console.log("close");
    this.setState({ modal: false });
  };

  selectPatient(e) {
    this.state.selectedPatient = this.state.patients.filter(patient => patient.name === e.target.innerText)[0]
    
    this.setState({selectedPatient: this.state.selectedPatient})
   
  }

  updatedate(event, delta, revertFunc, jsEvent, ui, view) {
    console.log(event.event.start)
    const data = {
      patient_id: event.event.extendedProps.patient_id,
      time: event.event.start
    
  }

  axios.put('http://localhost:3000/appts/' + event.event.extendedProps.appt_id, data)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log(error);
    console.log(data)
  });
  }
}

export default App;
