// import { TestBed, async, ComponentFixture } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
// import { Router, NavigationEnd } from '@angular/router';
// import { HeaderComponent } from './header.component';
// import { AppContextService } from 'src/app/core/services/app-context.service';
// import { of } from 'rxjs';
// import { APP_ROUTES } from '../../config/routes.config';

// describe('HeaderComponent', () => {
//   let component: HeaderComponent;
//   let fixture: ComponentFixture<HeaderComponent>;
//   let router: Router;
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       imports: [RouterTestingModule],
//       declarations: [HeaderComponent],
//       providers: [
//         AppContextService,
//         {
//           provide: Router,
//           useValue: {
//             url: '/dashboard',
//             events: of(new NavigationEnd(0, '/dashboard', '/news')),
//             navigate: jasmine.createSpy('navigate'),
//           },
//         },
//       ],
//     }).compileComponents();
//   }));
//   beforeEach(() => {
//     fixture = TestBed.createComponent(HeaderComponent);
//     component = fixture.debugElement.componentInstance;
//     router = TestBed.inject(Router);
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('Should redirect to login if login clicked', () => {
//     component.logIn();
//     expect(router.navigate).toHaveBeenCalledWith([`/${APP_ROUTES.LOGIN}`]);
//   });
//   // it('Should redirect to logount if \'Logout\' clicked', () => {
//   //     component.logOut();
//   //     expect(router.navigate).toHaveBeenCalledWith([`/${APP_ROUTES.LOGOUT}`]);
//   // });
// });
