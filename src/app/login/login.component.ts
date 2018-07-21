import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../service/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;


  constructor(private auth: AuthenticationService,
              private _router: Router) { }

  ngOnInit() {
  }


  login() {
    this.auth.signIn(this.username, this.password).subscribe((data) => {
      this._router.navigateByUrl('/article-list');
    }, (err) => {
      console.log('error');
      console.log(err);
      this._router.navigateByUrl('/article-list');
    });
  }


}
