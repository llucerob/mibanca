import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import {
  IonApp, IonMenu, IonHeader, IonToolbar, IonTitle,
  IonContent, IonList, IonItem, IonRouterOutlet
} from '@ionic/angular/standalone';
import { AuthService } from './services/auth.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [
    IonApp, IonRouterOutlet, IonMenu, IonHeader,
    IonToolbar, IonTitle, IonContent, IonList, IonItem,
    RouterModule
  ]
})
export class AppComponent {
  constructor(private router: Router, public authService: AuthService) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const currentUrl = event.urlAfterRedirects;
        if (currentUrl === '/' || currentUrl === '') {
          if (this.authService.isAuthenticated()) {
            this.router.navigateByUrl('/dashboard');
          } else {
            this.router.navigateByUrl('/bienvenida');
          }
        }
      });
  }

  logout() {
    this.authService.logout();
  }
}
