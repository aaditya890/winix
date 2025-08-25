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
  },
  {
    path: 'privacy-policy',
    loadComponent: () => import('./privacy-policy/privacy-policy.component').then(m => m.PrivacyPolicyComponent),
  },
  {
    path: 'terms-and-conditions',
    loadComponent: () => import('./terms-and-conditions/terms-and-conditions.component').then(m => m.TermsAndConditionsComponent),
  }
];
