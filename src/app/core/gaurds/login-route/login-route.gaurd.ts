import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class LoginRouteGaurd implements CanActivate {
  constructor(private router: Router, private toastrService: ToastrService) {}

  /**
   * gaurd to redirect user to dashboard page if user is already logged in
   * @param route: ActivatedRouteSnapshot
   * @returns boolean
   */
  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (
      route &&
      route.routeConfig.path === 'login' &&
      localStorage.getItem('Authorization')
    ) {
      this.router.navigate(['/dashboard']);
      this.toastrService.info('Already Logged In!!');
      return false;
    }
    return true;
  }
}
