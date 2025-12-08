import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
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
  selector: 'app-winix-filter-card',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './winix-filter-card.component.html',
  styleUrl: './winix-filter-card.component.scss'
})
export class WinixFilterCardComponent {
  @ViewChild('railEl', { static: false }) trackRef?: ElementRef<HTMLElement>;

  hovered: Record<string, boolean> = {};
  imageLoading: boolean[] = [];

products: Product[] = [
  // 1️⃣ WINIX 5500-2 FILTER
  {
    id: "winix-5500-2-filter",
    title: "WINIX 5500-2 FILTER",
    tagline: "Genuine 116130 Replacement Filter H for 5500-2",
    description:
      "True HEPA + Washable AOC Carbon filter for Winix 5500-2 air purifier.",
    rating: 4.8,
    ratingCount: "5,445",
    slug: "winix-5500-2-replacement-filter",
    imageSrc: "/assets/filters/5500-2/1.webp",
    hoverImageSrc: "/assets/filters/5500-2/2.webp",
    badges: ["GENUINE PART"],
    price: 3999,
    mrp: 4999,
    colors: ["#FFFFFF", "#000000"]
  },

  // 5️⃣ WINIX T800 FILTER
  {
    id: "winix-t800-filter",
    title: "WINIX T800 FILTER",
    tagline: "Genuine Filter O for Winix T800 Air Purifier",
    description:
      "True HEPA 99.97% + Activated Carbon filter for large room purification.",
    rating: 4.8,
    ratingCount: "20",
    slug: "winix-t800-replacement-filter",
    imageSrc: "/assets/filters/T800/1.webp",
    hoverImageSrc: "/assets/filters/T800/2.jpg",
    badges: ["PREMIUM"],
    price: 3499,
    mrp: 4990,
    colors: ["#DDDDDD", "#000000"]
  },

  // 4️⃣ WINIX 5300-2 FILTER
  {
    id: "winix-5300-2-filter",
    title: "WINIX 5300-2 FILTER",
    tagline: "Genuine 115115 Replacement Filter A for 5300-2",
    description:
      "True HEPA + Carbon replacement filter for 5300-2, C535 & P300 models.",
    rating: 4.8,
    ratingCount: "8,434",
    slug: "winix-5300-2-replacement-filter",
    imageSrc: "/assets/filters/5300-2/1.webp",
    hoverImageSrc: "/assets/filters/5300-2/2.webp",
    badges: ["GENUINE PART"],
    price: 3999,
    mrp: 34990,
    colors: ["#FFFFFF", "#000000"]
  },

  // 2️⃣ WINIX T500 FILTER
  {
    id: "winix-t500-filter",
    title: "WINIX T500 FILTER",
    tagline: "Genuine 1712-0110-00 Replacement Filter O for T500",
    description:
      "True HEPA + Carbon filter for small to medium room air purification.",
    rating: 4.5,
    ratingCount: "251",
    slug: "winix-t500-replacement-filter",
    imageSrc: "/assets/filters/A231/2.webp",
    hoverImageSrc: "/assets/filters/A231/1.webp",
    badges: ["POPULAR"],
    price: 2999,
    mrp: 3990,
    colors: ["#CCCCCC", "#000000"]
  },

  // 3️⃣ WINIX A231 FILTER
  {
    id: "FILTER-O-A231",
    title: "WINIX A231 FILTER",
    tagline: "Genuine 1712-0110-00 Replacement Filter O for A231",
    description:
      "True HEPA + Activated Carbon filter for compact room air purification.",
    rating: 4.5,
    ratingCount: "251",
    slug: "winix-a231-replacement-filter",
    imageSrc: "/assets/filters/A231/1.webp",
    hoverImageSrc: "/assets/filters/A231/2.webp",
    badges: ["ALLERGY SAFE"],
    price: 2999,
    mrp: 3990,
    colors: ["#EEEEEE", "#000000"]
  }
];


  private isDown = false;
  private startX = 0;
  private startLeft = 0;
  private dragThreshold = 2;

  ngAfterViewInit() { }
  /** safe element access */
  private el(): HTMLElement | null {
    return this.trackRef?.nativeElement ?? null;
  }

  /** Arrow scroll */
  scroll(dir: 'left' | 'right') {
    const el = this.el();
    if (!el) return;

    const by = Math.round(el.clientWidth * 0.65);
    el.scrollBy({ left: dir === 'right' ? by : -by, behavior: 'smooth' });
  }

  /** Mouse wheel → horizontal scroll */
  onWheel(e: WheelEvent) {
    const el = this.el();
    if (!el) return;

    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      el.scrollLeft += e.deltaY;
    }
  }

onPointerDown(e: PointerEvent | TouchEvent) {
  const el = this.el();
  if (!el) return;

  this.isDown = true;
  
  // lock scroll direction for a moment
  el.style.scrollSnapType = 'none';

  this.startX = 'touches' in e ? e.touches[0].clientX : e.clientX;
  this.startLeft = el.scrollLeft;
}

  /** Drag move */
  onPointerMove(e: PointerEvent | TouchEvent) {
    if (!this.isDown) return;

    const el = this.el();
    if (!el) return;

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const diff = clientX - this.startX;

    if (Math.abs(diff) < this.dragThreshold) return;

    const speed = 4;
    el.scrollLeft = this.startLeft - diff * speed;

    e.preventDefault();
  }

  /** Drag end */
  onPointerUp() {
    this.isDown = false;
    this.el()?.classList.remove('grabbing');
  }

  /** Helpers */
  trackById = (_: number, p: Product) => p.id;

  safeNumber(v: any) {
    const n = Number(v);
    return Number.isFinite(n) ? n : 0;
  }

  formatINR(n?: number) {
    return Number.isFinite(n!) ? `Rs. ${Math.round(n!).toLocaleString('en-IN')}` : '';
  }

  onCardEnter(id: string) {
    this.hovered[id] = true;
  }

  onCardLeave(id: string) {
    this.hovered[id] = false;
  }

  onImageLoad(i: number) {
    this.imageLoading[i] = false;
  }
}
