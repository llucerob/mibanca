import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonButtons,
  IonMenuButton,
} from '@ionic/angular/standalone';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.page.html',
  styleUrls: ['./movimientos.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    IonButtons,
    IonMenuButton
  ],
})
export class MovimientosPage {
  saldo: number = 125000; // ejemplo
  movimientos = [
    { descripcion: 'Compra supermercado', monto: -30000, fecha: '2025-07-19' },
    { descripcion: 'Transferencia recibida', monto: 80000, fecha: '2025-07-18' },
    { descripcion: 'Pago cuenta luz', monto: -15000, fecha: '2025-07-15' },
  ];

  constructor(private router: Router) {}

  registrarMovimiento() {
    this.router.navigate(['/registrar-movimiento']); // deberás tener esta ruta
  }
}
