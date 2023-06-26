import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import './Map.css'

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

export default function Map(props) {
    const { map_data } = props;
    const tbl = useRef(null);

    const mapContainer = useRef(null);
    const map = useRef(null);

    const [lng] = useState(-95.36);
    const [lat] = useState(29.75);
    const [zoom] = useState(4);

    useEffect(() => {
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/light-v10',
            center: [lng, lat],
            zoom: zoom,
        });

        const nav = new mapboxgl.NavigationControl();
        map.current.addControl(nav, "top-right");

        if (props?.map_data?.length > 0) {
            props.map_data.forEach(function (point) {
                let geometry = [point.attributes.lon, point.attributes.lat]
                // delete point.resident_in_1977.city_state;
                let properties = point;
                let marker = { "type": "Feature", "geometry": geometry, "properties": properties }

                const el = document.createElement('div');
                el.className = 'marker';

                el.addEventListener('click', () => {
                    window.alert(marker.properties.attributes.first_name + " " + marker.properties.attributes.last_name, );
                });

                // Add markers to the map.
                new mapboxgl.Marker(el)
                    .setLngLat(marker.geometry)
                    .addTo(map.current);
            });
        }
    }, [lng, lat, zoom, props.map_data]);

    return (
        <div className='map-area'>
            <div ref={mapContainer} className="map-container" />
            <div ref={tbl} className="table-container">
                {map_data?.length > 0 ? 
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Race</th>
                                <th>Residence in 1977</th>
                                <th>Role at NWC</th>
                            </tr>
                        </thead>
                        <tbody>
                            {map_data.map((val) => {
                                return (
                                    <tr key={val.id}>
                                        <td>{val.attributes.last_name}, {val.attributes.first_name}</td>
                                        <td>{val.attributes.basic_races.data
                                            .map((e) => {
                                                return (
                                                    <span key={e.id}>
                                                        {e.attributes.basic_race}
                                                        <br />
                                                    </span>
                                                )
                                            })
                                        }</td>
                                        <td>{val.attributes.residence_in_1977.data?.attributes.residence_in_1977}</td>
                                        <td>{val.attributes.role.data
                                            .filter(e => !e.attributes.role.startsWith('Nominated') || !e.attributes.role.startsWith('Votes'))
                                            .map((e) => {
                                                return(
                                                <span key={e.id}>
                                                    {e.attributes.role}
                                                    <br/>
                                                </span>
                                                )
                                        })}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table> : <p>Please select options for search</p>
            }

            </div>
        </div>
    );
}

