import React from 'react';
import "./zoom-control.scss"
import { useMap } from 'react-leaflet';
import {ReactSVG} from "react-svg";

const ZoomControl = () => {
  const map = useMap();

  const zoomIn = () => map.zoomIn();
  const zoomOut = () => map.zoomOut();

  return (
      <div className="zoom-control">
        <button
            className="btn-round btn-round--increase"
            onClick={zoomIn}
        >
          <ReactSVG src="/Assets/Icons/close_round.svg"/>
        </button>
        <button
            className="btn-round btn-round--decrease"
            onClick={zoomOut}
        />
      </div>
  );
};

export default ZoomControl;