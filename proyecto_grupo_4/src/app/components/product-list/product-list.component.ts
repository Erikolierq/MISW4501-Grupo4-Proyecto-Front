import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { InventoryService } from '../../services/inventory.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  productos: Product[] = [];
  page = 1;
  pageSize = 5;

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.productos = this.inventoryService.getProductos();
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
