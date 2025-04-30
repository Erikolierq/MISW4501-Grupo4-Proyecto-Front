import { TestBed } from '@angular/core/testing';
import { LoginService } from './login.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('LoginService', () => {
  let service: LoginService;
  let httpMock: HttpTestingController;

  const baseUrl = 'https://impala-sensible-antelope.ngrok-free.app/auth';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoginService]
    });

    service = TestBed.inject(LoginService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Asegura que no queden requests pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should perform login and return token', () => {
    const mockLoginResponse = { token: 'fake-jwt-token' };

    service.login('testuser', 'password123').subscribe(response => {
      expect(response.token).toBe('fake-jwt-token');
    });

    const req = httpMock.expectOne(`${baseUrl}/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ username: 'testuser', password: 'password123' });
    req.flush(mockLoginResponse);
  });

  it('should register a new user', () => {
    const mockRegisterData = {
      email: 'test@example.com',
      nombre: 'Test User',
      password: '12345678',
      rol: 'USER'
    };

    const mockRegisterResponse = { message: 'Usuario registrado exitosamente' };

    service.registerUser(mockRegisterData).subscribe(response => {
      expect(response.message).toBe('Usuario registrado exitosamente');
    });

    const req = httpMock.expectOne(`${baseUrl}/register`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockRegisterData);
    req.flush(mockRegisterResponse);
  });
});
