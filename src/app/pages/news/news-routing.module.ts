import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/** --- local dependencies -- */
import { APP_ROUTES } from 'src/app/shared/config/routes.config';
import { NewsComponent } from './news.component';
import { LatestNewsComponent } from './latest-news/latest-news.component';
import { AddNewsComponent } from './add-news/add-news.component';
import { AuthGaurd } from 'src/app/core/gaurds/auth/auth.gaurd';
import { FullNewsComponent } from './full-news/full-news.component';

export const routes: Routes = [
  {
    path: APP_ROUTES.NEWS,
    component: NewsComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: LatestNewsComponent,
      },
      {
        path: APP_ROUTES.ADD_NEWS,
        component: AddNewsComponent,
        canActivate: [AuthGaurd],
      },
      {
        path: ':id',
        component: FullNewsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsRoutingModule {}
