import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { APP_ROUTES } from 'src/app/shared/config/routes.config';
import { FullNewsComponent } from './full-news.component';
import { NewsService } from '../services/news.service';
import { of } from 'rxjs';
import { mockNewsDetail } from 'src/app/shared/mock/news.mock';
import { NotFoundComponent } from 'src/app/shared/components/not-found/not-found.component';

describe('FullNewsComponent', () => {
  let component: FullNewsComponent;
  let fixture: ComponentFixture<FullNewsComponent>;
  let router: Router;
  let service: NewsService;
  const mockRouter = jasmine.createSpyObj(['navigate']);
  const mockNewsService = jasmine.createSpyObj('mockNewsService', {
    saveNews: of(),
    getAllNews: of(),
    getNewsById: of(mockNewsDetail[0]),
  });
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [FullNewsComponent, NotFoundComponent],
      providers: [
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

    fixture = TestBed.createComponent(FullNewsComponent);
    component = fixture.debugElement.componentInstance;
    router = TestBed.inject(Router);
    service = TestBed.inject(NewsService);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should call getNewsById()', () => {
    service.getNewsById(1).subscribe((resp) => {
      expect(component.news.id).toEqual(mockNewsDetail[0].id);
    });
  });

  it('Should redirect to latest news if "Back" btn clicked', () => {
    component.backToNews();
    expect(router.navigate).toHaveBeenCalledWith([`/${APP_ROUTES.NEWS}`]);
  });
});
