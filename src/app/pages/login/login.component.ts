import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

/* --- local dependencies -- */
import { LoginService } from './services/login.service';
import { IUser } from 'src/app/shared/interfaces/IUser';
import { AppContextService } from 'src/app/core/services/app-context.service';
import { APP_ROUTES } from 'src/app/shared/config/routes.config';
import { LOCAL_STORAGE } from 'src/app/shared/config/storage.config';

/**
 * Component for showing login page of application
 */
@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  title = 'Login';
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private toastrService: ToastrService,
    private appContextService: AppContextService
  ) {
    this.createLoginForm();
  }

  /**
   * method to create the login form and applying validations
   */
  createLoginForm() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  /**
   * method to be called on submit of login form
   */
  login() {
    const data: IUser = { ...this.loginForm.value };
    this.loginService.login(this.loginForm.value).subscribe((userData) => {
      if (
        userData &&
        userData.length &&
        userData[0].password === data.password
      ) {
        localStorage.setItem(LOCAL_STORAGE.TOKEN_KEY, 'Basic bml0aXNo');
        localStorage.setItem(LOCAL_STORAGE.USERNAME_KEY, data.username);
        this.appContextService.login();
        this.router.navigate([`${APP_ROUTES.DASHBOARD}`]);
        this.toastrService.success('Login Successful!!');
      } else {
        this.toastrService.error('Incorrect Username or Password!!');
      }
    });
  }
}
