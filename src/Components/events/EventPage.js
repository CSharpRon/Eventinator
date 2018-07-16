import React, {Component} from 'react';
import Markers from '../googleMaps/Markers';
import {CommentsSidePanel} from './CommentsSidePanel';
//import {Button} from 'reactstrap';
import {BACKGROUND, ROWSCOLORS, CATEGORY} from '../Styles/theme1'


document.body.style = 'background: '+BACKGROUND+';';


class EventPage extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            lat: 0,
            lng: 0,
            showCreatedEvent: false,
            showCreateContact: false,
            location: "",
            commentsToBeShown:[],
            data: []
            
         };

         this.getCreatedEvent = this.storeEvent.bind(this);
         this.createdEvent = null;
        
         this.getLatLng = this.storeLocation.bind(this);
        this.getLocation = this.getLocation.bind(this);
        //this.getLatLng = this.storeLatLng;
        this.storedLocation = null;
        this.displayingComments = null;
    }

    createEvent(showSidepanel){
        this.state.showCreateContact = true;
        
        //console.log(showSidepanel);
        this.setState({showCreatedEvent: true, commentsToBeShown: showSidepanel});
        this.storedLocation = <Markers getLoc = {this.getLatLng} theComments= {this.props.location} />
        this.displayingComments = <CommentsSidePanel onComments = {this.getCreatedEvent} theComments= {this.props.commentsToBeShown} />
        //console.log(this.displayingComments);
        //console.log(this.getCreatedEvent);
        //console.log(this.getCreatedEvent);
    }

    storeEvent(stuff){
        console.log(stuff.event);
        this.state.data.push(stuff.event);
        this.setState({showCreatedEvent: false});
        
    }

    //we can use this function to ping to a location of an event
    getLocation (obj){
        console.log(obj);
        console.log("hi");
        

        //opens a new google map window to the location of the event.
        window.open('http://maps.google.com/maps?q='+ obj, '_blank');
        //<Markers func = {this.child.pingToLocation()}/>
    }

    storeLocation(passedLocation){
        console.log(passedLocation);

    }


    openComments (comments){
        console.log(comments);
        this.setState({showCreatedEvent: true, commentsToBeShown: comments});
        console.log(this.state.showCreatedEvent);
        
        this.displayingComments = <CommentsSidePanel onComments = {this.getCreatedEvent} theComments= {this.props.commentsToBeShown} />
        console.log(this.getCreatedEvent);
    }

    closeSidepanel = () =>{
        //console.log("hi");
        this.setState({showCreatedEvent: false});
        //console.log(this.state.showCreatedEvent);
    }

    addData = (passedData) => {
        //adding the array of json objects to the data variable
        for(var i = 0; i<passedData.length; i++)
        {
            this.state.data.push(passedData[i]);
        }
    }

    render() {

        const comments = ["Bill:hi", "Bill:where is everyone???","Bill:No one showed up" , "Bill:I'm all alone"];

        const exampleData = [
            {
                "name": "presentation",
                "description": "Jank presentation",
                "rating": "0",
                "lat": "28.600720", 
                "lng": "-81.197718",
                "private": true,
                "rsoid": "1",
                "date": "07/16/2018 06:00",
                "phone": "911",
                "email": "someplace@gmail.com",
                "category": "school",
                "attendees": ["camilo", "stephanie"]
            },
            {
                "name": "More Jank",
                "description": "Jank presentation",
                "rating": "0",
                "lat": "28.599900", 
                "lng": "-81.197718",
                "private": true,
                "rsoid": "1",
                "date": "07/16/2018 07:00",
                "phone": "912",
                "email": "titties@titties.edu",
                "category": "strip club",
                "attendees": ["camilo", "stephanie"]
            },
          ];

//          this.addData(exampleData);

        return (

            
            
            <div class="table-wrapper">
                <button type="button" padding="10px" class="btn-lg btn-block btn-info" data-button="{{contact.id}}" onClick={() => this.createEvent()} >Create Event</button>
                <li></li>
                <div><Markers/> </div>
             {/* <CommentsSidePanel /> */}
           

            
        {/* <div class="modal-header">
            <h5 class="modal-title">Add New Contact</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div> */}
           
           <div> {this.state.showCreatedEvent ? this.displayingComments: null}</div>

            <table class="table table-dark table-striped table-hover rounded">
            <thead class="rounded">
                <tr style={{'background-color': CATEGORY}}>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Rating</th>
                <th scope="col">Latitude</th>
                <th scope="col">Longitude</th>
                <th scope="col">Date</th>
                <th scope="col">Phone</th>
                <th scope="col">Email</th>
                <th scope="col">Category</th>
                {/* attendees */}
                <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <input type="hidden" value="@item.Id" id="groupId"/>      
                {this.state.data.map(obj =>{
                    return (
                    <tr class="my-data" first="{{contact.first_name}}" last="{{contact.last_name}}" data-id="{{contact.id}}" style={{'background-color': ROWSCOLORS}}> 
                        <td class="contact-info" data-toggle="modal" data-target="#contact_info{{contact.id}}">{obj.name}</td>
                        <td class="contact-info" data-toggle="modal" data-target="#contact_info{{contact.id}}">{obj.description}</td>
                        <td class="contact-info" data-toggle="modal" data-target="#contact_info{{contact.id}}">{obj.rating}</td>
                        <td class="contact-info" data-toggle="modal" data-target="#contact_info{{contact.id}}">{obj.lat}</td>
                        <td class="contact-info" data-toggle="modal" data-target="#contact_info{{contact.id}}">{obj.lng}</td>
                        <td class="contact-info" data-toggle="modal" data-target="#contact_info{{contact.id}}">{obj.date}</td>
                        <td class="contact-info" data-toggle="modal" data-target="#contact_info{{contact.id}}">{obj.phone}</td>
                        <td class="contact-info" data-toggle="modal" data-target="#contact_info{{contact.id}}">{obj.email}</td>
                        <td class="contact-info" data-toggle="modal" data-target="#contact_info{{contact.id}}">{obj.category}</td>
                        <td> 
                        <button type="button" class="btn btn-danger btn-sm remove-button" onClick={() => this.getLocation(obj.lat+','+obj.lng)}  data-button="{{contact.id}}">Ping to Location</button>
                        &nbsp;
                        <button type="button" class="btn btn-success btn-sm remove-button" onClick={() => this.openComments(obj.comments)}  data-button="{{contact.id}}" margin-left = "10px">Comment</button>
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