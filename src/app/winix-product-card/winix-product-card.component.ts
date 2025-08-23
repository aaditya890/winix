import {
  Component, OnInit, AfterViewInit, OnDestroy,
  ElementRef, ViewChild, NgZone
} from '@angular/core';
import { CommonModule } from '@angular/common';

type ImageVariant = { colorName: string; colorHex: string; src: string; alt?: string; };
type Product = {
  id: string;
  title: string;
  tagline?: string;          // small line above title
  shortSpec?: string;
  rating: number;
  href: string;
  variants: ImageVariant[];
  // gradient background (top -> bottom). If missing, a default is used.
  bgFrom?: string;
  bgTo?: string;
  textOnBg?: boolean;        // true -> use white text for contrast
};

@Component({
  selector: "app-winix-product-card",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./winix-product-card.component.html",
  styleUrl: "./winix-product-card.component.scss",
})
export class WinixProductCardComponent implements OnInit {
inView = false;
  private io?: IntersectionObserver;

  @ViewChild('railEl') railRef!: ElementRef<HTMLDivElement>;
  private autoTimer: any;
  private resumeTimer: any;
  private userInteracting = false;

  private readonly autoEveryMs = 3200;
  private readonly resumeAfterMs = 2500;

  constructor(private zone: NgZone) {}

  ngOnInit(): void {
    // Defer render until viewport
    queueMicrotask(() => {
      const host = document.querySelector<HTMLElement>('#winix-rail-root');
      if (!host) { this.inView = true; return; }
      this.io = new IntersectionObserver((entries) => {
        if (entries.some(e => e.isIntersecting)) {
          this.inView = true;
          this.startAuto();
          this.io?.disconnect();
        }
      }, { rootMargin: '200px 0px' });
      this.io.observe(host);
    });
    document.addEventListener('visibilitychange', this.onVisibility, { passive: true });
  }

  ngAfterViewInit(): void {
    if (this.inView) this.startAuto();
    const rail = this.railRef?.nativeElement;
    if (!rail) return;

    const stop = () => this.stopAuto();
    const resume = () => this.scheduleResume();

    rail.addEventListener('mouseenter', stop, { passive: true });
    rail.addEventListener('mouseleave', resume, { passive: true });
    rail.addEventListener('touchstart', stop, { passive: true });
    rail.addEventListener('touchend', resume, { passive: true });
    rail.addEventListener('pointerdown', stop, { passive: true });
    rail.addEventListener('wheel', stop, { passive: true });
    rail.addEventListener('scroll', () => { this.userInteracting = true; this.scheduleResume(); }, { passive: true });
  }

  ngOnDestroy(): void {
    this.io?.disconnect();
    this.stopAuto(true);
    document.removeEventListener('visibilitychange', this.onVisibility as any);
  }

  private onVisibility = () => {
    if (document.hidden) this.stopAuto();
    else this.scheduleResume();
  };
  private prefersReducedMotion(): boolean {
    return window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
  }
  private startAuto() {
    if (this.prefersReducedMotion()) return;
    if (!this.railRef) return;
    this.stopAuto(true);
    this.zone.runOutsideAngular(() => {
      this.autoTimer = setInterval(() => {
        if (this.userInteracting) return;
        this.advanceOneCard();
      }, this.autoEveryMs);
    });
  }
  private stopAuto(clearUser = false) {
    if (this.autoTimer) { clearInterval(this.autoTimer); this.autoTimer = null; }
    if (this.resumeTimer) { clearTimeout(this.resumeTimer); this.resumeTimer = null; }
    if (clearUser) this.userInteracting = false;
  }
  private scheduleResume() {
    this.stopAuto(false);
    this.resumeTimer = setTimeout(() => { this.userInteracting = false; this.startAuto(); }, this.resumeAfterMs);
  }
  private advanceOneCard() {
    const rail = this.railRef?.nativeElement;
    if (!rail) return;
    const kids = Array.from(rail.children) as HTMLElement[];
    if (kids.length < 1) return;

    const step = kids.length >= 2
      ? Math.max(1, kids[1].offsetLeft - kids[0].offsetLeft)
      : kids[0].offsetWidth;

    const left = rail.scrollLeft;
    let nextLeft = (Math.round(left / step) + 1) * step;
    const max = rail.scrollWidth - rail.clientWidth;
    if (nextLeft >= max - 4) nextLeft = 0;
    rail.scrollTo({ left: nextLeft, behavior: 'smooth' });
  }

