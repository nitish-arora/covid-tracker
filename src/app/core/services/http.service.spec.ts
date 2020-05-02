import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpService } from 'src/app/core/services/http.service';
import { of, throwError } from 'rxjs';
import { SpinnerService } from './spinner.service';
import { ToastrService } from 'ngx-toastr';

describe('HttpService', () => {
  let httpTestingController: HttpTestingController;
  let service: HttpService;
  let spinnerService: SpinnerService;
  let toastrService: ToastrService;
  const mockToasterService = jasmine.createSpyObj('mockToasterService', {
    success: 'success',
    error: 'error',
  });
  const mockSpinnerService = jasmine.createSpyObj('mockSpinnerService', {
    start: of(true),
    done: of(false),
  });
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HttpService,
        { provide: SpinnerService, useValue: mockSpinnerService },
        { provide: ToastrService, useValue: mockToasterService },
      ],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(HttpService);
    spinnerService = TestBed.inject(SpinnerService);
    toastrService = TestBed.inject(ToastrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should call get() with correct url', () => {
    service.get('/testurl').subscribe((resp) => {
      expect(spinnerService.start).toHaveBeenCalled();
    });
    const req = httpTestingController.expectOne('/testurl');
    expect(req.request.method).toBe('GET');
    req.flush({
      list: [],
    });
    httpTestingController.verify();
  });

  it('Should call post() with correct url', () => {
    service.post('/testposturl').subscribe((resp) => {
      expect(spinnerService.start).toHaveBeenCalled();
    });
    const req = httpTestingController.expectOne('/testposturl');
    expect(req.request.method).toBe('POST');
    req.flush({
      success: true,
    });
    httpTestingController.verify();
  });

  it('Should handle if error API', () => {
    service.post('/testposturl').subscribe(
      (resp) => {},
      (err) => {
        expect(toastrService.error).toHaveBeenCalled();
      }
    );
    const req = httpTestingController.expectOne('/testposturl');
    expect(req.request.method).toBe('POST');

    req.flush(throwError({ status: 404, statusText: 'Not Found' }));
    httpTestingController.verify();
  });
});
