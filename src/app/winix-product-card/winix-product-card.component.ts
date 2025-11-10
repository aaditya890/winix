import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

type Product = {
  id: string;
  title: string;
  tagline?: string;
  description?: string;
  rating: number;
  ratingCount?: string;
  slug: string;
  imageSrc: string;
  hoverImageSrc?: string;
  badges?: string[];
  price: number;
  mrp?: number;
  colors?: string[];
};

@Component({
  selector: 'app-winix-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './winix-product-card.component.html',
})
export class WinixProductCardComponent implements AfterViewInit {
  // IMPORTANT: ViewChild + correct type
  @ViewChild('railEl', { static: false }) trackRef?: ElementRef<HTMLElement>;

  hovered: Record<string, boolean> = {};
  imageLoading: boolean[] = [];

  products: Product[] = [
    {
      id: "5500-2",
      title: "5500-2",
      tagline: "WINIX 5500-2 PlasmaWave®",
      description:
        "Captures 99.97% particles with True HEPA and tackles VOCs using AOC™ carbon filter.",
      rating: 4.6,
      ratingCount: '39K',
      slug: "winix-5500-2-air-purifier",
      imageSrc: "/assets/products/card/P-5500-2.webp ",
      hoverImageSrc: "/assets/products/5500-2/product-2.jpg",
      badges: ["POPULAR"],
      price: 16149,
      mrp: 22990,
      colors: ["#111111", "#f5f5f5"] // black, white
    },
    {
      id: "5300-2",
      title: "5300-2",
      tagline: "WINIX 5300-2 Premium Air",
      description:
        "4-stage filtration with True HEPA, deodorization, auto mode and quiet sleep mode.",
      rating: 4.6,
      ratingCount: '39K',
      slug: "winix-5300-2-air-purifier",
      imageSrc: "/assets/products/card/1.webp",
      badges: ["POPULAR"],
      price: 15199,
      mrp: 23990,
      colors: ["#c9c9c9", "#111111"]
    },
    {
      id: "T810",
      title: "T810",
      tagline: "WINIX T810 Large Room Air",
      description:
        "High CADR for large rooms with H13 True HEPA, real-time air quality and app control.",
      rating: 4.4,
      ratingCount: '165',
      slug: "winix-t810-air-purifier",
      imageSrc: "assets/products/card/P-T810.webp",
      badges: ["NEW"],
      price: 17499,
      mrp: 21999,
      colors: ["#f5f5f5", "#3b3b3b"]
    },
    {
      id: "T500",
      title: "T500",
      tagline: "WINIX T500 Compact Air",
      description:
        "Compact design with 360° suction, multi-stage filtration and whisper-quiet night mode.",
      rating: 4.5,
      ratingCount: '249',
      slug: "winix-t500-air-purifier",
      imageSrc: "assets/products/card/P-T500.webp",
      badges: ["VALUE PICK"],
      price: 12999,
      mrp: 16999,
      colors: ["#ffffff", "#111111"]
    },
    {
      id: "A231",
      title: "A231",
      tagline: "WINIX A231 Compact Air",
      description:
        "Allergy-certified compact purifier, ideal for study, kids’ rooms and small spaces.",
      rating: 4.6,
      ratingCount: '36K',
      slug: "winix-a231-air-purifier",
      imageSrc: "assets/products/card/P-A231.webp",
      badges: ["ALLERGY SAFE"],
      price: 9999,
      mrp: 18990,
      colors: ["#f2f2f2", "#111111"]
    }
  ];

  private isDown = false;
  private startX = 0;
  private startLeft = 0;

  ngAfterViewInit() { }

  /** small helper to avoid undefined errors */
  private el(): HTMLElement | null {
    return this.trackRef?.nativeElement ?? null;
  }

  scroll(dir: 'left' | 'right') {
    const el = this.el();
    if (!el) return;
    const by = Math.round(el.clientWidth * 0.65);
    el.scrollBy({ left: dir === 'right' ? by : -by, behavior: 'smooth' });
  }

  onWheel(e: WheelEvent) {
    const el = this.el();
    if (!el) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) el.scrollLeft += e.deltaY;
  }

  onPointerDown(e: PointerEvent | TouchEvent) {
    const el = this.el();
    if (!el) return;
    this.isDown = true;
    this.startX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    this.startLeft = el.scrollLeft;
    el.classList.add('grabbing');
  }

  onPointerMove(e: PointerEvent | TouchEvent) {
    if (!this.isDown) return;
    const el = this.el();
    if (!el) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    el.scrollLeft = this.startLeft - (clientX - this.startX);
  }

  onPointerUp() {
    this.isDown = false;
    this.el()?.classList.remove('grabbing');
  }

  // helpers
  trackById = (_: number, p: Product) => p.id;
  safeNumber(v: any) { const n = Number(v); return Number.isFinite(n) ? n : 0; }
  formatINR(n?: number) { return Number.isFinite(n) ? `Rs. ${Math.round(n!).toLocaleString('en-IN')}` : ''; }
  onCardEnter(id: string) { this.hovered[id] = true; }
  onCardLeave(id: string) { this.hovered[id] = false; }
  onImageLoad(i: number) { this.imageLoading[i] = false; }
}
