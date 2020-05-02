import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpService } from 'src/app/core/services/http.service';
import { of } from 'rxjs';
import { LoginService } from './login.service';
import { mockUserData } from 'src/app/shared/mock/user.mock';

describe('LoginService', () => {
  let httpTestingController: HttpTestingController;
  let service: LoginService;
  let httpService: HttpService;
  const mockHttpService = jasmine.createSpyObj('mockHttpService', {
    get: of([mockUserData]),
  });
  const apiURL = 'api/userDetails?username=';
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: HttpService, useValue: mockHttpService },
        LoginService,
      ],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(LoginService);
    httpService = TestBed.inject(HttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call login API with correct url based on userdata provided', () => {
    service.login(mockUserData[0]);
    expect(httpService.get).toHaveBeenCalledWith(
      `${apiURL}${mockUserData[0].username}`
    );
  });
});
