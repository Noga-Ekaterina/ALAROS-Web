'use client'

import './map.scss'
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Script from 'next/script';
import { IWithChildren, IWithClass } from "@/types/tehnic";
import { useEffect, useRef, useState } from 'react';
import ZoomControl from "@/components/map/zoom-control/ZoomControl";
import type { GenericReactify, Reactify } from '@yandex/ymaps3-types/reactify';

/** Модуль, возвращаемый ymaps3.import('@yandex/ymaps3-reactify') */
interface Ymaps3ReactifyModuleExport {
  reactify: GenericReactify;
}

/** Тип window.ymaps3 (API подключается скриптом в рантайме) */
interface Ymaps3Global {
  ready: Promise<void>;
  import: (module: string) => Promise<unknown>;
}

declare global {
  interface Window {
    ymaps3?: Ymaps3Global;
  }
}

interface Props extends IWithClass {
  coordinates: [number, number]
}

type ReactifiedMap = React.ComponentType<{
  location: { center: [number, number]; zoom: number };
  ref?: React.Ref<unknown>;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}>;
/** Экземпляр YMap из ymaps3 — зум/центр через геттеры, изменение через setLocation */
type MapEntity = {
  zoom: number;
  center: Readonly<[number, number]>;
  setLocation: (location: { center?: [number, number]; zoom?: number }) => void;
};

/** Результат reactify.module(ymaps3) — React-компоненты карты и слоёв */
interface ReactifiedYmapsModule {
  YMap: ReactifiedMap;
  YMapDefaultSchemeLayer: React.ComponentType<Record<string, never>>;
  YMapDefaultFeaturesLayer: React.ComponentType<Record<string, never>>;
  YMapMarker: React.ComponentType<{ coordinates: [number, number] } & IWithChildren>;
  bound: Reactify
}

const YANDEX_MAPS_SCRIPT_URL = `https://api-maps.yandex.ru/v3/?apikey=${typeof process !== 'undefined' && process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY ? process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY : ''}&lang=ru_RU`;

const GrayMap = ({ coordinates: coordinatesObj, className }: Props) => {
  const mapRef = useRef<MapEntity | null>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [reactifiedApi, setReactifiedApi] = useState<ReactifiedYmapsModule | null>(null);

  const center: [number, number] = coordinatesObj

  useEffect(() => {
    if (!scriptLoaded || typeof window === 'undefined' || !window.ymaps3) return;
    let cancelled = false;
    const ymaps3Global = window.ymaps3;
    Promise.all([
      ymaps3Global.import('@yandex/ymaps3-reactify'),
      ymaps3Global.ready
    ]).then(([mod]) => {
      if (cancelled) return;
      const { reactify } = mod as Ymaps3ReactifyModuleExport;
      const bound = reactify.bindTo(React, ReactDOM);
      type Ymaps3Module = typeof import('@yandex/ymaps3-types');
      const module = bound.module(ymaps3Global as Ymaps3Module);

      setReactifiedApi({
        YMap: module.YMap,
        YMapDefaultSchemeLayer: module.YMapDefaultSchemeLayer,
        YMapDefaultFeaturesLayer: module.YMapDefaultFeaturesLayer,
        YMapMarker: module.YMapMarker,
        bound
      } as ReactifiedYmapsModule);
    }).catch(() => {});
    return () => { cancelled = true; };
  }, [scriptLoaded]);

  const setMapRef = (r: unknown) => {
    const raw = r as { entity?: MapEntity } | MapEntity | null;
    const entity = (raw && 'entity' in raw && raw.entity != null) ? raw.entity : raw;
    mapRef.current = entity && typeof (entity as MapEntity).setLocation === 'function' ? (entity as MapEntity) : null;
  };

  const onZoomIn = () => {
    const map = mapRef.current;
    if (!map || typeof map.setLocation !== 'function') return;
    const zoom = Math.min(22, map.zoom + 1);
    map.setLocation({ center: [...map.center], zoom });
  };

  const onZoomOut = () => {
    const map = mapRef.current;
    if (!map || typeof map.setLocation !== 'function') return;
    const zoom = Math.max(0, map.zoom - 1);
    map.setLocation({ center: [...map.center], zoom });
  };

  const mapContent = !reactifiedApi ? (
    <div className={className} style={{ position: "relative", overflow: "hidden"}} />
  ) : (() => {
    const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker, bound } = reactifiedApi;

    return (
      <div className={className} style={{ position: "relative", overflow: "hidden" }}>
      <YMap
        ref={setMapRef as React.Ref<unknown>}
        location={bound.useDefault({ center, zoom: 16 })}
        className="map"
        style={{ height: '100%', width: '100%' }}
      >
        <YMapDefaultSchemeLayer />
        <YMapDefaultFeaturesLayer />
        <YMapMarker coordinates={center} >
          <img src='/Assets/Icons/Mark.svg' alt='marker' />
        </YMapMarker>
      </YMap>
      <ZoomControl onZoomIn={onZoomIn} onZoomOut={onZoomOut} />
    </div>
    );
  })();

  return (
    <>
      <Script
        src={YANDEX_MAPS_SCRIPT_URL}
        strategy="lazyOnload"
        onLoad={() => setScriptLoaded(true)}
      />
      {mapContent}
    </>
  );
};

export default GrayMap;
