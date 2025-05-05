import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss'
})
export class ReportComponent {
  @ViewChild('reportePDF', { static: false }) reportePDF!: ElementRef;

  productos = [
    { nombre: 'Agua embotellada', stock: 240, precio: 1.2 },
    { nombre: 'Jabón líquido', stock: 120, precio: 3.5 },
    { nombre: 'Papel higiénico', stock: 500, precio: 2.8 },
    { nombre: 'Arroz blanco', stock: 320, precio: 4.2 },
    { nombre: 'Frijoles rojos', stock: 180, precio: 3.9 },
    { nombre: 'Café molido', stock: 150, precio: 12 },
    { nombre: 'Leche deslactosada', stock: 210, precio: 2.3 },
    { nombre: 'Pan de molde', stock: 310, precio: 2.9 },
    { nombre: 'Aceite vegetal', stock: 400, precio: 7.1 },
    { nombre: 'Salsa de tomate', stock: 130, precio: 1.8 },
    { nombre: 'Chocolate en polvo', stock: 140, precio: 5.0 },
    { nombre: 'Queso rallado', stock: 190, precio: 6.5 },
    { nombre: 'Galletas surtidas', stock: 170, precio: 4.7 },
    { nombre: 'Jugo de naranja', stock: 220, precio: 3.3 },
    { nombre: 'Maní salado', stock: 250, precio: 2.6 }
  ];

  pedidos = [
    { id: 'PED2001', cliente: 'Comercial Express', total: 4320, estado: 'Pendiente' },
    { id: 'PED2002', cliente: 'Tienda La Montaña', total: 2890, estado: 'Entregado' },
    { id: 'PED2003', cliente: 'Super Alimentos', total: 3650, estado: 'En ruta' },
    { id: 'PED2004', cliente: 'Minimarket Rápido', total: 4100, estado: 'Pendiente' },
    { id: 'PED2005', cliente: 'Despensa Popular', total: 3720, estado: 'Entregado' },
    { id: 'PED2006', cliente: 'Distribuidora Zeta', total: 4980, estado: 'En ruta' },
    { id: 'PED2007', cliente: 'Supermercado Omega', total: 4540, estado: 'Pendiente' },
    { id: 'PED2008', cliente: 'Abastos JM', total: 3310, estado: 'Entregado' },
    { id: 'PED2009', cliente: 'El Bodegón', total: 2830, estado: 'Pendiente' },
    { id: 'PED2010', cliente: 'Mercado Popular', total: 4150, estado: 'Entregado' },
    { id: 'PED2011', cliente: 'Tienda Don Juan', total: 3400, estado: 'En ruta' },
    { id: 'PED2012', cliente: 'Mercado Modelo', total: 3760, estado: 'Pendiente' },
    { id: 'PED2013', cliente: 'Súper 24H', total: 3270, estado: 'Entregado' },
    { id: 'PED2014', cliente: 'Comercial Orion', total: 3980, estado: 'En ruta' },
    { id: 'PED2015', cliente: 'La Economía', total: 4500, estado: 'Pendiente' }
  ];

  fabricantes = [
    { nombre: 'Fábrica El Sol', productos: ['Cereal Azul', 'Jugo Verde'] },
    { nombre: 'Industrias Andinas', productos: ['Galleta Roja', 'Té Negro', 'Café Marrón'] },
    { nombre: 'Productos Los Alpes', productos: ['Queso Blanco'] },
    { nombre: 'Lácteos del Norte', productos: ['Leche Entera', 'Yogurt Fresa'] },
    { nombre: 'Distribuciones Costa', productos: ['Arroz Integral', 'Harina Blanca'] },
    { nombre: 'Aceites del Sur', productos: ['Aceite Vegetal'] },
    { nombre: 'Bebidas Prime', productos: ['Soda Limón', 'Agua Mineral'] },
    { nombre: 'Conservas La Huerta', productos: ['Maíz Dulce', 'Frijoles Negros'] },
    { nombre: 'Dulces & Más', productos: ['Chocolate Amargo'] },
    { nombre: 'Granos del Campo', productos: ['Lentejas', 'Garbanzos'] },
    { nombre: 'Cárnicos Martínez', productos: ['Salchicha Clásica', 'Jamón Cocido'] },
    { nombre: 'Panadería Central', productos: ['Pan Integral'] },
    { nombre: 'Frutas de Oro', productos: ['Manzana Roja', 'Pera Verde'] },
    { nombre: 'Salsas Gourmet', productos: ['Salsa BBQ'] },
    { nombre: 'Snacks del Valle', productos: ['Papas Fritas', 'Palomitas Dulces'] }
  ];

  vendedores = [
    { nombre: 'Ana Torres', ventas: 32 },
    { nombre: 'Luis Méndez', ventas: 45 },
    { nombre: 'María García', ventas: 28 },
    { nombre: 'Carlos Ruiz', ventas: 51 },
    { nombre: 'Elena Ríos', ventas: 38 },
    { nombre: 'Pedro Ortega', ventas: 64 },
    { nombre: 'Sandra Quintero', ventas: 29 },
    { nombre: 'Raúl Vargas', ventas: 40 },
    { nombre: 'Jessica Cárdenas', ventas: 33 },
    { nombre: 'Fernando Herrera', ventas: 27 },
    { nombre: 'Laura Naranjo', ventas: 55 },
    { nombre: 'Diana López', ventas: 60 },
    { nombre: 'Oscar Pérez', ventas: 31 },
    { nombre: 'Andrea Zamora', ventas: 49 },
    { nombre: 'Mauricio Duarte', ventas: 43 }
  ];

  generarPDF() {
    const opt = {
      margin: 0.3,
      filename: 'reporte_dashboard.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(this.reportePDF.nativeElement).save();
  }
}
