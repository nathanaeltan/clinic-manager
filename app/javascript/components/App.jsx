import React, { Component } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import bootstrapPlugin from "@fullcalendar/bootstrap";
import axios from "axios";
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
 
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.selectPatient=this.selectPatient.bind(this)
  }


  componentDidMount() {
    axios.get("http://localhost:3000/showall.json").then(response => {
      console.log(response.data);
      let eventInfo = response.data.map(item => {
        return {
          title: item.patient.name,
          start: item.time,
          extendedProps: { phone: item.patient.phone }
        };
      });
      this.setState({ calendarEvents: eventInfo });
    });
  }
  calendarComponentRef = React.createRef();
  render() {
    return (
      <div className="container mt-4">
        
        
        
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
          eventClick={function(calEvent, jsEvent, view, resourceObj) {
            alert(
              "Patient Name: " +
                calEvent.event.title +
                "\n Phone: " +
                calEvent.event.extendedProps.phone
            );
           
          }}
        />

        <ApptModal
          show={this.state.modal}
          hide={this.closeModal}
          selectTime={this.state.selectTime}
          handleSubmit={this.handleSubmit}
          selectpatient={this.selectPatient}
          patients={this.state.patients}
        />
      </div>
    );
  }
  handleSubmit(patient_id) {
  
    const data = {
        patient_id: patient_id,
        time: this.state.selectTime.startStr
      
    }
    axios.post('http://localhost:3000/appts', data)
    .then(response => {
      console.log(response.config.data)
      this.setState({calendarEvents: [...this.state.calendarEvents, response.config.data]})
    })
    .catch(error => console.log(error))
  }


  select = (start, end) => {
    this.setState({ modal: true, selectTime: start });
  };

  closeModal = () => {
    console.log("close");
    this.setState({ modal: false });
  };

  selectPatient(e) {
    this.state.selectedPatient = this.state.patients.filter(patient => patient.name === e.target.innerText)[0]
    this.setState({selectedPatient: this.state.selectedPatient})
  }
}

export default App;
