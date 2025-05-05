import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dummyProducts = [
    { nombre: 'Laptop Lenovo ThinkPad', stock: 15, precio: 3250.99 },
    { nombre: 'TV Samsung', stock: 15, precio: 3250.99 },
    { nombre: 'Switch 2', stock: 11, precio: 1000 }
  ];

  dummyOrders = [
    { id: 'PED1234', cliente: 'Supermercado La 30', total: 4500, estado: 'Pendiente' },
    { id: 'PED1235', cliente: 'Tienda Don Pepe', total: 2200, estado: 'En ruta' },
    { id: 'PED1236', cliente: 'Mercado Central', total: 3800, estado: 'Entregado' }
  ];

  doughnutChartLabels: string[] = ['Bebidas', 'Aseo', 'Alimentos', 'Otros'];
  public doughnutChartData = {
    labels: ['Aseo', 'Bebidas', 'Alimentos'],
    datasets: [
      { data: [25, 35, 40], backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'] }
    ]
  };
  doughnutChartType: ChartType = 'doughnut';

  barChartLabels: string[] = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  public barChartData = {
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    datasets: [
      {
        label: 'Ventas ($)',
        data: [1200, 1500, 1700, 1100, 2100, 2500, 1800],
        backgroundColor: '#FF6500'
      }
    ]
  };

  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    scales: { y: { beginAtZero: true } },
  };

  ngOnInit(): void {}
}
