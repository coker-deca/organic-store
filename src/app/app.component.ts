import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy{
  userStatus: Subscription;
  constructor(private userService: UserService, private auth: AuthService, router: Router) {
    this.userStatus = auth.user$.subscribe(user => {
      if (user) {
        userService.save(user);

        let returnUrl = localStorage.getItem('returnUrl');
        router.navigateByUrl(returnUrl!);
      }
    })
  }

  ngOnDestroy() {
    if (this.userStatus) {
      this.userStatus.unsubscribe();
    }
  }
}
