import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductListComponent } from './product-list.component';
import { InventoryService } from '../../services/inventory.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

class MockInventoryService {
  getProductos() {
    return [
      { id: 1, nombre: 'Mock1', tipo: 'A', cantidad: 10, ubicacion: '', fabricante: '', precio: 1 },
      { id: 2, nombre: 'Mock2', tipo: 'A', cantidad: 20, ubicacion: '', fabricante: '', precio: 2 },
      { id: 3, nombre: 'Mock3', tipo: 'A', cantidad: 30, ubicacion: '', fabricante: '', precio: 3 }
    ];
  }
}

describe('ProductListComponent', () => {
  let fixture: ComponentFixture<ProductListComponent>;
  let component: ProductListComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProductListComponent,
        RouterTestingModule,
        CommonModule,
        RouterLink
      ],
      providers: [
        { provide: InventoryService, useClass: MockInventoryService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the ProductListComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should load products from the service', () => {
    expect(component.productos.length).toBe(3);
  });

  it('should paginate properly (pageSize=5 by default)', () => {
    expect(component.paginatedProducts.length).toBe(3);
  });

  it('should go to next page if there are more products', () => {
    const service = TestBed.inject(InventoryService);
    spyOn(service, 'getProductos').and.returnValue(Array.from({ length: 7 }).map((_, i) => ({
      id: i + 1, nombre: 'Mock' + (i+1), tipo: '', cantidad: 10, ubicacion: '', fabricante: '', precio: 1
    })));
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.paginatedProducts.length).toBe(5);
    component.nextPage();
    expect(component.page).toBe(2);
    expect(component.paginatedProducts.length).toBe(2);
  });

  it('should go to previous page', () => {
    component.page = 2;
    component.prevPage();
    expect(component.page).toBe(1);
  });
});
