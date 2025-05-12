import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import html2pdf from 'html2pdf.js';
import { InventoryService } from '../../services/inventory.service';
import { SalesListService } from '../../services/sales-list/sales-list.service';
import { TruckService } from '../../services/trucks.service';
import { ManufacturerService } from '../../services/manufacturer.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-report',
  standalone: true,
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss',
  imports: [CommonModule]
})
export class ReportComponent implements OnInit {
  @ViewChild('reportePDF', { static: false }) reportePDF!: ElementRef;

  productos: any[] = [];
  pedidos: any[] = [];
  fabricantes: any[] = [];
  camionesActivos = 0;

  // KPIs
  totalProductos = 0;
  ventasTotales = 0;
  pedidosPendientes = 0;

  // Simulación de datos por día para gráficas
  ventasPorDia = [120000, 150000, 180000, 90000, 210000, 175000, 132000];

  constructor(
    private inventoryService: InventoryService,
    private salesListService: SalesListService,
    private truckService: TruckService,
    private manufacturerService: ManufacturerService
  ) {}

  ngOnInit(): void {
    this.loadProductos();
    this.loadPedidos();
    this.loadFabricantes();
    this.loadCamiones();
  }

  loadProductos() {
    this.inventoryService.getProductos().subscribe({
      next: (data) => {
        this.productos = data.slice(0, 10).map(p => ({
          nombre: p.nombre,
          stock: p.stock,
          precio: p.precio_unitario || p.precio || 0
        }));
        this.totalProductos = data.length;
      },
      error: err => console.error('Error productos:', err)
    });
  }

  loadPedidos() {
    this.salesListService.getSales().subscribe({
      next: (data) => {
        this.pedidos = data.slice(0, 10).map(p => ({
          id: p.pedido_id,
          cliente: `Cliente ${p.id_cliente}`,
          total: p.total,
          estado: p.estado
        }));
        this.ventasTotales = data.reduce((sum, p) => sum + p.total, 0);
        this.pedidosPendientes = data.filter(p => p.estado === 'Pendiente').length;
      },
      error: err => console.error('Error pedidos:', err)
    });
  }

  loadFabricantes() {
    this.manufacturerService.getManufacturers().subscribe({
      next: (data) => {
        this.fabricantes = data.map((f: { nombre: any; productos: any; }) => ({
          nombre: f.nombre,
          productos: f.productos || []
        }));
      },
      error: err => console.error('Error fabricantes:', err)
    });
  }

  loadCamiones() {
    this.truckService.getTrucks().subscribe({
      next: (data) => {
        this.camionesActivos = data.length;
      },
      error: err => console.error('Error camiones:', err)
    });
  }

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
