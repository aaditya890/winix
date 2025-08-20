import { Routes } from '@angular/router';
import { ProductDetailComponent } from './product-detail/product-detail.component';

export const routes: Routes = [
  {
    path: 'product/:slug',
    loadComponent: () => import('./product-detail/product-detail.component').then(m => m.ProductDetailComponent),
  },
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
  }
];
