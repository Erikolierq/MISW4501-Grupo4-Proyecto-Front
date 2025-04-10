import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-parameters-create',
  templateUrl: './parameters-create.component.html',
  styleUrls: ['./parameters-create.component.scss'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class ParametersCreateComponent implements OnInit {

  userForm!: FormGroup;

  constructor(        
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', [Validators.required, Validators.email]],
      Tipo: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      console.log("Formulario creado:", this.userForm.value);
      // Lógica para guardar datos aquí
    } else {
      console.log("Formulario inválido");
    }
  }

  volver() {
    this.router.navigate(['/parametros']);
  }
}
