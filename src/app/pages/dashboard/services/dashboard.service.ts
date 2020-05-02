import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/* --- local dependencies -- */
import { HttpService } from 'src/app/core/services/http.service';
import { IStateApiResponse } from 'src/app/shared/interfaces/IStateApiResponse';

const STATE_DATA_API = 'https://api.covid19india.org/data.json'; // url for fetching state data
const DISTRICT_DATA_API =
  'https://api.covid19india.org/state_district_wise.json'; // url for fetching district data

@Injectable()
export class DashboardService {
  private stateApiUrl = STATE_DATA_API;
  private districtApiUrl = DISTRICT_DATA_API;

  constructor(private http: HttpService) {}

  /**
   * method fetching state data
   */
  getStateData(): Observable<IStateApiResponse> {
    return this.http.get(`${this.stateApiUrl}`);
  }

  /**
   * method fetching district data
   */
  getDistrictData(): Observable<any> {
    return this.http.get(`${this.districtApiUrl}`);
  }
}
