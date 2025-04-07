
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ProductMasiveComponent } from './product-masive.component';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { of } from 'rxjs';

class MockProductService {
  uploadCSV = jasmine.createSpy().and.returnValue(of({ enviados_a_cola: 5 }));
}
class MockRouter {
  navigate = jasmine.createSpy();
}

describe('ProductMasiveComponent', () => {
  let fixture: ComponentFixture<ProductMasiveComponent>;
  let component: ProductMasiveComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductMasiveComponent],
      providers: [
        { provide: ProductService, useClass: MockProductService },
        { provide: Router, useClass: MockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductMasiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should assign selected file on valid upload', () => {
    const fakeFile = new File(['test'], 'file.csv', { type: 'text/csv' });
    const event = { target: { files: [fakeFile] } };
    component.onFileChange(event);
    expect(component.selectedFile).toBe(fakeFile);
  });

  it('should call uploadCSV on uploadFile()', () => {
    const fakeFile = new File(['test'], 'file.csv', { type: 'text/csv' });
    component.selectedFile = fakeFile;
    component.uploadFile();
    expect(TestBed.inject(ProductService).uploadCSV).toHaveBeenCalled();
  });
});
