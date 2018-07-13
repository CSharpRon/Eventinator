import React, { Component } from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
class Map extends Component {
   render() {
   const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap
        defaultCenter = { { lat: 40.756795, lng: -73.954298 } }
        defaultZoom = { 13 }
      >
   onGoogleApiLoaded={({map, maps}) => this.renderMarkers(map, maps)}  
   
    
      </GoogleMap>
   
));

   
   return(
      <div>
        <GoogleMapExample
          containerElement={ <div style={{ height: `500px`, width: '500px' }} /> }
          mapElement={ <div style={{ height: `1000px` }} /> }
          
        />
      </div>
   );
   
   }
   
};


export default Map;