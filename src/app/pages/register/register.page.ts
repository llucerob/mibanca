import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonItem, IonLabel, IonInput, IonButton
} from '@ionic/angular/standalone';
import { RouterModule, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonItem, IonLabel, IonInput, IonButton
  ]
})
export class RegisterPage {
  email = '';
  password = '';
  confirmPassword = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastController: ToastController
  ) {}

  async register() {
    if (this.password !== this.confirmPassword) {
      this.presentToast('Las contraseñas no coinciden', 'danger');
      return;
    }

    try {
      const user = await this.authService.register(this.email, this.password);
      this.presentToast('Registro exitoso', 'success');
      this.router.navigateByUrl('/dashboard');
    } catch (error: any) {
      let message = 'Error desconocido';
      if (error.code === 'auth/email-already-in-use') {
        message = 'Este correo ya está registrado';
      } else if (error.code === 'auth/invalid-email') {
        message = 'Correo electrónico no válido';
      } else if (error.code === 'auth/weak-password') {
        message = 'Contraseña muy débil';
      }
      this.presentToast(message, 'danger');
    }
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'bottom'
    });
    await toast.present();
  }
}
