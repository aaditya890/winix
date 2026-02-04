import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import { ComparisonComponent } from "../comparison/comparison.component";
import { WinixProductCardComponent } from "../winix-product-card/winix-product-card.component";

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [NgFor, WinixProductCardComponent],
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.scss',
})
export class ExploreComponent {
  constructor(private router: Router) { }

  products = [
    {
      id: 'a231',
      shortTitle: 'WINIX A231',
      name: 'Air Purifier WINIX A231',
      category: 'Air Purifier',
      image: '/assets/explore-images/A231/product-1.png',

      gallery: [

      ],

      shortDescription: 'Compact, efficient air purifier ideal for small rooms and personal spaces.',
      longDescription: 'The WINIX A231 is a compact purifier designed for bedrooms, study rooms, and small spaces, offering powerful filtration and quiet operation.',

      tabs: {
        description: 'A231 uses a True HEPA filter, carbon layer, and WINIX PlasmaWave® technology to capture dust, allergens, smoke, and VOCs.',
        technology: 'PlasmaWave® Technology neutralizes pollutants at a molecular level without producing harmful ozone.',
        advantages: 'Small, lightweight, low noise, energy efficient, recommended for small rooms.',
        specifications: 'Coverage: 300 sq ft | Filter Type: True HEPA | Noise Level: Very Low | Energy Saving Mode: Yes',
        filter: 'A231 uses compact WINIX Filter A for efficient small-room purification.'
      },

      additionalInfo: {
        manufacturer: 'Winix',
        packer: 'Sha Maknaji Veerchand, S.No.4, H.No.1/18/2, Lane 5, Kakdewasti, Next to Rishi Enclave, Kondhwa Budruk, Pune 411048.',
        importer: 'Sha Maknaji Veerchand, S.No.4, H.No.1/18/2, Lane 5, Kakdewasti, Next to Rishi Enclave, Kondhwa Budruk, Pune 411048. Contact: +91 88852 41706, Email: care@justshop24x7.com'
      }
    },
    {
      id: 't500-wifi',
      shortTitle: 'WINIX T500 WIFI',
      name: 'Air Purifier WINIX T500 WIFI',
      category: 'Air Purifier',
      image: '/assets/explore-images/T500/product-1.png',

      gallery: [
        '/assets/products-v2/T500/product-1.webp',
        '/assets/products-v2/T500/product-2-v2.webp',
        '/assets/products-v2/T500/product-3.webp',
        '/assets/products-v2/T500/product-4.webp',
        '/assets/products-v2/T500/product-5.webp',
        '/assets/products-v2/T500/product-6.webp',
        '/assets/products-v2/T500/product-7.webp',
        '/assets/products-v2/T500/product-8.webp'
      ],

      shortDescription: 'Compact, powerful and smart air purifier…',
      longDescription: 'Full long description of T500 Wifi purifier…',

      tabs: {
        description: 'Product description content…',
        technology: 'PlasmaWave® Technology content…',
        advantages: 'Advantages content…',
        specifications: 'Specifications content…',
        filter: 'Filter info content…'
      },
    },
    {
      id: 't800',
      shortTitle: 'WINIX T800 WIFI',
      name: 'Air Purifier WINIX T800 WIFI',
      category: 'Air Purifier',
      image: '/assets/explore-images/T800/product-1.png',

      gallery: [

      ],

      shortDescription: 'High-performance air purifier ideal for large rooms and homes.',
      longDescription: 'The WINIX T800 WIFI is designed for large rooms, offering superior filtration, AI-based sensors, and powerful air cleaning performance.',

      tabs: {
        description: 'WINIX T800 uses advanced multi-stage filtration with True HEPA, AOC carbon filter, and PlasmaWave® technology to remove dust, allergens, and harmful pollutants.',
        technology: 'PlasmaWave® safely breaks down chemical vapors, allergens, and other airborne pollutants without harmful ozone.',
        advantages: 'Cleans large-sized rooms, strong fan motor, fast purification, WiFi control, night mode.',
        specifications: 'Coverage: 1968 sq ft | Filter Type: True HEPA | Fan Modes: Auto, Sleep, Turbo | Noise Level: Ultra Quiet',
        filter: 'T800 uses the WINIX Filter O / Replacement filter designed for large area purification.'
      },

      additionalInfo: {
         manufacturer: 'Winix',
        packer: 'Sha Maknaji Veerchand, S.No.4, H.No.1/18/2, Lane 5, Kakdewasti, Next to Rishi Enclave, Kondhwa Budruk, Pune 411048.',
        importer: 'Sha Maknaji Veerchand, S.No.4, H.No.1/18/2, Lane 5, Kakdewasti, Next to Rishi Enclave, Kondhwa Budruk, Pune 411048. Contact: +91 88852 41706, Email: care@justshop24x7.com'
      }
    }
  ];

  openDetail(product: any) {
    this.router.navigate(['/explore', product.id], {
      state: product   // 👉 pure product ka data next page ko send ho jayega
    });
  }
}
