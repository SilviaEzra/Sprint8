import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {
  private readonly geocodeBaseUrl: string = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
  private readonly accessToken: string = 'pk.eyJ1IjoibGFlenJhIiwiYSI6ImNseG1jOTBqbjA5Ynkya3NldThoY3JhYWwifQ.WDeqMoFRVHX-Xwnfvj9LMQ'; // Reemplaza con tu token de acceso a Mapbox

  constructor(private http: HttpClient) { }

  // Método para geocodificación inversa (coordenadas a dirección)
  reverseGeocode(coordinates: number[]): Observable<string> {
    const url = `${this.geocodeBaseUrl}${coordinates[0]},${coordinates[1]}.json?access_token=${this.accessToken}`;
    return this.http.get<any>(url).pipe(
      map(response => {
        const features = response.features;
        if (features.length > 0) {
          return features[0].place_name;
        } else {
          throw new Error('No se encontraron resultados para las coordenadas proporcionadas.');
        }
      })
    );
  }
}
