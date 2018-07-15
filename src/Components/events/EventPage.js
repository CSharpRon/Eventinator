import React, {Component} from 'react';
import Markers from '../googleMaps/Markers';
import {Button} from 'reactstrap';
import {BACKGROUND, ROWSCOLORS, CATEGORY} from '../Styles/theme1'


document.body.style = 'background: '+BACKGROUND+';';


class EventPage extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            lat: 0,
            lng: 0
         };

        this.getLocation = this.getLocation.bind(this);
    }

    //we can use this function to ping to a location of an event
    getLocation (obj){
        console.log(obj);
        
        var startOfLongitude = obj.indexOf("lng:")+5, endOfLongitude = obj.length;
        var startOfLatitude = 5, endOfLatitude = startOfLongitude - 11;

        //opens a new google map window to the location of the event.
        window.open('http://maps.google.com/maps?q='+ obj.substr(startOfLatitude, endOfLatitude) +','+ obj.substr(startOfLongitude, endOfLongitude), '_blank');
        //<Markers func = {this.child.pingToLocation()}/>
    }

    render() {

        const data = [
            {
                "name": "presentation",
                "eventCategory": "school",
                "descrition": "Jank presentation",
                "time": "06:00 PM",
                "date": "07/16/2018",
                "location": "lat: 28.600720 lng: -81.197718",
                "phone": "(352) 555-5555",
                "email": "someplace@gmail.com"
            },
            {
                "name": "more Jank",
                "eventCategory": "school",
                "descrition": "Jank presentation",
                "time": "06:00 PM",
                "date": "07/16/2018",
                "location": "lat: 28.599900 lng: -81.200325",
                "phone": "(352) 555-5555",
                "email": "someplace@gmail.com"
            },
          ];

        return (

            
            <div class="table-wrapper">
            <button type="button" padding="10px" class="btn-lg btn-block btn-info" data-button="{{contact.id}}">Create Event</button>
            <li></li>
            <div><Markers/> </div>
            <table class="table table-dark table-striped table-hover rounded">
            <thead class="rounded">
                <tr style={{'background-color': CATEGORY}}>
                <th scope="col">Name</th>
                <th scope="col">Event Category</th>
                <th scope="col">Description</th>
                <th scope="col">Time</th>
                <th scope="col">Date</th>
                <th scope="col">Location</th>
                <th scope="col">Phone</th>
                <th scope="col">Email</th>
                <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <input type="hidden" value="@item.Id" id="groupId"/>      
                {data.map(obj =>{
                    return (
                    <tr class="my-data" first="{{contact.first_name}}" last="{{contact.last_name}}" data-id="{{contact.id}}" style={{'background-color': ROWSCOLORS}}> 
                        <td class="contact-info" data-toggle="modal" data-target="#contact_info{{contact.id}}">{obj.name}</td>
                        <td class="contact-info" data-toggle="modal" data-target="#contact_info{{contact.id}}">{obj.eventCategory}</td>
                        <td class="contact-info" data-toggle="modal" data-target="#contact_info{{contact.id}}">{obj.descrition}</td>
                        <td class="contact-info" data-toggle="modal" data-target="#contact_info{{contact.id}}">{obj.time}</td>
                        <td class="contact-info" data-toggle="modal" data-target="#contact_info{{contact.id}}">{obj.date}</td>
                        <td class="contact-info" data-toggle="modal" data-target="#contact_info{{contact.id}}">{obj.location}</td>
                        <td class="contact-info" data-toggle="modal" data-target="#contact_info{{contact.id}}">{obj.phone}</td>
                        <td class="contact-info" data-toggle="modal" data-target="#contact_info{{contact.id}}">{obj.email}</td>
                        <td> 
                        <button type="button" class="btn btn-danger btn-sm remove-button" onClick={() => this.getLocation(obj.location)}  data-button="{{contact.id}}">Ping to Location</button>
                        </td>
                    </tr>

                    );
                    
                })}
            </tbody>
            </table>
      </div>


);
}
}

function Buttons() {

    return (
      React.createElement("button", null, "Go")
    );
  }


export default EventPage;