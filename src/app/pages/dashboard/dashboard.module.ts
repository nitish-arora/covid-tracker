import { NgModule } from '@angular/core';

/* --- local dependencies -- */
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { DistrictDataComponent } from './district-data/district-data.component';
import { StateDataComponent } from './state-data/state-data.component';
import { DashboardService } from './/services/dashboard.service';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  imports: [SharedModule, DashboardRoutingModule],
  declarations: [DashboardComponent, DistrictDataComponent, StateDataComponent],
  providers: [DashboardService],
})
export class DashboardModule {}
