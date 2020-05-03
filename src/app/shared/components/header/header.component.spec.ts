import {
  TestBed,
  async,
  ComponentFixture,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, NavigationEnd } from '@angular/router';
import { HeaderComponent } from './header.component';
import { AppContextService } from 'src/app/core/services/app-context.service';
import { of } from 'rxjs';
import { APP_ROUTES } from '../../config/routes.config';
import { By } from '@angular/platform-browser';
import { LOCAL_STORAGE } from '../../config/storage.config';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;
  let appContextService: AppContextService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [HeaderComponent],
      providers: [
        AppContextService,
        // {
        //   provide: Router,
        //   useValue: {
        //     url: '/dashboard',
        //     events: of(new NavigationEnd(0, '/dashboard', '/news')),
        //     navigate: {},
        //   },
        // },
      ],
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.debugElement.componentInstance;
    router = TestBed.inject(Router);
    appContextService = TestBed.inject(AppContextService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should redirect to login if login clicked', () => {
    spyOn(router, 'navigate');
    component.logIn();
    expect(router.navigate).toHaveBeenCalledWith([`/${APP_ROUTES.LOGIN}`]);
  });

  it('Should redirect to logount if Logout clicked', fakeAsync(() => {
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));
    component.logOut();
    tick();
    expect(router.navigate).toHaveBeenCalledWith([`/${APP_ROUTES.LOGOUT}`]);
  }));

  it('should show username when user is logged in', async(() => {
    component.ngOnInit();
    appContextService.isUserLoggedIn.subscribe((value) => {
      expect(value).toBeTrue();
      fixture.detectChanges();
      const elem = fixture.debugElement.query(By.css('span.username'));
      expect(elem).toBeTruthy();
    });
    appContextService.login();
  }));
});