  // ---------- DATA (5 models) ----------
  products: Product[] = [
    {
      id: 't500',
      title: 'Google Home', // replace with WINIX T500 title if you want
      tagline: 'A powerful speaker and voice Assistant',
      rating: 4.5,
      href: '/products/t500',
      variants: [
        { colorName: 'White', colorHex: '#F5F5F5', src: '/assets/winix/t500-white.webp', alt: 'T500 White' },
        { colorName: 'Black', colorHex: '#111111', src: '/assets/winix/t500-black.webp', alt: 'T500 Black' },
      ],
      bgFrom: '#ffffff', bgTo: '#e5e7eb', textOnBg: false,
    },
    {
      id: 't810',
      title: 'Google Daydream View', // replace with WINIX T810
      tagline: 'Enjoy VR with a soft, fabric headset',
      rating: 4.6,
      href: '/products/t810',
      variants: [
        { colorName: 'White', colorHex: '#F5F5F5', src: '/assets/winix/t810-white.webp', alt: 'T810 White' },
        { colorName: 'Black', colorHex: '#111111', src: '/assets/winix/t810-black.webp', alt: 'T810 Black' },
      ],
      bgFrom: '#22d3ee', bgTo: '#3b82f6', textOnBg: true, // cyan -> blue
    },
    {
      id: 'a231',
      title: 'WINIX A231',
      tagline: 'Enjoy compact purification',
      rating: 4.4,
      href: '/products/a231',
      variants: [
        { colorName: 'White', colorHex: '#FFFFFF', src: '/assets/winix/a231-white.webp', alt: 'A231 White' },
        { colorName: 'Black', colorHex: '#111827', src: '/assets/winix/a231-black.webp', alt: 'A231 Black' },
      ],
      bgFrom: '#10b981', bgTo: '#059669', textOnBg: true, // emerald
    },
    {
      id: '5300-2',
      title: 'WINIX 5300-2',
      tagline: 'A world of clean air',
      rating: 4.7,
      href: '/products/5300-2',
      variants: [
        { colorName: 'Graphite', colorHex: '#4B5563', src: '/assets/winix/5300-2-graphite.webp', alt: '5300-2 Graphite' },
        { colorName: 'Black',    colorHex: '#111111', src: '/assets/winix/5300-2-black.webp',    alt: '5300-2 Black' },
      ],
      bgFrom: '#f59e0b', bgTo: '#ef4444', textOnBg: true, // amber -> red
    },
    {
      id: '5500-2',
      title: 'AMAZON FIRE STICK', // replace with WINIX 5500-2 if desired
      tagline: 'A world of online entertainment',
      rating: 4.8,
      href: '/products/5500-2',
      variants: [
        { colorName: 'Graphite', colorHex: '#4B5563', src: '/assets/winix/5500-2-graphite.webp', alt: '5500-2 Graphite' },
        { colorName: 'Black',    colorHex: '#111827', src: '/assets/winix/5500-2-black.webp',    alt: '5500-2 Black' },
      ],
      bgFrom: '#ef4444', bgTo: '#f59e0b', textOnBg: true, // red -> amber
    },
  ];

  selectedVariantIndex: number[] = this.products.map(() => 0);
  imageLoading: boolean[]       = this.products.map(() => true);

  // helpers
  ratingLabel(r: number) { return `${this.safeNumber(r).toFixed(1)} out of 5 stars`; }
  starFilled(r: number, s: number) { return s <= Math.round(this.safeNumber(r)); }
  safeNumber(v: any) { const n = Number(v); return Number.isFinite(n) ? n : 0; }

  onImageLoad(i: number) { this.imageLoading[i] = false; }
  swapVariant(i: number, vi: number) {
    this.selectedVariantIndex[i] = vi;
    this.imageLoading[i] = true;
  }

  trackById = (_: number, p: Product) => p.id;
}
