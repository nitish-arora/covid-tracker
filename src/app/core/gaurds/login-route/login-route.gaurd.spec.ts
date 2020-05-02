import { LoginRouteGaurd } from './login-route.gaurd';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { ToastrService } from 'ngx-toastr';
import { LOCAL_STORAGE } from 'src/app/shared/config/storage.config';
import { APP_ROUTES } from 'src/app/shared/config/routes.config';

class MockActivatedRouteSnapshot {
  _routeConfig: any;
  get routeConfig() {
    return this._routeConfig;
  }
}

class MockToastrService {
  info(msg) {}
}

const mockRouter = jasmine.createSpyObj(['navigate']);

describe('Login Route Gaurd', () => {
  describe('canActivate', () => {
    let loginGaurd: LoginRouteGaurd;
    let router: Router;
    let route: ActivatedRouteSnapshot;
    let toastrService: ToastrService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          LoginRouteGaurd,
          { provide: Router, useValue: mockRouter },
          {
            provide: ActivatedRouteSnapshot,
            useClass: MockActivatedRouteSnapshot,
          },
          { provide: ToastrService, useClass: MockToastrService },
        ],
      });
      router = TestBed.inject(Router);
      loginGaurd = TestBed.inject(LoginRouteGaurd);
      toastrService = TestBed.inject(ToastrService);
    });

    afterEach(() => {
      localStorage.removeItem(LOCAL_STORAGE.TOKEN_KEY);
    });

    it('should be created', () => {
      expect(loginGaurd).toBeTruthy();
    });

    it('Redirect to dashboard if login url is hit and user is logged in', () => {
      route = TestBed.inject(ActivatedRouteSnapshot);
      spyOnProperty(route, 'routeConfig', 'get').and.returnValue({
        path: 'login',
      });
      localStorage.setItem(LOCAL_STORAGE.TOKEN_KEY, '1234');
      spyOn(toastrService, 'info');
      expect(loginGaurd.canActivate(route)).toEqual(false);
      expect(toastrService.info).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith([
        `/${APP_ROUTES.DASHBOARD}`,
      ]);
    });

    it('Allow navigate to login url if user is not logged in', () => {
      route = TestBed.inject(ActivatedRouteSnapshot);
      spyOnProperty(route, 'routeConfig', 'get').and.returnValue({
        path: 'login',
      });
      expect(loginGaurd.canActivate(route)).toEqual(true);
    });
  });
});
