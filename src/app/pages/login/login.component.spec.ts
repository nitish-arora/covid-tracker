import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { LoginComponent } from './login.component';
import { LoginService } from './services/login.service';
import { LogoutComponent } from '../logout/logout.component';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { mockUserData } from 'src/app/shared/mock/user.mock';
import { AppContextService } from 'src/app/core/services/app-context.service';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service: LoginService;
  let router: Router;
  let toastr: ToastrService;
  const mockRouter = jasmine.createSpyObj(['navigate']);
  const mockToasterService = jasmine.createSpyObj('mockToasterService', {
    success: 'success',
    error: 'error',
  });
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [LogoutComponent],
      providers: [
        FormBuilder,
        AppContextService,
        { provide: ToastrService, useValue: mockToasterService },
        {
          provide: LoginService,
          useClass: class MockLoginService {
            login = () => {};
          },
        },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.debugElement.componentInstance;
    router = TestBed.inject(Router);
    service = TestBed.inject(LoginService);
    toastr = TestBed.inject(ToastrService);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should login if valid credentials entered', () => {
    component.loginForm.patchValue({
      username: 'nitish',
      password: 'nitish',
    });
    const data = mockUserData.find(
      (x) =>
        x.username === component.loginForm.value.username &&
        x.password === component.loginForm.value.password
    )
      ? [
          mockUserData.find(
            (x) => x.username === component.loginForm.value.username
          ),
        ]
      : [];
    spyOn(service, 'login').and.returnValue(of(data));

    const elem = fixture.debugElement.query(By.css('#btn-login'));
    elem.triggerEventHandler('click', null);
    expect(toastr.success).toHaveBeenCalled();
  });

  it('Should not login if invalid credentials entered', () => {
    component.loginForm.patchValue({
      username: 'admin',
      password: 'admin',
    });
    const data = mockUserData.find(
      (x) =>
        x.username === component.loginForm.value.username &&
        x.password === component.loginForm.value.password
    )
      ? [
          mockUserData.find(
            (x) => x.username === component.loginForm.value.username
          ),
        ]
      : [];
    spyOn(service, 'login').and.returnValue(of(data));
    const elem = fixture.debugElement.query(By.css('#btn-login'));
    elem.triggerEventHandler('click', null);
    expect(toastr.error).toHaveBeenCalled();
  });
});
