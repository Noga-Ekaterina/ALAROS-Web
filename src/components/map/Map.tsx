'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { IWithClass } from "@/types/tehnic";
import { IMapCoordinates } from "@/types/data";
import { useEffect, useState } from 'react';
import ZoomControl from "@/components/map/zoom-control/ZoomControl";

// Фикс для иконок маркеров
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

interface Props extends IWithClass {
  coordinatesObj: IMapCoordinates;
}

const GrayMap = ({ coordinatesObj, className }: Props) => {
  const coordinates: [number, number] = [coordinatesObj.latitude, coordinatesObj.longitude];

  useEffect(() => {
    // Устанавливаем кастомную иконку только на клиенте
    L.Marker.prototype.options.icon = DefaultIcon;
  }, []);

  return (
      <div className={className} style={{ position: "relative", overflow: "hidden" }}>
        <MapContainer
            center={coordinates}
            zoom={16}
            style={{ height: '100%', width: '100%' }}
            className="bg-gray-100 grayscale-map"
            zoomControl={false}
        >
          <TileLayer
              url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={coordinates}/>
          <ZoomControl/>
        </MapContainer>
      </div>
  );
};

export default GrayMap;