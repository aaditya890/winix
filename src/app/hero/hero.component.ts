import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
interface Product {
  id: number
  name: string
  currentImage: string
  rating: number
  category: string
  technology: string
  coverage: string
}
@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent implements OnInit, OnDestroy {
  @Input() products: Product[] = []

  currentImageIndex = 0
  slideInterval?: any

  ngOnInit(): void {
    this.startSlideshow()
  }

  ngOnDestroy(): void {
    this.stopSlideshow()
  }

  scrollToProducts(): void {
    const element = document.getElementById("products")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0)
  }

  private startSlideshow(): void {
    this.slideInterval = setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.products.length
    }, 3000)
  }

  private stopSlideshow(): void {
    if (this.slideInterval) {
      clearInterval(this.slideInterval)
      this.slideInterval = undefined
    }
  }
}

