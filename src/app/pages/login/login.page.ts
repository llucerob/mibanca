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
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonItem, IonLabel, IonInput, IonButton
  ]
})
export class LoginPage {
  email = '';
  password = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastController: ToastController
  ) {}

  async login() {
    try {
      const user = await this.authService.login(this.email, this.password);
      this.presentToast('Inicio de sesión exitoso', 'success');
      this.router.navigateByUrl('/dashboard');
    } catch (error: any) {
      let message = 'Error desconocido';
      if (error.code === 'auth/invalid-email') {
        message = 'Correo inválido';
      } else if (error.code === 'auth/user-not-found') {
        message = 'Usuario no registrado';
      } else if (error.code === 'auth/wrong-password') {
        message = 'Contraseña incorrecta';
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
