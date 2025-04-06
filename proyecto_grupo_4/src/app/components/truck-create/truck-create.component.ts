import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  standalone: true,
  selector: 'app-truck-create',
  templateUrl: './truck-create.component.html',
  styleUrls: ['./truck-create.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class TruckCreateComponent implements OnInit {
  truckForm!: FormGroup;
  constructor(
        private fb: FormBuilder,
        private productService: ProductService,
        private router: Router
  ) { }

  ngOnInit() {
    this.truckForm = this.fb.group({
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
    if (this.truckForm.valid) {
      this.productService.createProducto(this.truckForm.value).subscribe({
        next: () => {
          this.router.navigate(['/camiones']);
        },
        error: (err: any) => {
          console.error('Error al crear producto:', err);
        }
      });
    }
  }

  volver() {
    this.router.navigate(['/camiones']);
  }
}
