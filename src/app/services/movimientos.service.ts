import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovimientosService {

  private apiUrl = 'https://TU_API_GATEWAY.amazonaws.com'; // Reemplaza con tu endpoint real

  constructor(private http: HttpClient) {}

  async registrarMovimiento(movimiento: any) {
    return await lastValueFrom(
      this.http.post(`${this.apiUrl}/movimientos`, movimiento)
    );
  }

  async obtenerMovimientos() {
    return await lastValueFrom(
      this.http.get(`${this.apiUrl}/movimientos`)
    );
  }
}
