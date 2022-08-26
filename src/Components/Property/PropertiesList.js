import React from 'react'

import PropertyTile from './PropertyTile';

import './PropertiesList.css'

export function PropertyList(props) {
  const houses = props.propertiesToList;

  return (
    <div className='PropertyList'>
      {houses && houses.map((house) => {
        return (
          <PropertyTile
            key={house.listing_id}
            property={house}
            onHover={() => props.setPropertyHovered(house.listing_id)}
            onUnHover={() => props.setPropertyHovered(null)}
            onClick={() => props.setSelectedProperty(house)}
            onLikeClick={() => props.setLikedProperty(house.listing_id)}
            likedProperty={props.likedProperty}
          />
        )
      })}
    </div>
  )
}
