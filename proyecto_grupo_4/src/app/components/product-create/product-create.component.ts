import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  standalone: true, // Necesario para un componente independiente
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss'],
  imports: [CommonModule, ReactiveFormsModule] // Esto asegura que ReactiveFormsModule se use aquí
})
export class ProductCreateComponent implements OnInit {
  productForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      tipo: [''],
      cantidad: [0, [Validators.required, Validators.min(0)]],
      ubicacion: [''],
      fk_fabricante: [null, Validators.required],
      precio_unitario: [0, [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.productService.createProducto(this.productForm.value).subscribe({
        next: () => {
          this.router.navigate(['/productos']);
        },
        error: (err: any) => {
          console.error('Error al crear producto:', err);
        }
      });
    }
  }

  volver() {
    this.router.navigate(['/productos']);
  }
}
