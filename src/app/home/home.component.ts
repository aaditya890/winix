import { Component, OnInit, OnDestroy, ViewChild, ElementRef, HostListener } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { WinixProductCardComponent } from "../winix-product-card/winix-product-card.component";
import { ReviewCardsComponent } from "../review-cards/review-cards.component";
import { EnquiryBannerComponent } from "../enquiry-banner/enquiry-banner.component";
import { VideoShowcaseComponent } from "../video-showcase/video-showcase.component";

interface FeatureItem {
  img: string; title: string; desc: string; w: number; h: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, WinixProductCardComponent, EnquiryBannerComponent, VideoShowcaseComponent, ReviewCardsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  // Announcement Bar
  barTitle = 'Updates';
  messages = ['No.1 Air Purifier Brand', 'Free shipping on orders over ₹999', 'True HEPA filters back in stock'];
  speed = 20;
  showBar = true;
  isMobileOpen = false;

  // ===== Features =====
  features: FeatureItem[] = [
    { img: 'assets/features/1.webp', title: 'warranty', desc: 'Comprehensive 2 year warranty covers repairs, replacements, and reliable product protection.', w: 112, h: 112 },
    { img: 'assets/features/2.webp', title: 'Carbon Filter', desc: 'An activated carbon filter effectively removes impurities, and contaminants from water.', w: 112, h: 112 },
    { img: 'assets/features/3.webp', title: 'True HEPA', desc: 'The True HEPA filter captures 99.97% of airborne particles, ensuring cleaner air.', w: 112, h: 112 },
    { img: 'assets/features/4.webp', title: 'PlasmaWave', desc: 'PlasmaWave Technology purifies air by neutralizing pollutants, bacteria, and viruses.', w: 112, h: 112 },
  ];
  featureSkeletonCount = Array(4);
  trackByTitle(_: number, f: FeatureItem) { return f.title; }


  constructor(private viewportScroller: ViewportScroller) { }

  // Header Menubar Toggle Code
  toggleMobileMenu(open?: boolean) {
    this.isMobileOpen = open ?? !this.isMobileOpen;
    document.body.classList.toggle('overflow-hidden', this.isMobileOpen); // stop bg scroll
  }

  // Close on ESC
  @HostListener('document:keydown.escape')
  onEsc() { this.toggleMobileMenu(false); }

  // ===== Insider Ticker =====
  ugcSpeed = 22;
  ugcTiles = [
    { src: 'assets/section-right-scroll/1.webp', alt: 'WINIX at desk', w: 1200, h: 800 },
    { src: 'assets/section-right-scroll/3.webp', alt: 'Reading nook', w: 1200, h: 800 },
    { src: 'assets/section-right-scroll/4.webp', alt: 'Bedroom corner', w: 1200, h: 800 },
    { src: 'assets/section-right-scroll/5.webp', alt: 'Pet friendly', w: 1200, h: 800 },
    { src: 'assets/section-right-scroll/6.webp', alt: 'Minimal shelf', w: 1200, h: 800 },
    { src: 'assets/section-right-scroll/7.webp', alt: 'Plants + purifier', w: 1200, h: 800 },
    { src: 'assets/section-right-scroll/8.webp', alt: 'Cozy study', w: 1200, h: 800 },
    { src: 'assets/section-right-scroll/2.webp', alt: 'Unboxing', w: 1200, h: 800 },
  ];


  // Announcement Bar Dismiss
  dismissBar() {
    this.showBar = false;
    localStorage.setItem('announce_dismissed', '1');
  }

  scrollTo(id: string) {
    const target = document.getElementById(id);
    if (!target) return;

    // sticky header ki actual height le lo (desktop/mobile dono me theek rahe)
    const header = document.querySelector('header') as HTMLElement | null;
    const headerOffset = header?.offsetHeight ?? 72;   // adjust if needed
    const extraGap = 8;                                // thoda sa breathing space
    const y = target.getBoundingClientRect().top + window.pageYOffset - headerOffset - extraGap;

    window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
  }


    // Function to open WhatsApp chat
  openWhatsApp(): void {
    const message = encodeURIComponent("Hii Winixair!");
    const phone = "+918885241706";
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phone}&text=${message}`;
    window.open(whatsappUrl, '_blank');
  }

}
