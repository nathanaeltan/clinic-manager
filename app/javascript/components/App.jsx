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
      selectTime: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
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
            console.log(calEvent);
          }}
        />

        <ApptModal
          show={this.state.modal}
          hide={this.closeModal}
          selectTime={this.state.selectTime}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
  handleSubmit(patient_id) {
    console.log("PATIENT ID: ", patient_id);
    console.log("TIME OF APPT: ", this.state.selectTime.startStr);
    const data = {
        patient_id: patient_id,
        time: this.state.selectTime.startStr
      
    }
    axios.post('http://localhost:3000/appts', data)
    .then(response => {
      console.log(response)
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
}

export default App;
