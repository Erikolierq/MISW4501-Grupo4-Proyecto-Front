import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ManufacturerService } from '../../services/manufacturer.service';

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
    private router: Router) { }

  ngOnInit() {
    this.manufacturerForm = this.fb.group({
      nombre: ['', Validators.required],
      pais_origen: [''],
      categoria: ['']
    });
    
  }

  onSubmit(): void {
    if (this.manufacturerForm.valid) {
      this.ManufacturerService.createManufacturer(this.manufacturerForm.value).subscribe({
        next: () => {
          this.router.navigate(['/fabricantes']);
        },
        error: (err: any) => {
          console.error('Error al crear producto:', err);
        }
      });
    }
  }

  volver() {
    this.router.navigate(['/fabricantes']);

}
}