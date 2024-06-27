import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import mapboxgl from 'mapbox-gl'; // Importar mapbox-gl correctamente
import { environment } from '../environments/environments';
import { ServicioService } from '../servicio.service';
import { GeocodingService } from '../geocode.service'; // Importar GeocodingService

@Component({
  selector: 'app-ubicacion',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './ubicacion.component.html',
  styleUrls: ['./ubicacion.component.css']
})
export class UbicacionComponent implements OnInit, OnDestroy {
  private map!: mapboxgl.Map;
  private markers: mapboxgl.Marker[] = [];
  ubicaciones: any[] = [];
  loading = false;
  error = '';

  constructor(private servicioService: ServicioService, private geocodingService: GeocodingService) {}

  ngOnInit() {
    mapboxgl.accessToken = environment.mapbox.accessToken;

    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [2.1734, 41.3851], // Coordenadas de Barcelona
      zoom: 12
    });

    this.map.on('load', () => {
      console.log('Map loaded');
    });

    this.map.on('click', async (event) => {
      const { lng, lat } = event.lngLat;

      // Añadir marcador al mapa
      const marker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(this.map);
      this.markers.push(marker);

      // Obtener dirección legible y guardar ubicación
      try {
        this.loading = true;
        const address: string = await this.getAddressFromCoordinates(lng, lat);
        const ubicacion = { latitude: lat, longitude: lng, name: address };
        await this.guardarUbicacion(ubicacion);
        this.loading = false;
        this.error = '';
      } catch (error) {
        this.loading = false;
        this.error = 'Error al guardar ubicación';
        console.error('Error al obtener la dirección o guardar la ubicación:', error);
      }
    });

    this.cargarUbicaciones();
  }

  ngOnDestroy() {
    if (this.map) {
      this.map.remove();
    }
  }

  async getAddressFromCoordinates(lng: number, lat: number): Promise<string> {
  try {
    const address: string | undefined = await this.geocodingService.reverseGeocode([lng, lat]).toPromise();
    if (address !== undefined) {
      return address; // Devolver la dirección si no es undefined
    } else {
      throw new Error('No se pudo obtener la dirección desde las coordenadas proporcionadas.');
    }
  } catch (error) {
    console.error('Error al obtener la dirección:', error);
    throw new Error('No se pudo obtener la dirección desde las coordenadas proporcionadas.');
  }
}

  async guardarUbicacion(ubicacion: any) {
    try {
      await this.servicioService.saveLocation(ubicacion).toPromise();
      this.cargarUbicaciones(); // Actualizar la lista de ubicaciones después de guardar
      console.log('Ubicación guardada:', ubicacion);
    } catch (error) {
      throw new Error('Error al guardar ubicación en el servidor.');
    }
  }

  cargarUbicaciones() {
    this.servicioService.getLocations().subscribe(
      (ubicaciones: any[]) => {
        this.ubicaciones = ubicaciones.map(ubicacion => ({
          ...ubicacion,
          name: ubicacion.name // Aseguramos que 'name' corresponde a la propiedad correcta
        }));
        // Limpiar y volver a cargar los marcadores en el mapa
        this.markers.forEach(marker => marker.remove());
        this.markers = [];
        ubicaciones.forEach((ubicacion) => {
          const marker = new mapboxgl.Marker()
            .setLngLat([ubicacion.longitude, ubicacion.latitude])
            .addTo(this.map);
          this.markers.push(marker);
        });
      },
      (error) => {
        console.error('Error al cargar ubicaciones:', error);
      }
    );
  }
  

  eliminarUbicacion(id: number) {
    this.servicioService.deleteLocation(id).subscribe(
      () => {
        console.log('Ubicación eliminada exitosamente.');
        // Actualizar lista de ubicaciones y marcadores después de eliminar
        this.markers.forEach(marker => marker.remove());
        this.markers = [];
        this.cargarUbicaciones();
      },
      (error) => {
        console.error('Error al eliminar ubicación:', error);
      }
    );
  }
}
