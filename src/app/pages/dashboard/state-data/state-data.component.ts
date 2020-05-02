import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/* --- local dependencies -- */
import { IStateCase } from 'src/app/shared/interfaces/IStateCase';
import { APP_ROUTES } from 'src/app/shared/config/routes.config';
import { DashboardService } from '../services/dashboard.service';

/**
 * Component for showing data state wise
 */
@Component({
  selector: 'app-state-data',
  templateUrl: 'state-data.component.html',
})
export class StateDataComponent implements OnInit {
  public title: string = 'State Wise Data';
  public stateData: IStateCase[] = [];

  constructor(
    private router: Router,
    private dashboardService: DashboardService
  ) {}

  ngOnInit() {
    this.dashboardService.getStateData().subscribe((data) => {
      this.stateData = data.statewise.splice(1);
    });
  }

  showDistrictData(state: string) {
    this.router.navigate([`${APP_ROUTES.DASHBOARD}`, state]);
  }
}
