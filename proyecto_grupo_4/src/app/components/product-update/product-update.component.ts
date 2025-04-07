import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { InventoryService } from '../../services/inventory.service';

@Component({
  selector: 'app-product-update',
  standalone: true,
  templateUrl: './product-update.component.html',
  styleUrl: './product-update.component.scss',
  imports: [CommonModule, ReactiveFormsModule]
})
export class ProductUpdateComponent {
  productForm!: FormGroup;
  productId!: number;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private productService: ProductService,
    private inventoryService: InventoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.productId = +idParam;

      // 1. Cargar los datos del producto desde el backend
      this.inventoryService.getProductoById(this.productId).subscribe({
        next: (producto) => {
          this.productForm = this.fb.group({
            nombre: [producto.nombre, Validators.required],
            descripcion: [producto.descripcion],
            tipo: [producto.tipo],
            cantidad: [producto.cantidad, [Validators.required, Validators.min(0)]],
            ubicacion: [producto.ubicacion],
            precio_unitario: [producto.precio_unitario, [Validators.required, Validators.min(0)]]
          });
        },
        error: (err) => {
          console.error('Error al cargar producto:', err);
          this.router.navigate(['/productos']);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.productService.updateProducto(this.productId, this.productForm.value).subscribe({
        next: () => this.router.navigate(['/productos']),
        error: (err) => console.error('Error al actualizar producto:', err)
      });
    }
  }

  volver() {
    this.router.navigate(['/productos']);
  }
}
