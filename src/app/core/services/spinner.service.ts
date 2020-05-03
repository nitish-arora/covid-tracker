import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * Spinner service to be called for showing and hide of loader
 */
@Injectable()
export class SpinnerService {
  isRequesting: Subject<boolean> = new Subject<boolean>();

  /**
   * emitting value for showing spinner
   */
  start() {
    this.isRequesting.next(true);
  }

  /**
   * emitting value for hiding spinner
   */
  done() {
    this.isRequesting.next(false);
  }
}
