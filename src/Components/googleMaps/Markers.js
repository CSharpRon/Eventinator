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
                position: { lat: 28.6024, lng: -81.2001 },
                onMarkerMounted: ref => {
                    refs.marker = ref;
                },

                onPositionChanged: () => {
                    const position = refs.marker.getPosition;
                    console.log(position.toString());
                },

                onClick: (info) => {
                    let info1 = info
                    console.log(info.la)
                    console.log(info.latLng)
                    console.log(info)
                    this.setState({ position: info.latLng })
                    const position = info.latLng;                    
                    return(<Marker position={{ lat: info.lat, lng: info.lng}}/>)
                },

                


                isMarkerShown: true,
            })
        },
    }),
    withScriptjs,
    withGoogleMap
)((props) =>
    <GoogleMap defaultZoom={15} defaultCenter={{ lat: 28.6024, lng: -81.2001 }} onClick={props.onClick}>
        {props.isMarkerShown && <Marker position={props.position} draggable={true} ref={props.onMarkerMounted} onPositionChanged={props.onPositionChanged} onClick = {props.onClick}/>}
    </GoogleMap>
    )

class Markers extends React.PureComponent {
    
    constructor(){
        super();
        this.state = {
            isMarkerShown: false,
            position: { lat: -34.397, lng: 150.644 }
        }

    }
    state = {
        isMarkerShown: false,
    }


    render() {
        return (
        <div>
            <div>
                <MyMapComponent isMarkerShown={true} />
            </div>

        {/*<button title="Log" onClick={()=> console.log(this.props.onPositionChanged}> Penis </button> */}
        </div>
        )
    }
}


export default Markers;
