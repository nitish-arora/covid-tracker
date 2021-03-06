import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * Service for context of app
 */
@Injectable()
export class AppContextService {
  // variable to reflect if user is logged in or not
  isUserLoggedIn: Subject<boolean> = new Subject<boolean>();

  /**
   * emit value to reflect user logged in
   */
  login() {
    this.isUserLoggedIn.next(true);
  }

  /**
   * emit value to reflect user logged out
   */
  logout() {
    this.isUserLoggedIn.next(false);
  }
}
