import { Component, OnInit, OnDestroy } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterLink } from "@angular/router"

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
  price: string
  originalPrice?: string
  badge?: string
  isAward?: boolean
  awardType?: string
  isNew?: boolean
}

interface SocialPost {
  id: number
  type: "video" | "image"
  thumbnail: string
  title: string
  description: string
  author: string
  likes: number
  isNew?: boolean
}

interface Category {
  id: number
  name: string
  icon: string
  productCount: number
  color: string
}

@Component({
  selector: "app-home",
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent implements OnInit, OnDestroy {
  // Hero video properties
  currentVideoIndex = 0
  videoInterval?: any

  // Social posts carousel
  socialScrollIndex = 0
  socialAutoScrollInterval?: any

  // Best sellers carousel
  bestSellerScrollIndex = 0
  bestSellerAutoScrollInterval?: any

  socialPosts: SocialPost[] = [
    {
      id: 1,
      type: "video",
      thumbnail: "/placeholder.svg?height=300&width=250&text=Air+Quality+Test",
      title: "Testing Air Quality Before & After",
      description: "Amazing results with WINIX PlasmaWave technology",
      author: "@cleanairhome",
      likes: 1240,
      isNew: true,
    },
    {
      id: 2,
      type: "image",
      thumbnail: "/placeholder.svg?height=300&width=250&text=Pet+Owner+Review",
      title: "Pet Hair Gone in Minutes!",
      description: "HR900 Pet Guardian working its magic",
      author: "@petlover_sarah",
      likes: 892,
    },
    {
      id: 3,
      type: "video",
      thumbnail: "/placeholder.svg?height=300&width=250&text=Smart+App+Demo",
      title: "Controlling from Anywhere",
      description: "Smart app features demonstration",
      author: "@techreview_mike",
      likes: 2156,
      isNew: true,
    },
    {
      id: 4,
      type: "image",
      thumbnail: "/placeholder.svg?height=300&width=250&text=Bedroom+Setup",
      title: "Perfect for Bedroom",
      description: "Whisper quiet operation all night",
      author: "@sleepbetter_jane",
      likes: 567,
    },
    {
      id: 5,
      type: "video",
      thumbnail: "/placeholder.svg?height=300&width=250&text=Filter+Change",
      title: "Easy Filter Replacement",
      description: "How to change filters in 30 seconds",
      author: "@winix_official",
      likes: 3421,
    },
  ]

  bestSellers: Product[] = [
    {
      id: 1,
      name: "WINIX 5500-2 PlasmaWave Elite",
      shortName: "5500-2 Elite",
      slug: "winix-5500-2-plasmawave-elite",
      description: "Revolutionary 3-stage filtration with PlasmaWave technology",
      images: ["/placeholder.svg?height=300&width=250&text=WINIX+5500-2"],
      currentImage: "/placeholder.svg?height=300&width=250&text=WINIX+5500-2",
      rating: 5,
      category: "Elite Series",
      technology: "PlasmaWave Technology",
      keyFeatures: ["True HEPA Filter", "PlasmaWave Technology", "Smart Auto Mode"],
      coverage: "360 sq ft",
      filterType: "True HEPA",
      noiseLevel: "27.8 dB",
      isHovered: false,
      price: "$199.99",
      originalPrice: "$249.99",
      badge: "BEST SELLER",
      isNew: false,
    },
    {
      id: 2,
      name: "WINIX AM90 Smart Connect Pro",
      shortName: "AM90 Smart Pro",
      slug: "winix-am90-smart-connect-pro",
      description: "Wi-Fi enabled smart air purifier with app control",
      images: ["/placeholder.svg?height=300&width=250&text=WINIX+AM90"],
      currentImage: "/placeholder.svg?height=300&width=250&text=WINIX+AM90",
      rating: 5,
      category: "Smart Series",
      technology: "Wi-Fi Smart Control",
      keyFeatures: ["Wi-Fi Connectivity", "Smart App Control", "Voice Compatible"],
      coverage: "360 sq ft",
      filterType: "True HEPA",
      noiseLevel: "29.5 dB",
      isHovered: false,
      price: "$299.99",
      originalPrice: "$349.99",
      badge: "SMART CHOICE",
      isNew: true,
    },
    {
      id: 3,
      name: "WINIX HR900 Pet Guardian",
      shortName: "HR900 Pet",
      slug: "winix-hr900-pet-guardian",
      description: "Specialized air purifier for pet owners controls",
      images: ["/placeholder.svg?height=300&width=250&text=WINIX+HR900"],
      currentImage: "/placeholder.svg?height=300&width=250&text=WINIX+HR900",
      rating: 5,
      category: "Pet Care",
      technology: "Pet-Specialized Filtration",
      keyFeatures: ["Pet Hair Capture", "Odor Reduction", "Allergen Control"],
      coverage: "300 sq ft",
      filterType: "Pet HEPA",
      noiseLevel: "28.1 dB",
      isHovered: false,
      price: "$179.99",
      originalPrice: "$219.99",
      badge: "PET FAVORITE",
      isNew: false,
    },
    {
      id: 4,
      name: "WINIX Zero+ Compact Genius",
      shortName: "Zero+ Compact",
      slug: "winix-zero-plus-compact-genius",
      description: "Ultra-compact with zero ozone emission",
      images: ["/placeholder.svg?height=300&width=250&text=WINIX+Zero"],
      currentImage: "/placeholder.svg?height=300&width=250&text=WINIX+Zero",
      rating: 4,
      category: "Compact",
      technology: "Zero Ozone Emission",
      keyFeatures: ["Zero Ozone", "Compact Design", "Energy Efficient"],
      coverage: "200 sq ft",
      filterType: "True HEPA",
      noiseLevel: "23.4 dB",
      isHovered: false,
      price: "$129.99",
      originalPrice: "$159.99",
      badge: "ECO-FRIENDLY",
      isNew: true,
    },
  ]

  categories: Category[] = [
    {
      id: 1,
      name: "Air Purifiers",
      icon: "🌪️",
      productCount: 12,
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: 2,
      name: "Smart Control",
      icon: "📱",
      productCount: 8,
      color: "bg-purple-100 text-purple-600",
    },
    {
      id: 3,
      name: "Pet Care",
      icon: "🐕",
      productCount: 6,
      color: "bg-green-100 text-green-600",
    },
    {
      id: 4,
      name: "Compact Solutions",
      icon: "🏠",
      productCount: 4,
      color: "bg-orange-100 text-orange-600",
    },
  ]

  ngOnInit(): void {
    this.startSocialAutoScroll()
    this.startBestSellerAutoScroll()
  }

  ngOnDestroy(): void {
    if (this.socialAutoScrollInterval) {
      clearInterval(this.socialAutoScrollInterval)
    }
    if (this.bestSellerAutoScrollInterval) {
      clearInterval(this.bestSellerAutoScrollInterval)
    }
  }

  private startSocialAutoScroll(): void {
    this.socialAutoScrollInterval = setInterval(() => {
      this.nextSocialSlide()
    }, 3000)
  }

  private startBestSellerAutoScroll(): void {
    this.bestSellerAutoScrollInterval = setInterval(() => {
      this.nextBestSellerSlide()
    }, 4000)
  }

  nextSocialSlide(): void {
    const maxIndex = Math.max(0, this.socialPosts.length - 4)
    this.socialScrollIndex = (this.socialScrollIndex + 1) % (maxIndex + 1)
  }

  nextBestSellerSlide(): void {
    const maxIndex = Math.max(0, this.bestSellers.length - 4)
    this.bestSellerScrollIndex = (this.bestSellerScrollIndex + 1) % (maxIndex + 1)
  }

  getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0)
  }

  addToCart(product: Product): void {
    console.log("Added to cart:", product.name)
    // Add cart functionality here
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }
}
