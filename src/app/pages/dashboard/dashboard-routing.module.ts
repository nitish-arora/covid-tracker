import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* --- local dependencies -- */
import { APP_ROUTES } from './../../shared/config/routes.config';
import { StateDataComponent } from './state-data/state-data.component';
import { DistrictDataComponent } from './district-data/district-data.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: APP_ROUTES.DASHBOARD,
    component: DashboardComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: StateDataComponent,
      },
      {
        path: ':state',
        component: DistrictDataComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
