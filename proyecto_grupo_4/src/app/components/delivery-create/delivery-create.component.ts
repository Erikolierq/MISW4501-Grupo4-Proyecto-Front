import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delivery-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // <-- Agrega esto
  templateUrl: './delivery-create.component.html',
  styleUrls: ['./delivery-create.component.css']
})
export class DeliveryCreateComponent implements OnInit {
  deliveryForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.deliveryForm = this.fb.group({
      Camion: ['', Validators.required],
    Origen: ['', Validators.required],
    Destino: ['', Validators.required],
    FechaProgramada: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.deliveryForm.valid) {
      const nuevoProducto = this.deliveryForm.value;
      console.log('Delivery creado:', nuevoProducto);
      this.router.navigate(['/camiones']);
    } else {
      this.deliveryForm.markAllAsTouched();
    }
  }

  volver(): void {
    this.router.navigate(['/camiones']);
  }
}
