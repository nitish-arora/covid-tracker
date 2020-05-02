import { Component } from '@angular/core';
import { Router } from '@angular/router';

/* --- local dependencies -- */
import { APP_ROUTES } from 'src/app/shared/config/routes.config';

/**
 * Component for showing the logout page
 */
@Component({
  selector: 'app-logout',
  templateUrl: 'logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent {
  description: string = 'You have been logout from application!!';

  constructor(private router: Router) {}

  /**
   * method to be called to redirect to login page
   */
  goToLogin() {
    this.router.navigate([`/${APP_ROUTES.LOGIN}`]);
  }

  /**
   * method to be called to redirect to dashboard page
   */
  goToDashboard() {
    this.router.navigate([`/${APP_ROUTES.DASHBOARD}`]);
  }
}
