import React from "react"
import { compose, withProps, lifecycle } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import {KEY} from "./account"


const MyMapComponent = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key="+KEY+"&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    lifecycle({
        componentWillMount() {
            const refs = {}

            this.setState({
                position: null,
                onMarkerMounted: ref => {
                    refs.marker = ref;
                },

                onPositionChanged: () => {
                    const position = refs.marker.getPosition();
                    console.log(position.toString());
                }
            })
        },
    }),
    withScriptjs,
    withGoogleMap
)((props) =>
    <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
        {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} draggable={true} ref={props.onMarkerMounted} onPositionChanged={props.onPositionChanged} />}
    </GoogleMap>
    )

class Markers extends React.PureComponent {
    state = {
        isMarkerShown: false,
    }


    render() {
        return (
            <div>
                <MyMapComponent isMarkerShown={true} />
            </div>
        )
    }
}


export default Markers;
