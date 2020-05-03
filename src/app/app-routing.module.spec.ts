import { Router } from '@angular/router';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from './app-routing.module';
import { APP_ROUTES } from 'src/app/shared/config/routes.config';
import { Location } from '@angular/common';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { PrecautionsComponent } from './pages/precautions/precautions.component';

describe('Router: App', () => {
  let location: Location;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [DashboardComponent, LogoutComponent, PrecautionsComponent],
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    router.initialNavigation();
  });

  it('navigate to "" redirects you to /dashboard', fakeAsync(() => {
    router.navigate([``]);
    tick();
    expect(location.path()).toBe(`/${APP_ROUTES.DASHBOARD}`);
  }));

  it('navigate to /precautions redirects you to /precautions', fakeAsync(() => {
    router.navigate([`/${APP_ROUTES.PRECAUTIONS}`]);
    tick();
    expect(location.path()).toBe(`/${APP_ROUTES.PRECAUTIONS}`);
  }));

  it('navigate to /logout redirects you to /logout', fakeAsync(() => {
    router.navigate([`/${APP_ROUTES.LOGOUT}`]);
    tick();
    expect(location.path()).toBe(`/${APP_ROUTES.LOGOUT}`);
  }));
});
