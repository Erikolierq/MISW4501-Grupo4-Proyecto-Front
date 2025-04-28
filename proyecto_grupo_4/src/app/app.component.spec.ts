import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let router: Router;
  let routerEventsSubject: Subject<any>;

  beforeEach(async () => {
    routerEventsSubject = new Subject<NavigationEnd>();

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]), // <-- CORRECTO! usar router testing real
        CommonModule,
        RouterOutlet,
        NavbarComponent,
        AppComponent
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
    spyOnProperty(router, 'events', 'get').and.returnValue(routerEventsSubject.asObservable());

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have as title "proyecto_grupo_4"', () => {
    expect(component.title).toEqual('proyecto_grupo_4');
  });

  it('should show navbar by default', () => {
    expect(component.showNavbar).toBeTrue();
  });

  it('should hide navbar when navigating to /login', fakeAsync(() => {
    const navEnd = new NavigationEnd(1, '/login', '/login');
    routerEventsSubject.next(navEnd);
    tick();
    fixture.detectChanges();
    expect(component.showNavbar).toBeFalse();
  }));

  it('should show navbar when navigating to non-login pages', fakeAsync(() => {
    const navEnd = new NavigationEnd(1, '/dashboard', '/dashboard');
    routerEventsSubject.next(navEnd);
    tick();
    fixture.detectChanges();
    expect(component.showNavbar).toBeTrue();
  }));
});
