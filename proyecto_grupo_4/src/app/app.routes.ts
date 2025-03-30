import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'productos',
    pathMatch: 'full'
  },
  {
    path: 'productos',
    component: ProductListComponent
  },
  {
    path: 'productos/:id',
    component: ProductDetailComponent
  },
  {
    path: '**',
    redirectTo: 'productos'
  }
];
