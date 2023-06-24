import React, { useRef, useEffect, useState } from "react";
import "./Map.css";

import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

export const Map = (props) => {
    const { map_data } = props

	const mapContainer = useRef(null);
	const map = useRef(null);

	const [lng] = useState(-95.36);
	const [lat] = useState(29.75);
	const [zoom] = useState(4);

	useEffect(() => {
		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: "mapbox://styles/mapbox/light-v10",
			center: [lng, lat],
			zoom: zoom,
		});

		const nav = new mapboxgl.NavigationControl();
		map.current.addControl(nav, "top-right");

		if (map_data.length > 0) {
			map_data.forEach(function (point) {
				let geometry = [point.lon, point.lat];
				let properties = point;

				let marker = {
					type: "Feature",
					geometry: geometry,
					properties: properties,
				};

				const el = document.createElement("div");
				el.className = "marker";

				el.addEventListener("click", () => {
					window.alert(
						marker.properties.first_name +
							" " +
							marker.properties.last_name
					);
				});

				// Add markers to the map.
				new mapboxgl.Marker(el)
					.setLngLat(marker.geometry)
					.addTo(map.current);
			});
		}
	}, [lng, lat, zoom, map_data]);

	return (
        <div className="map-area">
            <div ref={mapContainer} className="map-container" />
        </div>
	);
};
