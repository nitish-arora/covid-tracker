import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpService } from 'src/app/core/services/http.service';
import { of } from 'rxjs';
import { CoreModule } from 'src/app/core/core.module';
import { NewsService } from './news.service';
import { mockNewsDetail } from 'src/app/shared/mock/news.mock';

const STATE_DATA_API = 'https://api.covid19india.org/data.json'; // url for fetching state data
const DISTRICT_DATA_API =
  'https://api.covid19india.org/state_district_wise.json'; // url for fetching district data
describe('NewsService', () => {
  let httpTestingController: HttpTestingController;
  let service: NewsService;
  let httpService: HttpService;
  const apiUrl = 'api/newsDetails';
  const mockHttpService = jasmine.createSpyObj('mockHttpService', {
    get: of(mockNewsDetail),
    post: of({ success: true }),
  });
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, CoreModule],
      providers: [
        { provide: HttpService, useValue: mockHttpService },
        NewsService,
      ],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(NewsService);
    httpService = TestBed.inject(HttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call get getAllNews API with correct url', () => {
    service.getAllNews();
    expect(httpService.get).toHaveBeenCalledWith(apiUrl);
  });

  it('should call get getNewsById API with correct url', () => {
    const id = 1;
    service.getNewsById(id);
    expect(httpService.get).toHaveBeenCalledWith(`${apiUrl}/${id}`);
  });

  it('should call saveNews API with correct url and payload', () => {
    const saveObj = mockNewsDetail[0];
    service.saveNews(saveObj);
    expect(httpService.post).toHaveBeenCalledWith(apiUrl, saveObj);
  });
});
