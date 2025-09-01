import { Component,  OnInit,  OnDestroy } from "@angular/core"
import { CommonModule } from "@angular/common"
import {  ActivatedRoute,  Router, RouterModule } from "@angular/router"

interface Product {
  id: number
  name: string
  shortName: string
  slug: string
  description: string
  images: string[]
  currentImage: string
  rating: number
  category: string
  technology: string
  keyFeatures: string[]
  coverage: string
  filterType: string
  noiseLevel: string
  isHovered: boolean
  imageInterval?: any
  badge?: string
  isAward?: boolean
  awardType?: string
  price?: string
  mrp?: string
  detailedSpecs?: {
    dimensions: string
    weight: string
    powerConsumption: string
    filterLife: string
    warranty: string
    certifications: string[]
  }
  detailedFeatures?: string[]
  technicalDetails?: {
    cadr: string
    airChangesPerHour: string
    roomSizeRecommended: string
    fanSpeeds: number | string
    controlType: string
    indicators: string[]
  }
}

type SectionKey = "details" | "techSpecs" | "care" | "inBox" | "tests" | "additional"

type Review = {
  id: string
  author: string
  rating: number
  title: string
  body: string
  date: string
  verified: boolean
  helpful: number
  images?: string[]
}

type FAQ = {
  q: string
  a: string
  open?: boolean
}

