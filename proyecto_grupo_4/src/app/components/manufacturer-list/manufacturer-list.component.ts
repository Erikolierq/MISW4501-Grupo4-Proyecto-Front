import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manufacturer-list',
  standalone: true,
  templateUrl: './manufacturer-list.component.html',
  styleUrls: ['./manufacturer-list.component.scss'],
  imports: [CommonModule]
})
export class ManufacturerListComponent implements OnInit {
  vendedores: any[] = [];

  constructor(private router: Router) { }

  ngOnInit() {
    this.vendedores = [
      { nombreCompleto: 'Juan Pérez', rol: 'VENDEDOR' },
      { nombreCompleto: 'María Gómez', rol: 'VENDEDOR' },
      { nombreCompleto: 'Carlos Ruiz', rol: 'CLIENTE' },
    ];
  }

  goToRegister() {
    this.router.navigate(['/fabricantes/nuevo']);
  }
}
