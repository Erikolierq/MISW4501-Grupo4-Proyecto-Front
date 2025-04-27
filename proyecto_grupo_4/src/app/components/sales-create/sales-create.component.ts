import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SalesListService } from '../../services/sales-list/sales-list.service';

@Component({
  selector: 'app-sales-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sales-create.component.html',
  styleUrls: ['./sales-create.component.scss']
})
export class SalesCreateComponent implements OnInit {
  salesForm: FormGroup;
  constructor(private fb: FormBuilder, private salesListService: SalesListService, private router: Router) {
    this.salesForm = this.fb.group({
      id_cliente: [null, Validators.required],
      id_vendedor: [null, Validators.required],
      detalles: this.fb.array([])
    });
  }

  ngOnInit(): void {}

  get detalles(): FormArray {
    return this.salesForm.get('detalles') as FormArray;
  }

  addDetalle(): void {
    const detalleGroup = this.fb.group({
      id_producto: [null, Validators.required],
      cantidad: [null, Validators.required],
      precio_unitario: [null, Validators.required]
    });
    this.detalles.push(detalleGroup);
  }

  removeDetalle(index: number): void {
    this.detalles.removeAt(index);
  }

  onSubmit(): void {
    if (this.salesForm.valid) {
      const saleData = this.salesForm.value;
      this.salesListService.createSale(saleData).subscribe({
        next: (response) => {
          this.router.navigate(['/ventas']);

        },
        error: (error) => {
          console.error('Error creating sale:', error);
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }

  volver(): void {

    this.router.navigate(['/ventas']);
  }
}
