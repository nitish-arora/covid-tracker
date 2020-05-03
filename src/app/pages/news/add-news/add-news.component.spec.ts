import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { APP_ROUTES } from 'src/app/shared/config/routes.config';
import { NewsService } from '../services/news.service';
import { of } from 'rxjs';
import { mockNewsDetail } from 'src/app/shared/mock/news.mock';
import { AppContextService } from 'src/app/core/services/app-context.service';
import { By } from '@angular/platform-browser';
import { AddNewsComponent } from './add-news.component';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

describe('AddNewsComponent', () => {
  let component: AddNewsComponent;
  let fixture: ComponentFixture<AddNewsComponent>;
  let router: Router;
  let service: NewsService;
  let activatedRoute: ActivatedRoute;
  let toastr: ToastrService;

  const mockRouter = jasmine.createSpyObj(['navigate']);
  const mockNewsService = jasmine.createSpyObj('mockNewsService', {
    saveNews: of({ success: true }),
    getAllNews: of(mockNewsDetail),
    getNewsById: of(mockNewsDetail[0]),
  });
  const mockToasterService = jasmine.createSpyObj('mockToasterService', {
    success: 'success',
    error: 'error',
  });
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatCardModule],
      declarations: [AddNewsComponent],
      providers: [
        AppContextService,
        FormBuilder,
        { provide: Router, useValue: mockRouter },
        { provide: ToastrService, useValue: mockToasterService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: of({ id: '1' }) },
          },
        },
        { provide: NewsService, useValue: mockNewsService },
      ],
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewsComponent);
    component = fixture.debugElement.componentInstance;
    router = TestBed.inject(Router);
    service = TestBed.inject(NewsService);
    activatedRoute = TestBed.inject(ActivatedRoute);
    toastr = TestBed.inject(ToastrService);
    component.createNewsForm();
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should add news if valid data entered', () => {
    component.addNewsForm.patchValue({
      title: 'test',
      summary: 'test summary',
      description: 'test decription',
      fullArticle: 'test article',
    });

    const elem = fixture.debugElement.query(By.css('#btn-add'));
    elem.triggerEventHandler('click', null);
    expect(toastr.success).toHaveBeenCalled();
  });

  it('Should go back news page if "Cancel" btn clicked', () => {
    const elem = fixture.debugElement.query(By.css('#btn-cancel'));
    elem.triggerEventHandler('click', null);
    expect(router.navigate).toHaveBeenCalledWith([`/${APP_ROUTES.NEWS}`]);
  });
});
