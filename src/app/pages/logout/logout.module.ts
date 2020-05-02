import { NgModule } from '@angular/core';

/* --- local dependencies -- */
import { LogoutComponent } from './logout.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [SharedModule],
  declarations: [LogoutComponent],
})
export class LogoutModule {}
