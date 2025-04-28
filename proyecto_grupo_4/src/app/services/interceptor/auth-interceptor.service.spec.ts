import { TestBed } from '@angular/core/testing';
import { AuthInterceptor } from './auth-interceptor.service';
import { HTTP_INTERCEPTORS, HttpClient, HttpRequest, HttpHandler, HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('AuthInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  const dummyUrl = '/dummy-endpoint';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthInterceptor,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true
        }
      ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya peticiones pendientes
    sessionStorage.clear(); // Limpia token entre pruebas
  });

  it('should add Authorization header if token exists', () => {
    const token = 'fake-token';
    sessionStorage.setItem('token', token);

    httpClient.get(dummyUrl).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(dummyUrl);
    expect(req.request.headers.has('Authorization')).toBeTrue();
    expect(req.request.headers.get('Authorization')).toBe(`bearer ${token}`);

    req.flush({ success: true });
  });

  it('should not add Authorization header if token does not exist', () => {
    sessionStorage.removeItem('token');

    httpClient.get(dummyUrl).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(dummyUrl);
    expect(req.request.headers.has('Authorization')).toBeFalse();

    req.flush({ success: true });
  });
});
