import { TestBed, ComponentFixture, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SpinnerComponent } from './spinner.component';
import { SpinnerService } from 'src/app/core/services/spinner.service';

describe('Spinner Component', () => {
  let component: SpinnerComponent;
  let fixture: ComponentFixture<SpinnerComponent>;
  let spinnerService: SpinnerService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpinnerComponent],
      providers: [SpinnerService],
    });
    fixture = TestBed.createComponent(SpinnerComponent);
    component = fixture.componentInstance;
    spinnerService = TestBed.inject(SpinnerService);
  });

  it('should create the spinner component', () => {
    expect(component).toBeTruthy();
  });

  it('should show loader when start() is called', fakeAsync(() => {
    component.ngOnInit();
    spinnerService.isRequesting.subscribe((resp) => {
      expect(resp).toBeTrue();
      fixture.detectChanges();
      const loaderEl = fixture.debugElement.query(By.css('.loading-indicator'));
      expect(loaderEl).toBeTruthy();
    });
    spinnerService.start();
  }));

  it('should hide loader when done() is called', fakeAsync(() => {
    component.ngOnInit();
    spinnerService.isRequesting.subscribe((resp) => {
      expect(resp).toBeFalse();
      fixture.detectChanges();
      const loaderEl = fixture.debugElement.query(By.css('.loading-indicator'));
      expect(loaderEl).toBeFalsy();
    });
    spinnerService.done();
  }));
});
