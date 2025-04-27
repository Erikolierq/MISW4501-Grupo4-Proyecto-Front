import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ManufacturerService } from '../../services/manufacturer.service'; // O tu servicio real de usuarios

@Component({
  standalone: true,
  selector: 'app-manufacturer-create',
  templateUrl: './manufacturer-create.component.html',
  styleUrls: ['./manufacturer-create.component.scss'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class ManufacturerCreateComponent implements OnInit {
  manufacturerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ManufacturerService: ManufacturerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.manufacturerForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      rol: ['VENDEDOR', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.manufacturerForm.valid) {
      const formValue = this.manufacturerForm.value;

      const payload = {
        nombre: `${formValue.nombre} ${formValue.apellido}`,
        email: formValue.email,
        password: '123456',
        rol: formValue.rol
      };

      this.ManufacturerService.createManufacturer(payload).subscribe({
        next: () => {
          this.router.navigate(['/fabricantes']);
        },
        error: (err: any) => {
          console.error('Error al adjuntar usuario:', err);
        }
      });
    }
  }


  volver() {
    this.router.navigate(['/fabricantes']);
  }
}
