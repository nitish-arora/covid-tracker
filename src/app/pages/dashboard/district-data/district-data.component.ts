import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

/* --- local dependencies -- */
import { APP_ROUTES } from 'src/app/shared/config/routes.config';
import { DashboardService } from '../services/dashboard.service';

/**
 * Component for showing data district wise
 */
@Component({
  selector: 'app-district-data',
  templateUrl: 'district-data.component.html',
  styleUrls: ['./district-data.component.css'],
})
export class DistrictDataComponent implements OnInit {
  public title: string = 'District Wise Data';
  public state: string;
  public districtData = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dashboardService: DashboardService
  ) {}

  /**
   * fetching district data
   */
  ngOnInit() {
    this.state = this.activatedRoute.snapshot.params.state;
    this.dashboardService.getDistrictData().subscribe((data) => {
      this.districtData = data[this.state]?.districtData;
    });
  }

  /**
   * function to navigate to dashboard page
   */
  goToStateData() {
    this.router.navigate([`/${APP_ROUTES.DASHBOARD}`]);
  }
}
