import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DistrictDataComponent } from './district-data.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { DashboardService } from '../services/dashboard.service';
import {
  mockStateData,
  mockDistrictData,
} from '../../../shared/mock/dashboard.mock';
import { By } from '@angular/platform-browser';
import { APP_ROUTES } from '../../../shared/config/routes.config';

describe('DistrictDataComponent', () => {
  let component: DistrictDataComponent;
  let fixture: ComponentFixture<DistrictDataComponent>;
  let service: DashboardService;
  let router: Router;
  const mockDashboardService = jasmine.createSpyObj('', {
    getStateData: of(mockStateData),
    getDistrictData: of(mockDistrictData),
  });
  const mockRouter = jasmine.createSpyObj(['navigate']);
  const mockRoute = { state: 'Maharashtra' };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [DistrictDataComponent],
      providers: [
        {
          provide: DashboardService,
          useValue: mockDashboardService,
        },
        {
          provide: Router,
          useValue: mockRouter,
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { state: 'Maharashtra' } },
          },
        },
      ],
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(DistrictDataComponent);
    component = fixture.debugElement.componentInstance;
    router = TestBed.inject(Router);
    service = TestBed.inject(DashboardService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should redirect to dashboard if Back button clicked', () => {
    const elem = fixture.debugElement.query(By.css('#btnBack'));
    elem.triggerEventHandler('click', null);
    expect(router.navigate).toHaveBeenCalledWith([`/${APP_ROUTES.DASHBOARD}`]);
  });
});
