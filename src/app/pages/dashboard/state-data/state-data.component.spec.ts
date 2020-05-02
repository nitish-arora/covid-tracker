import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { StateDataComponent } from './state-data.component';
import { of } from 'rxjs';
import { DashboardService } from '../services/dashboard.service';
import {
  mockStateData,
  mockDistrictData,
} from '../../../shared/mock/dashboard.mock';
import { By } from '@angular/platform-browser';
import { APP_ROUTES } from '../../../shared/config/routes.config';

describe('StateDataComponent', () => {
  let component: StateDataComponent;
  let fixture: ComponentFixture<StateDataComponent>;
  let service: DashboardService;
  let router: Router;
  const mockState = 'Maharashtra';
  const mockDashboardService = jasmine.createSpyObj('mockDashboardService', {
    getStateData: of(mockStateData),
    getDistrictData: of(mockDistrictData),
  });
  const mockRouter = jasmine.createSpyObj(['navigate']);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [StateDataComponent],
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
            params: of({ state: mockState }),
          },
        },
      ],
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(StateDataComponent);
    component = fixture.debugElement.componentInstance;
    router = TestBed.inject(Router);
    service = TestBed.inject(DashboardService);
    component.stateData = mockStateData.statewise;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should redirect to district if row clicked', () => {
    component.showDistrictData(mockState);
    expect(router.navigate).toHaveBeenCalledWith([
      `${APP_ROUTES.DASHBOARD}`,
      mockState,
    ]);
  });
});
