import {
  NgModule,
  Optional,
  SkipSelf,
  ModuleWithProviders,
} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

/* --- local dependencies -- */
import { HttpService } from './services/http.service';
import { AppContextService } from './services/app-context.service';
import { AuthGaurd } from './gaurds/auth/auth.gaurd';
import { LoginRouteGaurd } from './gaurds/login-route/login-route.gaurd';
import { SpinnerService } from './services/spinner.service';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule,
    HttpClientModule,
    ToastrModule.forRoot({ positionClass: 'toast-bottom-right' }),
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parent: CoreModule) {
    if (parent) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only'
      );
    }
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        HttpService,
        AppContextService,
        SpinnerService,
        AuthGaurd,
        LoginRouteGaurd,
      ],
    };
  }
}
