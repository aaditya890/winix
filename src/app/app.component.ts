import { Component,OnInit,OnDestroy } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterOutlet } from "@angular/router"

interface Product {
  id: number
  name: string
  shortName: string
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
  price?: string
  originalPrice?: string
  badge?: string
}

interface TechFeature {
  icon: string
  title: string
  description: string
  color: string
}

interface Testimonial {
  name: string
  role: string
  content: string
  rating: number
  avatar: string
  location: string
  product: string
}

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, OnDestroy {
  title = "winix"
  open = false

  // Hero slideshow
  currentImageIndex = 0
  slideInterval?: any

  // Current featured product
  currentFeaturedIndex = 0
  featuredInterval?: any

  // Auto-scroll properties for products
  autoScrollInterval?: any
  currentScrollIndex = 0
  cardsToShow = 3
  isAutoScrolling = true

  // Auto-scroll properties for testimonials
  testimonialAutoScrollInterval?: any
  currentTestimonialIndex = 0
  testimonialsToShow = 3
  isTestimonialAutoScrolling = true

  allProducts: Product[] = [
    {
      id: 1,
      name: "WINIX 5500-2 PlasmaWave Elite",
      shortName: "5500-2 Elite",
      description: "Revolutionary 3-stage filtration with PlasmaWave technology for comprehensive air purification.",
      images: [
        "/placeholder.svg?height=300&width=250&text=WINIX+5500-2+Elite",
        "/placeholder.svg?height=300&width=250&text=WINIX+5500-2+Detail",
      ],
      currentImage: "/placeholder.svg?height=300&width=250&text=WINIX+5500-2+Elite",
      rating: 5,
      category: "Elite Series",
      technology: "PlasmaWave Technology",
      keyFeatures: ["True HEPA Filter", "PlasmaWave Technology", "Smart Auto Mode", "Sleep Mode"],
      coverage: "360 sq ft",
      filterType: "True HEPA",
      noiseLevel: "27.8 dB",
      isHovered: false,
      badge: "Best Seller",
    },
    {
      id: 2,
      name: "WINIX AM90 Smart Connect Pro",
      shortName: "AM90 Smart Pro",
      description: "Wi-Fi enabled smart air purifier with advanced app control and real-time monitoring.",
      images: [
        "/placeholder.svg?height=300&width=250&text=WINIX+AM90+Smart",
        "/placeholder.svg?height=300&width=250&text=WINIX+AM90+App",
      ],
      currentImage: "/placeholder.svg?height=300&width=250&text=WINIX+AM90+Smart",
      rating: 5,
      category: "Smart Series",
      technology: "Wi-Fi Smart Control",
      keyFeatures: ["Wi-Fi Connectivity", "Smart App Control", "Voice Compatible", "Air Quality Display"],
      coverage: "360 sq ft",
      filterType: "True HEPA",
      noiseLevel: "29.5 dB",
      isHovered: false,
      badge: "Smart Choice",
    },
    {
      id: 3,
      name: "WINIX C535 Professional Max",
      shortName: "C535 Pro Max",
      description: "Professional-grade 4-stage filtration for demanding commercial environments.",
      images: [
        "/placeholder.svg?height=300&width=250&text=WINIX+C535+Pro",
        "/placeholder.svg?height=300&width=250&text=WINIX+C535+Filter",
      ],
      currentImage: "/placeholder.svg?height=300&width=250&text=WINIX+C535+Pro",
      rating: 4,
      category: "Professional",
      technology: "4-Stage Advanced Filtration",
      keyFeatures: ["4-Stage Filtration", "Activated Carbon", "Timer Function", "LED Display"],
      coverage: "360 sq ft",
      filterType: "True HEPA",
      noiseLevel: "30.2 dB",
      isHovered: false,
      badge: "Professional",
    },
    {
      id: 4,
      name: "WINIX HR900 Pet Guardian",
      shortName: "HR900 Pet",
      description: "Specialized air purifier engineered for pet owners with advanced hair capture.",
      images: [
        "/placeholder.svg?height=300&width=250&text=WINIX+HR900+Pet",
        "/placeholder.svg?height=300&width=250&text=WINIX+HR900+Action",
      ],
      currentImage: "/placeholder.svg?height=300&width=250&text=WINIX+HR900+Pet",
      rating: 5,
      category: "Pet Care",
      technology: "Pet-Specialized Filtration",
      keyFeatures: ["Pet Hair Capture", "Odor Reduction", "Allergen Control", "Pet-Safe Design"],
      coverage: "300 sq ft",
      filterType: "Pet HEPA",
      noiseLevel: "28.1 dB",
      isHovered: false,
      badge: "Pet Favorite",
    },
    {
      id: 5,
      name: "WINIX Tower QS Ultra Slim",
      shortName: "Tower QS Ultra",
      description: "Sleek tower design with whisper-quiet operation and 360-degree filtration.",
      images: [
        "/placeholder.svg?height=300&width=250&text=WINIX+Tower+QS",
        "/placeholder.svg?height=300&width=250&text=WINIX+Tower+Detail",
      ],
      currentImage: "/placeholder.svg?height=300&width=250&text=WINIX+Tower+QS",
      rating: 4,
      category: "Modern Design",
      technology: "360° Tower Filtration",
      keyFeatures: ["Tower Design", "Ultra Quiet", "360° Air Intake", "LED Touch Display"],
      coverage: "300 sq ft",
      filterType: "True HEPA",
      noiseLevel: "25.6 dB",
      isHovered: false,
      badge: "Ultra Quiet",
    },
    {
      id: 6,
      name: "WINIX Zero+ Compact Genius",
      shortName: "Zero+ Compact",
      description: "Ultra-compact air purifier with zero ozone emission and maximum efficiency.",
      images: [
        "/placeholder.svg?height=300&width=250&text=WINIX+Zero+Compact",
        "/placeholder.svg?height=300&width=250&text=WINIX+Zero+Setup",
      ],
      currentImage: "/placeholder.svg?height=300&width=250&text=WINIX+Zero+Compact",
      rating: 4,
      category: "Compact",
      technology: "Zero Ozone Emission",
      keyFeatures: ["Zero Ozone", "Compact Design", "Energy Efficient", "Portable"],
      coverage: "200 sq ft",
      filterType: "True HEPA",
      noiseLevel: "23.4 dB",
      isHovered: false,
      badge: "Eco-Friendly",
    },
  ]

  techFeatures: TechFeature[] = [
    {
      icon: "⚡",
      title: "PlasmaWave Technology",
      description: "Safely breaks down pollutants at the molecular level without producing harmful ozone",
      color: "accent-primary",
    },
    {
      icon: "🌪️",
      title: "360° Air Intake",
      description: "Captures air from all directions for maximum efficiency and coverage",
      color: "accent-secondary",
    },
    {
      icon: "🧠",
      title: "Smart Auto Mode",
      description: "Automatically adjusts fan speed based on real-time air quality readings",
      color: "accent-tertiary",
    },
    {
      icon: "🔇",
      title: "Whisper Quiet",
      description: "Advanced motor technology ensures peaceful operation even at maximum speed",
      color: "accent-glow",
    },
  ]

  testimonials: Testimonial[] = [
    {
      name: "Sarah Johnson",
      role: "Home Owner",
      location: "California, USA",
      product: "WINIX 5500-2 Elite",
      content:
        "The WINIX 5500-2 has completely transformed our home's air quality. My allergies have improved dramatically, and I can finally sleep peacefully through the night!",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60&text=SJ",
    },
    {
      name: "Dr. Michael Chen",
      role: "Pediatrician",
      location: "New York, USA",
      product: "WINIX AM90 Smart Pro",
      content:
        "I recommend WINIX to all my patients with respiratory issues. The PlasmaWave technology is truly revolutionary and the smart features make monitoring air quality effortless.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60&text=MC",
    },
    {
      name: "Lisa Rodriguez",
      role: "Pet Owner",
      location: "Texas, USA",
      product: "WINIX HR900 Pet Guardian",
      content:
        "The HR900 Pet Guardian handles our three cats' dander and odors perfectly. It's a game-changer for pet families - no more sneezing or watery eyes!",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60&text=LR",
    },
    {
      name: "James Wilson",
      role: "Office Manager",
      location: "Florida, USA",
      product: "WINIX C535 Professional",
      content:
        "We installed these in our office spaces and the difference is remarkable. Employee complaints about stuffiness and allergies have virtually disappeared.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60&text=JW",
    },
    {
      name: "Emily Davis",
      role: "New Mother",
      location: "Washington, USA",
      product: "WINIX Tower QS Ultra",
      content:
        "As a new mom, I was concerned about air quality in the nursery. The Tower QS is whisper-quiet and gives me peace of mind that my baby is breathing clean air.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60&text=ED",
    },
    {
      name: "Robert Kim",
      role: "Apartment Dweller",
      location: "Illinois, USA",
      product: "WINIX Zero+ Compact",
      content:
        "Perfect for my small apartment! The compact design doesn't take up much space but the air quality improvement is incredible. Great value for money.",
      rating: 4,
      avatar: "/placeholder.svg?height=60&width=60&text=RK",
    },
    {
      name: "Maria Gonzalez",
      role: "Teacher",
      location: "Arizona, USA",
      product: "WINIX 5500-2 Elite",
      content:
        "Working from home during the pandemic made me realize how important clean air is. This purifier has made such a difference in my daily comfort and productivity.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60&text=MG",
    },
    {
      name: "David Thompson",
      role: "Retiree",
      location: "Oregon, USA",
      product: "WINIX AM90 Smart Pro",
      content:
        "The smart features are fantastic! I love being able to monitor and control the air purifier from my phone. The air quality reports help me understand my home environment better.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60&text=DT",
    },
    {
      name: "Jennifer Lee",
      role: "Fitness Enthusiast",
      location: "Colorado, USA",
      product: "WINIX HR900 Pet Guardian",
      content:
        "After intense workouts at home, this purifier quickly clears the air. It's also great for handling cooking odors and keeping the air fresh throughout the day.",
      rating: 5,
      avatar: "/placeholder.svg?height=60&width=60&text=JL",
    },
  ]

  ngOnInit(): void {
    this.startSlideshow()
    this.startFeaturedRotation()
    this.startAutoScroll()
    this.startTestimonialAutoScroll()
    console.log("WINIX Premium Design loaded")
  }

  ngOnDestroy(): void {
    this.stopSlideshow()
    this.stopFeaturedRotation()
    this.stopAutoScroll()
    this.stopTestimonialAutoScroll()
    this.allProducts.forEach((product) => {
      if (product.imageInterval) {
        clearInterval(product.imageInterval)
      }
    })
  }

  scrollToProducts(): void {
    const element = document.getElementById("products")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0)
  }

  onProductHover(product: Product, isHovered: boolean): void {
    product.isHovered = isHovered

    if (isHovered) {
      this.startImageAlternation(product)
    } else {
      this.stopImageAlternation(product)
      product.currentImage = product.images[0]
    }
  }

  onProductClick(product: Product): void {
    console.log("Product clicked:", product.name)
  }

  private startSlideshow(): void {
    this.slideInterval = setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.allProducts.length
    }, 4000)
  }

  private stopSlideshow(): void {
    if (this.slideInterval) {
      clearInterval(this.slideInterval)
      this.slideInterval = undefined
    }
  }

  private startFeaturedRotation(): void {
    this.featuredInterval = setInterval(() => {
      this.currentFeaturedIndex = (this.currentFeaturedIndex + 1) % this.allProducts.slice(0, 4).length
    }, 5000)
  }

  private stopFeaturedRotation(): void {
    if (this.featuredInterval) {
      clearInterval(this.featuredInterval)
      this.featuredInterval = undefined
    }
  }

  private startImageAlternation(product: Product): void {
    let currentIndex = 0

    if (product.imageInterval) {
      clearInterval(product.imageInterval)
    }

    product.imageInterval = setInterval(() => {
      if (product.isHovered) {
        currentIndex = (currentIndex + 1) % product.images.length
        product.currentImage = product.images[currentIndex]
      }
    }, 1000)
  }

  private stopImageAlternation(product: Product): void {
    if (product.imageInterval) {
      clearInterval(product.imageInterval)
      product.imageInterval = undefined
    }
  }

  // Featured products (first 4)
  get featuredProducts(): Product[] {
    return this.allProducts.slice(0, 4)
  }

  // All products for second section
  get allProductsForDisplay(): Product[] {
    return this.allProducts
  }

  private startAutoScroll(): void {
    this.autoScrollInterval = setInterval(() => {
      if (this.isAutoScrolling) {
        this.nextSlide()
      }
    }, 3000)
  }

  private stopAutoScroll(): void {
    if (this.autoScrollInterval) {
      clearInterval(this.autoScrollInterval)
      this.autoScrollInterval = undefined
    }
  }

  nextSlide(): void {
    const maxIndex = Math.max(0, this.allProducts.length - this.cardsToShow)
    this.currentScrollIndex = (this.currentScrollIndex + 1) % (maxIndex + 1)
  }

  prevSlide(): void {
    const maxIndex = Math.max(0, this.allProducts.length - this.cardsToShow)
    this.currentScrollIndex = this.currentScrollIndex === 0 ? maxIndex : this.currentScrollIndex - 1
  }

  pauseAutoScroll(): void {
    this.isAutoScrolling = false
  }

  resumeAutoScroll(): void {
    this.isAutoScrolling = true
  }

  getVisibleProducts(): Product[] {
    return this.allProducts.slice(this.currentScrollIndex, this.currentScrollIndex + this.cardsToShow)
  }

  // Testimonial Auto-Scroll Methods
  private startTestimonialAutoScroll(): void {
    this.testimonialAutoScrollInterval = setInterval(() => {
      if (this.isTestimonialAutoScrolling) {
        this.nextTestimonialSlide()
      }
    }, 4000) // 4 seconds for testimonials
  }

  private stopTestimonialAutoScroll(): void {
    if (this.testimonialAutoScrollInterval) {
      clearInterval(this.testimonialAutoScrollInterval)
      this.testimonialAutoScrollInterval = undefined
    }
  }

  nextTestimonialSlide(): void {
    const maxIndex = Math.max(0, this.testimonials.length - this.testimonialsToShow)
    this.currentTestimonialIndex = (this.currentTestimonialIndex + 1) % (maxIndex + 1)
  }

  prevTestimonialSlide(): void {
    const maxIndex = Math.max(0, this.testimonials.length - this.testimonialsToShow)
    this.currentTestimonialIndex = this.currentTestimonialIndex === 0 ? maxIndex : this.currentTestimonialIndex - 1
  }

  pauseTestimonialAutoScroll(): void {
    this.isTestimonialAutoScrolling = false
  }

  resumeTestimonialAutoScroll(): void {
    this.isTestimonialAutoScrolling = true
  }

  getVisibleTestimonials(): Testimonial[] {
    return this.testimonials.slice(this.currentTestimonialIndex, this.currentTestimonialIndex + this.testimonialsToShow)
  }
}
