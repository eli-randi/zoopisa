import React from 'react';
import GoogleMapReact from 'google-map-react';
import MapMarker from './MapMarkers';

// https://www.npmjs.com/package/google-map-react


const GoogleAPIKey = 'AIzaSyC_znZ9Y6Q-BiaG70eIBqvPSZ_4AnnNI_g';

function kFormatter(num) {
  return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
}

function PropertyMap(props) {
  const defaultProps = {
    center: {
      lat: 51.508722,
      lng: -0.128556
    },
    zoom: 13
  };

  const listingsInfo = props.listings;

  const ShowMapMarkers = () => {
    if (!listingsInfo) {
      return
    }

    let result = listingsInfo.map(
      (house) => {
        return <MapMarker
          lat={house.latitude}
          lng={house.longitude}
          text={kFormatter(house.price)}
          key={house.listing_id}
          isHovered={house.listing_id === props.propertyHovered}
          onHover={() => props.setPropertyHovered(house.listing_id)}
          onUnHover={() => props.setPropertyHovered(null)}
          onClick ={() => props.setSelectedProperty(house)}
        />
      }
    )

    return result
    
  }



  return (  
      <GoogleMapReact sx={{width:'100%', height:'100%'}}
        bootstrapURLKeys={{ key: GoogleAPIKey }}
        defaultCenter={defaultProps.center}
        center={props.center}
        defaultZoom={defaultProps.zoom}
      >
        {ShowMapMarkers()}
      </GoogleMapReact>
  );
}


export default PropertyMap;

