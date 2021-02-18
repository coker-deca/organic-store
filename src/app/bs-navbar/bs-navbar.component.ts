import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUser } from '../models/app-user';
import { AuthService } from '../services/auth.service';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss']
})
export class BsNavbarComponent {
  appUser!: AppUser | null;
  cart$: Observable<any>;

  constructor(private auth: AuthService, cartService: ShoppingCartService) {
    auth.AppUser$.subscribe(appUser => this.appUser = appUser)
    this.cart$ = cartService.getCart();
   }

  logout() {
    this.auth.logout();
  }


}
