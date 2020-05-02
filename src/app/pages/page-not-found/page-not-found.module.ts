import { NgModule } from '@angular/core';

/* --- local dependencies -- */
import { PageNotFoundComponent } from './page-not-found.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [SharedModule],
  declarations: [PageNotFoundComponent],
})
export class PageNotFoundModule {}
