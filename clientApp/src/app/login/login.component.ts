import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../services/authenticate.service';
import { JwtResponse } from '../models/jwt-response';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  error_message: string = '';
  jwt_res!: JwtResponse;

  loginForm = new FormGroup({
    loginUsername: new FormControl('', Validators.required),
    loginPassword: new FormControl('', Validators.required),
  });

  constructor(
    private authService: AuthenticateService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    let username = this.loginForm.controls['loginUsername'].value;
    let password = this.loginForm.controls['loginPassword'].value;

    var that = this;
    this.authService.performLogin(username, password).subscribe({
      next(response) {
        console.log(`Response received:`);
        let jwt_res: JwtResponse = response;
        console.log(jwt_res.access);

        localStorage.setItem('access', jwt_res.access);
        localStorage.setItem('refresh', jwt_res.refresh);

        //  ** route back to main Component page
        that.router.navigate(['T/gallery/0']);
      },
      error(msg) {
        console.log(`Error received:`);
        console.log(msg);
        alert("Login Unsuccessful.")
        let errorMsg: HttpErrorResponse = msg;
        that.error_message = errorMsg.error.detail + ` (${errorMsg.status})`;
      },
    });
  }

  // ** Function to perform login for the user
  performLogin(username: string, password: string) {}
}
