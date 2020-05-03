import { Router } from '@angular/router';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from './news-routing.module';
import { APP_ROUTES } from 'src/app/shared/config/routes.config';
import { Location } from '@angular/common';
import { NewsComponent } from './news.component';
import { LatestNewsComponent } from './latest-news/latest-news.component';

describe('Router: News', () => {
  let location: Location;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [NewsComponent, LatestNewsComponent],
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    router.initialNavigation();
  });

  it('navigate to /news redirects you to /news', fakeAsync(() => {
    router.navigate([`/${APP_ROUTES.NEWS}`]);
    tick();
    expect(location.path()).toBe(`/${APP_ROUTES.NEWS}`);
  }));

  it('navigate to /news/1 redirects you to /news/1', fakeAsync(() => {
    router.navigate([`/${APP_ROUTES.NEWS}/1`]);
    tick();
    expect(location.path()).toBe(`/${APP_ROUTES.NEWS}/1`);
  }));
});
