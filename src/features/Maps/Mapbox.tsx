import React, { Component } from "react";
import mapboxgl from "mapbox-gl";

// Prasad's Access Token (email : prasadpatewar39@gmail.com)
mapboxgl.accessToken =
    "pk.eyJ1IjoiaW5ub3ZhdGl2ZWdhbWVyIiwiYSI6ImNraTR3NDNpNzQ3czcyc2t6NXdsZGM4NDMifQ.J-40nZzqZWAbrruWBNoaBw";

interface ComponentState {
    lng: number;
    lat: number;
    zoom: number;
}

interface Props {
    lng: string;
    lat: string;
    zoom: number;
}

class Mapbox extends Component<Props, ComponentState> {
    state = {
        lng: Number(this.props.lng),
        lat: Number(this.props.lat),
        zoom: this.props.zoom,
    };

    public mapContainer: string | HTMLElement | null = null;

    componentDidMount = () => {
        const map = new mapboxgl.Map({
            container: this.mapContainer ? this.mapContainer : "",
            style: "mapbox://styles/mapbox/streets-v11",
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom,
        });

        map.on("move", () => {
            this.setState({
                lng: map.getCenter().lng,
                lat: map.getCenter().lat,
                zoom: map.getZoom(),
            });
        });

        new mapboxgl.Marker()
            .setLngLat([Number(this.props.lng), Number(this.props.lat)])
            .addTo(map);
    };

    render() {
        return (
            <div
                ref={(el) => (this.mapContainer = el)}
                className="mapContainer"
                style={{ height: "100%", width: "100%" }}
            />
        );
    }
}

export default Mapbox;
