import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { LoginComponent } from './login.component';
import { LoginService } from '../../services/login/login.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // 💥 Agrega esto

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockLoginService: jasmine.SpyObj<LoginService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockLoginService = jasmine.createSpyObj('LoginService', ['login']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        FormsModule,
        CommonModule,
        HttpClientModule // 💥 IMPORTANTE para resolver NullInjectorError
      ],
      providers: [
        { provide: LoginService, useValue: mockLoginService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call LoginService.login() and navigate to /productos on successful login', fakeAsync(() => {
    const mockResponse = { token: 'fake-token' };
    mockLoginService.login.and.returnValue(of(mockResponse));

    component.email = 'test@example.com';
    component.password = 'password123';

    component.login();
    tick();

    expect(mockLoginService.login).toHaveBeenCalledWith('test@example.com', 'password123');
    expect(sessionStorage.getItem('token')).toBe('fake-token');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/productos']);
  }));

  it('should show an alert on failed login', fakeAsync(() => {
    spyOn(window, 'alert');
    const mockError = { status: 401 };
    mockLoginService.login.and.returnValue(throwError(() => mockError));

    component.email = 'wrong@example.com';
    component.password = 'wrongpassword';

    component.login();
    tick();

    expect(mockLoginService.login).toHaveBeenCalledWith('wrong@example.com', 'wrongpassword');
    expect(window.alert).toHaveBeenCalledWith('Correo o contraseña incorrectos');
  }));

  it('should navigate to /register when calling goToRegister()', () => {
    component.goToRegister();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/register']);
  });
});
