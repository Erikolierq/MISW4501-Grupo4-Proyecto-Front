import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { InventoryService } from '../../services/inventory.service';
import { SalesListService } from '../../services/sales-list/sales-list.service';
import { TruckService } from '../../services/trucks.service';
import { ManufacturerService } from '../../services/manufacturer.service';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

@ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  dummyProducts: any[] = [];
  dummyOrders: any[] = [];
  fabricantes: any[] = [];

  // KPIs
  totalProductos = 0;
  ventasTotales = 0;
  camionesActivos = 0;
  pedidosPendientes = 0;

  // Charts
  doughnutChartLabels: string[] = ['Aseo', 'Bebidas', 'Alimentos'];
  public doughnutChartData = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [25, 35, 40], backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'] }
    ]
  };
  doughnutChartType: ChartType = 'doughnut';

  barChartLabels: string[] = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  public barChartData = {
    labels: this.barChartLabels,
    datasets: [
      {
        label: 'Ventas ($)',
        data: [] as number[],
        backgroundColor: '#FF6500'
      }
    ]
  };

  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    scales: { y: { beginAtZero: true } },
  };

  constructor(
    private inventoryService: InventoryService,
    private salesListService: SalesListService,
    private truckService: TruckService,
    private manufacturerService: ManufacturerService
  ) {}

  ngOnInit(): void {
    this.loadProductos();
    this.loadVentas();
    this.loadCamiones();
    this.loadFabricantes();
  }

  loadProductos() {
    this.inventoryService.getProductos().subscribe({
      next: (productos) => {
        this.dummyProducts = productos.slice(0, 5);
        this.totalProductos = productos.length;
      },
      error: (err) => console.error('Error productos:', err)
    });
  }

  loadVentas() {
this.salesListService.getSales().subscribe({
  next: (ventas) => {
    console.log('VENTAS:', ventas);
    this.dummyOrders = ventas.slice(0, 5).map(v => ({
  pedidoId: v.pedido_id,
  total: v.total,
  estado: v.estado,
  idCliente: v.id_cliente
}));
    this.ventasTotales = ventas.reduce((acc, v) => acc + v.total, 0);
    this.pedidosPendientes = ventas.filter(v => v.estado === 'Pendiente').length;
    this.barChartData.datasets[0].data = [120000, 150000, 180000, 90000, 210000, 175000, 132000];
    this.chart?.update(); // 👈 fuerza la actualización del gráfico
  },
  error: (err) => console.error('Error ventas:', err)
});
  }

  loadCamiones() {
    this.truckService.getTrucks().subscribe({
      next: (camiones) => {
        this.camionesActivos = camiones.length;
      },
      error: (err) => console.error('Error camiones:', err)
    });
  }

  loadFabricantes() {
    this.manufacturerService.getManufacturers().subscribe({
      next: (fabricantes) => {
        this.fabricantes = fabricantes;
      },
      error: (err) => console.error('Error fabricantes:', err)
    });
  }

countVentasPorDia(ventas: any[]): number[] {
  const dias = Array(7).fill(0);
  ventas.forEach((venta) => {
    if (!venta.fecha_creacion || isNaN(venta.total)) return;

    const fecha = new Date(venta.fecha_creacion);
    const diaSemana = fecha.getDay();
    const total = parseFloat(venta.total) || 0;

    dias[diaSemana] += total;
  });
  return dias;
}


}
