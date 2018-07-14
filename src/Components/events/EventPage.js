import React, {Component} from 'react';
import Markers from '../googleMaps/Markers'; 
import ReactScrollableList from 'react-scrollable-list'



class EventPage extends Component {
    constructor(props) {
        super(props);
        this.state = { items:[], index: 0 };
        this._nodes = new Map();
   }
    render() {
        const {data} = [1,2];

        

        return (
            
            <div>
                <b>You made it to the event page!</b>
                <Markers  />
                <ReactScrollableList 
                    listItems = {[1,2,34]} 
                    heightOfItem={30}
                    maxItemsToRender={3}
                    style={{ color: '#333' }}
                />
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