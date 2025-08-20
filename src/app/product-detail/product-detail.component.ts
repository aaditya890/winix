import { Component, OnInit, OnDestroy } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ActivatedRoute, Router, RouterModule } from "@angular/router"

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
    fanSpeeds: number
    controlType: string
    indicators: string[]
  }
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

  // Sample products data (in real app, this would come from a service)
  private products: Product[] = [
    {
      id: 1,
      name: "WINIX 5500-2 PlasmaWave Elite",
      shortName: "5500-2 Elite",
      slug: "winix-5500-2-plasmawave-elite",
      description:
        "Revolutionary 3-stage filtration with PlasmaWave technology for comprehensive air purification. This premium air purifier combines True HEPA filtration with our patented PlasmaWave technology to safely break down pollutants at the molecular level.",
      images: [
        "/placeholder.svg?height=500&width=400&text=WINIX+5500-2+Front+View",
        "/placeholder.svg?height=500&width=400&text=WINIX+5500-2+Side+View",
        "/placeholder.svg?height=500&width=400&text=WINIX+5500-2+Filter+Detail",
        "/placeholder.svg?height=500&width=400&text=WINIX+5500-2+Control+Panel",
        "/placeholder.svg?height=500&width=400&text=WINIX+5500-2+In+Room",
      ],
      currentImage: "/placeholder.svg?height=500&width=400&text=WINIX+5500-2+Front+View",
      rating: 5,
      category: "Elite Series",
      technology: "PlasmaWave Technology",
      keyFeatures: ["True HEPA Filter", "PlasmaWave Technology", "Smart Auto Mode", "Sleep Mode"],
      coverage: "360 sq ft",
      filterType: "True HEPA",
      noiseLevel: "27.8 dB",
      isHovered: false,
      badge: "Best Seller",
      isAward: true,
      awardType: "Editor's Choice 2024",
      detailedSpecs: {
        dimensions: "15.0 x 8.2 x 23.6 inches",
        weight: "17.6 lbs",
        powerConsumption: "70W",
        filterLife: "12 months (HEPA), 3 months (Carbon)",
        warranty: "3 years limited",
        certifications: ["ENERGY STAR", "CARB Certified", "AHAM Verified"],
      },
      detailedFeatures: [
        "3-Stage Filtration System",
        "PlasmaWave Technology (Ozone-Free)",
        "Smart Auto Mode with Air Quality Sensor",
        "Sleep Mode for Ultra-Quiet Operation",
        "Filter Replacement Indicator",
        "Remote Control Included",
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
      name: "WINIX AM90 Smart Connect Pro",
      shortName: "AM90 Smart Pro",
      slug: "winix-am90-smart-connect-pro",
      description:
        "Wi-Fi enabled smart air purifier with advanced app control and real-time monitoring. Connect to your smartphone for complete control and monitoring of your indoor air quality from anywhere.",
      images: [
        "/placeholder.svg?height=500&width=400&text=WINIX+AM90+Front+View",
        "/placeholder.svg?height=500&width=400&text=WINIX+AM90+App+Interface",
        "/placeholder.svg?height=500&width=400&text=WINIX+AM90+Smart+Features",
        "/placeholder.svg?height=500&width=400&text=WINIX+AM90+Filter+System",
        "/placeholder.svg?height=500&width=400&text=WINIX+AM90+Room+Setup",
      ],
      currentImage: "/placeholder.svg?height=500&width=400&text=WINIX+AM90+Front+View",
      rating: 5,
      category: "Smart Series",
      technology: "Wi-Fi Smart Control",
      keyFeatures: ["Wi-Fi Connectivity", "Smart App Control", "Voice Compatible", "Air Quality Display"],
      coverage: "360 sq ft",
      filterType: "True HEPA",
      noiseLevel: "29.5 dB",
      isHovered: false,
      badge: "Smart Choice",
      isAward: true,
      awardType: "Innovation Award 2024",
      detailedSpecs: {
        dimensions: "14.9 x 7.8 x 23.6 inches",
        weight: "16.3 lbs",
        powerConsumption: "65W",
        filterLife: "12 months (HEPA), 3 months (Carbon)",
        warranty: "3 years limited",
        certifications: ["ENERGY STAR", "Wi-Fi Certified", "AHAM Verified"],
      },
      detailedFeatures: [
        "Wi-Fi Connectivity with Smart App",
        "Voice Control (Alexa & Google Assistant)",
        "Real-time Air Quality Monitoring",
        "Remote Control via Smartphone",
        "Smart Auto Mode with Learning",
        "Schedule Programming",
        "Filter Life Tracking",
        "Air Quality History & Reports",
      ],
      technicalDetails: {
        cadr: "240 CFM (Smoke), 243 CFM (Dust), 228 CFM (Pollen)",
        airChangesPerHour: "4.7x per hour",
        roomSizeRecommended: "360 sq ft",
        fanSpeeds: 5,
        controlType: "Smart App + Touch Panel",
        indicators: ["Air Quality Display", "Wi-Fi Status", "Filter Status"],
      },
    },
    {
      id: 3,
      name: "WINIX C535 Professional Max",
      shortName: "C535 Pro Max",
      slug: "winix-c535-professional-max",
      description:
        "Professional-grade 4-stage filtration for demanding commercial environments. Engineered for high-performance air cleaning in offices, clinics, and commercial spaces.",
      images: [
        "/placeholder.svg?height=500&width=400&text=WINIX+C535+Professional",
        "/placeholder.svg?height=500&width=400&text=WINIX+C535+4-Stage+Filter",
        "/placeholder.svg?height=500&width=400&text=WINIX+C535+Commercial+Use",
        "/placeholder.svg?height=500&width=400&text=WINIX+C535+Control+System",
        "/placeholder.svg?height=500&width=400&text=WINIX+C535+Office+Setup",
      ],
      currentImage: "/placeholder.svg?height=500&width=400&text=WINIX+C535+Professional",
      rating: 4,
      category: "Professional",
      technology: "4-Stage Advanced Filtration",
      keyFeatures: ["4-Stage Filtration", "Activated Carbon", "Timer Function", "LED Display"],
      coverage: "360 sq ft",
      filterType: "True HEPA",
      noiseLevel: "30.2 dB",
      isHovered: false,
      badge: "Professional",
      isAward: false,
      detailedSpecs: {
        dimensions: "16.5 x 9.1 x 25.2 inches",
        weight: "19.8 lbs",
        powerConsumption: "80W",
        filterLife: "12 months (HEPA), 6 months (Carbon)",
        warranty: "5 years commercial",
        certifications: ["ENERGY STAR", "Commercial Grade", "OSHA Compliant"],
      },
      detailedFeatures: [
        "4-Stage Professional Filtration",
        "Enhanced Activated Carbon Filter",
        "Commercial-Grade Construction",
        "Heavy-Duty Motor System",
        "Professional Timer Controls",
        "LED Status Display",
        "Maintenance Alerts",
        "Continuous Operation Capable",
      ],
      technicalDetails: {
        cadr: "280 CFM (Smoke), 285 CFM (Dust), 275 CFM (Pollen)",
        airChangesPerHour: "5.2x per hour",
        roomSizeRecommended: "360 sq ft",
        fanSpeeds: 5,
        controlType: "Professional Control Panel",
        indicators: ["LED Display", "Filter Status", "Operation Mode"],
      },
    },
    {
      id: 4,
      name: "WINIX HR900 Pet Guardian",
      shortName: "HR900 Pet",
      slug: "winix-hr900-pet-guardian",
      description:
        "Specialized air purifier engineered for pet owners with advanced hair capture technology. Features pet-specific filtration to handle dander, odors, and allergens.",
      images: [
        "/placeholder.svg?height=500&width=400&text=WINIX+HR900+Pet+Guardian",
        "/placeholder.svg?height=500&width=400&text=WINIX+HR900+Pet+Filter",
        "/placeholder.svg?height=500&width=400&text=WINIX+HR900+With+Pets",
        "/placeholder.svg?height=500&width=400&text=WINIX+HR900+Hair+Capture",
        "/placeholder.svg?height=500&width=400&text=WINIX+HR900+Pet+Home",
      ],
      currentImage: "/placeholder.svg?height=500&width=400&text=WINIX+HR900+Pet+Guardian",
      rating: 5,
      category: "Pet Care",
      technology: "Pet-Specialized Filtration",
      keyFeatures: ["Pet Hair Capture", "Odor Reduction", "Allergen Control", "Pet-Safe Design"],
      coverage: "300 sq ft",
      filterType: "Pet HEPA",
      noiseLevel: "28.1 dB",
      isHovered: false,
      badge: "Pet Favorite",
      isAward: true,
      awardType: "Pet Owner's Choice 2024",
      detailedSpecs: {
        dimensions: "14.2 x 7.5 x 22.8 inches",
        weight: "15.4 lbs",
        powerConsumption: "60W",
        filterLife: "8 months (Pet HEPA), 4 months (Odor)",
        warranty: "3 years limited",
        certifications: ["Pet Safe Certified", "AHAM Verified", "Allergen Tested"],
      },
      detailedFeatures: [
        "Advanced Pet Hair Capture System",
        "Specialized Pet Odor Filter",
        "Pet Dander Elimination",
        "Allergen Reduction Technology",
        "Pet-Safe Operation (No Ozone)",
        "Quiet Mode for Sensitive Pets",
        "Easy Filter Access",
        "Pet Activity Sensor",
      ],
      technicalDetails: {
        cadr: "220 CFM (Smoke), 225 CFM (Dust), 210 CFM (Pollen)",
        airChangesPerHour: "4.4x per hour",
        roomSizeRecommended: "300 sq ft",
        fanSpeeds: 4,
        controlType: "Pet-Friendly Touch Panel",
        indicators: ["Pet Mode", "Filter Life", "Air Quality"],
      },
    },
    {
      id: 5,
      name: "WINIX Tower QS Ultra Slim",
      shortName: "Tower QS Ultra",
      slug: "winix-tower-qs-ultra-slim",
      description:
        "Sleek tower design with whisper-quiet operation and 360-degree filtration. Perfect for modern homes with space constraints without compromising performance.",
      images: [
        "/placeholder.svg?height=500&width=400&text=WINIX+Tower+QS+Ultra",
        "/placeholder.svg?height=500&width=400&text=WINIX+Tower+360+Design",
        "/placeholder.svg?height=500&width=400&text=WINIX+Tower+Slim+Profile",
        "/placeholder.svg?height=500&width=400&text=WINIX+Tower+LED+Display",
        "/placeholder.svg?height=500&width=400&text=WINIX+Tower+Modern+Room",
      ],
      currentImage: "/placeholder.svg?height=500&width=400&text=WINIX+Tower+QS+Ultra",
      rating: 4,
      category: "Modern Design",
      technology: "360° Tower Filtration",
      keyFeatures: ["Tower Design", "Ultra Quiet", "360° Air Intake", "LED Touch Display"],
      coverage: "300 sq ft",
      filterType: "True HEPA",
      noiseLevel: "25.6 dB",
      isHovered: false,
      badge: "Ultra Quiet",
      isAward: false,
      detailedSpecs: {
        dimensions: "8.7 x 8.7 x 43.3 inches",
        weight: "13.2 lbs",
        powerConsumption: "45W",
        filterLife: "12 months (HEPA), 6 months (Pre-filter)",
        warranty: "2 years limited",
        certifications: ["ENERGY STAR", "Quiet Mark Certified"],
      },
      detailedFeatures: [
        "360° Air Intake Design",
        "Ultra-Quiet Operation",
        "Space-Saving Tower Form",
        "LED Touch Display",
        "Modern Aesthetic Design",
        "Oscillating Air Output",
        "Night Light Function",
        "Compact Footprint",
      ],
      technicalDetails: {
        cadr: "200 CFM (Smoke), 205 CFM (Dust), 195 CFM (Pollen)",
        airChangesPerHour: "4.0x per hour",
        roomSizeRecommended: "300 sq ft",
        fanSpeeds: 6,
        controlType: "LED Touch Display",
        indicators: ["Touch Display", "Filter Status", "Speed Level"],
      },
    },
    {
      id: 6,
      name: "WINIX Zero+ Compact Genius",
      shortName: "Zero+ Compact",
      slug: "winix-zero-plus-compact-genius",
      description:
        "Ultra-compact air purifier with zero ozone emission and maximum efficiency. Perfect for small spaces, dorms, and personal use areas.",
      images: [
        "/placeholder.svg?height=500&width=400&text=WINIX+Zero+Compact",
        "/placeholder.svg?height=500&width=400&text=WINIX+Zero+Portable",
        "/placeholder.svg?height=500&width=400&text=WINIX+Zero+Small+Space",
        "/placeholder.svg?height=500&width=400&text=WINIX+Zero+Filter+System",
        "/placeholder.svg?height=500&width=400&text=WINIX+Zero+Desk+Setup",
      ],
      currentImage: "/placeholder.svg?height=500&width=400&text=WINIX+Zero+Compact",
      rating: 4,
      category: "Compact",
      technology: "Zero Ozone Emission",
      keyFeatures: ["Zero Ozone", "Compact Design", "Energy Efficient", "Portable"],
      coverage: "200 sq ft",
      filterType: "True HEPA",
      noiseLevel: "23.4 dB",
      isHovered: false,
      badge: "Eco-Friendly",
      isAward: false,
      detailedSpecs: {
        dimensions: "10.2 x 6.5 x 16.5 inches",
        weight: "8.8 lbs",
        powerConsumption: "25W",
        filterLife: "8 months (HEPA), 4 months (Carbon)",
        warranty: "2 years limited",
        certifications: ["ENERGY STAR", "Zero Ozone Certified"],
      },
      detailedFeatures: [
        "Zero Ozone Emission Technology",
        "Ultra-Compact Design",
        "Energy Efficient Operation",
        "Portable & Lightweight",
        "Whisper-Quiet Performance",
        "Simple One-Touch Control",
        "Filter Life Indicator",
        "Auto Shut-off Feature",
      ],
      technicalDetails: {
        cadr: "150 CFM (Smoke), 155 CFM (Dust), 145 CFM (Pollen)",
        airChangesPerHour: "4.5x per hour",
        roomSizeRecommended: "200 sq ft",
        fanSpeeds: 3,
        controlType: "One-Touch Control",
        indicators: ["Power LED", "Filter Status"],
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
    if (this.imageInterval) {
      clearInterval(this.imageInterval)
    }
  }

  private loadProduct(slug: string): void {
    this.isLoading = true

    // Simulate API call delay
    setTimeout(() => {
      this.product = this.products.find((p) => p.slug === slug) || null
      this.isLoading = false

      if (this.product) {
        this.startImageSlideshow()
      } else {
        console.error("not found the product")
      }
    }, 500)
  }

  private startImageSlideshow(): void {
    if (this.product && this.product.images.length > 1) {
      this.imageInterval = setInterval(() => {
        if (this.product) {
          this.currentImageIndex = (this.currentImageIndex + 1) % this.product.images.length
        }
      }, 4000)
    }
  }

  selectImage(index: number): void {
    this.currentImageIndex = index
  }

  getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0)
  }

  goBack(): void {
    this.router.navigate(["/"])
  }
}
