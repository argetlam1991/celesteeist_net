import { Component } from '@angular/core';

import { AuthenticationService } from './service/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'celesteeist';
  is_admin = false;

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
    this.checkIsAdmin();
  }

  isLogin() {
    return this.auth.getAuthenticatedUser() != null;
  }

  checkIsAdmin() {
    this.auth.isAdmin().subscribe(is_admin => this.is_admin = is_admin);
  }

  getUsername() {
    return this.auth.getAuthenticatedUser().getUsername();
  }
}
