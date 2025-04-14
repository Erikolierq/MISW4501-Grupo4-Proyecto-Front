import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-sales-create',
  templateUrl: './sales-create.component.html',
  styleUrls: ['./sales-create.component.scss'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class SalesCreateComponent implements OnInit {

  salesForm!: FormGroup;
    constructor(
      private fb: FormBuilder,
      private router: Router) { }

    ngOnInit() {
      this.salesForm = this.fb.group({
        nombre: ['', Validators.required],
        descripcion: [''],
        cantidad: [0]
      });

    }


    onSubmit(): void {

            console.log("creado")

    }

    volver() {
      this.router.navigate(['/ventas']);

  }
  }
