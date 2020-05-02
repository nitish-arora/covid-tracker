import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { LogoutComponent } from './logout.component';
import { By } from '@angular/platform-browser';
import { APP_ROUTES } from 'src/app/shared/config/routes.config';

describe('LogoutComponent', () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;
  let router: Router;
  const mockRouter = jasmine.createSpyObj(['navigate']);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [LogoutComponent],
      providers: [
        {
          provide: Router,
          useValue: mockRouter,
        },
      ],
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.debugElement.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('Should redirect to login if "Login Again" btn clicked', () => {
  //   const elem = fixture.debugElement.query(By.css('#btn-login'));
  //   elem.triggerEventHandler('click', null);
  //   expect(router.navigate).toHaveBeenCalledWith([`/${APP_ROUTES.LOGIN}`]);
  // });

  it('Should redirect to dashboard if "Go to Dashboard" btn clicked', () => {
    const elem = fixture.debugElement.query(By.css('#btn-dashboard'));
    elem.triggerEventHandler('click', null);
    expect(router.navigate).toHaveBeenCalledWith([`/${APP_ROUTES.DASHBOARD}`]);
  });
});
