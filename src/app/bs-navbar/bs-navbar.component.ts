import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss']
})
export class BsNavbarComponent {

  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(data => console.log(data));
  }


  logout() {
    this.afAuth.signOut();
  }

}
