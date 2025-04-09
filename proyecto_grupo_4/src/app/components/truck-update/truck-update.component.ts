import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TruckService } from '../../services/trucks.service';

@Component({
  standalone: true,
  selector: 'app-truck-update',
  templateUrl: './truck-update.component.html',
  styleUrls: ['./truck-update.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class TruckUpdateComponent implements OnInit {

  truckForm!: FormGroup;
  camionId!: number;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private truckService: TruckService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.camionId = +idParam;

      this.truckService.getTruckById(this.camionId).subscribe({
        next: (camion) => {
          this.truckForm = this.fb.group({
            placa: [camion.placa, Validators.required],
            capacidad: [camion.capacidad,  Validators.required],
            tipo: [camion.tipo, Validators.required],
            rutas: [camion.rutas,  Validators.required]
          });
        },
        error: (err) => {
          console.error('Error al cargar camión:', err);
          this.router.navigate(['/camiones']);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.truckForm.valid) {
      this.truckService.updateTruck(this.camionId, this.truckForm.value).subscribe({
        next: () => this.router.navigate(['/camiones']),
        error: (err) => console.error('Error al actualizar camión:', err)
      });
    }
  }

  volver() {
    this.router.navigate(['/camiones']);
  }

}
