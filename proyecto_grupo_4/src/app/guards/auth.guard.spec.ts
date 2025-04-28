import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { Router } from '@angular/router';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: Router, useValue: mockRouter }
      ]
    });

    guard = TestBed.inject(AuthGuard);
  });

  afterEach(() => {
    sessionStorage.clear(); // Limpia el sessionStorage después de cada test
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow activation if token exists', () => {
    sessionStorage.setItem('token', 'fake-token');

    const result = guard.canActivate();

    expect(result).toBeTrue();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should navigate to /login and prevent activation if token does not exist', () => {
    // No se setea ningún token

    const result = guard.canActivate();

    expect(result).toBeFalse();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });
});
