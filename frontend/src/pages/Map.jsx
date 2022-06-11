import React from "react";
import { useJsApiLoader, GoogleMap } from "@react-google-maps/api";

const Map = (props) => {
  const center = { lat: props.lat, lng: props.lng };
  const containerStyle = {
    width: "100%",
    height: "400px",
  };
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDo_ADO0k89e_9UkaOGuvXlSllUP7QZmT4",
  });

  return (
    <>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default Map;
