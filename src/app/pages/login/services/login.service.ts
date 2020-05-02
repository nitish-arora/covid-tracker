import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/* --- local dependencies -- */
import { IUser } from 'src/app/shared/interfaces/IUser';
import { HttpService } from 'src/app/core/services/http.service';

/**
 * Login service
 */
@Injectable()
export class LoginService {
  private apiURL = 'api/userDetails?username=';

  constructor(private http: HttpService) {}

  /**
   * method to get the details of user with specific username
   * @param data: IUser - login form data
   */
  login(data: IUser): Observable<IUser[]> {
    return this.http.get(`${this.apiURL}${data.username}`);
  }
}
