import './main.css'
import fetch from "isomorphic-fetch";
import React, {Component} from 'react';

import MarkerClustererExample from './maps';
import PicPreview from './PicPreview'

export default class App extends Component {
    constructor() {
        super();
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.closePics = this.closePics.bind(this);
        this.onFilteredChanged = this.onFilteredChanged.bind(this);
    }

    state = {
        pics: [],
        showPics: false,
        filtered: true,
        marker: null
    };

    onMarkerClick(marker) {
        this.fetchSpot(marker, this.state.filtered)
            .then(() => {
                this.setState({showPics: true, marker});
            });
    }

    fetchSpot(spot, filtered) {
        return fetch(`//localhost:3002/api/spot/${spot._id}${filtered ? '' : '?unfiltered=true'}`, {mode: 'cors'})
            .then(res => {
                return res.json()
            })
            .then(data => {
                this.setState({pics: data.pics});
            });
    }

    closePics() {
        this.setState({showPics: false});
    }

    onFilteredChanged() {
        const filtered = !this.state.filtered;

        this.fetchSpot(this.state.marker, filtered).then(()=>this.setState({filtered}));
    }

    render() {
        const {filtered, showPics, pics} = this.state;
        return (
            <div className="main">
                <MarkerClustererExample onMarkerClick={this.onMarkerClick}/>
                <div style={{display: showPics ? 'block' : 'none'}} className="pics-back"></div>
                <div style={{display: showPics ? 'block' : 'none'}} className="pics-view">
                    <div className="pics-wrap">
                        <PicPreview pics={pics}/>
                    </div>
                    <div className="close-btn" onClick={this.closePics}>
                        X
                    </div>
                    <div className="filter-btn-wrap">
                        <div className="filter-btn" onClick={this.onFilteredChanged}>
                            {filtered ? 'Filtered' : 'All'}
                            <div className="counter">{pics.length}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
