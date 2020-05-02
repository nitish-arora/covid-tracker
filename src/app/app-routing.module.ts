import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* --- local dependencies -- */
import { APP_ROUTES } from './shared/config/routes.config';
import { LoginComponent } from './pages/login/login.component';
import { PrecautionsComponent } from './pages/precautions/precautions.component';
import { LoginRouteGaurd } from './core/gaurds/login-route/login-route.gaurd';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { LogoutComponent } from './pages/logout/logout.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: APP_ROUTES.DASHBOARD,
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginRouteGaurd],
  },
  {
    path: APP_ROUTES.PRECAUTIONS,
    component: PrecautionsComponent,
  },
  {
    path: APP_ROUTES.LOGOUT,
    component: LogoutComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
