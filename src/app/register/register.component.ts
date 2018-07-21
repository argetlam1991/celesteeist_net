import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';

import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent implements OnInit {
  username: string;
  email: string;
  password: string;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  constructor(private auth: AuthenticationService,
              private _router: Router) { }

  ngOnInit() {
  }

  register(username, email, password) {
    this.auth.register(username, email, password).subscribe((data) => {
      console.log(data);
      this._router.navigateByUrl('/article-list');
    }, (err) => {
      this._router.navigateByUrl('/article-list');
      console.log('register component');
      console.log(err);
    });
  }

  save() {
    console.log(this.username);
    console.log(this.email);
    console.log(this.password);
    this.register(this.username, this.email, this.password);
  }
}
