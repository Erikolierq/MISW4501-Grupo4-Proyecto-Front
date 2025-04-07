import { Component, OnInit } from '@angular/core';
import { TruckService, Truck } from '../../services/trucks.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-truck-list',
  templateUrl: './truck-list.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  styleUrls: ['./truck-list.component.scss']
})
export class TruckListComponent implements OnInit {
  camiones: Truck[] = [];

  constructor(private truckService: TruckService) {}

  ngOnInit() {
    this.truckService.getTrucks().subscribe({
      next: (data) => {
        this.camiones = data;
      },
      error: (err) => {
        console.error('Error al cargar camiones:', err);
      }
    });
  }
}
