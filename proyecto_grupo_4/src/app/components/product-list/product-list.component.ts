import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { InventoryService } from '../../services/inventory.service';
import { Product } from '../../models/product.model';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    HttpClientModule
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],

})
export class ProductListComponent implements OnInit {

  productos: Product[] = [];
  page = 1;
  pageSize = 5;

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {

    this.inventoryService.getProductos().subscribe({
      next: (data: Product[]) => {
        this.productos = data;
      },
      error: (error) => {

        console.error('Error al obtener productos:', error);
      }
    });
  }

  get paginatedProducts(): Product[] {
    const startIndex = (this.page - 1) * this.pageSize;
    return this.productos.slice(startIndex, startIndex + this.pageSize);
  }

  nextPage() {
    if ((this.page * this.pageSize) < this.productos.length) {
      this.page++;
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
    }
  }
}
