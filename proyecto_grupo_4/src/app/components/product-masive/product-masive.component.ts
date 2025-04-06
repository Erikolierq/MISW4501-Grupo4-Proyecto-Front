import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-product-masive',
  templateUrl: './product-masive.component.html',
  styleUrls: ['./product-masive.component.scss']
})
export class ProductMasiveComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  volver() {
    this.router.navigate(['/productos']);
  }

}
