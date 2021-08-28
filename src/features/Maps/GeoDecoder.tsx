import React, { Component } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "./GeoDecoder.css";
import type { ControllerRenderProps, UseFormSetValue } from "react-hook-form";
import type { ProjectForm } from "../../../types/formTypes";
// Prasad's Access Token (email : prasadpatewar39@gmail.com)
mapboxgl.accessToken =
    "pk.eyJ1IjoiaW5ub3ZhdGl2ZWdhbWVyIiwiYSI6ImNraTR3NDNpNzQ3czcyc2t6NXdsZGM4NDMifQ.J-40nZzqZWAbrruWBNoaBw";

const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    marker: true,
    // @ts-ignore
    mapboxgl: mapboxgl,
    proximity: {
        longitude: 77.216721,
        latitude: 28.6448,
    },
});

interface ComponentState {
    lng: number;
    lat: number;
    zoom: number;
}

interface Props {
    placeName?: string;
    setValue: UseFormSetValue<ProjectForm>;
}

class GeoDecoder extends Component<Props, ComponentState> {
    state = {
        lng: 77.209,
        lat: 28.6139,
        zoom: 11,
    };
    public mapContainer: string | HTMLElement | null = null;

    componentDidMount = () => {
        const map = new mapboxgl.Map({
            container: this.mapContainer ? this.mapContainer : "",
            style: "mapbox://styles/mapbox/streets-v11",
            center: [77.209, 28.6139],
            zoom: 11,
        });

        map.on("move", () => {
            this.setState({
                lng: map.getCenter().lng,
                lat: map.getCenter().lat,
                zoom: map.getZoom(),
            });
        });

        document.getElementById("geocoder")?.appendChild(geocoder.onAdd(map));

        if (this.props.placeName) {
            geocoder.setInput(this.props.placeName);
        }

        geocoder.on("result", (result) => {
            const data = {
                center: result.result.center,
                placeName: result.result.place_name,
            };

            this.props.setValue("location", data);
        });
    };

    componentWillUnmount() {
        geocoder.off("result", function () {});
    }

    render() {
        return (
            <div className="root">
                <div id="geocoder" className="geocoder"></div>
                <div
                    ref={(el) => (this.mapContainer = el)}
                    className="mapContainer"
                />
            </div>
        );
    }
}

export default GeoDecoder;
