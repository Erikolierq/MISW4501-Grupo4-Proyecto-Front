import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { TruckListComponent } from './components/truck-list/truck-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { ProductMasiveComponent } from './components/product-masive/product-masive.component';
import { TruckCreateComponent } from './components/truck-create/truck-create.component';
import { DeliveryCreateComponent } from './components/delivery-create/delivery-create.component';
import { ProductUpdateComponent } from './components/product-update/product-update.component';
import { TruckUpdateComponent } from './components/truck-update/truck-update.component';
import { LoginComponent } from './components/login/login.component';
import { ManufacturerListComponent } from './components/manufacturer-list/manufacturer-list.component';
import { ManufacturerCreateComponent } from './components/manufacturer-create/manufacturer-create.component';
import { SalesListComponent } from './components/sales-list/sales-list.component';
import { SalesCreateComponent } from './components/sales-create/sales-create.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ParametersComponent } from './components/parameters/parameters.component';
import { ParametersCreateComponent } from './components/parameters-create/parameters-create.component';


export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },  
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
    path: 'productos/nuevo',
    component: ProductCreateComponent
  },
  {
    path: 'productos/masivo',
    component: ProductMasiveComponent
  },
  {
    path: 'productos/:id',
    component: ProductDetailComponent
  },
  {
    path: 'camiones',
    component: TruckListComponent
  },
  {
    path: 'camiones/nuevo',
    component: TruckCreateComponent
  },
  {
    path: 'camiones/editar/:id',
    component: TruckUpdateComponent
  },
  {
    path: 'camiones/rutanueva',
    component: DeliveryCreateComponent
  },
  {
    path: 'productos/editar/:id',
    component: ProductUpdateComponent
  },
  {
    path: 'fabricantes',
    component: ManufacturerListComponent
  },

  { path: 'fabricantes/nuevo',
    component: ManufacturerCreateComponent
  },

  {path: 'ventas',
    component: SalesListComponent
  },
  {path: 'ventas/nuevo',
    component: SalesCreateComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  { path: 'parametros',
  component: ParametersComponent
  },
  { path: 'parametros/nuevo',
    component: ParametersCreateComponent
  },
  {
    path: '**',
    redirectTo: 'productos'
  },
];
