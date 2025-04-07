import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { InventoryService } from '../../services/inventory.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  producto: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private inventoryService: InventoryService
  ) {}

  ngOnInit(): void {
    // Leemos el parámetro :id de la URL
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = +idParam;

      // Llamamos al servicio para obtener un producto puntual
      this.inventoryService.getProductoById(id).subscribe({
        next: (data: Product) => {
          this.producto = data;
        },
        error: (error) => {
          console.error('Error al obtener producto:', error);
        }
      });
    }
  }
}
