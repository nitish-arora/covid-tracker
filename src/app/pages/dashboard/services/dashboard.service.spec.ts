import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { DashboardService } from './dashboard.service';
import {
  mockStateData,
  mockDistrictData,
} from '../../../shared/mock/dashboard.mock';
import { HttpService } from 'src/app/core/services/http.service';
import { of } from 'rxjs';
import { CoreModule } from 'src/app/core/core.module';

const STATE_DATA_API = 'https://api.covid19india.org/data.json'; // url for fetching state data
const DISTRICT_DATA_API =
  'https://api.covid19india.org/state_district_wise.json'; // url for fetching district data
describe('DashboardService', () => {
  let httpTestingController: HttpTestingController;
  let service: DashboardService;
  let httpService: HttpService;
  const mockHttpService = jasmine.createSpyObj('mockHttpService', {
    get: of({}),
  });
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, CoreModule],
      providers: [
        { provide: HttpService, useValue: mockHttpService },
        DashboardService,
      ],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(DashboardService);
    httpService = TestBed.inject(HttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call get district API with correct url', () => {
    service.getDistrictData();
    expect(httpService.get).toHaveBeenCalledWith(DISTRICT_DATA_API);
  });

  it('should call get state API with correct url and response', () => {
    service.getStateData();
    expect(httpService.get).toHaveBeenCalledWith(STATE_DATA_API);
  });
});
