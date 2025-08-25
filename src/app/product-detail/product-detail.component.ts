import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

interface Product {
  id: number;
  name: string;
  shortName: string;
  slug: string;
  description: string;
  images: string[];
  currentImage: string;
  rating: number;
  category: string;
  technology: string;
  keyFeatures: string[];
  coverage: string;
  filterType: string;
  noiseLevel: string;
  isHovered: boolean;
  imageInterval?: any;
  badge?: string;
  isAward?: boolean;
  awardType?: string;
  detailedSpecs?: {
    dimensions: string;
    weight: string;
    powerConsumption: string;
    filterLife: string;
    warranty: string;
    certifications: string[];
  };
  detailedFeatures?: string[];
  technicalDetails?: {
    cadr: string;
    airChangesPerHour: string;
    roomSizeRecommended: string;
    fanSpeeds: number;
    controlType: string;
    indicators: string[];
  };
}

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  // ui state
  product: Product | null = null;
  currentImageIndex = 0;
  imageInterval?: any;
  isLoading = true;

  // tabs: 'features' | 'tech' | 'specs'
  activeTab: 'features' | 'tech' | 'specs' = 'features';

 // Sample products data (in real app, this would come from a service)
  private products: Product[] = [
    {
      id: 1,
      name: "WINIX 5500-2 Air Purifier • True HEPA, PlasmaWave & Washable AOC Carbon",
      shortName: "5500-2 Elite",
      slug: "winix-5500-2-plasmawave-elite",

      description:
        "Powerful HEPA purifier with PlasmaWave technology and a washable AOC carbon filter for odour reduction. Certified HEPA performance with low 27.8 dB noise and coverage up to 360 sq ft.",

      images: [
        "/placeholder.svg?height=500&width=400&text=WINIX+5500-2+Front+View",
        "/placeholder.svg?height=500&width=400&text=WINIX+5500-2+Side+View",
        "/placeholder.svg?height=500&width=400&text=WINIX+5500-2+Filter+Detail",
        "/placeholder.svg?height=500&width=400&text=WINIX+5500-2+Control+Panel",
        "/placeholder.svg?height=500&width=400&text=WINIX+5500-2+In+Room",
      ],
      currentImage:
        "/placeholder.svg?height=500&width=400&text=WINIX+5500-2+Front+View",

      rating: 4.6, // Amazon: ≈39,053 reviews

      category: "Elite Series",
      technology: "True HEPA + PlasmaWave + AOC Carbon",

      keyFeatures: [
        "True HEPA filtration",
        "PlasmaWave technology",
        "Washable AOC carbon filter (odour reducing)",
        "Touch controls + hand/remote control",
        "Low noise 27.8 dB",
        "For rooms up to 360 sq ft"
      ],

      coverage: "360 sq ft",                           // Floor Area
      filterType: "True HEPA + Activated (AOC) Carbon",// Filter Type
      noiseLevel: "27.8 dB",                           // Noise Level

      isHovered: false,
      badge: "Best Seller",
      isAward: true,
      awardType: "Editor's Choice 2024",

      detailedSpecs: {
        dimensions: "19.8D x 37.8W x 59.9H cm",        // Item Dimensions
        weight: "6.7 kg",                               // Item Weight
        powerConsumption: "70W",                        // Wattage
        filterLife: "12 months (HEPA), 3 months (Carbon)", // kept
        warranty: "1 year limited",                     // Warranty Description
        certifications: ["Certified HEPA"]              // Specification Met
      },

      detailedFeatures: [
        "3-Stage Filtration System",
        "PlasmaWave Technology (Ozone-Free)",
        "Smart Auto Mode with Air Quality Sensor",
        "Sleep Mode for Ultra-Quiet Operation",
        "Filter Replacement Indicator",
        "LED Air Quality Indicator",
        "Timer Function (1, 4, 8 hours)"
      ],

      technicalDetails: {
        cadr: "243 CFM (Smoke), 246 CFM (Dust), 232 CFM (Pollen)", // kept
        airChangesPerHour: "4.8x per hour",
        roomSizeRecommended: "360 sq ft",
        fanSpeeds: 4,
        controlType: "Touch Panel + Remote",            // Control Method + Hand Control
        indicators: ["Air Quality LED", "Filter Replacement", "PlasmaWave Status"]
      }
    },
    {
      id: 2,
      name: "WINIX 5300-2 Premium 4 Stage Air Purifier",
      shortName: "5300-2 Premium",
      slug: "winix-5300-2-premium-4-stage-air-purifier",
      description:
        "Premium 4-stage air purifier with True HEPA filtration, PlasmaWave technology, and advanced odor control. Certified UK Allergy & ECARF with CADR 390 m³/h. Covers up to 1065 sq ft with ultra-quiet 27.8 dB operation.",

      images: [
        "/placeholder.svg?height=500&width=400&text=WINIX+5300-2+Front+View",
        "/placeholder.svg?height=500&width=400&text=WINIX+5300-2+Side+View",
        "/placeholder.svg?height=500&width=400&text=WINIX+5300-2+Filter+System",
        "/placeholder.svg?height=500&width=400&text=WINIX+5300-2+Control+Panel",
        "/placeholder.svg?height=500&width=400&text=WINIX+5300-2+Room+Setup",
      ],
      currentImage:
        "/placeholder.svg?height=500&width=400&text=WINIX+5300-2+Front+View",

      rating: 4.6, // Amazon: 4.6 (≈39k reviews)

      category: "Premium Series",
      technology: "True HEPA + PlasmaWave + Carbon",

      keyFeatures: [
        "True HEPA filter captures 99.97% of pollutants (0.3 microns)",
        "4-Stage Filtration System",
        "PlasmaWave Technology for safe pollutant breakdown",
        "Removes allergens, odors, smoke, and VOCs",
        "Coverage up to 1065 sq ft (CADR 390 m³/h)",
        "Low noise 27.8 dB operation"
      ],

      coverage: "360–1065 sq ft",         // Amazon (360 base, up to 1065)
      filterType: "True HEPA + Activated Carbon",
      noiseLevel: "27.8 dB",              // Amazon
      isHovered: false,
      badge: "Premium Choice",
      isAward: true,
      awardType: "Certified UK Allergy & ECARF",

      detailedSpecs: {
        dimensions: "5D x 37W x 49H cm",        // Amazon
        weight: "6.71 kg",                      // Amazon
        powerConsumption: "70W",                // Amazon (7E+1 ≈ 70)
        filterLife: "12 months (HEPA), 3–6 months (Carbon)",
        warranty: "2 years limited",            // Amazon
        certifications: ["Certified HEPA", "UK Allergy Certified", "ECARF", "AHAM Verified"]
      },

      detailedFeatures: [
        "4-Stage Filtration System",
        "PlasmaWave Technology (Ozone-Free)",
        "Smart Auto Mode with Air Quality Sensor",
        "Sleep Mode for Quiet Operation",
        "Filter Replacement Indicator",
        "CADR 390 m³/h — suitable for medium/large rooms",
        "No Remote Control included"
      ],

      technicalDetails: {
        cadr: "236 CFM airflow; CADR 390 m³/h",
        airChangesPerHour: "≈4.7x per hour",
        roomSizeRecommended: "Up to 1065 sq ft",
        fanSpeeds: 4,
        controlType: "Touch Panel + Button Control",
        indicators: ["Air Quality LED", "Filter Replacement", "Mode Status"]
      }
    },
    {
  id: 3,                                   // <-- pick the next numeric id in your list if needed
  name: "WINIX A231 Premium 4-Stage Air Purifier",
  shortName: "A231 Compact",
  slug: "a231",

  description:
    "Compact HEPA air purifier for small-to-medium rooms. AHAM-verified 230 sq ft coverage with washable pre-filter, activated carbon for odours, True HEPA (99.97%) and PlasmaWave technology. Low 20 dB operation with touch controls and remote controller.",

  images: [
    "/placeholder.svg?height=500&width=400&text=WINIX+A231+Front+View",
    "/placeholder.svg?height=500&width=400&text=WINIX+A231+Side+View",
    "/placeholder.svg?height=500&width=400&text=WINIX+A231+Filter+Detail",
    "/placeholder.svg?height=500&width=400&text=WINIX+A231+Control+Panel",
    "/placeholder.svg?height=500&width=400&text=WINIX+A231+In+Room",
  ],
  currentImage:
    "/placeholder.svg?height=500&width=400&text=WINIX+A231+Front+View",

  rating: 4.6,

  category: "Compact",
  technology: "True HEPA + PlasmaWave + Activated Carbon",

  keyFeatures: [
    "AHAM-verified coverage 230 sq ft",
    "Washable fine-mesh pre-filter",
    "Activated carbon odour filter",
    "True HEPA captures 99.97% down to 0.3 μm",
    "PlasmaWave air-cleaning technology",
    "Touch controls with remote controller",
    "Low noise 20 dB"
  ],

  coverage: "230 sq ft",
  filterType: "True HEPA + Activated Carbon + Washable Pre-filter",
  noiseLevel: "20 dB",
  isHovered: false,
  badge: "Compact Favorite",
  isAward: true,
  awardType: "Editor's Choice 2024",

  detailedSpecs: {
    dimensions: "24D x 24W x 37H cm",
    weight: "3.22 kg",
    powerConsumption: "—",
    filterLife: "—",
    warranty: "2 years limited",
    certifications: ["AHAM Certified"]
  },

  detailedFeatures: [
    "True-HEPA filter captures 99.97% of airborne allergens",
    "Washable fine-mesh pre-filter extends HEPA life",
    "Activated carbon reduces VOCs and household odours",
    "PlasmaWave acts as a permanent filter with no harmful ozone",
    "Quiet operation suitable for bedrooms and offices"
  ],

  technicalDetails: {
    cadr: "—",
    airChangesPerHour: "—",
    roomSizeRecommended: "230 sq ft",
    fanSpeeds:  "—" as any,         // keep the field; fill later if you get the exact value
    controlType: "Touch + Remote",
    indicators: ["Filter", "Air Quality"]
  }
},
    {
  id: 5,
  name: "WINIX T810 Smart Wi-Fi Air Purifier • HEPA + Carbon + PlasmaWave",
  shortName: "T810",
  slug: "t810",

  description:
    "Large-room purifier with Smart Wi-Fi, real-time air monitoring, True HEPA + Carbon filtration and PlasmaWave technology. AHAM Verified 410 sq ft coverage, yet can handle up to 1968 sq ft in 1 hour. Quiet, efficient and smart app-controlled.",

  images: [
    "/placeholder.svg?height=500&width=400&text=WINIX+T810+Front+View",
    "/placeholder.svg?height=500&width=400&text=WINIX+T810+WiFi+App",
    "/placeholder.svg?height=500&width=400&text=WINIX+T810+Carbon+Filter",
    "/placeholder.svg?height=500&width=400&text=WINIX+T810+Room+Setup"
  ],
  currentImage:
    "/placeholder.svg?height=500&width=400&text=WINIX+T810+Front+View",

  rating: 4.4, // Amazon: 4.4 (164 ratings)

  category: "Smart Wi-Fi Series",
  technology: "True HEPA + Carbon + PlasmaWave + Smart Wi-Fi",

  keyFeatures: [
    "AHAM Verified coverage 410 sq ft",
    "Cleans up to 1968 sq ft in 1 hour",
    "Wi-Fi Smart App control + Air Quality Monitor",
    "True HEPA filter (99.99% allergens, down to 0.01 micron)",
    "Washable fine mesh pre-filter",
    "Carbon filter for odors & VOCs",
    "PlasmaWave Air Cleaning Technology",
    "Air Quality Indicator with LED",
    "Smart Sensors + Auto Mode",
    "Ultra-Quiet operation",
    "Filter Replacement Indicator"
  ],

  coverage: "410 sq ft (AHAM) / up to 1968 sq ft in 1 hour",
  filterType: "True HEPA + Carbon + Washable Pre-filter",
  noiseLevel: "Ultra-quiet (low speed)",

  isHovered: false,
  badge: "Wi-Fi Smart",
  isAward: true,
  awardType: "Innovation Award 2024",

  detailedSpecs: {
    dimensions: "11.3D x 11.3W x 20.4H in",  // Amazon
    weight: "10.36 lbs (≈4.7 kg)",           // Amazon
    powerConsumption: "AC powered",          // Amazon
    filterLife: "12 months (HEPA), 3-6 months (Carbon)", // inferred
    warranty: "2 years limited",
    certifications: [
      "AHAM Certified",
      "CARB Certified",
      "Energy Star Certified",
      "FCC Certified",
      "UL Certified"
    ]
  },

  detailedFeatures: [
    "AHAM Verified 410 sq ft",
    "Cleans 1968 sq ft in 1 hour (984 sq ft in 30 min, 656 sq ft in 20 min, 492 sq ft in 15 min)",
    "Winix Smart Wi-Fi App for remote control & monitoring",
    "True HEPA filtration (99.99% allergens as small as 0.01 micron)",
    "Washable Fine Mesh Pre-Filter",
    "Carbon Filter reduces VOCs and odors from cooking, pets, and smoke",
    "PlasmaWave Air Cleaning Technology (ozone-free)",
    "Air Quality LED Indicator",
    "Smart Sensors + Auto Mode adjusts fan speed in real-time",
    "Ultra-Quiet on slowest speed",
    "Filter Replacement Indicator LED"
  ],

  technicalDetails: {
    cadr: "AHAM Verified 410 sq ft",
    airChangesPerHour: "4.8x (AHAM standard room size)",
    roomSizeRecommended: "410 sq ft (AHAM) / up to 1968 sq ft",
    fanSpeeds: 4,
    controlType: "Touch Panel + Smart Wi-Fi App",
    indicators: [
      "Air Quality LED",
      "Filter Replacement",
      "Wi-Fi Status"
    ]
  }
}
,
    {
  id: 7,
  name: "Winix T500 4-Stage True HEPA Air Purifier with PlasmaWave Technology",
  shortName: "T500",
  slug: "t500",

  description:
    "Compact tower purifier with 4-stage True HEPA filtration, PlasmaWave air cleaning technology, smart sensors with Auto Mode, and ultra-quiet sleep operation. AHAM verified for 230 sq ft and can clean up to 1,204 sq ft in 1 hour.",

  images: [
    "/placeholder.svg?height=500&width=400&text=WINIX+T500+Front+View",
    "/placeholder.svg?height=500&width=400&text=WINIX+T500+Side+View",
    "/placeholder.svg?height=500&width=400&text=WINIX+T500+Filter+System",
    "/placeholder.svg?height=500&width=400&text=WINIX+T500+Control+Panel",
    "/placeholder.svg?height=500&width=400&text=WINIX+T500+In+Room"
  ],
  currentImage:
    "/placeholder.svg?height=500&width=400&text=WINIX+T500+Front+View",

  rating: 4.6,

  category: "Tower Series",
  technology: "4-Stage True HEPA + PlasmaWave",

  keyFeatures: [
    "AHAM Verified 230 sq ft (cleans rooms up to 1,204 sq ft in 1 hour)",
    "True HEPA captures 99.97% of particles down to 0.03 microns",
    "Washable fine mesh pre-filter",
    "Activated carbon filter reduces VOCs & household odors",
    "PlasmaWave air cleaning technology",
    "Smart Sensors + Auto Mode adjust fan speed in real time",
    "Ultra-Quiet on lowest speed",
    "Light-sensing Sleep Mode",
    "Filter replacement indicator LED"
  ],

  coverage: "230 sq ft, up to 1,204 sq ft in 1 hour",
  filterType: "True HEPA + Carbon + Washable Pre-filter",
  noiseLevel: "Ultra-quiet (low speed)",
  isHovered: false,
  badge: "Great Value",
  isAward: false,
  awardType: "",

  detailedSpecs: {
    dimensions: "16.4H × 11.3W × 11.3D inches",
    weight: "9.06 lb",
    powerConsumption: "49W",
    filterLife: "HEPA ~12 months; Carbon ~3–6 months (typical use)",
    warranty: "3-year limited",
    certifications: ["AHAM Certified", "CADR Certified Rating"]
  },

  detailedFeatures: [
    "AHAM Verified 230 sq ft coverage",
    "Cleans 602 sq ft in 30 min, 401 sq ft in 20 min, 301 sq ft in 15 min",
    "Washable Fine Mesh Pre-Filter",
    "Activated Carbon Filter for odors & VOCs",
    "True HEPA Filtration (99.97% @ 0.03 microns)",
    "PlasmaWave Air Cleaning Technology (ozone-safe)",
    "Smart Sensors + Auto Mode (real-time fan adjustment)",
    "Ultra-Quiet operation on lowest speed",
    "Light-Automated Sleep Mode",
    "Filter Replacement Indicator LED"
  ],

  technicalDetails: {
    cadr: "CADR Certified (values not listed on page)",
    airChangesPerHour: "Varies by room; AHAM at 230 sq ft",
    roomSizeRecommended: "230 sq ft (AHAM)",
    fanSpeeds: 4,
    controlType: "Touch panel (Auto/Sleep) • Smart sensor",
    indicators: ["Air quality/auto status", "Filter replacement", "Sleep/Light sensor"]
  }
}
,
  ]

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  // --- lifecycle ---
  ngOnInit(): void {
    // read slug and load product
    this.route.params.subscribe((params) => {
      const slug = params['slug'];
      this.loadProduct(slug);
    });
  }

  ngOnDestroy(): void {
    if (this.imageInterval) clearInterval(this.imageInterval);
  }

  // --- data loading ---
  private loadProduct(slug: string): void {
    this.isLoading = true;

    // simulate async (replace with service call when ready)
    setTimeout(() => {
      this.product = this.products.find((p) => p.slug === slug) ?? null;
      this.isLoading = false;

      if (this.product) {
        this.currentImageIndex = 0;
        this.startImageSlideshow();
      } else {
        console.error('not found the product');
      }
    }, 300);
  }

  // --- slideshow ---
  private startImageSlideshow(): void {
    if (!this.product || this.product.images.length <= 1) return;

    if (this.imageInterval) clearInterval(this.imageInterval);
    this.imageInterval = setInterval(() => {
      // guard in case product changes
      if (!this.product) return;
      this.currentImageIndex =
        (this.currentImageIndex + 1) % this.product.images.length;
    }, 4000);
  }

  selectImage(index: number): void {
    this.currentImageIndex = index;
  }

  // --- helpers ---
  getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  goBack(): void {
    // change to '/home' if that’s your listing route
    this.router.navigate(['/']);
  }

  // --- tabs ---
  selectTab(tab: 'features' | 'tech' | 'specs'): void {
    this.activeTab = tab;
  }

  isActive(tab: 'features' | 'tech' | 'specs'): boolean {
    return this.activeTab === tab;
  }
}
