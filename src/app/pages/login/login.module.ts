import { NgModule } from '@angular/core';

/* --- local dependencies -- */
import { LoginService } from './services/login.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [SharedModule],
  declarations: [LoginComponent],
  providers: [LoginService],
})
export class LoginModule {}
