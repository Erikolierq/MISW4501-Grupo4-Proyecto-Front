import { Component, OnInit } from '@angular/core';
import { SalesListService } from '../../services/sales-list/sales-list.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sales-list',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.scss']
})
export class SalesListComponent implements OnInit {
  ventas: any[] = [];
  constructor(private salesListService: SalesListService, public router: Router) { }


  ngOnInit() {
    this.getSales();
  }

  getSales() {
    this.salesListService.getSales().subscribe({
      next: (data: any[]) => {
        this.ventas = data.map(sale => ({
          estado: sale.estado,
          fechaCreacion: sale.fecha_creacion,
          idCliente: sale.id_cliente,
          idVendedor: sale.id_vendedor,
          pedidoId: sale.pedido_id,
          total: sale.total
        }));
      },
      error: (error) => {
        console.error('Error fetching sales:', error);
      }
    });
  }
  goToRegister() {
    this.router.navigate(['/ventas/nuevo']);
  }
}
