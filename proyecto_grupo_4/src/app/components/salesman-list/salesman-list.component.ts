import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ManufacturerService } from '../../services/manufacturer.service';

@Component({
  selector: 'app-salesman-list',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './salesman-list.component.html',
  styleUrl: './salesman-list.component.scss'
})
export class SalesmanListComponent implements OnInit {
  vendedores: any[] = [];

  constructor(
    private router: Router,
    private manufacturerService: ManufacturerService
  ) { }

  ngOnInit() {
    this.getSellers();
  }

  getSellers() {
    this.manufacturerService.getSellers().subscribe({
      next: (data: any[]) => {

        this.vendedores = data.map(seller => ({
          nombreCompleto: seller.nombre,
          rol: seller.rol,
          email: seller.email,
          usuarioId: seller.usuario_id
        }));
      },
      error: (error) => {
        console.error('Error fetching sellers:', error);
      }
    });
  }

  goToRegister() {
    this.router.navigate(['/salesman/nuevo']);
  }
}
