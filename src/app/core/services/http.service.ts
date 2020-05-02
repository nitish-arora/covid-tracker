import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { finalize, catchError } from 'rxjs/operators';

/* --- local dependencies -- */
import { SpinnerService } from './spinner.service';

/**
 * Common service to handle http requests
 */
@Injectable()
export class HttpService {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private spinner: SpinnerService
  ) {}

  /**
   * method ot  hit the http get request
   * @param url
   */
  get(url: string): Observable<any> {
    this.startMonitoring();
    return this.handleResponse(this.http.get(url));
  }

  /**
   * method to hit the http post request
   * @param url
   * @param data - post data need to send in body
   * @param options - options set externally to be send in request
   */
  post(url: string, data?: any, options?: any): Observable<any> {
    this.startMonitoring();
    return this.handleResponse(
      this.http.post(url, data, this.getRequestOptions(options))
    );
  }

  /**
   * method to set the content type header for each request
   * @param options
   */
  private getRequestOptions(options: any) {
    options = options || {};
    if (options.headers) {
      options.headers = options.headers.set('Content-Type', 'application/json');
    } else {
      options.headers = new HttpHeaders();
      options.headers = options.headers.set('Content-Type', 'application/json');
    }
    return options;
  }

  /**
   * common method to handle error of all http requests
   * @param error : HttpErrorResponse
   */
  handleError(error: HttpErrorResponse) {
    let err = '';
    if (error.error instanceof ErrorEvent) {
      err = `An error occured: ${error.error.message}`;
    } else {
      err = 'A temporary error occurred on server, please try later';
      console.log(err, error);
    }
    this.toastr.error(err);
    return throwError(err);
  }

  /**
   * method called to start the spinner before each request
   */
  startMonitoring() {
    this.spinner.start();
  }

  /**
   * method handle errors and spinner for each response of http request
   * @param observable Observable
   */
  handleResponse(observable: Observable<any>) {
    return observable.pipe(
      catchError((err) => this.handleError(err)),
      finalize(() => {
        this.spinner.done();
      })
    );
  }
}
