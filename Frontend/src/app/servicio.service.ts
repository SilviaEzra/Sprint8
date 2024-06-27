import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Interface } from './interface';
import { environment } from './environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/products/';
  }

  getListProducts(): Observable<Interface[]> {
    return this.http.get<Interface[]>(`${this.myAppUrl}${this.myApiUrl}`).pipe(
      map(products => products.map(product => {
        if (product.nota > 10) {
          product.nota = 10; // Ajustar la nota si es mayor a 10
        }
        return product;
      }))
    );
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  saveProduct(product: Interface): Observable<void> {
    if (product.nota > 10) {
      product.nota = 10; // Ajustar la nota si es mayor a 10
    }
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, product);
  }

  getProduct(id: number): Observable<Interface> {
    return this.http.get<Interface>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  updateProduct(id: number, product: Interface): Observable<void> {
    if (product.nota > 10) {
      product.nota = 10; // Ajustar la nota si es mayor a 10
    }
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, product);
  }

  getLocations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.myAppUrl}api/locations`);
  }

  saveLocation(location: any): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}api/locations`, location);
  }

  deleteLocation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}api/locations/${id}`);
  }

  // Métodos para manejar eventos
  getEvents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.myAppUrl}api/events`);
  }

  saveEvent(event: any): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}api/events`, event);
  }

  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}api/events/${id}`);
  }
}
