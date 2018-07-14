import React, {Component} from 'react';
import Markers from '../googleMaps/Markers'; 




class EventPage extends Component {
    constructor(props) {
        super(props);
        this.state = { };
    }
    render() {

        return (
            
            <div class="table-wrapper">
            <table class="table table-dark table-striped table-hover rounded">
            <thead class="rounded">
                <tr>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Phone</th>
                <th scope="col">Email</th>
                <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <input type="hidden" value="@item.Id" id="groupId"/>      
                <tr class="my-data" first="{{contact.first_name}}" last="{{contact.last_name}}" data-id="{{contact.id}}"> 
                    <td class="contact-info" data-toggle="modal" data-target="#contact_info{{contact.id}}">ayy</td>
                    <td class="contact-info" data-toggle="modal" data-target="#contact_info{{contact.id}}">ayy</td>
                    <td class="contact-info" data-toggle="modal" data-target="#contact_info{{contact.id}}">ayy</td>
                    <td class="contact-info" data-toggle="modal" data-target="#contact_info{{contact.id}}">ayy</td>
                    <td> 
                    <button type="button" class="btn btn-danger btn-sm remove-button" data-button="{{contact.id}}">Delete Contact</button>
                    </td>
                </tr>

            </tbody>
            </table>
      </div>
        );
    }
}

function Button() {
    return (
      React.createElement("button", null, "Go")
    );
  }


export default EventPage;