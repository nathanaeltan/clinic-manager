import React, { Component } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import bootstrapPlugin from "@fullcalendar/bootstrap";
import { Transition, animated } from 'react-spring/renderprops'
import axios from "axios";
import DisplayInfo from "./DisplayInfo"
import swal from 'sweetalert';
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
      displayInfo: "",
      showInfo: false
 
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
    console.log(this.state.displayInfo)
    return (
      <div className="container mt-4" >
        
        <div className="row">
          <div className="col-8">
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
              aspectRatio="1"
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
          <div  className="col-4">
         <Transition
         native
         items={this.state.displayInfo}
         from={{ opacity: 0, marginTop: 500}}
         enter={{ opacity: 1, marginTop: 0}}
         leave={{ opacity: 0, marginTop: 500 }}
         
         >
          {show => show && (props => (
            <animated.div style={props}>
            
              
               <DisplayInfo displayinfo={this.state.displayInfo} deleteEvent={this.deleteEvent}/>
          
                
            </animated.div>
          ))}    

         </Transition>
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
  handleSubmit(patient_id, phone, name, email, diagnosis, medication) {
    const event = {
      title: name,
      start: this.state.selectTime.startStr,
      extendedProps: {appt_id:this.state.calendarEvents[this.state.calendarEvents.length - 1].extendedProps.appt_id + 1 ,phone: phone, email: email, diagnosis: diagnosis, medications: medication }
    }
   
    const data = {
        patient_id: patient_id,
        time: this.state.selectTime.startStr,
        phone: phone
      
    }
   
    
    axios.post('http://localhost:3000/appts', data)
    .then(response => {
      console.log(response.config.data)
     
      this.setState({calendarEvents: [...this.state.calendarEvents, event]})
      console.log(this.state.calendarEvents)
      swal({
        title: "Appointment Added",
        text: "Confirmation SMS sent to Patient",
        icon: "success",
        button: "Close",
      });
    })
    .catch(error => console.log(error))
    
  }



deleteEvent(appt_id) {
  
  const data = this.state.calendarEvents.filter(i => i.extendedProps.appt_id !== appt_id)
  this.setState({calendarEvents: data, displayInfo: ""})
}
  select(start, end){
    this.setState({ modal: true, selectTime: start });
   
  };




  eventClick(calEvent, jsEvent, view, resourceObj){
    this.setState({displayInfo: ""})
    const data = this.state.calendarEvents.filter(i => i.extendedProps.appt_id === calEvent.event.extendedProps.appt_id)
   console.log(calEvent)
   setTimeout(() => {
    this.setState({displayInfo: data})
   }, 300);
    
  
  }
  closeModal() {
    
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
