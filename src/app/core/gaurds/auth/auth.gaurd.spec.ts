import { AuthGaurd } from './auth.gaurd';
import { APP_ROUTES } from 'src/app/shared/config/routes.config';
import { LOCAL_STORAGE } from 'src/app/shared/config/storage.config';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TestBed } from '@angular/core/testing';

class MockToastrService {
  warning(msg) {}
}

const mockRouter = jasmine.createSpyObj(['navigate']);

describe('AuthGaurd', () => {
  let authGaurd: AuthGaurd;
  let router: Router;
  let toastr: ToastrService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGaurd,
        { provide: Router, useValue: mockRouter },
        { provide: ToastrService, useClass: MockToastrService },
      ],
    });
    router = TestBed.inject(Router);
    authGaurd = TestBed.inject(AuthGaurd);
    toastr = TestBed.inject(ToastrService);
  });

  afterEach(() => {
    localStorage.removeItem(LOCAL_STORAGE.TOKEN_KEY);
    router = null;
    toastr = null;
  });

  it('should return true for logged in user', () => {
    localStorage.setItem(LOCAL_STORAGE.TOKEN_KEY, '1234');
    expect(authGaurd.canActivate()).toEqual(true);
  });

  it('should return false for a logged out user', () => {
    spyOn(toastr, 'warning');
    expect(authGaurd.canActivate()).toEqual(false);
    expect(toastr.warning).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith([`/${APP_ROUTES.LOGIN}`]);
  });
});
