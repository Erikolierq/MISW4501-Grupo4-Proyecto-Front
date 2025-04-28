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
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './components/register/register.component';
import { SalesmanListComponent } from './components/salesman-list/salesman-list.component';
import { SalesmanCreateComponent } from './components/salesman-create/salesman-create.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '',
    redirectTo: 'redirect',
    pathMatch: 'full'
  },
  {
    path: 'redirect',
    canActivate: [AuthGuard],
    component: DashboardComponent
  },
  {
    path: 'productos',
    component: ProductListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'productos/nuevo',
    component: ProductCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'productos/masivo',
    component: ProductMasiveComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'productos/:id',
    component: ProductDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'camiones',
    component: TruckListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'camiones/nuevo',
    component: TruckCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'camiones/editar/:id',
    component: TruckUpdateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'camiones/rutanueva',
    component: DeliveryCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'productos/editar/:id',
    component: ProductUpdateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'fabricantes',
    component: ManufacturerListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'fabricantes/nuevo',
    component: ManufacturerCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'ventas',
    component: SalesListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'ventas/nuevo',
    component: SalesCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'parametros',
    component: ParametersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'parametros/nuevo',
    component: ParametersCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'salesman',
    component: SalesmanListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'salesman/nuevo',
    component: SalesmanCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'login'
  },
];
