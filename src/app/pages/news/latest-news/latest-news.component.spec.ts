import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { APP_ROUTES } from 'src/app/shared/config/routes.config';
import { NewsService } from '../services/news.service';
import { of } from 'rxjs';
import { mockNewsDetail } from 'src/app/shared/mock/news.mock';
import { LatestNewsComponent } from './latest-news.component';
import { AppContextService } from 'src/app/core/services/app-context.service';
import { By } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';

describe('LatestNewsComponent', () => {
  let component: LatestNewsComponent;
  let fixture: ComponentFixture<LatestNewsComponent>;
  let router: Router;
  let service: NewsService;
  let activatedRoute: ActivatedRoute;
  const mockRouter = jasmine.createSpyObj(['navigate']);
  const mockNewsService = jasmine.createSpyObj('mockNewsService', {
    saveNews: of(),
    getAllNews: of(mockNewsDetail),
    getNewsById: of(mockNewsDetail[0]),
  });
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatCardModule],
      declarations: [LatestNewsComponent],
      providers: [
        AppContextService,
        { provide: Router, useValue: mockRouter },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: of({ id: '1' }) },
          },
        },
        { provide: NewsService, useValue: mockNewsService },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(LatestNewsComponent);
    component = fixture.debugElement.componentInstance;
    router = TestBed.inject(Router);
    service = TestBed.inject(NewsService);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should getAllNews() API', () => {
    service.getAllNews().subscribe((resp) => {
      expect(component.newsArrayLength).toEqual(mockNewsDetail.length);
    });
  });

  it('Should redirect to full news page if "Read full news" btn clicked', () => {
    const elem = fixture.debugElement.query(By.css('#btn-full'));
    elem.triggerEventHandler('click', null);
    expect(router.navigate).toHaveBeenCalledWith([`/${APP_ROUTES.NEWS}`, 1]);
  });
});
