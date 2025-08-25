import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  NgZone,
} from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterLink } from "@angular/router"

type Product = {
  id: string
  title: string
  tagline?: string
  rating: number
  slug: string
  imageSrc: string
}

@Component({
  selector: "app-winix-product-card",
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: "./winix-product-card.component.html",
  styleUrl: "./winix-product-card.component.scss",
})
export class WinixProductCardComponent implements OnInit, AfterViewInit, OnDestroy {
  inView = false
  private io?: IntersectionObserver

  @ViewChild("railEl") railRef!: ElementRef<HTMLDivElement>

  /** Enhanced continuous scrolling */
  continuous = true
  paused = false

  private rafId: number | null = null
  private lastTs = 0
  private mounted = false

  /** Enhanced speed control */
  private speedPxPerSec = 25 // Slightly faster for better visual effect

  products: Product[] = [
    {
      id: "5500-2",
      title: "WINIX 5500-2 PlasmaWave Elite",
      tagline: "True HEPA • PlasmaWave® • Odor Control",
      rating: 4.6,
      slug: "winix-5500-2-plasmawave-elite",
      imageSrc: "/assets/products/card/P-5500-2.png",
    },
    {
      id: "5300-2",
      title: "Winix 5300-2 Premium 4 Stage Air Purifier",
      tagline: "Kills Virus & Bacteria...",
      rating: 4.6,
      slug: "winix-5300-2-premium-4-stage-air-purifier",
      imageSrc: "/assets/products/card/P-5300-2.png",
    },
    {
      id: "T810",
      title: "WINIX T810 Air Purifier for Large Rooms",
      tagline: "Smart Wi-Fi, True HEPA...",
      rating: 4.4,
      slug: "t810",
      imageSrc: "assets/products/card/P-T810.png",
    },
    {
      id: "T500",
      title: "WINIX T500 Promises Effective Air Purifier",
      tagline: "Compact 360° suction...",
      rating: 4.5,
      slug: "t500",
      imageSrc: "assets/products/card/P-T500.png",
    },
    {
      id: "A231",
      title: "Winix A231 Compact Air Purifier",
      tagline: "Certified UK Allergy & ECARF",
      rating: 4.6,
      slug: "a231",
      imageSrc: "assets/products/card/P-A231.png",
    },
  ]

  // Double the imageLoading array to handle duplicates
  imageLoading: boolean[] = Array(this.products.length * 2).fill(true)

  constructor(private zone: NgZone) {}

  ngOnInit(): void {
    const host = document.querySelector<HTMLElement>("#winix-rail-root")
    if (!host) {
      this.inView = true
      queueMicrotask(() => this.mountWhenReady())
      return
    }

    this.io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          this.inView = true
          this.io?.disconnect()
          queueMicrotask(() => this.mountWhenReady())
        }
      },
      { rootMargin: "200px 0px" },
    )
    this.io.observe(host)

    document.addEventListener("visibilitychange", this.onVisibility, { passive: true })
  }

  ngAfterViewInit(): void {
    this.mountWhenReady()
  }

  ngOnDestroy(): void {
    this.io?.disconnect()
    document.removeEventListener("visibilitychange", this.onVisibility as any)
    this.stopRAF()
  }

  // Enhanced mount function
  private mountWhenReady() {
    if (!this.inView || !this.railRef?.nativeElement || this.mounted) return
    this.mounted = true

    // Start continuous scrolling immediately
    this.startRAF(true)
  }

  // Enhanced pause/resume functions
  pauseScroll(): void {
    this.paused = true
  }

  resumeScroll(): void {
    this.paused = false
  }

  // Enhanced RAF loop with better seamless scrolling
  private loop = (ts: number) => {
    const rail = this.railRef?.nativeElement
    if (!rail) return

    const dt = this.lastTs ? ts - this.lastTs : 16
    this.lastTs = ts

    if (this.continuous && !this.paused && !document.hidden) {
      const scrollAmount = (this.speedPxPerSec * dt) / 1000
      rail.scrollLeft += scrollAmount

      // Calculate when to reset - when we've scrolled past the first set
      const cardWidth = 320 // w-72 sm:w-80 average
      const gap = 24 // gap-6
      const singleSetWidth = this.products.length * (cardWidth + gap)

      // Reset to beginning when we've scrolled past the first complete set
      if (rail.scrollLeft >= singleSetWidth) {
        rail.scrollLeft = 0
      }
    }

    this.rafId = requestAnimationFrame(this.loop)
  }

  private startRAF(reset = false) {
    if (reset) this.lastTs = 0
    this.stopRAF()
    this.zone.runOutsideAngular(() => {
      this.rafId = requestAnimationFrame(this.loop)
    })
  }

  private stopRAF() {
    if (this.rafId != null) {
      cancelAnimationFrame(this.rafId)
      this.rafId = null
    }
  }

  private onVisibility = () => {
    // Pause when tab is hidden, resume when visible
    if (document.hidden) {
      this.paused = true
    } else {
      this.paused = false
    }
  }

  // Helper functions
  ratingLabel(r: number) {
    return `${this.safeNumber(r).toFixed(1)} out of 5 stars`
  }

  starFilled(r: number, s: number) {
    return s <= Math.round(this.safeNumber(r))
  }

  safeNumber(v: any) {
    const n = Number(v)
    return Number.isFinite(n) ? n : 0
  }

  onImageLoad(i: number) {
    this.imageLoading[i] = false
  }

  trackById = (_: number, p: Product) => p.id
}
