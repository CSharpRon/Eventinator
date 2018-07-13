import React, {Component} from 'react';

class EventPage extends Component {
    render() {
        return (
            <b>You made it to the event page!</b>
        );
    }
}

function Button() {
    return (
      React.createElement("button", null, "Go")
    );
  }


export default EventPage;