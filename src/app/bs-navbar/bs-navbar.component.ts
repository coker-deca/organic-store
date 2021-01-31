import { Component } from '@angular/core';
import { AppUser } from '../models/app-user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss']
})
export class BsNavbarComponent {
  appUser!: AppUser | null;

  constructor(private auth: AuthService) {
    auth.AppUser$.subscribe(appUser=> this.appUser = appUser )
   }

  logout() {
    this.auth.logout();
  }


}
