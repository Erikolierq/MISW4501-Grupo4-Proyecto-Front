import { ManufacturerCreateComponent } from './manufacturer-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ManufacturerService } from '../../services/manufacturer.service';

class MockManufacturerService {
  createManufacturer = jasmine.createSpy().and.returnValue(of({}));
}

class MockRouter {
  navigate = jasmine.createSpy();
}



describe('ManufacturerCreateComponent', () => {
  let component: ManufacturerCreateComponent;
  let fixture: ComponentFixture<ManufacturerCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManufacturerCreateComponent, ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        { provide: ManufacturerService, useClass: MockManufacturerService },
        { provide: Router, useClass: MockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ManufacturerCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it ('should call createFabricante and navigate on submit', () => {
    component.manufacturerForm.setValue({
      nombre: 'Test',
      pais_origen: 'Test',
      categoria: 'Test',
    });
    component.onSubmit();
    const manufacturerService = TestBed.inject(ManufacturerService);
    const router = TestBed.inject(Router);
    expect(manufacturerService.createManufacturer).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/fabricantes']);
  });
});
