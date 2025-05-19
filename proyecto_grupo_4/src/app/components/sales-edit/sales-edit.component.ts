import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SalesListService } from '../../services/sales-list/sales-list.service';

@Component({
  selector: 'app-sales-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sales-edit.component.html',
  styleUrls: ['./sales-edit.component.scss']
})
export class SalesEditComponent implements OnInit {
  salesForm: FormGroup;
  saleId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private salesListService: SalesListService,
    public router: Router
  ) {
    this.salesForm = this.fb.group({
      id_cliente: [null, Validators.required],
      id_vendedor: [null, Validators.required],
      detalles: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.saleId = +this.route.snapshot.paramMap.get('id')!;
    this.loadSale();
  }

  get detalles(): FormArray {
    return this.salesForm.get('detalles') as FormArray;
  }

  loadSale(): void {
    this.salesListService.getSaleById(this.saleId).subscribe({
      next: (sale) => {
        this.salesForm.patchValue({
          id_cliente: sale.id_cliente,
          id_vendedor: sale.id_vendedor
        });

        sale.detalles.forEach((detalle: any) => {
          const detalleGroup = this.fb.group({
            id_producto: [detalle.id_producto, Validators.required],
            cantidad: [detalle.cantidad, Validators.required],
            precio_unitario: [detalle.precio_unitario, Validators.required]
          });
          this.detalles.push(detalleGroup);
        });
      },
      error: (err) => {
        console.error('Error cargando venta:', err);
      }
    });
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
const rawValue = this.salesForm.value;
const payload = {
  id_cliente: rawValue.id_cliente,
  id_vendedor: rawValue.id_vendedor,
  items: rawValue.detalles
};
console.log('Payload:', payload);
this.salesListService.editSale(this.saleId, payload).subscribe({

  next: () => this.router.navigate(['/ventas']),
  error: (error) => console.error('Error editando venta:', error)
});

  }

  volver(): void {
    this.router.navigate(['/ventas']);
  }
}
