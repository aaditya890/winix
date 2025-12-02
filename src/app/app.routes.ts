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
  },
  {
    path: 'return-and-shipment',
    loadComponent: () => import('./return-and-shipment/return-and-shipment.component').then(m => m.
      ReturnAndShipmentComponent
    ),
  },
  {
    path: 'contact-us',
    loadComponent: () => import('./contact-us/contact-us.component').then(m => m.ContactUsComponent),
  },
  {
    path: 'explore',
    loadComponent: () => import('./explore/explore.component').then(m => m.ExploreComponent),
  },
  {
    path: 'explore/:slug',
    loadComponent: () => import('./explore-detail/explore-detail.component').then(m => m.ExploreDetailComponent),
  },
  {
    path: 'insight/:slug',
    loadComponent: () => import('./wikipedia/wikipedia.component').then(m => m.WikipediaComponent),
  },
  {
  path: 'articles',
  loadComponent: () =>
    import('./articles/articles.component').then(m => m.ArticlesComponent),
},

{
  path: 'article/:slug',
  loadComponent: () =>
    import('./article-detail/article-detail.component').then(m => m.ArticleDetailComponent),
},
];
