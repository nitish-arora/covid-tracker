import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

/* --- local dependencies -- */
import { IMenu } from '../../interfaces/IMenu';
import { APP_ROUTES } from '../../config/routes.config';
import { filter } from 'rxjs/operators';
import { AppContextService } from 'src/app/core/services/app-context.service';
import { LOCAL_STORAGE } from '../../config/storage.config';

/**
 * list of available navigations
 */
const USER_MENU: IMenu[] = [
  {
    name: 'Dashboard',
    link: APP_ROUTES.DASHBOARD,
  },
  {
    name: 'Latest News',
    link: APP_ROUTES.NEWS,
  },
  {
    name: 'Precautions',
    link: APP_ROUTES.PRECAUTIONS,
  },
];

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  title: string = 'Covid Tracker';
  isLoggedIn: boolean = false;
  menu: IMenu[] = USER_MENU;
  activeLink: string = APP_ROUTES.DASHBOARD;
  username: string;

  constructor(
    private router: Router,
    private appContextService: AppContextService
  ) {
    // listening to route change and highlighting the nav based on route event without clicking  navigation options
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.activeLink = event.urlAfterRedirects.slice(1);
      });
  }

  ngOnInit() {
    const username = localStorage.getItem(LOCAL_STORAGE.USERNAME_KEY);
    if (username) {
      this.isLoggedIn = true;
      this.username = username;
    }

    // listening for change in subject from appcontext
    this.appContextService.isUserLoggedIn.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      if (isLoggedIn) {
        this.username = localStorage.getItem(LOCAL_STORAGE.USERNAME_KEY);
      }
    });
  }

  /**
   * method to navigate to login page
   */
  logIn() {
    this.router.navigate([`/${APP_ROUTES.LOGIN}`]);
  }

  /**
   * method to called on logging out of application
   */
  logOut() {
    this.router.navigate([`/${APP_ROUTES.LOGOUT}`]).then(() => {
      localStorage.clear();
      this.appContextService.logout();
    });
  }
}
