import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login/login.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let mockLoginService: jasmine.SpyObj<LoginService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockLoginService = jasmine.createSpyObj('LoginService', ['registerUser']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        RegisterComponent,
        CommonModule,
        FormsModule,
        HttpClientModule
      ],
      providers: [
        { provide: LoginService, useValue: mockLoginService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call registerUser and navigate to /login on successful registration', fakeAsync(() => {
    // Arrange
    const mockResponse = { message: 'Usuario registrado' };
    mockLoginService.registerUser.and.returnValue(of(mockResponse));
    spyOn(window, 'alert');

    component.email = 'test@example.com';
    component.nombre = 'Test User';
    component.password = 'password123';
    component.rol = 'ADMIN';

    // Act
    component.register();
    tick();

    // Assert
    expect(mockLoginService.registerUser).toHaveBeenCalledWith({
      email: 'test@example.com',
      nombre: 'Test User',
      password: 'password123',
      rol: 'ADMIN'
    });
    expect(window.alert).toHaveBeenCalledWith('Usuario registrado exitosamente.');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  }));

  it('should show an error alert if registration fails', fakeAsync(() => {
    // Arrange
    const mockError = { status: 500 };
    mockLoginService.registerUser.and.returnValue(throwError(() => mockError));
    spyOn(window, 'alert');
    spyOn(console, 'error');

    component.email = 'error@example.com';
    component.nombre = 'Error User';
    component.password = 'wrongpassword';
    component.rol = 'CLIENTE';

    // Act
    component.register();
    tick();

    // Assert
    expect(window.alert).toHaveBeenCalledWith('Error al registrar el usuario.');
    expect(console.error).toHaveBeenCalledWith(mockError);
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  }));
});
