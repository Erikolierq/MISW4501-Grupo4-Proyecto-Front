import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private productos: Product[] = [
    {
      id: 1,
      nombre: 'Arroz',
      tipo: 'Alimento',
      cantidad: 50,
      ubicacion: 'Bodega 1 - Sección A',
      fabricante: 'Arroz San Carlos'
    },
    {
      id: 2,
      nombre: 'Frijoles',
      tipo: 'Alimento',
      cantidad: 30,
      ubicacion: 'Bodega 1 - Sección B',
      fabricante: 'Frijoles La Costa'
    },
    {
      id: 3,
      nombre: 'Detergente',
      tipo: 'Aseo',
      cantidad: 20,
      ubicacion: 'Bodega 2 - Sección C',
      fabricante: 'Detergente Limpio'
    },

    {
      id: 4,
      nombre: 'Cepillos',
      tipo: 'Aseo',
      cantidad: 15,
      ubicacion: 'Bodega 2 - Sección D',
      fabricante: 'Cepillos Brillantes'
    },
    {
      id: 5,
      nombre: 'Cerveza',
      tipo: 'Licor',
      cantidad: 100,
      ubicacion: 'Bodega 3 - Sección A',
      fabricante: 'Cervezas del Valle'
    },

  ];

  constructor() { }

  getProductos(): Product[] {
    return this.productos;
  }

  getProductoById(id: number): Product | undefined {
    return this.productos.find(p => p.id === id);
  }
}
