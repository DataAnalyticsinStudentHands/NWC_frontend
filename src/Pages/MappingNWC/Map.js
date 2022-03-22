import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

import './Map.css'
import VARIABLES from "../../config/.env.js";
import { Person } from 'react-bootstrap-icons';

mapboxgl.accessToken = VARIABLES.mapboxAccessToken;

export default function Map({ map_data }) {
    const mapContainer = useRef(null);
    const map = useRef(null);

    const [lng, setLng] = useState(-95.36);
    const [lat, setLat] = useState(29.75);
    const [zoom, setZoom] = useState(4);

    //lookup roles
    const lookup = {
        "delegate_at_the_nwc": "Delegate at the NWC",
        "ford_national_commissioner": "Ford National Commissioner",
        "carter_national_commissioner": "Carter National Commissioner",
        "international_dignitary": "International Dignitary",
        "torch_relay_runner": "Torch Relay Runner",
        "alternate_at_the_nwc": "Alternate at the NWC",
        "delegate_at_large": "Delegate at Large",
        "official_observer": "Official Observer",
        "volunteer": "Volunteer",
        "paid_staff_member": "Paid Staff Member",
        "notable_speaker": "Notable Speaker",
        "unofficial_observer": "Unofficial Observer",
        "journalists_covering_the_nwc": "Journalist covering the NWC",
        "state_delegation_chair": "State Delegation Chair",
        "exhibitor": 'Exhibitor'
    }

    useEffect(() => {
        //if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/light-v10',
            center: [lng, lat],
            zoom: zoom,
        });

        const nav = new mapboxgl.NavigationControl();
        map.current.addControl(nav, "top-right");

        if (map_data.length > 0) {
            map_data.forEach(function (point) {
                let geometry = point.location_of_residence_in1977;
                delete point.location_of_residence_in1977;
                let properties = point;
                let marker = { "type": "Feature", "geometry": geometry, "properties": properties }
                const el = document.createElement('div');
                el.className = 'marker';

                el.addEventListener('click', () => {
                    window.alert(marker.properties.first_name + " " + marker.properties.last_name, );
                });

                // Add markers to the map.
                new mapboxgl.Marker(el)
                    .setLngLat(marker.geometry.coordinates)
                    .addTo(map.current);
            });
        }
    }, [lng, lat, zoom, map_data]);

    return (
        <div className='map-area'>
            <div ref={mapContainer} className="map-container" />
            <div className="table-container">
                <table>
                    <tbody>
                    {map_data.length > 0 ? 
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>State</th>
                        <th>Role at NWC</th>
                    </tr> : <p> Please select options for search</p>
}
                    {map_data.length > 0 && map_data.map((val, key) => {
                        return (
                            
                            <tr key={key}>
                                <td>{val.first_name}</td>
                                <td>{val.last_name}</td>
                                <td>{val.state}</td>
                                <td>{val.nwc_roles.map(role => { return lookup[Object.keys(role)[1]]+' '})}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

