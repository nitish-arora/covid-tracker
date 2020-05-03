import { Router } from '@angular/router';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from './dashboard-routing.module';
import { StateDataComponent } from './state-data/state-data.component';
import { DistrictDataComponent } from './district-data/district-data.component';
import { APP_ROUTES } from 'src/app/shared/config/routes.config';
import { Location } from '@angular/common';

describe('Router: Dashbaord', () => {
  let location: Location;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [StateDataComponent, DistrictDataComponent],
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    router.initialNavigation();
  });

  it('navigate to /dashboard redirects you to /dashboard', fakeAsync(() => {
    router.navigate([`/${APP_ROUTES.DASHBOARD}`]);
    tick();
    expect(location.path()).toBe(`/${APP_ROUTES.DASHBOARD}`);
  }));

  it('navigate to /dashboard/abc redirects you to /dashboard/abc', fakeAsync(() => {
    router.navigate([`/${APP_ROUTES.DASHBOARD}/abc`]);
    tick();
    expect(location.path()).toBe(`/${APP_ROUTES.DASHBOARD}/abc`);
  }));
});
