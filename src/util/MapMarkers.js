import React from 'react';
import { MapMarkerStyle } from './MapMarkerStyle';


export default function MapMarker(props) {
  let style = Object.assign({}, MapMarkerStyle)
  if (props.isHovered) {
    style.backgroundColor = '#676560'
    style.color = 'white'
  }

  return (
    <div
      onMouseOver={props.onHover}
      onMouseOut={props.onUnHover}
      onClick={props.onClick}
      style={style}>
      {props.text}
    </div>
  );
}