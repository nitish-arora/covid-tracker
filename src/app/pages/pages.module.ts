import { NgModule } from '@angular/core';

/* --- local dependencies -- */
import { LoginModule } from './login/login.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { NewsModule } from './news/news.module';
import { PrecautionsModule } from './precautions/precautions.module';
import { PageNotFoundModule } from './page-not-found/page-not-found.module';
import { LogoutModule } from './logout/logout.module';

@NgModule({
  imports: [
    LoginModule,
    DashboardModule,
    NewsModule,
    PrecautionsModule,
    PageNotFoundModule,
    LogoutModule,
  ],
})
export class PagesModule {}