@Component({
  selector: "app-product-detail",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  product: Product | null = null
  currentImageIndex = 0
  imageInterval?: any
  isLoading = true
  bottomBannerSrc: string | null = null

  sectionsOpen: Record<SectionKey, boolean> = {
    details: false,
    techSpecs: false,
    care: false,
    inBox: false,
    tests: false,
    additional: false,
  }

  // Text-only FAQs (no images)
  faqs: FAQ[] = [
    {
      q: "How often should I replace the HEPA and carbon filters?",
      a: "HEPA filters typically last up to 12 months depending on usage and air quality, while AOC carbon filters may need replacement every 3–6 months. Use the filter indicator for accurate timing.",
      open: false,
    },
    {
      q: "Does PlasmaWave produce ozone?",
      a: "WINIX PlasmaWave technology is certified ozone-free when used as instructed. It neutralizes pollutants at a molecular level without harmful by-products.",
      open: false,
    },
    {
      q: "What room size is best for this model?",
      a: "The 5500-2 is recommended for rooms up to 360 sq ft. For larger rooms, consider higher CADR/coverage models.",
      open: false,
    },
    {
      q: "Is it quiet enough for bedrooms?",
      a: "Yes. On Sleep mode it operates at a very low noise level suitable for undisturbed sleep.",
      open: false,
    },
  ]

  // Reviews include optional images
  reviews: Review[] = [
    {
      id: "r1",
      author: "Ananya",
      rating: 5,
      title: "Air feels fresh in minutes",
      body: "After cooking, smells vanish quickly. Auto mode reacts fast and it’s quiet at night.",
      date: "2025-08-01",
      verified: true,
      helpful: 18,
      images: ["/review-kitchen-fresh-air.png", "/air-quality-led.png"],
    },
    {
      id: "r2",
      author: "Rahul",
      rating: 4,
      title: "Solid performer, great filters",
      body: "HEPA + carbon combo works well for dust and pet odours. Build feels premium.",
      date: "2025-07-18",
      verified: true,
      helpful: 11,
      images: ["/filter-closeup.png"],
    },
    {
      id: "r3",
      author: "Maya",
      rating: 5,
      title: "Perfect for bedroom",
      body: "Super quiet on sleep mode. Air Quality LED is useful and not too bright.",
      date: "2025-06-29",
      verified: true,
      helpful: 7,
      images: [],
    },
  ]

  private products: Product[] = [
    {
      id: 1,
      name: "WINIX 5500-2 Air Purifier • True HEPA, PlasmaWave & Washable AOC Carbon",
      shortName: "5500-2 Elite",
      slug: "winix-5500-2-plasmawave-elite",
      description:
        "Powerful HEPA purifier with PlasmaWave technology and a washable AOC carbon filter for odour reduction. Certified HEPA performance with low 27.8 dB noise and coverage up to 360 sq ft.",
      images: [
        "assets/products/5500-2/product-1.jpg",
        "assets/products/5500-2/product-2.jpg",
        "assets/products/5500-2/product-3.jpg",
        "assets/products/5500-2/product-4.jpg",
        "assets/products/5500-2/product-5.jpg",
      ],
      currentImage: "assets/products/5500-2/product-1.jpg",
      rating: 4.6,
      category: "Elite Series",
      technology: "True HEPA + PlasmaWave + AOC Carbon",
      keyFeatures: [
        "True HEPA filtration",
        "PlasmaWave technology",
        "Washable AOC carbon filter",
        "Touch controls + remote",
        "Low noise 27.8 dB",
        "Coverage up to 360 sq ft",
      ],
      coverage: "360 sq ft",
      filterType: "True HEPA + Activated (AOC) Carbon",
      noiseLevel: "27.8 dB",
      isHovered: false,
      badge: "Best Seller",
      isAward: true,
      awardType: "Editor's Choice 2024",
      price: "₹19,999",
      mrp: "₹25,999",
      detailedSpecs: {
        dimensions: "19.8D x 37.8W x 59.9H cm",
        weight: "6.7 kg",
        powerConsumption: "70W",
        filterLife: "12 months (HEPA), 3 months (Carbon)",
        warranty: "1 year limited",
        certifications: ["Certified HEPA"],
      },
      detailedFeatures: [
        "3-Stage Filtration System",
        "PlasmaWave Technology (Ozone-Free)",
        "Smart Auto Mode with Air Quality Sensor",
        "Sleep Mode for Ultra-Quiet Operation",
        "Filter Replacement Indicator",
        "LED Air Quality Indicator",
        "Timer Function (1, 4, 8 hours)",
      ],
      technicalDetails: {
        cadr: "243 CFM (Smoke), 246 CFM (Dust), 232 CFM (Pollen)",
        airChangesPerHour: "4.8x per hour",
        roomSizeRecommended: "360 sq ft",
        fanSpeeds: 4,
        controlType: "Touch Panel + Remote",
        indicators: ["Air Quality LED", "Filter Replacement", "PlasmaWave Status"],
      },
    },
    {
      id: 2,
      name: "WINIX 5300-2 Premium 4 Stage Air Purifier",
      shortName: "5300-2 Premium",
      slug: "winix-5300-2-premium-4-stage-air-purifier",
      description:
        "Premium 4-stage air purifier with True HEPA filtration, PlasmaWave technology, and advanced odor control. CADR 390 m³/h. Covers up to 1065 sq ft with ultra-quiet 27.8 dB operation.",
      images: [
        "assets/products/5300-2/product-1.jpg",
        "assets/products/5300-2/product-2.jpg",
        "assets/products/5300-2/product-3.jpg",
        "assets/products/5300-2/product-4.jpg",
        "assets/products/5300-2/product-5.jpg",
      ],
      currentImage: "assets/products/5300-2/product-1.jpg",
      rating: 4.6,
      category: "Premium Series",
      technology: "True HEPA + PlasmaWave + Carbon",
      keyFeatures: [
        "True HEPA 99.97% @ 0.3μm",
        "4-Stage Filtration",
        "PlasmaWave Technology",
        "Removes allergens, odors, VOCs",
        "CADR 390 m³/h",
        "Low noise 27.8 dB",
      ],
      coverage: "360–1065 sq ft",
      filterType: "True HEPA + Activated Carbon",
      noiseLevel: "27.8 dB",
      isHovered: false,
      badge: "Premium Choice",
      isAward: true,
      awardType: "UK Allergy & ECARF",
      price: "₹17,999",
      mrp: "₹23,999",
      detailedSpecs: {
        dimensions: "5D x 37W x 49H cm",
        weight: "6.71 kg",
        powerConsumption: "70W",
        filterLife: "12 months (HEPA), 3–6 months (Carbon)",
        warranty: "2 years limited",
        certifications: ["Certified HEPA", "UK Allergy Certified", "ECARF", "AHAM Verified"],
      },
      detailedFeatures: [
        "PlasmaWave Technology (Ozone-Free)",
        "Smart Auto & Sleep Modes",
        "Filter Replacement Indicator",
        "CADR 390 m³/h — medium/large rooms",
      ],
      technicalDetails: {
        cadr: "236 CFM airflow; CADR 390 m³/h",
        airChangesPerHour: "≈4.7x per hour",
        roomSizeRecommended: "Up to 1065 sq ft",
        fanSpeeds: 4,
        controlType: "Touch Panel + Button Control",
        indicators: ["Air Quality LED", "Filter Replacement", "Mode Status"],
      },
    },
    {
      id: 3,
      name: "WINIX A231 Premium 4-Stage Air Purifier",
      shortName: "A231 Compact",
      slug: "a231",
      description:
        "Compact HEPA purifier for small-to-medium rooms. AHAM-verified 230 sq ft coverage with washable pre-filter, activated carbon, True HEPA and PlasmaWave.",
      images: [
        "assets/products/A231/product-1.jpg",
        "assets/products/A231/product-2.jpg",
        "assets/products/A231/product-3.jpg",
        "assets/products/A231/product-4.jpg",
        "assets/products/A231/product-5.jpg",
      ],
      currentImage: "assets/products/A231/product-1.jpg",
      rating: 4.6,
      category: "Compact",
      technology: "True HEPA + PlasmaWave + Activated Carbon",
      keyFeatures: [
        "AHAM coverage 230 sq ft",
        "Washable pre-filter",
        "Activated carbon filter",
        "True HEPA 99.97%",
        "PlasmaWave",
        "Low noise 20 dB",
      ],
      coverage: "230 sq ft",
      filterType: "True HEPA + Activated Carbon + Washable Pre-filter",
      noiseLevel: "20 dB",
      isHovered: false,
      badge: "Compact Favorite",
      isAward: true,
      awardType: "Editor's Choice 2024",
      price: "₹9,999",
      mrp: "₹12,999",
      detailedSpecs: {
        dimensions: "24D x 24W x 37H cm",
        weight: "3.22 kg",
        powerConsumption: "—",
        filterLife: "—",
        warranty: "2 years limited",
        certifications: ["AHAM Certified"],
      },
      detailedFeatures: [
        "True-HEPA captures 99.97% of allergens",
        "Washable pre-filter extends HEPA life",
        "Activated carbon reduces VOCs and odours",
        "Quiet operation for bedrooms/offices",
      ],
      technicalDetails: {
        cadr: "—",
        airChangesPerHour: "—",
        roomSizeRecommended: "230 sq ft",
        fanSpeeds: "—",
        controlType: "Touch + Remote",
        indicators: ["Filter", "Air Quality"],
      },
    },
  ]

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const slug = params["slug"]
      this.loadProduct(slug)
    })
  }

  ngOnDestroy(): void {
    if (this.imageInterval) clearInterval(this.imageInterval)
  }

  private loadProduct(slug: string): void {
    this.isLoading = true
    setTimeout(() => {
      this.product = this.products.find((p) => p.slug === slug) ?? null
      this.isLoading = false
      if (this.product) {
        this.currentImageIndex = 0
        this.startImageSlideshow()
        this.bottomBannerSrc = null
      }
    }, 250)
  }

  private startImageSlideshow(): void {
    if (!this.product || this.product.images.length <= 1) return
    if (this.imageInterval) clearInterval(this.imageInterval)
    this.imageInterval = setInterval(() => {
      if (!this.product) return
      this.currentImageIndex = (this.currentImageIndex + 1) % this.product.images.length
    }, 4000)
  }

  selectImage(index: number): void {
    this.currentImageIndex = index
  }

  toggleSection(key: SectionKey): void {
    this.sectionsOpen[key] = !this.sectionsOpen[key]
  }

  toggleFaq(i: number) {
    this.faqs[i].open = !this.faqs[i].open
  }

  // Reviews
  get totalReviews(): number {
    return this.reviews.length
  }
  get averageRating(): number {
    if (!this.reviews.length) return this.product?.rating ?? 0
    const sum = this.reviews.reduce((a, r) => a + (Number.isFinite(r.rating) ? r.rating : 0), 0)
    return Math.round((sum / this.reviews.length) * 10) / 10
  }
  countFor(star: number): number {
    return this.reviews.filter((r) => Math.round(r.rating) === star).length
  }
  percentFor(star: number): number {
    if (!this.totalReviews) return 0
    return Math.round((this.countFor(star) / this.totalReviews) * 100)
  }
  helpful(id: string) {
    const r = this.reviews.find((x) => x.id === id)
    if (r) r.helpful += 1
  }

  // Utils
  goBack(): void {
    this.router.navigate(["/"])
  }

  parsePrice(p?: string): number | null {
    if (!p) return null
    const digits = p.replace(/[^\d]/g, "")
    const n = Number(digits)
    return Number.isFinite(n) ? n : null
  }
  discountPercent(price?: string, mrp?: string): number | null {
    const p = this.parsePrice(price)
    const m = this.parsePrice(mrp)
    if (!p || !m || m <= p) return null
    return Math.round(((m - p) / m) * 100)
  }

  formatDate(d: string): string {
    const date = new Date(d)
    return date.toLocaleDateString()
  }
}
