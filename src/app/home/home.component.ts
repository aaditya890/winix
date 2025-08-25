import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { WinixProductCardComponent } from "../winix-product-card/winix-product-card.component";
import { ReviewCardsComponent } from "../review-cards/review-cards.component";
import { EnquiryBannerComponent } from "../enquiry-banner/enquiry-banner.component";

interface FeatureItem {
  img: string; title: string; desc: string; w: number; h: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule, NgOptimizedImage, WinixProductCardComponent, ReviewCardsComponent, EnquiryBannerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent  {
  // ===== Announcement Bar =====
  barTitle = 'Updates';
  messages = ['No.1 Air Purifier Brand', 'Free shipping on orders over ₹999', 'True HEPA filters back in stock'];
  speed = 20;
  showBar = true;

  // ===== Features =====
  features: FeatureItem[] = [
    { img: 'assets/features/1.png', title: 'warranty',      desc: 'Comprehensive 2 year warranty covers repairs, replacements, and reliable product protection.', w: 112, h: 112 },
    { img: 'assets/features/2.png', title: 'Carbon Filter', desc: 'An activated carbon filter effectively removes impurities, and contaminants from water.',      w: 112, h: 112 },
    { img: 'assets/features/3.png', title: 'True HEPA',     desc: 'The True HEPA filter captures 99.97% of airborne particles, ensuring cleaner air.',          w: 112, h: 112 },
    { img: 'assets/features/4.png', title: 'PlasmaWave',    desc: 'PlasmaWave Technology purifies air by neutralizing pollutants, bacteria, and viruses.',       w: 112, h: 112 },
  ];
  featureSkeletonCount = Array(4);
  trackByTitle(_: number, f: FeatureItem) { return f.title; }

  // ===== Insider Ticker =====
  ugcSpeed = 22;
  ugcTiles = [
    { src: 'assets/section-right-scroll/1.webp', alt: 'WINIX at desk',        w: 600, h: 400 },
    { src: 'assets/section-right-scroll/3.webp', alt: 'Reading nook',          w: 600, h: 400 },
    { src: 'assets/section-right-scroll/4.webp', alt: 'Bedroom corner',        w: 600, h: 400 },
    { src: 'assets/section-right-scroll/5.webp', alt: 'Pet friendly',          w: 600, h: 400 },
    { src: 'assets/section-right-scroll/6.webp', alt: 'Minimal shelf',         w: 600, h: 400 },
    { src: 'assets/section-right-scroll/7.webp', alt: 'Plants + purifier',     w: 600, h: 400 },
    { src: 'assets/section-right-scroll/8.webp', alt: 'Cozy study',            w: 600, h: 400 },
      { src: 'assets/section-right-scroll/2.webp', alt: 'Unboxing',              w: 600, h: 400 },
  ];

  dismissBar() {
    this.showBar = false;
    localStorage.setItem('announce_dismissed', '1');
  }

}
