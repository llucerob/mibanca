import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AwsApiService {

  private apiUrl = 'https://i5mgyqrh30.execute-api.us-east-1.amazonaws.com'; 
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
