import { Component } from '@angular/core';
import { Router } from '@angular/router';

/* --- local dependencies -- */
import { APP_ROUTES } from 'src/app/shared/config/routes.config';

@Component({
  selector: 'app-page-not-found',
  templateUrl: 'page-not-found.component.html',
})
export class PageNotFoundComponent {
  // properties to be sent as @input in NotFoundComponent
  buttonText: string = 'Go To Dashboard';
  errorDescription: string = 'Page Not Found';

  constructor(private router: Router) {}

  /**
   * method to navigate to dashboard page
   */
  goToDashboard() {
    this.router.navigate([`/${APP_ROUTES.DASHBOARD}`]);
  }
}
