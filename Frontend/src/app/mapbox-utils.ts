// src/app/mapbox-utils.ts
import * as mapboxgl from 'mapbox-gl';

export function setMapboxToken(token: string) {
  (mapboxgl as any).accessToken = token;
}
