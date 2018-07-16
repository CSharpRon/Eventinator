import React, {Component} from 'react';
import {Markers, MyMapComponent} from '../googleMaps/Markers';
import {EventSidePanel} from './EventSidePanel';
//import {Button} from 'reactstrap';
import {BACKGROUND, ROWSCOLORS, CATEGORY} from '../Styles/theme1';
import axios from 'axios';
import { endpoint } from '../../Api/URL_Const';
import {RSOPage} from './RSOPage';


document.body.style = 'background: '+BACKGROUND+';';


class EventPage extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            lat: 0,
            lng: 0,
            latitude: "",
            longitude: "",
            showCreatedEvent: true,
            showCreateContact: false,
            showRSO: false,
            location: "",
            commentsToBeShown: [],
            data: []

        };

        this.refreshEvents = this.refreshEvents.bind(this);
        this.addData = this.addData.bind(this);
        this.getCreatedEvent = this.storeEvent.bind(this);
        this.createdEvent = null;

        this.getLatLng = this.storeLocation.bind(this);
        this.getLocation = this.getLocation.bind(this);
        //this.getLatLng = this.storeLatLng;

        this.getRSO = this.storeRSO.bind(this);
        this.createdRSO = null;

        this.storedLocation = null;
        this.displayingComments = null;
        this.displayRSO = null
    }

    componentDidMount() {
        this.refreshEvents();
    }

    createEvent(showSidepanel){
        this.state.showCreateContact = true;
        
        //console.log(showSidepanel);
        console.log(this.state.latitude);
        this.setState({showCreatedEvent: true, commentsToBeShown: showSidepanel});
        //this.storedLocation = <Markers  getLocation = {this.getLatLng} theComments= {this.props.location} />
        //this.storedLocation = <MyMapComponent isMarkerShown={true} loc = {this.getLatLng} theComments = {this.props.location}/>
        this.displayingComments = <EventSidePanel lat={this.state.lat} lng={this.state.lng} onComments = {this.getCreatedEvent} theComments= {this.props.commentsToBeShown} />
        //console.log(this.displayingComments);
        //console.log(this.getCreatedEvent);
        //console.log(this.getCreatedEvent);
    }

    storeEvent(stuff){
        //sets the locaotion of the newly crearted event
        stuff.event.lat = this.state.latitude;
        stuff.event.lng = this.state.longitude;

        var name = stuff.event.name;
        var description = stuff.event.description;
        var lat = stuff.event.lat;
        var lng = stuff.event.lng;
        var isPrivate = stuff.event.private;
        var rsoid = stuff.event.rsoid;
        var date = stuff.event.date;
        var email = stuff.event.email;
        var phone = stuff.event.phone;
        var category = stuff.event.category;
        var rating = stuff.event.rating;
        var attendees = stuff.event.attendees;
        var userid = this.props.userid;

        var url = endpoint + '/addevent'

        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            data: JSON.stringify({ userid, name, description, lat, lng, isPrivate, rsoid, date, email, phone, category, rating, attendees, userid }),
            url,
        };

        axios(options)
            .then(function (response) {

            })
            .catch(function (error) {
                console.log(error);
            });

        this.showSidepanel = false;
        this.refreshEvents();
    }
    
    storeLocation(passedLocation){
        //console.log(passedLocation.substr(1,passedLocation.indexOf(", ")-1));
        //store the latitude to the related varible in state
        this.state.latitude = passedLocation.substr(1,passedLocation.indexOf(", ") -1);
        
        //store the longitude to the related varible in state
        this.state.longitude = passedLocation.substr(passedLocation.indexOf(", ") +2, passedLocation.lastIndexOf(")")-1);
        this.state.longitude = this.state.longitude.substr(0,this.state.longitude.length-1);    
    }

    //we can use this function to ping to a location of an event
    getLocation (obj){
        console.log(obj);
        console.log("hi");
        

        //opens a new google map window to the location of the event.
        window.open('http://maps.google.com/maps?q='+ obj, '_blank');
        //<Markers func = {this.child.pingToLocation()}/>
    }

    refreshEvents() {
        var url = endpoint + '/getevents'
        var events = [];

        var userid = this.props.userid;

        const options = {
            method: 'GET',
            headers: { 'content-type': 'application/json', 'userid': userid },
            url,
        };

        axios(options)
            .then((response) => {
                this.setState({data: []});
                for (var i = 0; i < response.data.length; i++) {
                    {
                        console.log('Adding data ' + i);
                        this.state.data.push(response.data[i]);
                    }
                }

                this.state.showCreateContact = true;

                this.setState({showCreatedEvent: true, commentsToBeShown: true});
        
                })
            .catch(function (error) {
                console.log('error: ' + error);
            });
    }

    openComments (comments){
        console.log(comments);
        this.setState({showCreatedEvent: true, commentsToBeShown: comments});
        console.log(this.state.showCreatedEvent);
        
        this.displayingComments = <EventSidePanel onComments = {this.getCreatedEvent} theComments= {this.props.commentsToBeShown} />
        console.log(this.getCreatedEvent);
    }

    openRSO (comments){
        console.log(comments);
        this.setState({showRSO: true, commentsToBeShown: comments});
        console.log(this.state.showCreatedEvent);
        
        this.displayRSO = <RSOPage onRSO = {this.getRSO} theRSO = {this.props.commentsToBeShown} />
        console.log(this.getRSO);
    }

    storeRSO(RSOData, selectedRSO, can){
        if(can)
        {
            console.log(RSOData);
            console.log(selectedRSO);
        }

    }

    closeSidepanel = () =>{
        //console.log("hi");
        this.setState({showCreatedEvent: false});
        //console.log(this.state.showCreatedEvent);
    }

    addData(passedData) {
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
                <button type="button" padding="10px" class="btn-lg center-block btn-info" data-button="{{contact.id}}" onClick={() => this.createEvent()} >Create Event</button>
                <li></li>
                {/* <div><Markers/> </div> */}
                {<Markers  getLocation = {this.getLatLng} theLocation= {this.props.location} />}
             {/* <EventSidePanel /> */}
           

            
        {/* <div class="modal-header">
            <h5 class="modal-title">Add New Contact</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div> */}
           
           <div> {this.state.showCreatedEvent ? this.displayingComments: null}</div>
           <div> {this.state.showRSO ? this.displayRSO: null}</div>
           

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
                        <button type="button" class="btn btn-info btn-sm remove-button" onClick={() => this.openRSO(obj.comments)}  data-button="{{contact.id}}" margin-left = "10px">RSO</button>
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