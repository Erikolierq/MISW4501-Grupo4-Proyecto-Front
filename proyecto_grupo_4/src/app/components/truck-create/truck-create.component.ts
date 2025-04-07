import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TruckService } from '../../services/trucks.service';

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
        private truckService: TruckService,
        private router: Router
  ) { }

  ngOnInit() {
    this.truckForm = this.fb.group({
      placa: ['', Validators.required],
      capacidad: [0, [Validators.required, Validators.min(1)]],
      tipo: ['', Validators.required],
      rutas: ['']
    });

  }
  onSubmit(): void {
    if (this.truckForm.valid) {
      this.truckService.createTruck(this.truckForm.value).subscribe({
        next: () => {
          this.router.navigate(['/camiones']);
        },
        error: (err: any) => {
          console.error('Error al crear camión:', err);
        }
      });
    }
  }

  volver() {
    this.router.navigate(['/camiones']);
  }
}