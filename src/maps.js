/* global google */
import fetch from "isomorphic-fetch";

import {
    default as React,
    Component,
} from "react";

import {
    withGoogleMap,
    GoogleMap,
    Marker,
} from "react-google-maps";

import MarkerClusterer from "react-google-maps/lib/addons/MarkerClusterer";

const MarkerClustererExampleGoogleMap = withGoogleMap(props => (
    <GoogleMap
        defaultZoom={2}
        defaultCenter={{lat: 36.0, lng: 0.0}}
    >
        <MarkerClusterer
            averageCenter
            enableRetinaIcons
            gridSize={60}
        >
            {props.markers.map(marker => (
                <Marker
                    position={{lat: parseFloat(marker.lat/*itude*/), lng: parseFloat(marker.lon/*gitude*/)}}
                    key={marker._id/*photo_id*/}
                    onClick={props.onMarkerClick.bind(null, marker)}
                />
            ))}
        </MarkerClusterer>
    </GoogleMap>
));

export default class MarkerClustererExample extends Component {
    state = {
        markers: [],
    };

    componentDidMount() {
        fetch(`//localhost:3002/api`/*`https://gist.githubusercontent.com/farrrr/dfda7dd7fccfec5474d3/raw/758852bbc1979f6c4522ab4e92d1c92cba8fb0dc/data.json`*/, {mode: 'cors'})
            .then(res => {
                // debugger;
                return res.json()
            })
            .then(data => {
                this.setState({markers: data.spots/*photos*/});
            });
    }

    handleMarkerClick(e, d){
        console.log(e, d);
    }

    render() {
        return (
            <MarkerClustererExampleGoogleMap
                containerElement={
                    <div style={{height: `100%`}}/>
                }
                mapElement={
                    <div style={{height: `100%`}}/>
                }
                markers={this.state.markers}
                onMarkerClick={this.props.onMarkerClick}
            />
        );
    }
}