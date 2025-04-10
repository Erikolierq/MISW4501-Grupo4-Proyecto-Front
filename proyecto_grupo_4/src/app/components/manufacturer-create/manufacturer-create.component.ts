import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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
    private router: Router) { }

  ngOnInit() {
      this.manufacturerForm = this.fb.group({

    });
  }

  onSubmit(): void {
  
          console.log("creado")

  }

  volver() {
    this.router.navigate(['/fabricantes']);

}
}