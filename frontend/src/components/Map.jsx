import React, { useEffect, useState } from "react";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";

const API_KEY = process.env.REACT_APP_API_KEY;

const Map = (props) => {
  const [center, setCenter] = useState({ lat: props.lat, lng: props.lng });

  useEffect(() => {
    setCenter({ lat: parseFloat(props.lat), lng: parseFloat(props.lng) });
  }, [props.lat, props.lng]);

  const containerStyle = {
    width: "100%",
    height: props.height,
  };
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_KEY,
  });

  return (
    <>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={props.zoom}
        >
          <Marker position={center} />
        </GoogleMap>
      ) : (
        <></>
      )}
    </>
  );
};

export default Map;
