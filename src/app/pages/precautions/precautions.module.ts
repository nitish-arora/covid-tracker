import { NgModule } from '@angular/core';

/* --- local dependencies -- */
import { SharedModule } from 'src/app/shared/shared.module';
import { PrecautionsComponent } from './precautions.component';

@NgModule({
  imports: [SharedModule],
  declarations: [PrecautionsComponent],
})
export class PrecautionsModule {}
