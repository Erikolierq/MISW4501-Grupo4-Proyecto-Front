import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ManufacturerService } from '../../services/manufacturer.service';

@Component({
  selector: 'app-manufacturer-list',
  standalone: true,
  templateUrl: './manufacturer-list.component.html',
  styleUrls: ['./manufacturer-list.component.scss'],
  imports: [CommonModule]
})
export class ManufacturerListComponent implements OnInit {
  fabricantes: any[] = [];

  constructor(
    private router: Router,
    private manufacturerService: ManufacturerService
  ) { }

  ngOnInit() {
    this.getManufacturers();
  }

  getManufacturers() {
    this.manufacturerService.getManufacturers().subscribe({
      next: (data: any[]) => {

        this.fabricantes = data.map(manufacturer => ({
          nombreCompleto: manufacturer.nombre,
          rol: manufacturer.rol,
          email: manufacturer.email,
          usuarioId: manufacturer.usuario_id
        }));
      },
      error: (error) => {
        console.error('Error fetching manufacturers:', error);
      }
    });
  }

  goToRegister() {
    this.router.navigate(['/fabricantes/nuevo']);
  }
}
