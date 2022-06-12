import React from "react";
import { useJsApiLoader, GoogleMap } from "@react-google-maps/api";

const API_KEY = process.env.REACT_APP_API_KEY;

const Map = (props) => {
  const center = { lat: props.lat, lng: props.lng };
  const containerStyle = {
    width: "100%",
    height: "400px",
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
          zoom={18}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default Map;
