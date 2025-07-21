import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonButtons,
  IonMenuButton,
  IonSelect,
  IonSelectOption
} from '@ionic/angular/standalone';
import { RouterModule, Router } from '@angular/router';
import { AwsApiService } from 'src/app/services/aws-api.service';

@Component({
  selector: 'app-registrar-movimiento',
  templateUrl: './registrar-movimiento.page.html',
  styleUrls: ['./registrar-movimiento.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonButtons,
    IonMenuButton,
    IonSelect,
    IonSelectOption
  ]
})
export class RegistrarMovimientoPage {
  descripcion: string = '';
  monto: number | null = null;
  tipo: string = 'ingreso'; // ingreso o egreso
  fecha: string = new Date().toISOString().substring(0, 10);

  constructor(private awsApi: AwsApiService, private router: Router) {}

  async guardarMovimiento() {
    if (!this.descripcion || this.monto === null || !this.tipo) return;

    const movimiento = {
      descripcion: this.descripcion,
      monto: this.tipo === 'egreso' ? -Math.abs(this.monto) : this.monto,
      tipo: this.tipo,
      fecha: this.fecha
    };

    try {
      await this.awsApi.insertarMovimiento(movimiento);
      this.router.navigate(['/movimientos']);
    } catch (error) {
      console.error('Error al guardar movimiento', error);
    }
  }
}
