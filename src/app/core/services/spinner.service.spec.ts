import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { SpinnerService } from './spinner.service';

describe('SpinnerService', () => {
  let httpTestingController: HttpTestingController;
  let service: SpinnerService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SpinnerService],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(SpinnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true if start() is called', () => {
    service.isRequesting.subscribe((resp) => {
      expect(resp).toBeTrue();
    });
    service.start();
  });

  it('should return false if done() is called', () => {
    service.isRequesting.subscribe((resp) => {
      expect(resp).toBeFalse();
    });
    service.done();
  });
});
