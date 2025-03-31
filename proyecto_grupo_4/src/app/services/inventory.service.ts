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
      fabricante: 'Arroz San Carlos',
      precio: 1.5
    },
    {
      id: 2,
      nombre: 'Frijoles',
      tipo: 'Alimento',
      cantidad: 30,
      ubicacion: 'Bodega 1 - Sección B',
      fabricante: 'Frijoles La Costa',
      precio: 2.0
    },
    {
      id: 3,
      nombre: 'Detergente',
      tipo: 'Aseo',
      cantidad: 20,
      ubicacion: 'Bodega 2 - Sección C',
      fabricante: 'Detergente Limpio',
      precio: 3.0
    },

    {
      id: 4,
      nombre: 'Cepillos',
      tipo: 'Aseo',
      cantidad: 15,
      ubicacion: 'Bodega 2 - Sección D',
      fabricante: 'Cepillos Brillantes',
      precio: 1.0
    },
    {
      id: 5,
      nombre: 'Cerveza',
      tipo: 'Licor',
      cantidad: 100,
      ubicacion: 'Bodega 3 - Sección A',
      fabricante: 'Cervezas del Valle',
      precio: 2.5
    },
    {
      id: 6,
      nombre: 'Leche',
      tipo: 'Alimento',
      cantidad: 40,
      ubicacion: 'Bodega 1 - Sección C',
      fabricante: 'Lechería Los Andes',
      precio: 1.2
    },
    {
      id: 7,
      nombre: 'Jabón',
      tipo: 'Aseo',
      cantidad: 25,
      ubicacion: 'Bodega 2 - Sección E',
      fabricante: 'Jabones Naturales',
      precio: 0.8
    },
    {
      id: 8,
      nombre: 'Vino Tinto',
      tipo: 'Licor',
      cantidad: 50,
      ubicacion: 'Bodega 3 - Sección B',
      fabricante: 'Viñedos del Sol',
      precio: 10.0
    },
    {
      id: 9,
      nombre: 'Aceite de Cocina',
      tipo: 'Alimento',
      cantidad: 60,
      ubicacion: 'Bodega 1 - Sección D',
      fabricante: 'Aceites del Campo',
      precio: 3.5
    },
    {
      id: 10,
      nombre: 'Papel Higiénico',
      tipo: 'Aseo',
      cantidad: 100,
      ubicacion: 'Bodega 2 - Sección F',
      fabricante: 'Higiene Total',
      precio: 0.5
    },
    {
      id: 11,
      nombre: 'Whisky',
      tipo: 'Licor',
      cantidad: 20,
      ubicacion: 'Bodega 3 - Sección C',
      fabricante: 'Whisky Premium',
      precio: 25.0
    },
    {
      id: 12,
      nombre: 'Azúcar',
      tipo: 'Alimento',
      cantidad: 70,
      ubicacion: 'Bodega 1 - Sección E',
      fabricante: 'Azúcar Dulce Vida',
      precio: 1.0
    },
    {
      id: 13,
      nombre: 'Shampoo',
      tipo: 'Aseo',
      cantidad: 35,
      ubicacion: 'Bodega 2 - Sección G',
      fabricante: 'Cuidado Capilar',
      precio: 4.0
    },
    {
      id: 14,
      nombre: 'Tequila',
      tipo: 'Licor',
      cantidad: 15,
      ubicacion: 'Bodega 3 - Sección D',
      fabricante: 'Tequilas del Agave',
      precio: 30.0
    },
    {
      id: 15,
      nombre: 'Harina',
      tipo: 'Alimento',
      cantidad: 80,
      ubicacion: 'Bodega 1 - Sección F',
      fabricante: 'Harinas del Molino',
      precio: 2.0
    }
  ];

  constructor() { }

  getProductos(): Product[] {
    return this.productos;
  }

  getProductoById(id: number): Product | undefined {
    return this.productos.find(p => p.id === id);
  }
}
