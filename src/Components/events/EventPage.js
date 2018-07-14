import React, {Component} from 'react';
import Markers from '../googleMaps/Markers'; 




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
    }

    render() {

        const data = [
            {
                "name": "presentation",
                "eventCategory": "school",
                "descrition": "Jank presentation",
                "time": "06:00 PM",
                "date": "07/16/018",
                "location": "lat: 28.600720 lng: -81.197718",
                "phone": "(352) 555-5555",
                "email": "someplace@gmail.com"
            },
            {
                "name": "more Jank",
                "eventCategory": "school",
                "descrition": "Jank presentation",
                "time": "06:00 PM",
                "date": "07/16/018",
                "location": "lat: 28.599900 lng: -81.200325",
                "phone": "(352) 555-5555",
                "email": "someplace@gmail.com"
            },
          ];

        return (
            
            <div class="table-wrapper">
            <div><Markers/> </div>
            <table class="table table-dark table-striped table-hover rounded">
            <thead class="rounded">
                <tr>
                <th scope="col">Name</th>
                <th scope="col">Event category</th>
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
                    <tr class="my-data" first="{{contact.first_name}}" last="{{contact.last_name}}" data-id="{{contact.id}}"> 
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

function Button() {
    getLocation: (location) => {
        console.log(location);
    }

    return (
      React.createElement("button", null, "Go")
    );
  }


export default EventPage;