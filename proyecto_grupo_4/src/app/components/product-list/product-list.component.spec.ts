import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductListComponent } from './product-list.component';
import { InventoryService } from '../../services/inventory.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { of } from 'rxjs';
import { Product } from '../../models/product.model';

// Ajusta la estructura de tu Product con la nueva forma
// (producto_id, nombre, cantidad, precio_unitario, etc.)
class MockInventoryService {
  getProductos() {
    // Retorna un observable que emite un array con la estructura nueva
    return of<Product[]>([
      {
        producto_id: 1,
        nombre: 'Mock1',
        tipo: 'A',
        cantidad: 10,
        ubicacion: 'Bodega X',
        descripcion: 'Desc 1',
        precio_unitario: 100.5,
        creado_en: '2025-04-06T15:36:10.079651'
      },
      {
        producto_id: 2,
        nombre: 'Mock2',
        tipo: 'A',
        cantidad: 20,
        ubicacion: 'Bodega Y',
        descripcion: 'Desc 2',
        precio_unitario: 200.75,
        creado_en: '2025-04-06T15:36:10.083970'
      },
      {
        producto_id: 3,
        nombre: 'Mock3',
        tipo: 'A',
        cantidad: 30,
        ubicacion: 'Bodega Z',
        descripcion: 'Desc 3',
        precio_unitario: 300.25,
        creado_en: '2025-04-06T15:36:10.123456'
      }
    ]);
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
    fixture.detectChanges(); // ngOnInit se llama aquí y carga los productos
  });

  it('should create the ProductListComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should load products from the service', () => {
    // Debe haber cargado 3 productos desde el mock
    expect(component.productos.length).toBe(3);
  });

  it('should paginate properly (pageSize=5 by default)', () => {
    // Como solo hay 3 productos, la paginación con pageSize=5 mostrará 3
    expect(component.paginatedProducts.length).toBe(3);
  });

  it('should go to next page if there are more products', () => {
    // Simulamos que el servicio retorna 7 productos
    const service = TestBed.inject(InventoryService);

    spyOn(service, 'getProductos').and.returnValue(
      of(Array.from({ length: 7 }).map((_, i) => ({
        producto_id: i + 1,
        nombre: 'Mock' + (i + 1),
        tipo: 'A',
        cantidad: 10,
        ubicacion: 'Fake',
        descripcion: 'Desc ' + (i + 1),
        precio_unitario: 99,
        creado_en: '2025-04-06T15:36:10.000000'
      })))
    );

    // Vuelve a crear el componente para que use el nuevo spy
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // pageSize=5, por lo que paginatedProducts debe tener 5
    expect(component.paginatedProducts.length).toBe(5);

    // Al hacer nextPage, page pasa a 2 y deben quedar 2
    component.nextPage();
    expect(component.page).toBe(2);
    expect(component.paginatedProducts.length).toBe(2);
  });

  it('should go to previous page', () => {
    // Forzamos la página 2 y probamos que prevPage() va a 1
    component.page = 2;
    component.prevPage();
    expect(component.page).toBe(1);
  });
});
