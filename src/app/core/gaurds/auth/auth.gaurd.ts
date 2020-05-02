import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthGaurd implements CanActivate {
  constructor(private router: Router, private toastrService: ToastrService) {}

  /**
   * guard return true if path is allowed or not depending on authorizaton
   * @returns boolean
   */
  canActivate(): boolean {
    const token: boolean = !!localStorage.getItem('Authorization');
    if (token) {
      return true;
    }
    this.router.navigate(['/login']);
    this.toastrService.warning('Please login to continue!!');
    return false;
  }
}
