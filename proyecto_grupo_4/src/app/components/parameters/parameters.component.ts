import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parameters',
  imports: [CommonModule ],
  standalone: true,
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.scss']
})
export class ParametersComponent implements OnInit {

  constructor() { }
  productos = [
    { nombre: 'Producto A', cantidad: 10, precio_unitario: 15.5 },
    { nombre: 'Producto B', cantidad: 20, precio_unitario: 25.0 },
    { nombre: 'Producto C', cantidad: 5, precio_unitario: 8.99 }
  ];
  ngOnInit() {
  }

}
