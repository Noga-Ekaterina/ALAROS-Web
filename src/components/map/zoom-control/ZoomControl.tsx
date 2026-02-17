import React from 'react';
import "./zoom-control.scss"
import { ReactSVG } from "react-svg";

interface ZoomControlProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
}

const ZoomControl = ({ onZoomIn, onZoomOut }: ZoomControlProps) => {
  return (
    <div className="zoom-control">
      <button
        className="btn-round btn-round--increase"
        onClick={onZoomIn}
      >
        <ReactSVG src="/Assets/Icons/close_round.svg"/>
      </button>
      <button
        className="btn-round btn-round--decrease"
        onClick={onZoomOut}
      />
    </div>
  );
};

export default ZoomControl;
